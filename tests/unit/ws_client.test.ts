import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { afterEach, describe, it } from "node:test";

import { WebSocketClient } from "../../src/ws_client.ts";

const originalWebSocket = globalThis.WebSocket;

afterEach(() => {
  Object.defineProperty(globalThis, "WebSocket", {
    configurable: true,
    writable: true,
    value: originalWebSocket,
  });
  FakeNativeWebSocket.instances.length = 0;
  FakeNodeWebSocket.instances.length = 0;
});

describe("WebSocketClient", () => {
  it("prefers a native global WebSocket when available", async () => {
    Object.defineProperty(globalThis, "WebSocket", {
      configurable: true,
      writable: true,
      value: FakeNativeWebSocket as unknown as typeof WebSocket,
    });

    const client = await WebSocketClient.connect("wss://sandbox0.example/ws", {
      headers: { Authorization: "Bearer native" },
      connectTimeoutMs: 25,
    });

    const socket = FakeNativeWebSocket.instances.at(-1);
    assert.ok(socket);
    assert.deepStrictEqual(socket.options, {
      headers: { Authorization: "Bearer native" },
    });
    assert.equal(socket.binaryType, "arraybuffer");

    client.send("queued");
    assert.deepStrictEqual(socket.sent, []);

    const openPromise = client.waitForOpen();
    socket.open();
    await openPromise;
    assert.deepStrictEqual(socket.sent, ["queued"]);

    const messagePromise = client.waitForMessage(100);
    await Promise.resolve();
    socket.pushMessage("hello");
    assert.equal(await messagePromise, "hello");
  });

  it("supports ws-style sockets through the fallback resolver", async () => {
    Object.defineProperty(globalThis, "WebSocket", {
      configurable: true,
      writable: true,
      value: undefined,
    });

    const client = await WebSocketClient.connect("wss://sandbox0.example/ws", {
      headers: { Authorization: "Bearer fallback" },
      connectTimeoutMs: 25,
      resolveWebSocketConstructor: async () => FakeNodeWebSocket as any,
    });

    const socket = FakeNodeWebSocket.instances.at(-1);
    assert.ok(socket);
    assert.deepStrictEqual(socket.options, {
      headers: { Authorization: "Bearer fallback" },
    });
    assert.equal(socket.binaryType, "arraybuffer");

    client.send("queued");
    socket.open();
    await client.waitForOpen();
    assert.deepStrictEqual(socket.sent, ["queued"]);

    const messagePromise = client.waitForMessage(100);
    await Promise.resolve();
    const payload = Buffer.from("hello", "utf8");
    socket.pushMessage(payload);
    assert.equal(await messagePromise, payload);
  });
});

class FakeNativeWebSocket extends EventTarget {
  static instances: FakeNativeWebSocket[] = [];

  readonly sent: string[] = [];
  readyState = 0;
  binaryType: BinaryType = "blob";

  constructor(
    readonly url: string,
    readonly options?: unknown,
  ) {
    super();
    FakeNativeWebSocket.instances.push(this);
  }

  send(payload: string): void {
    this.sent.push(payload);
  }

  close(): void {
    if (this.readyState === 3) {
      return;
    }
    this.readyState = 3;
    this.dispatchEvent(new Event("close"));
  }

  open(): void {
    this.readyState = 1;
    this.dispatchEvent(new Event("open"));
  }

  pushMessage(data: unknown): void {
    const event = new Event("message") as Event & { data?: unknown };
    event.data = data;
    this.dispatchEvent(event);
  }
}

class FakeNodeWebSocket extends EventEmitter {
  static instances: FakeNodeWebSocket[] = [];

  readonly sent: string[] = [];
  readyState = 0;
  binaryType: BinaryType = "blob";

  constructor(
    readonly url: string,
    readonly options?: unknown,
  ) {
    super();
    FakeNodeWebSocket.instances.push(this);
  }

  send(payload: string): void {
    this.sent.push(payload);
  }

  close(): void {
    if (this.readyState === 3) {
      return;
    }
    this.readyState = 3;
    this.emit("close");
  }

  open(): void {
    this.readyState = 1;
    this.emit("open");
  }

  pushMessage(data: unknown): void {
    this.emit("message", data);
  }
}
