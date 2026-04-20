import assert from "node:assert";
import { describe, it } from "node:test";

import { Sandboxes } from "../../src/resources/sandboxes.ts";

describe("Sandboxes resource", () => {
  it("builds claim requests from bootstrap mount options", async () => {
    let gotRequest: unknown;
    const client = {
      apispec: {
        sandboxes: {
          apiV1SandboxesPost: async ({ claimRequest }: { claimRequest: unknown }) => {
            gotRequest = claimRequest;
            return {
              data: {
                sandboxId: "sb_123",
                template: "default",
                clusterId: "cluster-a",
                podName: "pod-a",
                status: "running",
                bootstrapMounts: [
                  {
                    sandboxvolumeId: "vol_1",
                    mountPoint: "/workspace/data",
                    state: "mounted",
                  },
                ],
              },
            };
          },
        },
      },
    } as any;

    const sandboxes = new Sandboxes(client);
    const sandbox = await sandboxes.claim("default", {
      config: { ttl: 300 },
      mounts: [{ sandboxvolumeId: "vol_1", mountPoint: "/workspace/data" }],
    });

    assert.deepStrictEqual(gotRequest, {
      template: "default",
      config: { ttl: 300 },
      mounts: [{ sandboxvolumeId: "vol_1", mountPoint: "/workspace/data" }],
    });
    assert.strictEqual(sandbox.id, "sb_123");
    assert.strictEqual(sandbox.clusterId, "cluster-a");
    assert.strictEqual(sandbox.bootstrapMounts[0]?.sandboxvolumeId, "vol_1");
    assert.strictEqual(sandbox.bootstrapMounts[0]?.state, "mounted");
  });

  it("treats a plain sandbox config as config instead of claim options", async () => {
    let gotRequest: unknown;
    const client = {
      apispec: {
        sandboxes: {
          apiV1SandboxesPost: async ({ claimRequest }: { claimRequest: unknown }) => {
            gotRequest = claimRequest;
            return {
              data: {
                sandboxId: "sb_456",
                template: "default",
                podName: "pod-b",
                status: "starting",
              },
            };
          },
        },
      },
    } as any;

    const sandboxes = new Sandboxes(client);
    const sandbox = await sandboxes.claim("default", { ttl: 120 });

    assert.deepStrictEqual(gotRequest, {
      template: "default",
      config: { ttl: 120 },
    });
    assert.deepStrictEqual(sandbox.bootstrapMounts, []);
  });
});
