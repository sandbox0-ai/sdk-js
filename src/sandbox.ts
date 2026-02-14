import { split } from "shlex";
import type {
  CreateCMDContextRequest,
  CreateContextRequest,
  CreateREPLContextRequest,
  PTYSize,
  ProcessType,
} from "./apispec/src/models/index";
import { models } from "./apispec_compat";
import type { Client } from "./client";
import { APIError } from "./errors";
import type {
  CmdResult,
  FileWatchResponse,
  RunResult,
  StreamInput,
  StreamOutput,
} from "./models";
import { WebSocketClient, type WebSocketRawData } from "./ws_client";

export interface RunOptions {
  contextId?: string;
  idleTimeoutSec?: number;
  ttlSec?: number;
  cwd?: string;
  envVars?: Record<string, string>;
  ptyRows?: number;
  ptyCols?: number;
}

export interface CmdOptions {
  command?: string[];
  wait?: boolean;
  idleTimeoutSec?: number;
  ttlSec?: number;
  cwd?: string;
  envVars?: Record<string, string>;
  ptyRows?: number;
  ptyCols?: number;
}

type SandboxParams = {
  id: string;
  client: Client;
  template?: string;
  clusterId?: string;
  podName?: string;
  status?: string;
};

type QueueWaiter = {
  resolve: () => void;
  reject: (err: Error) => void;
};

export class ContextStream {
  private readonly queue: StreamOutput[] = [];
  private readonly waiters: QueueWaiter[] = [];
  private closed = false;
  private error?: Error;

  constructor(
    private readonly socket: WebSocketClient,
    private readonly sandboxId: string,
    private readonly contextId: string,
  ) {
    this.socket.onMessage((data: WebSocketRawData) => {
      const payload = parseWsMessage(data);
      if (!payload) {
        return;
      }
      this.queue.push({
        sandboxId: this.sandboxId,
        contextId: this.contextId,
        source: String(payload.source ?? ""),
        data: String(payload.data ?? ""),
      });
      this.flush();
    });
    this.socket.onClose(() => {
      this.closed = true;
      this.flush();
    });
    this.socket.onError((err: Error) => {
      this.error = err instanceof Error ? err : new Error("websocket error");
      this.closed = true;
      this.flush();
    });
  }

  get id(): string {
    return this.contextId;
  }

  send(message: StreamInput): void {
    const normalized = normalizeStreamInput(message);
    this.socket.send(JSON.stringify(normalized));
  }

  sendInput(data: string, requestId?: string): void {
    this.send({ type: "input", data, requestId });
  }

  sendResize(rows: number, cols: number): void {
    this.send({ type: "resize", rows, cols });
  }

  sendSignal(signal: string): void {
    this.send({ type: "signal", signal });
  }

  async *outputs(): AsyncGenerator<StreamOutput> {
    while (!this.closed || this.queue.length > 0) {
      if (this.error) {
        throw this.error;
      }
      if (this.queue.length > 0) {
        yield this.queue.shift()!;
        continue;
      }
      await this.waitForMessage();
    }
  }

  close(): void {
    this.socket.close();
  }

  private flush(): void {
    while (this.waiters.length > 0) {
      const waiter = this.waiters.shift();
      if (waiter) {
        if (this.error) {
          waiter.reject(this.error);
        } else {
          waiter.resolve();
        }
      }
    }
  }

  private waitForMessage(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.waiters.push({ resolve, reject });
    });
  }

}

export class FileWatchStream {
  private readonly queue: FileWatchResponse[] = [];
  private readonly waiters: QueueWaiter[] = [];
  private closed = false;
  private error?: Error;
  watchId?: string;

  constructor(private readonly socket: WebSocketClient) {
    this.socket.onMessage((data: WebSocketRawData) => {
      const payload = parseWsMessage(data);
      if (!payload) {
        return;
      }
      this.queue.push({
        type: String(payload.type ?? ""),
        watchId: payload.watch_id ?? payload.watchId,
        event: payload.event,
        path: payload.path,
        error: payload.error,
      });
      this.flush();
    });
    this.socket.onClose(() => {
      this.closed = true;
      this.flush();
    });
    this.socket.onError((err: Error) => {
      this.error = err instanceof Error ? err : new Error("websocket error");
      this.closed = true;
      this.flush();
    });
  }

  async *events(): AsyncGenerator<FileWatchResponse> {
    while (!this.closed || this.queue.length > 0) {
      if (this.error) {
        throw this.error;
      }
      if (this.queue.length > 0) {
        yield this.queue.shift()!;
        continue;
      }
      await this.waitForMessage();
    }
  }

  unsubscribe(watchId: string): void {
    this.socket.send(JSON.stringify({ action: "unsubscribe", watch_id: watchId }));
    this.close();
  }

  close(): void {
    this.socket.close();
  }

  private flush(): void {
    while (this.waiters.length > 0) {
      const waiter = this.waiters.shift();
      if (waiter) {
        if (this.error) {
          waiter.reject(this.error);
        } else {
          waiter.resolve();
        }
      }
    }
  }

  private waitForMessage(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.waiters.push({ resolve, reject });
    });
  }
}

export class Sandbox {
  readonly id: string;
  readonly template: string;
  readonly clusterId?: string;
  readonly podName: string;
  readonly status: string;

  private readonly client: Client;
  private readonly replContextByLang = new Map<string, string>();
  private readonly pendingReplContexts = new Map<string, Promise<string>>();

  constructor(params: SandboxParams) {
    this.id = params.id;
    this.client = params.client;
    this.template = params.template ?? "";
    this.clusterId = params.clusterId;
    this.podName = params.podName ?? "";
    this.status = params.status ?? "";
  }

  async run(language: string, input: string, options?: RunOptions): Promise<RunResult> {
    if (!input.trim()) {
      throw new APIError({
        statusCode: 0,
        code: "invalid_argument",
        message: "input cannot be empty",
      });
    }
    const contextId = await this.ensureReplContext(language, options);
    const execResp = await this.contextExec(contextId, normalizeReplInput(input));
    return {
      sandboxId: this.id,
      contextId,
      outputRaw: execResp.outputRaw ?? "",
    };
  }

  async cmd(command: string, options?: CmdOptions): Promise<CmdResult> {
    if (!command.trim()) {
      throw new APIError({
        statusCode: 0,
        code: "invalid_argument",
        message: "command cannot be empty",
      });
    }
    const cmdArgs = options?.command ?? parseCommand(command);
    if (cmdArgs.length === 0) {
      throw new APIError({
        statusCode: 0,
        code: "invalid_argument",
        message: "command cannot be empty",
      });
    }
    const waitUntilDone = options?.wait ?? true;
    const request: CreateContextRequest = {
      type: models.ProcessType.Cmd as ProcessType,
      cmd: { command: cmdArgs } as CreateCMDContextRequest,
      waitUntilDone,
      cwd: options?.cwd,
      envVars: options?.envVars,
      ptySize: buildPty(options?.ptyRows, options?.ptyCols),
      idleTimeoutSec: options?.idleTimeoutSec,
      ttlSec: options?.ttlSec,
    };
    const contextResp = await this.createContext(request);
    return {
      sandboxId: this.id,
      contextId: contextResp.id,
      outputRaw: contextResp.outputRaw ?? "",
    };
  }

  async runStream(language: string, options?: RunOptions): Promise<ContextStream> {
    const contextId = await this.ensureReplContext(language, options);
    return this.connectWsContext(contextId);
  }

  async cmdStream(command: string, options?: CmdOptions): Promise<ContextStream> {
    if (!command.trim()) {
      throw new APIError({
        statusCode: 0,
        code: "invalid_argument",
        message: "command cannot be empty",
      });
    }
    const cmdArgs = options?.command ?? parseCommand(command);
    if (cmdArgs.length === 0) {
      throw new APIError({
        statusCode: 0,
        code: "invalid_argument",
        message: "command cannot be empty",
      });
    }
    const waitUntilDone = options?.wait ?? false;
    const request: CreateContextRequest = {
      type: models.ProcessType.Cmd as ProcessType,
      cmd: { command: cmdArgs } as CreateCMDContextRequest,
      waitUntilDone,
      cwd: options?.cwd,
      envVars: options?.envVars,
      ptySize: buildPty(options?.ptyRows, options?.ptyCols),
      idleTimeoutSec: options?.idleTimeoutSec,
      ttlSec: options?.ttlSec,
    };
    const contextResp = await this.createContext(request);
    return this.connectWsContext(contextResp.id);
  }

  async connectWsContext(contextId: string): Promise<ContextStream> {
    const wsUrl = this.client.websocketUrl(
      `/api/v1/sandboxes/${this.id}/contexts/${contextId}/ws`,
    );
    const headers = await this.client.wsHeaders();
    const socket = new WebSocketClient(wsUrl, { headers });
    return new ContextStream(socket, this.id, contextId);
  }

  private async ensureReplContext(
    language: string,
    options?: RunOptions,
  ): Promise<string> {
    if (options?.contextId) {
      return options.contextId;
    }
    const normalized = language.trim() || "python";
    const cached = this.replContextByLang.get(normalized);
    if (cached) {
      return cached;
    }
    const pending = this.pendingReplContexts.get(normalized);
    if (pending) {
      return pending;
    }
    const promise = (async () => {
      const request: CreateContextRequest = {
        type: models.ProcessType.Repl as ProcessType,
        repl: { language: normalized } as CreateREPLContextRequest,
        cwd: options?.cwd,
        envVars: options?.envVars,
        ptySize: buildPty(options?.ptyRows, options?.ptyCols),
        idleTimeoutSec: options?.idleTimeoutSec,
        ttlSec: options?.ttlSec,
      };
      const response = await this.createContext(request);
      this.replContextByLang.set(normalized, response.id);
      return response.id;
    })();
    this.pendingReplContexts.set(normalized, promise);
    try {
      return await promise;
    } finally {
      this.pendingReplContexts.delete(normalized);
    }
  }
}

function buildPty(rows?: number, cols?: number): PTYSize | undefined {
  if (rows === undefined || cols === undefined) {
    return undefined;
  }
  if (rows <= 0 || cols <= 0) {
    throw new APIError({
      statusCode: 0,
      code: "invalid_argument",
      message: "pty rows and cols must be > 0",
    });
  }
  return { rows, cols } as PTYSize;
}

function parseCommand(input: string): string[] {
  return split(input);
}

function normalizeReplInput(input: string): string {
  // Ensure REPL input is terminated so the backend executes the final line.
  return input.endsWith("\n") ? input : `${input}\n`;
}

function normalizeStreamInput(input: StreamInput): StreamInput {
  const normalized: StreamInput = {
    type: input.type ?? "input",
    data: input.data,
    rows: input.rows,
    cols: input.cols,
    signal: input.signal,
    requestId: input.requestId,
  };
  if (normalized.type === "input" && !normalized.requestId) {
    normalized.requestId = generateRequestId();
  }
  if (normalized.type === "resize") {
    if (!normalized.rows || !normalized.cols) {
      throw new APIError({
        statusCode: 0,
        code: "invalid_argument",
        message: "resize rows and cols must be > 0",
      });
    }
  }
  if (normalized.type === "signal") {
    if (!normalized.signal?.trim()) {
      throw new APIError({
        statusCode: 0,
        code: "invalid_argument",
        message: "signal is required",
      });
    }
  }
  return normalized;
}

function parseWsMessage(data: WebSocketRawData): any | null {
  try {
    let text: string;
    if (typeof data === "string") {
      text = data;
    } else if (Buffer.isBuffer(data)) {
      text = data.toString("utf-8");
    } else if (Array.isArray(data)) {
      text = Buffer.concat(data).toString("utf-8");
    } else if (data instanceof ArrayBuffer) {
      text = Buffer.from(data).toString("utf-8");
    } else {
      text = Buffer.from(data as Uint8Array).toString("utf-8");
    }
    return JSON.parse(text);
  } catch {
    return null;
  }
}


let requestCounter = 0;
function generateRequestId(): string {
  requestCounter += 1;
  return `req-${Date.now()}-${requestCounter}`;
}

