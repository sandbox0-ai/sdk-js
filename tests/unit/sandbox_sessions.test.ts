import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { Client, Sandbox } from "../../src/index.ts";

describe("sandbox sessions", () => {
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
