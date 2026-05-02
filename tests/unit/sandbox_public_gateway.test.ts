import assert from "node:assert";
import { describe, it } from "node:test";

import { Sandbox } from "../../src/index.ts";

describe("sandbox public gateway", () => {
  it("gets and updates public gateway policy through generated API", async () => {
    let gotUpdate: unknown;
    const sandbox = new Sandbox({
      id: "sb_123",
      client: {
        apispec: {
          sandboxes: {
            apiV1SandboxesIdPublicGatewayGet: async ({ id }: { id: string }) => {
              assert.strictEqual(id, "sb_123");
              return {
                data: {
                  sandboxId: "sb_123",
                  publicGateway: {
                    enabled: true,
                    routes: [{ id: "api", port: 8080, resume: true }],
                  },
                  exposureDomain: "example.test",
                },
              };
            },
            apiV1SandboxesIdPublicGatewayPut: async (request: unknown) => {
              gotUpdate = request;
              return {
                data: {
                  sandboxId: "sb_123",
                  publicGateway: { enabled: false },
                  exposureDomain: "example.test",
                },
              };
            },
          },
        },
      } as any,
    });

    const current = await sandbox.getPublicGateway();
    assert.strictEqual(current.publicGateway.enabled, true);
    assert.strictEqual(current.publicGateway.routes?.[0]?.port, 8080);
    assert.strictEqual(current.exposureDomain, "example.test");

    const cleared = await sandbox.clearPublicGateway();
    assert.strictEqual(cleared.publicGateway.enabled, false);
    assert.deepStrictEqual(gotUpdate, {
      id: "sb_123",
      publicGatewayConfig: { enabled: false },
    });
  });
});
