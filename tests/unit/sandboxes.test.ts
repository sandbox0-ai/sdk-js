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
      memory: "512Mi",
      mounts: [{ sandboxvolumeId: "vol_1", mountPoint: "/workspace/data" }],
      snapshotId: "snap_123",
    });

    assert.deepStrictEqual(gotRequest, {
      template: "default",
      config: { ttl: 300, resources: { memory: "512Mi" } },
      mounts: [{ sandboxvolumeId: "vol_1", mountPoint: "/workspace/data" }],
      snapshotId: "snap_123",
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

  it("updates sandbox memory through a convenience request", async () => {
    let gotRequest: unknown;
    const client = {
      apispec: {
        sandboxes: {
          apiV1SandboxesIdPut: async (request: unknown) => {
            gotRequest = request;
            return {
              data: {
                id: "sb_123",
                templateId: "default",
                status: "running",
                paused: false,
                autoResume: true,
                resources: { memory: "2Gi" },
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            };
          },
        },
      },
    } as any;

    const sandboxes = new Sandboxes(client);
    const sandbox = await sandboxes.updateMemory("sb_123", "2Gi");

    assert.deepStrictEqual(gotRequest, {
      id: "sb_123",
      sandboxUpdateRequest: {
        config: {
          resources: { memory: "2Gi" },
        },
      },
    });
    assert.deepStrictEqual(sandbox.resources, { memory: "2Gi" });
  });

  it("routes sandbox rootfs operations through generated API", async () => {
    const calls: Record<string, unknown> = {};
    const client = {
      apispec: {
        sandboxRootfs: {
          apiV1SandboxesIdSnapshotsPost: async (request: unknown) => {
            calls.createSnapshot = request;
            return { data: { id: "snap_1", sandboxId: "sb_1", createdAt: new Date() } };
          },
          apiV1SandboxesIdSnapshotsGet: async (request: unknown) => {
            calls.listSnapshots = request;
            return {
              data: {
                snapshots: [{ id: "snap_1", sandboxId: "sb_1", createdAt: new Date() }],
                count: 1,
              },
            };
          },
          apiV1SandboxRootfsSnapshotsSnapshotIdGet: async (request: unknown) => {
            calls.getSnapshot = request;
            return { data: { id: "snap_1", sandboxId: "sb_1", createdAt: new Date() } };
          },
          apiV1SandboxRootfsSnapshotsSnapshotIdDelete: async (request: unknown) => {
            calls.deleteSnapshot = request;
            return { success: true, data: { deleted: true } };
          },
          apiV1SandboxesIdRootfsRestorePost: async (request: unknown) => {
            calls.restore = request;
            return { data: { sandboxId: "sb_1", snapshotId: "snap_1", status: "paused" } };
          },
          apiV1SandboxesIdForkPost: async (request: unknown) => {
            calls.fork = request;
            return {
              data: {
                sourceSandboxId: "sb_1",
                sandbox: {
                  id: "sb_fork",
                  template: "default",
                  status: "paused",
                  paused: true,
                  autoResume: false,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              },
            };
          },
        },
      },
    } as any;

    const sandboxes = new Sandboxes(client);
    const snapshot = await sandboxes.createRootFSSnapshot("sb_1", { name: "snap" });
    const snapshots = await sandboxes.listRootFSSnapshots("sb_1");
    const fetched = await sandboxes.getRootFSSnapshot("snap_1");
    const deleted = await sandboxes.deleteRootFSSnapshot("snap_1");
    const restored = await sandboxes.restoreRootFS("sb_1", { snapshotId: "snap_1" });
    const forked = await sandboxes.fork("sb_1");

    assert.strictEqual(snapshot.id, "snap_1");
    assert.strictEqual(snapshots.length, 1);
    assert.strictEqual(fetched.id, "snap_1");
    assert.strictEqual((deleted as any).data.deleted, true);
    assert.strictEqual(restored.snapshotId, "snap_1");
    assert.strictEqual(forked.sandbox.id, "sb_fork");
    assert.deepStrictEqual(calls.createSnapshot, {
      id: "sb_1",
      createSandboxRootFSSnapshotRequest: { name: "snap" },
    });
    assert.deepStrictEqual(calls.listSnapshots, { id: "sb_1" });
    assert.deepStrictEqual(calls.getSnapshot, { snapshotId: "snap_1" });
    assert.deepStrictEqual(calls.deleteSnapshot, { snapshotId: "snap_1" });
    assert.deepStrictEqual(calls.restore, {
      id: "sb_1",
      restoreSandboxRootFSRequest: { snapshotId: "snap_1" },
    });
    assert.deepStrictEqual(calls.fork, { id: "sb_1", body: {} });
  });
});
