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

/**
 * ContextStream provides a duplex stream interface for sandbox context communication.
 *
 * Uses Web Streams API for:
 * - Native backpressure control
 * - Standardized error handling
 * - Composability with other streams
 *
 * @example
 * ```typescript
 * const stream = await sandbox.runStream("python");
 *
 * // Option 1: Use async generator (convenient for simple cases)
 * for await (const output of stream.outputs()) {
 *   console.log(output.data);
 * }
 *
 * // Option 2: Use ReadableStream directly (for advanced use)
 * const reader = stream.readable.getReader();
 * while (true) {
 *   const { done, value } = await reader.read();
 *   if (done) break;
 *   console.log(value.data);
 * }
 *
 * // Option 3: Use WritableStream for input with backpressure
 * const writer = stream.writable.getWriter();
 * await writer.write({ type: "input", data: "print(1)\n" });
 * await writer.close();
 * ```
 */
export class ContextStream {
  readonly readable: ReadableStream<StreamOutput>;
  readonly writable: WritableStream<StreamInput>;
  private readonly socket: WebSocketClient;
  private readonly _contextId: string;
  private readonly _sandboxId: string;

  constructor(socket: WebSocketClient, sandboxId: string, contextId: string) {
    this.socket = socket;
    this._sandboxId = sandboxId;
    this._contextId = contextId;

    // Create ReadableStream for outputs with backpressure
    this.readable = new ReadableStream<StreamOutput>({
      start: (controller) => {
        socket.onMessage((data: WebSocketRawData) => {
          const payload = parseWsMessage(data);
          if (!payload) return;
          controller.enqueue({
            sandboxId: this._sandboxId,
            contextId: this._contextId,
            source: String(payload.source ?? ""),
            data: String(payload.data ?? ""),
          });
        });
        socket.onError((err: Error) => {
          controller.error(err instanceof Error ? err : new Error("websocket error"));
        });
        socket.onClose(() => {
          try {
            controller.close();
          } catch {
            // Controller may already be closed due to error
          }
        });
      },
    });

    // Create WritableStream for inputs with backpressure
    this.writable = new WritableStream<StreamInput>({
      write: (chunk) => {
        const normalized = normalizeStreamInput(chunk);
        socket.send(JSON.stringify(normalized));
      },
      close: () => {
        socket.close();
      },
      abort: () => {
        socket.close();
      },
    });
  }

  get id(): string {
    return this._contextId;
  }

  /**
   * Send input data.
   */
  sendInput(data: string, requestId?: string): void {
    const normalized = normalizeStreamInput({ type: "input", data, requestId });
    this.socket.send(JSON.stringify(normalized));
  }

  /**
   * Resize PTY.
   */
  sendResize(rows: number, cols: number): void {
    const normalized = normalizeStreamInput({ type: "resize", rows, cols });
    this.socket.send(JSON.stringify(normalized));
  }

  /**
   * Send a signal.
   */
  sendSignal(signal: string): void {
    const normalized = normalizeStreamInput({ type: "signal", signal });
    this.socket.send(JSON.stringify(normalized));
  }

  /**
   * Async generator for consuming outputs.
   */
  async *outputs(): AsyncGenerator<StreamOutput> {
    const reader = this.readable.getReader();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) return;
        yield value;
      }
    } finally {
      reader.releaseLock();
    }
  }

  /**
   * Close the stream connection.
   */
  close(): void {
    this.socket.close();
  }
}

/**
 * FileWatchStream provides a stream interface for file system watch events.
 *
 * Uses Web Streams API for native backpressure control and error handling.
 *
 * @example
 * ```typescript
 * const watcher = await sandbox.watchFiles("/workspace");
 *
 * // Option 1: Use async generator
 * for await (const event of watcher.events()) {
 *   console.log(event.path, event.event);
 * }
 *
 * // Option 2: Use ReadableStream directly
 * const reader = watcher.readable.getReader();
 * while (true) {
 *   const { done, value } = await reader.read();
 *   if (done) break;
 *   console.log(value.path, value.event);
 * }
 * ```
 */
export class FileWatchStream {
  readonly readable: ReadableStream<FileWatchResponse>;
  private readonly socket: WebSocketClient;
  watchId?: string;

  constructor(socket: WebSocketClient) {
    this.socket = socket;

    this.readable = new ReadableStream<FileWatchResponse>({
      start: (controller) => {
        socket.onMessage((data: WebSocketRawData) => {
          const payload = parseWsMessage(data);
          if (!payload) return;
          controller.enqueue({
            type: String(payload.type ?? ""),
            watchId: payload.watch_id ?? payload.watchId,
            event: payload.event,
            path: payload.path,
            error: payload.error,
          });
        });
        socket.onError((err: Error) => {
          controller.error(err instanceof Error ? err : new Error("websocket error"));
        });
        socket.onClose(() => {
          try {
            controller.close();
          } catch {
            // Controller may already be closed due to error
          }
        });
      },
    });
  }

  /**
   * Async generator for consuming events (convenience method).
   */
  async *events(): AsyncGenerator<FileWatchResponse> {
    const reader = this.readable.getReader();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) return;
        yield value;
      }
    } finally {
      reader.releaseLock();
    }
  }

  /**
   * Unsubscribe from the watch and close the connection.
   */
  unsubscribe(watchId: string): void {
    this.socket.send(JSON.stringify({ action: "unsubscribe", watch_id: watchId }));
    this.close();
  }

  /**
   * Close the stream connection.
   */
  close(): void {
    this.socket.close();
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

