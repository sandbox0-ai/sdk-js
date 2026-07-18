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
