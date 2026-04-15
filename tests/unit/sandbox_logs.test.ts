import assert from "node:assert";
import { describe, it } from "node:test";

import { Client } from "../../src/index.ts";

describe("sandbox logs", () => {
  it("gets a snapshot through the generated API", async () => {
    let requestedUrl = "";
    const client = new Client({
      token: "test-token",
      baseUrl: "http://example.test",
      fetch: async (input) => {
        requestedUrl = String(input);
        return new Response(JSON.stringify({
          success: true,
          data: {
            sandbox_id: "sb_123",
            pod_name: "pod-a",
            container: "procd",
            previous: false,
            logs: "ready\n",
          },
        }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      },
    });

    const logs = await client.sandbox("sb_123").getLogs({
      tailLines: 20,
      timestamps: true,
    });

    assert.strictEqual(logs.logs, "ready\n");
    const url = new URL(requestedUrl);
    assert.strictEqual(url.pathname, "/api/v1/sandboxes/sb_123/logs");
    assert.strictEqual(url.searchParams.get("tail_lines"), "20");
    assert.strictEqual(url.searchParams.get("timestamps"), "true");
  });

  it("streams logs as a raw readable body", async () => {
    let requestedUrl = "";
    let requestedAuth = "";
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("line one\n"));
      },
    });
    const client = new Client({
      token: "test-token",
      baseUrl: "http://example.test/base",
      fetch: async (input, init) => {
        requestedUrl = String(input);
        requestedAuth = String((init?.headers as Record<string, string>)["Authorization"] ?? "");
        return new Response(body, {
          status: 200,
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "x-sandbox-id": "sb_123",
            "x-sandbox-pod-name": "pod-a",
            "x-sandbox-log-container": "procd",
          },
        });
      },
    });

    const stream = await client.sandbox("sb_123").streamLogs({ tailLines: 5 });
    const url = new URL(requestedUrl);
    assert.strictEqual(url.pathname, "/base/api/v1/sandboxes/sb_123/logs");
    assert.strictEqual(url.searchParams.get("follow"), "true");
    assert.strictEqual(url.searchParams.get("tail_lines"), "5");
    assert.strictEqual(requestedAuth, "Bearer test-token");
    assert.strictEqual(stream.sandboxId, "sb_123");
    assert.strictEqual(stream.podName, "pod-a");
    assert.strictEqual(stream.container, "procd");

    const reader = stream.body.getReader();
    const { value } = await reader.read();
    assert.strictEqual(new TextDecoder().decode(value), "line one\n");
    reader.releaseLock();
  });
});
