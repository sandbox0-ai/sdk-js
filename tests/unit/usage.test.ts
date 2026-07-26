import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { Client } from "../../src/index.ts";

describe("Usage", () => {
  it("lists team-scoped usage windows through the generated API", async () => {
    let requestedUrl = "";
    let requestedAuth = "";
    const client = new Client({
      token: "test-token",
      baseUrl: "http://example.test",
      fetch: async (input, init) => {
        requestedUrl = String(input);
        requestedAuth = String(
          (init?.headers as Record<string, string>)["Authorization"] ?? "",
        );
        return new Response(
          JSON.stringify({
            success: true,
            data: {
              windows: [{
                window_id: "window-1",
                window_type: "sandbox.runtime_mib_milliseconds",
                subject_type: "sandbox",
                subject_id: "sandbox-1",
                sandbox_id: "sandbox-1",
                window_start: "2026-07-26T00:00:00Z",
                window_end: "2026-07-26T01:00:00Z",
                value: 3_686_400_000,
                unit: "mib_milliseconds",
                recorded_at: "2026-07-26T01:00:01Z",
              }],
              next_cursor: "page-2",
            },
          }),
          {
            status: 200,
            headers: { "content-type": "application/json" },
          },
        );
      },
    });

    const result = await client.usage.listWindows({
      cursor: "page-1",
      limit: 250,
      windowType: "sandbox.runtime_mib_milliseconds",
    });

    const url = new URL(requestedUrl);
    assert.equal(url.pathname, "/api/v1/usage/windows");
    assert.equal(url.searchParams.get("cursor"), "page-1");
    assert.equal(url.searchParams.get("limit"), "250");
    assert.equal(
      url.searchParams.get("window_type"),
      "sandbox.runtime_mib_milliseconds",
    );
    assert.equal(requestedAuth, "Bearer test-token");
    assert.equal(result.nextCursor, "page-2");
    assert.equal(result.windows[0]?.sandboxId, "sandbox-1");
    assert.equal(result.windows[0]?.value, 3_686_400_000);
    assert.equal(
      result.windows[0]?.windowStart.toISOString(),
      "2026-07-26T00:00:00.000Z",
    );
  });
});
