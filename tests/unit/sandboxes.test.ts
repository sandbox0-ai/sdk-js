import assert from "node:assert";
import { describe, it } from "node:test";

import { SandboxWaitTimeoutError } from "../../src/errors.ts";
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
    const forked = await sandboxes.fork("sb_1", { config: { ttl: 60, hardTtl: 120 } });

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
    assert.deepStrictEqual(calls.fork, {
      id: "sb_1",
      forkSandboxRequest: { config: { ttl: 60, hardTtl: 120 } },
    });
  });

  it("waits for committed lifecycle details", async () => {
    const observations = [
      sandboxDetails({ status: "running", paused: false, runtimeGeneration: 2 }),
      sandboxDetails({ status: "paused", paused: true, runtimeGeneration: 2 }),
    ];
    let calls = 0;
    const sandboxes = new Sandboxes(sandboxClient({
      get: async () => ({ data: observations[Math.min(calls++, observations.length - 1)] }),
    }));

    const sandbox = await sandboxes.waitForLifecycle(
      "sb_1",
      (current) => current.status === "paused" && current.paused,
      { timeoutMs: 100, pollIntervalMs: 1 },
    );

    assert.strictEqual(sandbox.status, "paused");
    assert.strictEqual(calls, 2);
  });

  it("reports the last observation when a lifecycle wait times out", async () => {
    const running = sandboxDetails({
      status: "running",
      paused: false,
      runtimeGeneration: 3,
    });
    const sandboxes = new Sandboxes(sandboxClient({
      get: async () => ({ data: running }),
    }));

    await assert.rejects(
      sandboxes.waitForLifecycle("sb_1", () => false, {
        timeoutMs: 0,
        pollIntervalMs: 1,
      }),
      (error: unknown) => {
        assert.ok(error instanceof SandboxWaitTimeoutError);
        assert.strictEqual(error.sandboxId, "sb_1");
        assert.strictEqual(error.timeoutMs, 0);
        assert.strictEqual(error.lastSandbox?.runtimeGeneration, 3);
        return true;
      },
    );
  });

  it("does not start a lifecycle wait with a pre-aborted signal", async () => {
    const controller = new AbortController();
    let calls = 0;
    const sandboxes = new Sandboxes(sandboxClient({
      get: async () => {
        calls += 1;
        return {
          data: sandboxDetails({
            status: "running",
            paused: false,
            runtimeGeneration: 1,
          }),
        };
      },
    }));
    controller.abort();

    await assert.rejects(
      sandboxes.waitForLifecycle("sb_1", () => false, {
        timeoutMs: 100,
        pollIntervalMs: 1,
        signal: controller.signal,
      }),
      (error: unknown) => error instanceof Error && error.name === "AbortError",
    );
    assert.strictEqual(calls, 0);
  });

  it("stops immediately when aborted while entering the polling sleep", async () => {
    const controller = new AbortController();
    const sandboxes = new Sandboxes(sandboxClient({
      get: async () => ({
        data: sandboxDetails({
          status: "running",
          paused: false,
          runtimeGeneration: 1,
        }),
      }),
    }));
    const startedAt = Date.now();

    await assert.rejects(
      sandboxes.waitForLifecycle("sb_1", () => {
        queueMicrotask(() => controller.abort());
        return false;
      }, {
        timeoutMs: 1_000,
        pollIntervalMs: 500,
        signal: controller.signal,
      }),
      (error: unknown) => error instanceof Error && error.name === "AbortError",
    );
    assert.ok(Date.now() - startedAt < 250);
  });

  it("waits for pause commit and a new runtime generation after resume", async () => {
    const pauseObservations = [
      sandboxDetails({ status: "running", paused: false, runtimeGeneration: 7 }),
      sandboxDetails({ status: "paused", paused: true, runtimeGeneration: 7 }),
    ];
    let pauseGetCalls = 0;
    let pauseCalls = 0;
    const pauseSandboxes = new Sandboxes(sandboxClient({
      get: async () => ({
        data: pauseObservations[Math.min(pauseGetCalls++, pauseObservations.length - 1)],
      }),
      pause: async () => {
        pauseCalls += 1;
        return { data: { sandboxId: "sb_1", paused: false, status: "running" } };
      },
    }));

    const paused = await pauseSandboxes.pauseAndWait("sb_1", {
      timeoutMs: 100,
      pollIntervalMs: 1,
    });
    assert.strictEqual(paused.paused, true);
    assert.strictEqual(pauseCalls, 1);

    const resumeObservations = [
      sandboxDetails({ status: "paused", paused: true, runtimeGeneration: 7 }),
      sandboxDetails({ status: "running", paused: false, runtimeGeneration: 7 }),
      sandboxDetails({ status: "running", paused: false, runtimeGeneration: 8 }),
    ];
    let resumeGetCalls = 0;
    let resumeCalls = 0;
    const resumeSandboxes = new Sandboxes(sandboxClient({
      get: async () => ({
        data: resumeObservations[Math.min(
          resumeGetCalls++,
          resumeObservations.length - 1,
        )],
      }),
      resume: async () => {
        resumeCalls += 1;
        return { data: { sandboxId: "sb_1", resumed: true } };
      },
    }));

    const resumed = await resumeSandboxes.resumeAndWait("sb_1", {
      timeoutMs: 100,
      pollIntervalMs: 1,
    });
    assert.strictEqual(resumed.status, "running");
    assert.strictEqual(resumed.runtimeGeneration, 8);
    assert.strictEqual(resumeCalls, 1);
    assert.strictEqual(resumeGetCalls, 3);
  });
});

function sandboxDetails(overrides: {
  status: "starting" | "running" | "paused" | "terminating" | "failed";
  paused: boolean;
  runtimeGeneration: number;
}) {
  return {
    id: "sb_1",
    templateId: "default",
    teamId: "team_1",
    autoResume: true,
    podName: overrides.paused ? "" : "sandbox-pod",
    expiresAt: new Date("2026-07-10T00:00:00Z"),
    hardExpiresAt: new Date("2026-07-11T00:00:00Z"),
    claimedAt: new Date("2026-07-09T00:00:00Z"),
    createdAt: new Date("2026-07-09T00:00:00Z"),
    updatedAt: new Date("2026-07-10T00:00:00Z"),
    ...overrides,
  };
}

function sandboxClient(handlers: {
  get: () => Promise<unknown>;
  pause?: () => Promise<unknown>;
  resume?: () => Promise<unknown>;
}) {
  return {
    apispec: {
      sandboxes: {
        apiV1SandboxesIdGet: handlers.get,
        apiV1SandboxesIdPausePost: handlers.pause,
        apiV1SandboxesIdResumePost: handlers.resume,
      },
    },
  } as any;
}
