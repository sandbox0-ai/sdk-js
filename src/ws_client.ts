import WebSocket from "ws";

export type WebSocketRawData = WebSocket.RawData;

type WebSocketClientOptions = {
  headers?: Record<string, string>;
  connectTimeoutMs?: number;
};

export class WebSocketClient {
  private readonly socket: WebSocket;
  private readonly pendingSends: string[] = [];
  private closePending = false;
  private readonly connectTimeoutMs: number;

  constructor(url: string, options: WebSocketClientOptions = {}) {
    this.connectTimeoutMs = options.connectTimeoutMs ?? 10000;
    this.socket = new WebSocket(url, { headers: options.headers });
    this.socket.on("open", () => {
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
    if (this.socket.readyState === WebSocket.OPEN) {
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
        this.socket.off("open", onOpen);
        this.socket.off("error", onError);
        this.socket.off("close", onClose);
      };

      this.socket.once("open", onOpen);
      this.socket.once("error", onError);
      this.socket.once("close", onClose);
    });
  }

  onMessage(handler: (data: WebSocketRawData) => void): () => void {
    this.socket.on("message", handler);
    return () => this.socket.off("message", handler);
  }

  onClose(handler: () => void): () => void {
    this.socket.on("close", handler);
    return () => this.socket.off("close", handler);
  }

  onError(handler: (err: Error) => void): () => void {
    this.socket.on("error", handler);
    return () => this.socket.off("error", handler);
  }

  send(payload: string): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(payload);
      return;
    }
    if (this.socket.readyState === WebSocket.CONNECTING) {
      this.pendingSends.push(payload);
      return;
    }
    throw new Error("websocket is not open");
  }

  close(): void {
    this.pendingSends.length = 0;
    if (this.socket.readyState === WebSocket.CONNECTING) {
      this.closePending = true;
      return;
    }
    if (this.socket.readyState === WebSocket.CLOSED) {
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
        this.socket.off("message", onMessage);
        this.socket.off("error", onError);
        this.socket.off("close", onClose);
      };

      this.socket.once("message", onMessage);
      this.socket.once("error", onError);
      this.socket.once("close", onClose);
    });
  }

  private flushPendingSends(): void {
    while (this.pendingSends.length > 0 && this.socket.readyState === WebSocket.OPEN) {
      const payload = this.pendingSends.shift();
      if (payload) {
        this.socket.send(payload);
      }
    }
  }
}
