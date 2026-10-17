import assert from "node:assert/strict";
import { createServer } from "node:http";
import { once } from "node:events";
import { WebSocketServer } from "ws";
import { describe, it } from "node:test";

import { APIError, Client, Sandbox } from "../../src/index.ts";

describe("sandbox sessions", () => {
  it("looks up conditional receipts using only GET and preserves errors", async () => {
    let calls = 0, status = 200, generation = 7;
    const client = new Client({token: "fixture", baseUrl: "http://example.test", fetch: async (input, init) => {
      calls++;
      const url = new URL(String(input));
      assert.equal(init?.method, "GET");
      assert.equal(url.pathname, "/api/v1/sandboxes/sandbox/sessions/conditional/lookup");
      assert.equal(url.searchParams.get("runtime_generation"), "7");
      assert.equal(new Headers(init?.headers).get("Idempotency-Key"), "original-key");
      return new Response(JSON.stringify(status === 200 ? {success: true, data: {
        id: "session", runtime_generation: generation, spec: {command: ["/bin/true"]},
        spec_version: 1, phase: "stopped", restart_count: 0, cursor: {earliest: 0, latest: 0},
        created_at: "2026-10-15T00:00:00Z", updated_at: "2026-10-15T00:00:00Z", last_activity_at: "2026-10-15T00:00:00Z",
      }} : {success: false, error: {code: "session_not_found", message: "unavailable"}}),
      {status, headers: {"content-type": "application/json", "cache-control": "no-store"}});
    }});
    const sandbox = client.sandbox("sandbox");
    assert.equal((await sandbox.findConditionalSession("original-key", 7)).id, "session");
    for (const code of [404, 405, 409, 503]) {status = code; await assert.rejects(sandbox.findConditionalSession("original-key", 7));}
    status = 200; generation = 8;
    await assert.rejects(sandbox.findConditionalSession("original-key", 7), /different runtime generation/);
    for (const gen of [0, -1, NaN, Number.MAX_SAFE_INTEGER + 1]) await assert.rejects(sandbox.findConditionalSession("original-key", gen));
    await assert.rejects(sandbox.findConditionalSession("", 7));
    assert.equal(calls, 6, "no create, ordinary lookup, resume or retry");
  });

  it("conditionally creates in an exact generation and never falls back", async () => {
    const seen: unknown[] = [];
    const sandbox = new Sandbox({ id: "sb_123", client: { apispec: { sessions: {
      apiV1SandboxesIdSessionsConditionalPost: async (request: unknown) => {
        seen.push(request);
        if (seen.length === 2) throw new Error("unsupported conditional route");
        if (seen.length === 3) return { data: { id: "ses_123", runtimeGeneration: 8 } };
        return { data: { id: "ses_123", runtimeGeneration: 7 } };
      },
      apiV1SandboxesIdSessionsPost: async () => assert.fail("unconditional fallback"),
    } } } as any });
    const spec = { command: ["/bin/true"] };
    const options = { idempotencyKey: "conditional-key", runtimeGeneration: 7 };
    assert.equal((await sandbox.createSession(spec, options)).id, "ses_123");
    assert.deepEqual(seen[0], { id: "sb_123", idempotencyKey: "conditional-key",
      conditionalExecutionSessionRequest: { sandboxId: "sb_123", runtimeGeneration: 7, spec } });
    await assert.rejects(sandbox.createSession(spec, options));
    await assert.rejects(sandbox.createSession(spec, options), /different runtime generation/);
    for (const generation of [0, -1, NaN, Number.MAX_SAFE_INTEGER + 1]) await assert.rejects(sandbox.createSession(spec, { ...options, runtimeGeneration: generation }));
    await assert.rejects(sandbox.createSession(spec, { runtimeGeneration: 7 }));
    assert.equal(seen.length, 3);
  });
  it("creates sessions with an idempotency key", async () => {
    let createRequest: unknown;
    const sandbox = new Sandbox({
      id: "sb_123",
      client: {
        apispec: {
          sessions: {
            apiV1SandboxesIdSessionsPost: async (request: unknown) => {
              createRequest = request;
              return { data: { id: "ses_123", phase: "running" } };
            },
          },
        },
      } as any,
    });

    const session = await sandbox.createSession(
      { command: ["/bin/echo", "hello"] },
      { idempotencyKey: "create-1" },
    );

    assert.equal(session.id, "ses_123");
    assert.deepEqual(createRequest, {
      id: "sb_123",
      executionSessionSpec: { command: ["/bin/echo", "hello"] },
      idempotencyKey: "create-1",
    });
  });

  it("resumes an SSE attachment without coupling it to session lifecycle", async () => {
    let requestedUrl = "";
    let lastEventId = "";
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(": heartbeat\n\nid: 8\nevent: output\ndata: {\"seq\":8,"));
        controller.enqueue(
          new TextEncoder().encode(
            "\"session_id\":\"ses_123\",\"runtime_generation\":2,\"type\":\"output\",\"occurred_at\":\"2026-07-11T00:00:00Z\"}\n\n",
          ),
        );
        controller.close();
      },
    });
    const client = new Client({
      token: "test-token",
      baseUrl: "http://example.test/base",
      fetch: async (input, init) => {
        requestedUrl = String(input);
        lastEventId = String((init?.headers as Record<string, string>)["Last-Event-ID"] ?? "");
        return new Response(body, {
          status: 200,
          headers: { "content-type": "text/event-stream" },
        });
      },
    });

    const stream = await client.sandbox("sb_123").watchSessionEvents("ses_123", {
      after: 6,
      lastEventId: "7",
    });
    const events = [];
    for await (const event of stream) {
      events.push(event);
    }

    const url = new URL(requestedUrl);
    assert.equal(url.pathname, "/base/api/v1/sandboxes/sb_123/sessions/ses_123/events/stream");
    assert.equal(url.searchParams.get("after"), "6");
    assert.equal(lastEventId, "7");
    assert.equal(events.length, 1);
    assert.equal(events[0]?.seq, 8);
    assert.ok(events[0]?.occurredAt instanceof Date);
  });
});


describe("conditional session attachments", () => {
  it("uses the exact handshake and never retries or falls back", async () => {
    let calls = 0, status = 0;
    const server = createServer();
    const sockets = new WebSocketServer({ noServer: true });
    server.on("upgrade", (request, socket, head) => {
      calls++;
      const url = new URL(request.url!, "http://fixture");
      assert.equal(url.pathname, "/api/v1/sandboxes/sandbox/sessions/session/conditional/ws");
      assert.equal(url.searchParams.get("runtime_generation"), "7");
      assert.equal(url.searchParams.get("attempt_id"), "attempt");
      assert.equal(url.searchParams.get("after"), "5");
      assert.equal(request.headers["idempotency-key"], "original");
      if (status) {socket.end(`HTTP/1.1 ${status} Unavailable\r\nContent-Length: 0\r\nConnection: close\r\n\r\n`);return;}
      sockets.handleUpgrade(request, socket, head, (ws) => {ws.on("message", () => ws.close());});
    });
    server.listen(0, "127.0.0.1"); await once(server, "listening");
    const address = server.address(); assert.ok(address && typeof address !== "string");
    const sandbox = new Client({token:"fixture",baseUrl:`http://127.0.0.1:${address.port}`}).sandbox("sandbox");
    try {
      const conn = await sandbox.connectConditionalSession("session", "original", 7, "attempt", {after:5});
      conn.close();
      for (const code of [401,403,404,405,409,410,503]) {status=code;await assert.rejects(sandbox.connectConditionalSession("session", "original", 7, "attempt", {after:5}),
        error=>error instanceof APIError&&error.statusCode===code&&error.code===(code===410?"event_cursor_expired":undefined)&&error.body===undefined);}
      for (const gen of [0,-1,NaN,Number.MAX_SAFE_INTEGER+1]) await assert.rejects(sandbox.connectConditionalSession("session", "original", gen, "attempt"));
      for (const args of [["","original","attempt"],["session","","attempt"],["session","original",""]]) await assert.rejects(sandbox.connectConditionalSession(args[0],args[1],7,args[2]));
      await assert.rejects(sandbox.connectConditionalSession("session", "original", 7, "attempt", {after:-1}));
      assert.equal(calls,8);
    } finally {
      for (const socket of sockets.clients) socket.terminate();
      await new Promise<void>((resolve) => server.close(() => resolve()));
      sockets.close();
    }
  });
});

describe("restored conditional session attachments", () => {
  it("uses the exact handshake and never retries or falls back", async () => {
    let calls = 0, status = 0;
    const server = createServer();
    const sockets = new WebSocketServer({ noServer: true });
    server.on("upgrade", (request, socket, head) => {
      calls++;
      const url = new URL(request.url!, "http://fixture");
      assert.equal(url.pathname, "/api/v1/sandboxes/sandbox/sessions/session/conditional/ws");
      assert.equal(url.searchParams.get("runtime_generation"), "7");
      assert.equal(url.searchParams.get("creation_runtime_generation"), "1");
      assert.equal(url.searchParams.get("attempt_id"), "attempt");
      assert.equal(url.searchParams.get("after"), "5");
      assert.equal(request.headers["idempotency-key"], "original");
      if (status) {socket.end(`HTTP/1.1 ${status} Unavailable\r\nContent-Length: 0\r\nConnection: close\r\n\r\n`);return;}
      sockets.handleUpgrade(request, socket, head, (ws) => {ws.on("message", () => ws.close());});
    });
    server.listen(0, "127.0.0.1"); await once(server, "listening");
    const address = server.address(); assert.ok(address && typeof address !== "string");
    const sandbox = new Client({token:"fixture",baseUrl:`http://127.0.0.1:${address.port}`}).sandbox("sandbox");
    try {
      const conn = await sandbox.connectRestoredConditionalSession("session", "original", 7, 1, "attempt", {after:5});
      conn.close();
      for (const code of [401,403,404,405,409,410,503]) {status=code;await assert.rejects(sandbox.connectRestoredConditionalSession("session", "original", 7, 1, "attempt", {after:5}),
        error=>error instanceof APIError&&error.statusCode===code&&error.code===(code===410?"event_cursor_expired":undefined)&&error.body===undefined);}
      for (const gen of [0,-1,NaN,Number.MAX_SAFE_INTEGER+1]) await assert.rejects(sandbox.connectRestoredConditionalSession("session", "original", gen, 1, "attempt"));
      for (const args of [["","original","attempt"],["session","","attempt"],["session","original",""]]) await assert.rejects(sandbox.connectRestoredConditionalSession(args[0],args[1],7,1,args[2]));
      await assert.rejects(sandbox.connectRestoredConditionalSession("session", "original", 7, 1, "attempt", {after:-1}));
      assert.equal(calls,8);
    } finally {
      for (const socket of sockets.clients) socket.terminate();
      await new Promise<void>((resolve) => server.close(() => resolve()));
      sockets.close();
    }
  });
});
