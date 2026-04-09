import type WebSocketPackage from "ws";

export type WebSocketRawData =
  | string
  | ArrayBuffer
  | Uint8Array
  | Buffer
  | Buffer[];

type WebSocketConstructor = new (url: string, protocolsOrOptions?: unknown) => WebSocketLike;

type NodeProcessLike = {
  versions?: {
    node?: string;
  };
};

type EventTargetSocket = Pick<WebSocket, "readyState" | "send" | "close" | "addEventListener" | "removeEventListener"> & {
  binaryType?: BinaryType;
};

type EventEmitterSocket = Pick<WebSocketPackage, "readyState" | "send" | "close" | "on" | "once" | "off"> & {
  binaryType?: BinaryType;
};

type WebSocketLike = EventTargetSocket | EventEmitterSocket;

const READY_STATE = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
} as const;

type WebSocketClientOptions = {
  headers?: Record<string, string>;
  connectTimeoutMs?: number;
  resolveWebSocketConstructor?: (options: WebSocketClientOptions) => Promise<WebSocketConstructor>;
};

export class WebSocketClient {
  private readonly socket: WebSocketLike;
  private readonly pendingSends: string[] = [];
  private closePending = false;
  private readonly connectTimeoutMs: number;

  static async connect(url: string, options: WebSocketClientOptions = {}): Promise<WebSocketClient> {
    const socket = await createWebSocket(url, options);
    return new WebSocketClient(socket, options);
  }

  private constructor(socket: WebSocketLike, options: WebSocketClientOptions = {}) {
    this.connectTimeoutMs = options.connectTimeoutMs ?? 10000;
    this.socket = socket;
    addOpenListener(this.socket, () => {
      this.flushPendingSends();
      if (this.closePending) {
        this.closePending = false;
        this.pendingSends.length = 0;
        this.socket.close();
      }
    });
  }

  get readyState(): number {
    return this.socket.readyState;
  }

  async waitForOpen(timeoutMs = this.connectTimeoutMs): Promise<void> {
    if (this.socket.readyState === READY_STATE.OPEN) {
      return;
    }

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        cleanup();
        this.socket.close();
        reject(new Error("websocket open timeout"));
      }, timeoutMs);

      const onOpen = () => {
        cleanup();
        resolve();
      };
      const onError = (err: Error) => {
        cleanup();
        reject(err instanceof Error ? err : new Error("websocket error"));
      };
      const onClose = () => {
        cleanup();
        reject(new Error("websocket closed before open"));
      };
      const cleanup = () => {
        clearTimeout(timer);
        cleanupOpen();
        cleanupError();
        cleanupClose();
      };

      const cleanupOpen = addOpenListener(this.socket, onOpen, { once: true });
      const cleanupError = addErrorListener(this.socket, onError, { once: true });
      const cleanupClose = addCloseListener(this.socket, onClose, { once: true });
    });
  }

  onMessage(handler: (data: WebSocketRawData) => void): () => void {
    return addMessageListener(this.socket, handler);
  }

  onClose(handler: () => void): () => void {
    return addCloseListener(this.socket, handler);
  }

  onError(handler: (err: Error) => void): () => void {
    return addErrorListener(this.socket, handler);
  }

  send(payload: string): void {
    if (this.socket.readyState === READY_STATE.OPEN) {
      this.socket.send(payload);
      return;
    }
    if (this.socket.readyState === READY_STATE.CONNECTING) {
      this.pendingSends.push(payload);
      return;
    }
    throw new Error("websocket is not open");
  }

  close(): void {
    this.pendingSends.length = 0;
    if (this.socket.readyState === READY_STATE.CONNECTING) {
      this.closePending = true;
      return;
    }
    if (this.socket.readyState === READY_STATE.CLOSED) {
      return;
    }
    this.socket.close();
  }

  async waitForMessage(timeoutMs = 10000): Promise<WebSocketRawData | null> {
    await this.waitForOpen();
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        cleanup();
        resolve(null);
      }, timeoutMs);

      const onMessage = (data: WebSocketRawData) => {
        cleanup();
        resolve(data);
      };
      const onError = (err: Error) => {
        cleanup();
        reject(err instanceof Error ? err : new Error("websocket error"));
      };
      const onClose = () => {
        cleanup();
        resolve(null);
      };
      const cleanup = () => {
        clearTimeout(timer);
        cleanupMessage();
        cleanupError();
        cleanupClose();
      };

      const cleanupMessage = addMessageListener(this.socket, onMessage, { once: true });
      const cleanupError = addErrorListener(this.socket, onError, { once: true });
      const cleanupClose = addCloseListener(this.socket, onClose, { once: true });
    });
  }

  private flushPendingSends(): void {
    while (this.pendingSends.length > 0 && this.socket.readyState === READY_STATE.OPEN) {
      const payload = this.pendingSends.shift();
      if (payload) {
        this.socket.send(payload);
      }
    }
  }
}

async function createWebSocket(url: string, options: WebSocketClientOptions): Promise<WebSocketLike> {
  const resolveConstructor = options.resolveWebSocketConstructor ?? defaultResolveWebSocketConstructor;
  const WebSocketCtor = await resolveConstructor(options);
  const socket = options.headers
    ? new WebSocketCtor(url, { headers: options.headers })
    : new WebSocketCtor(url);
  if ("binaryType" in socket) {
    socket.binaryType = "arraybuffer";
  }
  return socket;
}

async function defaultResolveWebSocketConstructor(options: WebSocketClientOptions): Promise<WebSocketConstructor> {
  if (typeof globalThis.WebSocket === "function" && (!options.headers || isNodeLikeRuntime())) {
    return globalThis.WebSocket as unknown as WebSocketConstructor;
  }

  const imported = await importWsModule();
  return (imported.default ?? imported.WebSocket) as unknown as WebSocketConstructor;
}

async function importWsModule(): Promise<typeof import("ws")> {
  // Keep the `ws` fallback out of static bundle graphs so SandFunc can rely on
  // runtime-native WebSocket globals without pulling Node socket code.
  const dynamicImport = Function("specifier", "return import(specifier);") as (specifier: string) => Promise<typeof import("ws")>;
  return dynamicImport("ws");
}

function isNodeLikeRuntime(): boolean {
  const maybeProcess = (globalThis as typeof globalThis & { process?: NodeProcessLike }).process;
  return typeof maybeProcess?.versions?.node === "string";
}

function isEventTargetSocket(socket: WebSocketLike): socket is EventTargetSocket {
  return typeof (socket as EventTargetSocket).addEventListener === "function";
}

function addOpenListener(socket: WebSocketLike, handler: () => void, options?: { once?: boolean }): () => void {
  if (isEventTargetSocket(socket)) {
    const wrapped = () => handler();
    socket.addEventListener("open", wrapped, options?.once ? { once: true } : undefined);
    return () => socket.removeEventListener("open", wrapped);
  }

  if (options?.once) {
    socket.once("open", handler);
  } else {
    socket.on("open", handler);
  }
  return () => socket.off("open", handler);
}

function addMessageListener(
  socket: WebSocketLike,
  handler: (data: WebSocketRawData) => void,
  options?: { once?: boolean },
): () => void {
  if (isEventTargetSocket(socket)) {
    const wrapped = (event: Event) => {
      handler(extractMessageData(event));
    };
    socket.addEventListener("message", wrapped, options?.once ? { once: true } : undefined);
    return () => socket.removeEventListener("message", wrapped);
  }

  const wrapped = (data: WebSocketRawData) => {
    handler(data);
  };
  if (options?.once) {
    socket.once("message", wrapped);
  } else {
    socket.on("message", wrapped);
  }
  return () => socket.off("message", wrapped);
}

function addCloseListener(socket: WebSocketLike, handler: () => void, options?: { once?: boolean }): () => void {
  if (isEventTargetSocket(socket)) {
    const wrapped = () => handler();
    socket.addEventListener("close", wrapped, options?.once ? { once: true } : undefined);
    return () => socket.removeEventListener("close", wrapped);
  }

  if (options?.once) {
    socket.once("close", handler);
  } else {
    socket.on("close", handler);
  }
  return () => socket.off("close", handler);
}

function addErrorListener(
  socket: WebSocketLike,
  handler: (error: Error) => void,
  options?: { once?: boolean },
): () => void {
  if (isEventTargetSocket(socket)) {
    const wrapped = (event: Event) => {
      handler(extractError(event));
    };
    socket.addEventListener("error", wrapped, options?.once ? { once: true } : undefined);
    return () => socket.removeEventListener("error", wrapped);
  }

  const wrapped = (error: Error) => {
    handler(error instanceof Error ? error : new Error("websocket error"));
  };
  if (options?.once) {
    socket.once("error", wrapped);
  } else {
    socket.on("error", wrapped);
  }
  return () => socket.off("error", wrapped);
}

function extractMessageData(event: Event): WebSocketRawData {
  const candidate = event as Event & { data?: WebSocketRawData };
  return candidate.data ?? new Uint8Array();
}

function extractError(event: Event): Error {
  const candidate = event as Event & { error?: unknown; message?: string };
  if (candidate.error instanceof Error) {
    return candidate.error;
  }
  if (typeof candidate.message === "string" && candidate.message.trim()) {
    return new Error(candidate.message);
  }
  return new Error("websocket error");
}
