import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { Client, QuotaDimension } from "../../src/index.ts";

describe("Quotas", () => {
  it("lists and gets the current team's quota status", async () => {
    const requestedPaths: string[] = [];
    const requestedAuth: string[] = [];

    const client = new Client({
      token: "test-token",
      baseUrl: "http://example.test",
      fetch: async (input, init) => {
        const url = new URL(String(input));
        requestedPaths.push(url.pathname);
        requestedAuth.push(
          String((init?.headers as Record<string, string>)["Authorization"] ?? ""),
        );

        const quota = {
          team_id: "team-1",
          dimension: url.pathname.endsWith("/api_requests")
            ? "api_requests"
            : "active_sandboxes",
          kind: url.pathname.endsWith("/api_requests") ? "rate" : "capacity",
          limit_value: 100,
          interval_ms: url.pathname.endsWith("/api_requests") ? 1000 : null,
          burst_value: url.pathname.endsWith("/api_requests") ? 200 : null,
          current: url.pathname.endsWith("/api_requests") ? null : 3,
          remaining: url.pathname.endsWith("/api_requests") ? null : 97,
          unlimited: false,
          unit: url.pathname.endsWith("/api_requests") ? "requests" : "count",
          source: "region_default",
        };

        return new Response(
          JSON.stringify({
            success: true,
            data: url.pathname === "/api/v1/quotas" ? [quota] : quota,
          }),
          {
            status: 200,
            headers: { "content-type": "application/json" },
          },
        );
      },
    });

    const quotas = await client.quotas.list();
    const apiRequests = await client.quotas.get(QuotaDimension.ApiRequests);

    assert.deepEqual(requestedPaths, [
      "/api/v1/quotas",
      "/api/v1/quotas/api_requests",
    ]);
    assert.deepEqual(requestedAuth, ["Bearer test-token", "Bearer test-token"]);
    assert.equal(quotas[0]?.dimension, QuotaDimension.ActiveSandboxes);
    assert.equal(quotas[0]?.current, 3);
    assert.equal(apiRequests.dimension, QuotaDimension.ApiRequests);
    assert.equal(apiRequests.current, null);
    assert.equal(apiRequests.remaining, null);
  });
});
