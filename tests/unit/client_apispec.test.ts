import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { Client } from "../../src/index.ts";

describe("Client generated APIs", () => {
  it("exposes team management APIs with client configuration", async () => {
    let requestedUrl = "";
    let requestedAuth = "";
    let requestedBody: unknown;

    const client = new Client({
      token: "test-token",
      baseUrl: "http://example.test/base",
      fetch: async (input, init) => {
        requestedUrl = String(input);
        requestedAuth = String((init?.headers as Record<string, string>)["Authorization"] ?? "");
        requestedBody = JSON.parse(String(init?.body ?? "{}"));
        return new Response(
          JSON.stringify({
            data: {
              id: "team-1",
              name: "Team One",
              slug: "team-one",
              owner_id: "user-next",
              created_at: "2026-06-13T00:00:00Z",
              updated_at: "2026-06-13T00:00:00Z",
            },
          }),
          {
            status: 200,
            headers: { "content-type": "application/json" },
          },
        );
      },
    });

    const response = await client.apispec.teams.teamsIdOwnerPut({
      id: "team-1",
      transferTeamOwnerRequest: { userId: "user-next" },
    });

    const url = new URL(requestedUrl);
    assert.equal(url.pathname, "/base/teams/team-1/owner");
    assert.equal(requestedAuth, "Bearer test-token");
    assert.deepEqual(requestedBody, { user_id: "user-next" });
    assert.equal(response.data?.ownerId, "user-next");
  });

  it("exposes the current team quota API with client configuration", async () => {
    let requestedUrl = "";
    let requestedAuth = "";

    const client = new Client({
      token: "test-token",
      baseUrl: "http://example.test/base",
      fetch: async (input, init) => {
        requestedUrl = String(input);
        requestedAuth = String((init?.headers as Record<string, string>)["Authorization"] ?? "");
        return new Response(
          JSON.stringify({
            success: true,
            data: {
              team_id: "team-1",
              quotas: [
                {
                  team_id: "team-1",
                  key: "sandbox_runtime_count",
                  kind: "capacity",
                  unit: "count",
                  source: "default",
                  policy: {
                    team_id: "team-1",
                    key: "sandbox_runtime_count",
                    kind: "capacity",
                    unit: "count",
                    revision: 3,
                    limit: 100,
                  },
                  committed: 12,
                  reserved: 2,
                  used: 14,
                  remaining: 86,
                },
              ],
            },
          }),
          {
            status: 200,
            headers: { "content-type": "application/json" },
          },
        );
      },
    });

    const response = await client.apispec.quotas.apiV1QuotasGet();

    const url = new URL(requestedUrl);
    assert.equal(url.pathname, "/base/api/v1/quotas");
    assert.equal(requestedAuth, "Bearer test-token");
    assert.equal(response.data?.teamId, "team-1");
    assert.equal(response.data?.quotas[0]?.key, "sandbox_runtime_count");
    assert.equal(response.data?.quotas[0]?.policy.limit, 100);
  });

  it("serializes team quota policy variants by kind", async () => {
    const requestedBodies: unknown[] = [];
    const client = new Client({
      token: "test-token",
      baseUrl: "http://example.test",
      fetch: async (_input, init) => {
        requestedBodies.push(JSON.parse(String(init?.body ?? "{}")));
        return new Response("{}", {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      },
    });

    await client.apispec.quotas.apiV1TeamsTeamIdQuotasKeyPutRaw({
      teamId: "team-1",
      key: "sandbox_runtime_count",
      teamQuotaPolicyWriteRequest: { kind: "capacity", limit: 100 },
    });
    await client.apispec.quotas.apiV1TeamsTeamIdQuotasKeyPutRaw({
      teamId: "team-1",
      key: "active_request_count",
      teamQuotaPolicyWriteRequest: { kind: "concurrency", limit: 25 },
    });
    await client.apispec.quotas.apiV1TeamsTeamIdQuotasKeyPutRaw({
      teamId: "team-1",
      key: "api_requests",
      teamQuotaPolicyWriteRequest: {
        kind: "rate",
        tokens: 20,
        intervalMs: 1000,
        burst: 40,
      },
    });

    assert.deepEqual(requestedBodies, [
      { kind: "capacity", limit: 100 },
      { kind: "concurrency", limit: 25 },
      { kind: "rate", tokens: 20, interval_ms: 1000, burst: 40 },
    ]);
  });

  it("parses metered sandbox volume storage usage", async () => {
    const client = new Client({
      token: "test-token",
      baseUrl: "http://example.test",
      fetch: async () =>
        new Response(
          JSON.stringify({
            data: {
              id: "vol-1",
              team_id: "team-1",
              user_id: "user-1",
              backend: "s0fs",
              metered_storage_bytes: 12345,
              storage_observed_at: "2026-07-18T08:30:00Z",
              created_at: "2026-07-18T08:00:00Z",
              updated_at: "2026-07-18T08:30:00Z",
            },
          }),
          {
            status: 200,
            headers: { "content-type": "application/json" },
          },
        ),
    });

    const volume = await client.volumes.get("vol-1");

    assert.equal(volume.meteredStorageBytes, 12345);
    assert.equal(volume.storageObservedAt?.toISOString(), "2026-07-18T08:30:00.000Z");
  });
});
