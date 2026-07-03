import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { Client } from "../../src/index.ts";

describe("sandbox observability", () => {
  it("lists logs through the observability API", async () => {
    let requestedUrl = "";
    const client = new Client({
      token: "test-token",
      baseUrl: "http://example.test/base",
      fetch: async (input) => {
        requestedUrl = String(input);
        return new Response(
          JSON.stringify({
            data: {
              logs: [
                {
                  team_id: "team_1",
                  sandbox_id: "sb_123",
                  region_id: "local",
                  cluster_id: "cluster-a",
                  context_id: "ctx_1",
                  occurred_at: "2026-07-03T00:00:00Z",
                  ingested_at: "2026-07-03T00:00:01Z",
                  stream: "stdout",
                  message: "ready",
                  cursor: "log-cursor",
                },
              ],
              next_cursor: "next",
              watermark: "2026-07-03T00:00:01Z",
            },
          }),
          {
            status: 200,
            headers: { "content-type": "application/json" },
          },
        );
      },
    });

    const logs = await client.sandbox("sb_123").listLogs({
      limit: 10,
      contextId: "ctx_1",
      stream: "stdout",
    });

    const url = new URL(requestedUrl);
    assert.equal(url.pathname, "/base/api/v1/sandboxes/sb_123/observability/logs");
    assert.equal(url.searchParams.get("limit"), "10");
    assert.equal(url.searchParams.get("context_id"), "ctx_1");
    assert.equal(url.searchParams.get("stream"), "stdout");
    assert.equal(logs.logs[0]?.message, "ready");
    assert.equal(logs.nextCursor, "next");
  });

  it("streams watch lines as NDJSON", async () => {
    let requestedUrl = "";
    let requestedAuth = "";
    let requestedAccept = "";
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(
          new TextEncoder().encode(
            '{"type":"heartbeat","time":"2026-07-03T00:00:00Z"}\n' +
              '{"type":"watermark","cursor":"c1","watermark":"2026-07-03T00:00:01Z"}\n',
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
        const headers = init?.headers as Record<string, string>;
        requestedAuth = String(headers["Authorization"] ?? "");
        requestedAccept = String(headers.Accept ?? "");
        return new Response(body, {
          status: 200,
          headers: { "content-type": "application/x-ndjson" },
        });
      },
    });

    const stream = await client.sandbox("sb_123").watchLogs({
      cursor: "c0",
      limit: 5,
    });
    const lines = [];
    for await (const line of stream) {
      lines.push(line);
    }

    const url = new URL(requestedUrl);
    assert.equal(url.pathname, "/base/api/v1/sandboxes/sb_123/observability/logs");
    assert.equal(url.searchParams.get("watch"), "true");
    assert.equal(url.searchParams.get("cursor"), "c0");
    assert.equal(url.searchParams.get("limit"), "5");
    assert.equal(requestedAuth, "Bearer test-token");
    assert.equal(requestedAccept, "application/x-ndjson");
    assert.equal(lines[0]?.type, "heartbeat");
    assert.ok(lines[0]?.time instanceof Date);
    assert.equal(lines[1]?.cursor, "c1");
  });
});
