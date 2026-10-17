import type {
  CreateExecutionSessionAttemptRequest,
  ExecutionSession,
  ExecutionSessionDesiredState,
  ExecutionSessionEvent,
  ExecutionSessionEventPage,
  ExecutionSessionInputRequest,
  ExecutionSessionInputResponse,
  ExecutionSessionSignalRequest,
  ExecutionSessionSpec,
  ExecutionSessionTerminalResizeRequest,
  ExecutionSessionWebSocketRequest,
  SuccessAcceptedResponse,
  SuccessDeletedResponse,
  SuccessResizedResponse,
} from "./apispec/src/models/index";
import type { Client } from "./client";
import { models } from "./apispec_compat";
import { APIError, wrapApiCall } from "./errors";
import type {
  SessionCreateOptions,
  SessionEventOptions,
  SessionEventStream,
  SessionEventStreamOptions,
  SessionWebSocketMessage,
  SessionWebSocketOptions,
} from "./models";
import { ensureData, ensureModel } from "./response";
import { Sandbox } from "./sandbox";
import { WebSocketClient, WebSocketUpgradeError, type WebSocketRawData } from "./ws_client";

function getClient(sandbox: Sandbox): Client {
  return (sandbox as any).client as Client;
}

declare module "./sandbox" {
  interface Sandbox {
    listSessions(): Promise<ExecutionSession[]>;
    createSession(spec: ExecutionSessionSpec, options?: SessionCreateOptions): Promise<ExecutionSession>;
    /** Read-only original creation receipt; never auto-resumes or creates. */
    findConditionalSession(creationKey: string, runtimeGeneration: number): Promise<ExecutionSession>;
    findRestoredConditionalSession(creationKey: string, runtimeGeneration: number, creationRuntimeGeneration: number): Promise<ExecutionSession>;
    connectRestoredConditionalSession(sessionId: string, creationKey: string, runtimeGeneration: number, creationRuntimeGeneration: number, attemptId: string, options?: SessionWebSocketOptions): Promise<ExecutionSessionConnection>;
    getSession(sessionId: string): Promise<ExecutionSession>;
    updateSession(sessionId: string, spec: ExecutionSessionSpec): Promise<ExecutionSession>;
    deleteSession(sessionId: string): Promise<SuccessDeletedResponse>;
    setSessionDesiredState(sessionId: string, state: ExecutionSessionDesiredState): Promise<ExecutionSession>;
    createSessionAttempt(sessionId: string, replaceCurrent?: boolean): Promise<ExecutionSession>;
    writeSessionInput(sessionId: string, request: ExecutionSessionInputRequest): Promise<ExecutionSessionInputResponse>;
    sendSessionSignal(sessionId: string, request: ExecutionSessionSignalRequest): Promise<SuccessAcceptedResponse>;
    resizeSessionTerminal(sessionId: string, request: ExecutionSessionTerminalResizeRequest): Promise<SuccessResizedResponse>;
    listSessionEvents(sessionId: string, options?: SessionEventOptions): Promise<ExecutionSessionEventPage>;
    watchSessionEvents(sessionId: string, options?: SessionEventStreamOptions): Promise<SessionEventStream>;
    connectConditionalSession(sessionId: string, creationKey: string, runtimeGeneration: number, attemptId: string, options?: SessionWebSocketOptions): Promise<ExecutionSessionConnection>;
    connectSession(sessionId: string, options?: SessionWebSocketOptions): Promise<ExecutionSessionConnection>;
  }
}

Sandbox.prototype.listSessions = async function (this: Sandbox): Promise<ExecutionSession[]> {
  const response = await wrapApiCall(() =>
    getClient(this).apispec.sessions.apiV1SandboxesIdSessionsGet({ id: this.id }),
  );
  return ensureData(response, "list sessions returned empty response").sessions ?? [];
};

Sandbox.prototype.createSession = async function (
  this: Sandbox,
  spec: ExecutionSessionSpec,
  options?: SessionCreateOptions,
): Promise<ExecutionSession> {
  if (options?.runtimeGeneration !== undefined) {
    if (!Number.isSafeInteger(options.runtimeGeneration) || options.runtimeGeneration <= 0 ||
        !options.idempotencyKey?.trim() || options.idempotencyKey.length > 255) {
      throw new Error("Conditional session creation requires a positive safe runtime generation and idempotency key");
    }
    const response = await wrapApiCall(() => getClient(this).apispec.sessions.apiV1SandboxesIdSessionsConditionalPost({
      id: this.id, idempotencyKey: options.idempotencyKey!,
      conditionalExecutionSessionRequest: { sandboxId: this.id, runtimeGeneration: options.runtimeGeneration!, spec },
    }));
    const session = ensureData(response, "conditional create session returned empty response");
    if (session.runtimeGeneration !== options.runtimeGeneration) throw new Error("Conditional session response has a different runtime generation; reconcile before retrying");
    return session;
  }
  const response = await wrapApiCall(() =>
    getClient(this).apispec.sessions.apiV1SandboxesIdSessionsPost({
      id: this.id,
      executionSessionSpec: spec,
      idempotencyKey: options?.idempotencyKey,
    }),
  );
  return ensureData(response, "create session returned empty response");
};

Sandbox.prototype.findConditionalSession = async function (
  this: Sandbox, creationKey: string, runtimeGeneration: number,
): Promise<ExecutionSession> {
  if (!Number.isSafeInteger(runtimeGeneration) || runtimeGeneration <= 0 ||
      !creationKey?.trim() || creationKey.length > 255) {
    throw new Error("Conditional session lookup requires a positive safe runtime generation and original creation key");
  }
  const response = await wrapApiCall(() => getClient(this).apispec.sessions.apiV1SandboxesIdSessionsConditionalLookupGet({
    id: this.id, runtimeGeneration, idempotencyKey: creationKey,
  }));
  const session = ensureData(response, "conditional session lookup returned empty response");
  if (session.runtimeGeneration !== runtimeGeneration) throw new Error("Conditional session response has a different runtime generation; reconcile before retrying");
  return session;
};

/** Explicit restored original attempt; external lineage and credential admission are caller responsibilities. */
Sandbox.prototype.findRestoredConditionalSession = async function (
  this: Sandbox, creationKey: string, runtimeGeneration: number, creationRuntimeGeneration: number,
): Promise<ExecutionSession> {
  if (!Number.isSafeInteger(creationRuntimeGeneration) || creationRuntimeGeneration <= 0 || creationRuntimeGeneration >= runtimeGeneration) throw new Error("Restored lookup requires an earlier positive safe creation generation");
  if (!Number.isSafeInteger(runtimeGeneration) || runtimeGeneration <= 0 ||
      !creationKey?.trim() || creationKey.length > 255) {
    throw new Error("Conditional session lookup requires a positive safe runtime generation and original creation key");
  }
  const response = await wrapApiCall(() => getClient(this).apispec.sessions.apiV1SandboxesIdSessionsConditionalLookupGet({
    id: this.id, runtimeGeneration, creationRuntimeGeneration, idempotencyKey: creationKey,
  }));
  const session = ensureData(response, "conditional session lookup returned empty response");
  if (session.runtimeGeneration !== runtimeGeneration) throw new Error("Conditional session response has a different runtime generation; reconcile before retrying");
  if (session.phase !== "running" || !session.attempt || session.attempt.runtimeGeneration !== creationRuntimeGeneration || session.attempt.finishedAt !== undefined) throw new Error("Restored lookup requires the running original attempt");
  return session;
};

Sandbox.prototype.getSession = async function (
  this: Sandbox,
  sessionId: string,
): Promise<ExecutionSession> {
  const response = await wrapApiCall(() =>
    getClient(this).apispec.sessions.apiV1SandboxesIdSessionsSessionIdGet({
      id: this.id,
      sessionId,
    }),
  );
  return ensureData(response, "get session returned empty response");
};

Sandbox.prototype.updateSession = async function (
  this: Sandbox,
  sessionId: string,
  spec: ExecutionSessionSpec,
): Promise<ExecutionSession> {
  const response = await wrapApiCall(() =>
    getClient(this).apispec.sessions.apiV1SandboxesIdSessionsSessionIdPut({
      id: this.id,
      sessionId,
      executionSessionSpec: spec,
    }),
  );
  return ensureData(response, "update session returned empty response");
};

Sandbox.prototype.deleteSession = async function (
  this: Sandbox,
  sessionId: string,
): Promise<SuccessDeletedResponse> {
  const response = await wrapApiCall(() =>
    getClient(this).apispec.sessions.apiV1SandboxesIdSessionsSessionIdDelete({
      id: this.id,
      sessionId,
    }),
  );
  return ensureModel(response, "delete session returned empty response");
};

Sandbox.prototype.setSessionDesiredState = async function (
  this: Sandbox,
  sessionId: string,
  state: ExecutionSessionDesiredState,
): Promise<ExecutionSession> {
  const response = await wrapApiCall(() =>
    getClient(this).apispec.sessions.apiV1SandboxesIdSessionsSessionIdDesiredStatePut({
      id: this.id,
      sessionId,
      executionSessionDesiredStateRequest: { state },
    }),
  );
  return ensureData(response, "set session desired state returned empty response");
};

Sandbox.prototype.createSessionAttempt = async function (
  this: Sandbox,
  sessionId: string,
  replaceCurrent = false,
): Promise<ExecutionSession> {
  const request: CreateExecutionSessionAttemptRequest = { replaceCurrent };
  const response = await wrapApiCall(() =>
    getClient(this).apispec.sessions.apiV1SandboxesIdSessionsSessionIdAttemptsPost({
      id: this.id,
      sessionId,
      createExecutionSessionAttemptRequest: request,
    }),
  );
  return ensureData(response, "create session attempt returned empty response");
};

Sandbox.prototype.writeSessionInput = async function (
  this: Sandbox,
  sessionId: string,
  request: ExecutionSessionInputRequest,
): Promise<ExecutionSessionInputResponse> {
  const response = await wrapApiCall(() =>
    getClient(this).apispec.sessions.apiV1SandboxesIdSessionsSessionIdInputsPost({
      id: this.id,
      sessionId,
      executionSessionInputRequest: request,
    }),
  );
  return ensureData(response, "write session input returned empty response");
};

Sandbox.prototype.sendSessionSignal = async function (
  this: Sandbox,
  sessionId: string,
  request: ExecutionSessionSignalRequest,
): Promise<SuccessAcceptedResponse> {
  const response = await wrapApiCall(() =>
    getClient(this).apispec.sessions.apiV1SandboxesIdSessionsSessionIdSignalsPost({
      id: this.id,
      sessionId,
      executionSessionSignalRequest: request,
    }),
  );
  return ensureModel(response, "send session signal returned empty response");
};

Sandbox.prototype.resizeSessionTerminal = async function (
  this: Sandbox,
  sessionId: string,
  request: ExecutionSessionTerminalResizeRequest,
): Promise<SuccessResizedResponse> {
  const response = await wrapApiCall(() =>
    getClient(this).apispec.sessions.apiV1SandboxesIdSessionsSessionIdTerminalPut({
      id: this.id,
      sessionId,
      executionSessionTerminalResizeRequest: request,
    }),
  );
  return ensureModel(response, "resize session terminal returned empty response");
};

Sandbox.prototype.listSessionEvents = async function (
  this: Sandbox,
  sessionId: string,
  options?: SessionEventOptions,
): Promise<ExecutionSessionEventPage> {
  const response = await wrapApiCall(() =>
    getClient(this).apispec.sessions.apiV1SandboxesIdSessionsSessionIdEventsGet({
      id: this.id,
      sessionId,
      after: options?.after,
      limit: options?.limit,
    }),
  );
  return ensureData(response, "list session events returned empty response");
};

Sandbox.prototype.watchSessionEvents = async function (
  this: Sandbox,
  sessionId: string,
  options?: SessionEventStreamOptions,
): Promise<SessionEventStream> {
  const response = await getClient(this).openSandboxSessionEventStream(this.id, sessionId, options);
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("text/event-stream")) {
    throw new APIError({
      statusCode: response.status,
      code: "unexpected_response",
      message: `unexpected session event stream content type: ${contentType}`,
    });
  }
  return new ExecutionSessionEventStream(response);
};

Sandbox.prototype.connectSession = async function (
  this: Sandbox,
  sessionId: string,
  options?: SessionWebSocketOptions,
): Promise<ExecutionSessionConnection> {
  const client = getClient(this);
  const path = `/api/v1/sandboxes/${encodeURIComponent(this.id)}/sessions/${encodeURIComponent(sessionId)}/ws`;
  const wsUrl = new URL(client.websocketUrl(path));
  if (options?.after !== undefined) {
    wsUrl.searchParams.set("after", String(options.after));
  }
  const socket = await WebSocketClient.connect(wsUrl.toString(), { headers: await client.wsHeaders() });
  await socket.waitForOpen();
  return new ExecutionSessionConnection(socket);
};

/** Exact conditional attachment; no retry, auto-resume or ordinary fallback. */
Sandbox.prototype.connectConditionalSession = async function (
  this: Sandbox, sessionId: string, creationKey: string, runtimeGeneration: number,
  attemptId: string, options?: SessionWebSocketOptions,
): Promise<ExecutionSessionConnection> {
  if (!sessionId || !attemptId || !creationKey.trim() || creationKey.length > 255 ||
      !Number.isSafeInteger(runtimeGeneration) || runtimeGeneration <= 0 ||
      (options?.after !== undefined && (!Number.isSafeInteger(options.after) || options.after < 0))) {
    throw new Error("Conditional attachment requires session, creation key, positive safe generation, attempt and nonnegative safe cursor");
  }
  const client = getClient(this);
  const path = `/api/v1/sandboxes/${encodeURIComponent(this.id)}/sessions/${encodeURIComponent(sessionId)}/conditional/ws`;
  const wsUrl = new URL(client.websocketUrl(path));
  wsUrl.searchParams.set("runtime_generation", String(runtimeGeneration));
  wsUrl.searchParams.set("attempt_id", attemptId);
  if (options?.after !== undefined) wsUrl.searchParams.set("after", String(options.after));
  const headers = { ...await client.wsHeaders(), "Idempotency-Key": creationKey };
  const socket = await WebSocketClient.connect(wsUrl.toString(), { headers, singleAttempt: true });
  try { await socket.waitForOpen(); }
  catch (error) {
    if (error instanceof WebSocketUpgradeError) throw new APIError({statusCode:error.statusCode,
      code:error.statusCode===410 ? "event_cursor_expired" : undefined, message:"Conditional session attachment rejected"});
    throw error;
  }
  return new ExecutionSessionConnection(socket);
};

/** Explicit restored attachment; never retries or creates. */
Sandbox.prototype.connectRestoredConditionalSession = async function (
  this: Sandbox, sessionId: string, creationKey: string, runtimeGeneration: number, creationRuntimeGeneration: number,
  attemptId: string, options?: SessionWebSocketOptions,
): Promise<ExecutionSessionConnection> {
  if (!Number.isSafeInteger(creationRuntimeGeneration) || creationRuntimeGeneration <= 0 || creationRuntimeGeneration >= runtimeGeneration) throw new Error("Restored attachment requires an earlier positive safe creation generation");
  if (!sessionId || !attemptId || !creationKey.trim() || creationKey.length > 255 ||
      !Number.isSafeInteger(runtimeGeneration) || runtimeGeneration <= 0 ||
      (options?.after !== undefined && (!Number.isSafeInteger(options.after) || options.after < 0))) {
    throw new Error("Conditional attachment requires session, creation key, positive safe generation, attempt and nonnegative safe cursor");
  }
  const client = getClient(this);
  const path = `/api/v1/sandboxes/${encodeURIComponent(this.id)}/sessions/${encodeURIComponent(sessionId)}/conditional/ws`;
  const wsUrl = new URL(client.websocketUrl(path));
  wsUrl.searchParams.set("runtime_generation", String(runtimeGeneration));
  wsUrl.searchParams.set("creation_runtime_generation", String(creationRuntimeGeneration));
  wsUrl.searchParams.set("attempt_id", attemptId);
  if (options?.after !== undefined) wsUrl.searchParams.set("after", String(options.after));
  const headers = { ...await client.wsHeaders(), "Idempotency-Key": creationKey };
  const socket = await WebSocketClient.connect(wsUrl.toString(), { headers, singleAttempt: true });
  try { await socket.waitForOpen(); }
  catch (error) {
    if (error instanceof WebSocketUpgradeError) throw new APIError({statusCode:error.statusCode,
      code:error.statusCode===410 ? "event_cursor_expired" : undefined, message:"Conditional session attachment rejected"});
    throw error;
  }
  return new ExecutionSessionConnection(socket);
};

export class ExecutionSessionEventStream implements SessionEventStream {
  readonly response: Response;
  private readonly body: ReadableStream<Uint8Array>;
  private reader?: ReadableStreamDefaultReader<Uint8Array>;
  private consumed = false;

  constructor(response: Response) {
    if (!response.body) {
      throw new APIError({
        statusCode: response.status,
        code: "unexpected_response",
        message: "session event stream response did not include a body",
      });
    }
    this.response = response;
    this.body = response.body;
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<ExecutionSessionEvent> {
    if (this.consumed) {
      throw new Error("session event stream can only be consumed once");
    }
    this.consumed = true;
    const reader = this.body.getReader();
    this.reader = reader;
    const decoder = new TextDecoder();
    let buffer = "";
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        buffer = buffer.replace(/\r\n/g, "\n");
        let boundary = buffer.indexOf("\n\n");
        while (boundary >= 0) {
          const event = parseSSEEvent(buffer.slice(0, boundary));
          buffer = buffer.slice(boundary + 2);
          if (event) yield event;
          boundary = buffer.indexOf("\n\n");
        }
      }
      buffer += decoder.decode();
      const event = parseSSEEvent(buffer);
      if (event) yield event;
    } finally {
      this.reader = undefined;
      reader.releaseLock();
    }
  }

  async close(): Promise<void> {
    if (this.reader) {
      await this.reader.cancel();
      return;
    }
    if (!this.body.locked) {
      await this.body.cancel();
    }
  }
}

export class ExecutionSessionConnection {
  readonly readable: ReadableStream<SessionWebSocketMessage>;
  private readonly socket: WebSocketClient;

  constructor(socket: WebSocketClient) {
    this.socket = socket;
    this.readable = new ReadableStream<SessionWebSocketMessage>({
      start: (controller) => {
        let closed = false;
        socket.onMessage((data) => {
          if (closed) return;
          const message = parseSessionWebSocketMessage(data);
          if (message) controller.enqueue(message);
        });
        socket.onError((error) => {
          if (closed) return;
          closed = true;
          controller.error(error);
        });
        socket.onClose(() => {
          if (closed) return;
          closed = true;
          controller.close();
        });
      },
      cancel: () => socket.close(),
    });
  }

  send(request: ExecutionSessionWebSocketRequest): void {
    this.socket.send(JSON.stringify(models.ExecutionSessionWebSocketRequestToJSON(request)));
  }

  async *messages(): AsyncGenerator<SessionWebSocketMessage> {
    const reader = this.readable.getReader();
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) return;
        yield value;
      }
    } finally {
      reader.releaseLock();
    }
  }

  /** Detaches this client without stopping the session or closing stdin. */
  close(): void {
    this.socket.close();
  }
}

function parseSSEEvent(block: string): ExecutionSessionEvent | undefined {
  const data = block
    .split("\n")
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice(5).replace(/^ /, ""))
    .join("\n");
  if (!data) return undefined;
  return models.ExecutionSessionEventFromJSON(JSON.parse(data));
}

function parseSessionWebSocketMessage(data: WebSocketRawData): SessionWebSocketMessage | undefined {
  try {
    const raw = JSON.parse(webSocketText(data));
    const type = raw?.type;
    if (type === "event" && raw.event) {
      return { type, event: models.ExecutionSessionEventFromJSON(raw.event) };
    }
    if (type === "ack") {
      return { type, requestId: raw.request_id };
    }
    if (type === "error") {
      return { type, requestId: raw.request_id, error: String(raw.error ?? "") };
    }
    return undefined;
  } catch {
    return undefined;
  }
}

function webSocketText(data: WebSocketRawData): string {
  if (typeof data === "string") return data;
  if (Array.isArray(data)) {
    const length = data.reduce((total, item) => total + item.byteLength, 0);
    const joined = new Uint8Array(length);
    let offset = 0;
    for (const item of data) {
      joined.set(item, offset);
      offset += item.byteLength;
    }
    return new TextDecoder().decode(joined);
  }
  if (data instanceof ArrayBuffer) return new TextDecoder().decode(new Uint8Array(data));
  return new TextDecoder().decode(data);
}
