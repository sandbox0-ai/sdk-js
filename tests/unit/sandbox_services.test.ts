import assert from "node:assert";
import { describe, it } from "node:test";

import { Sandbox } from "../../src/index.ts";

describe("sandbox services", () => {
  it("gets and updates sandbox services through generated API", async () => {
    let gotUpdate: unknown;
    const sandbox = new Sandbox({
      id: "sb_123",
      client: {
        apispec: {
          sandboxes: {
            apiV1SandboxesIdServicesGet: async ({ id }: { id: string }) => {
              assert.strictEqual(id, "sb_123");
              return {
                data: {
                  sandboxId: "sb_123",
                  services: [
                    {
                      id: "api",
                      port: 8080,
                      ingress: {
                        public: true,
                        routes: [{ id: "api", resume: true }],
                      },
                      publishable: false,
                      publicUrl: "https://rs-default-api-abcde--p8080.us.sandbox0.app",
                    },
                  ],
                },
              };
            },
            apiV1SandboxesIdServicesPut: async (request: unknown) => {
              gotUpdate = request;
              return {
                data: {
                  sandboxId: "sb_123",
                  services: [],
                },
              };
            },
          },
        },
      } as any,
    });

    const current = await sandbox.getServices();
    assert.strictEqual(current.sandboxId, "sb_123");
    assert.strictEqual(current.services[0]?.id, "api");
    assert.strictEqual(current.services[0]?.port, 8080);
    assert.strictEqual(current.services[0]?.publicUrl, "https://rs-default-api-abcde--p8080.us.sandbox0.app");

    const cleared = await sandbox.clearServices();
    assert.strictEqual(cleared.services.length, 0);
    assert.deepStrictEqual(gotUpdate, {
      id: "sb_123",
      sandboxServicesUpdateRequest: { services: [] },
    });
  });
});
