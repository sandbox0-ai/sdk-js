import { describe, it, before, skip } from "node:test";
import assert from "node:assert";
import { loadE2EConfig, newClient, type E2EConfig } from "./helpers.ts";
import type { SandboxUpdateRequest } from "../../src/apispec/src/models/index.ts";

describe("Sandboxes", () => {
  let cfg: E2EConfig | null;

  before(() => {
    cfg = loadE2EConfig();
    if (!cfg) {
      skip("S0_E2E_BASE_URL or S0_E2E_PASSWORD not set");
    }
  });

  it("should handle sandbox lifecycle", async () => {
    if (!cfg) return;
    const client = await newClient(cfg);
    const sandbox = await client.sandboxes.claim(cfg.template);
    assert.ok(sandbox.id);

    const cleanup = async () => {
      try {
        await client.sandboxes.delete(sandbox.id);
      } catch {
        // Ignore cleanup errors
      }
    };

    try {
      const fetched = await client.sandboxes.get(sandbox.id);
      assert.strictEqual(fetched.id, sandbox.id);

      const status = await client.sandboxes.status(sandbox.id);
      assert.strictEqual(status.sandboxId, sandbox.id);

      // Test update with SandboxUpdateConfig
      const updateRequest: SandboxUpdateRequest = {
        config: {
          ttl: 300,
          autoResume: false,
        },
      };
      const updated = await client.sandboxes.update(sandbox.id, updateRequest);
      assert.strictEqual(updated.autoResume, false);

      const paused = await client.sandboxes.pause(sandbox.id);
      assert.ok(paused.paused);

      const resumed = await client.sandboxes.resume(sandbox.id);
      assert.ok(resumed.resumed);

      const refreshed = await client.sandboxes.refresh(sandbox.id);
      assert.strictEqual(refreshed.sandboxId, sandbox.id);

      const sandboxHandle = client.sandbox("sandbox-id");
      assert.strictEqual(sandboxHandle.id, "sandbox-id");
    } finally {
      await cleanup();
    }
  });

  it("should open sandbox session", async () => {
    if (!cfg) return;
    const client = await newClient(cfg);

    const session = await client.sandboxes.open(cfg.template);
    assert.ok(session.sandbox.id);
    await session.close();
  });

  it("should claim sandbox with bootstrap mounts", async () => {
    if (!cfg) return;
    const client = await newClient(cfg);

    const volume = await client.volumes.create({});
    assert.ok(volume.id);
    let volumeDeleted = false;

    const volumeCleanup = async () => {
      if (volumeDeleted) return;
      try {
        await client.volumes.delete(volume.id);
      } catch {
        // Ignore cleanup errors
      }
    };

    let sandboxId = "";
    const sandboxCleanup = async () => {
      if (!sandboxId) return;
      try {
        await client.sandboxes.delete(sandboxId);
      } catch {
        // Ignore cleanup errors
      }
    };

    try {
      await client.volumes.writeFile(volume.id, "/claim-bootstrap/hello.txt", "hello bootstrap claim mount");

      const sandbox = await client.sandboxes.claim(cfg.template, {
        mounts: [{ sandboxvolumeId: volume.id, mountPoint: "/workspace/bootstrap-data" }],
      });
      sandboxId = sandbox.id;

      assert.ok(sandbox.bootstrapMounts.length > 0);
      assert.strictEqual(sandbox.bootstrapMounts[0]?.state, "mounted");

      const content = await sandbox.readFile("/workspace/bootstrap-data/claim-bootstrap/hello.txt");
      assert.strictEqual(Buffer.from(content).toString("utf-8"), "hello bootstrap claim mount");
    } finally {
      await sandboxCleanup();
      await volumeCleanup();
    }
  });

  it("should snapshot restore and fork paused sandbox rootfs", async () => {
    if (!cfg) return;
    const client = await newClient(cfg);
    const source = await client.sandboxes.claim(cfg.template);
    assert.ok(source.id);

    let forkId = "";
    let snapshotId = "";
    const cleanup = async () => {
      if (snapshotId) {
        try {
          await client.sandboxes.deleteRootFSSnapshot(snapshotId);
        } catch {
          // Ignore cleanup errors
        }
      }
      if (forkId) {
        try {
          await client.sandboxes.delete(forkId);
        } catch {
          // Ignore cleanup errors
        }
      }
      try {
        await client.sandboxes.delete(source.id);
      } catch {
        // Ignore cleanup errors
      }
    };

    try {
      const markerPath = "/tmp/sdk-js-rootfs-marker.txt";
      await source.writeFile(markerPath, "rootfs-v1\n");
      const paused = await client.sandboxes.pause(source.id);
      assert.ok(paused.paused);

      const snapshot = await client.sandboxes.createRootFSSnapshot(source.id, {
        name: "sdk-js-e2e-rootfs",
      });
      snapshotId = snapshot.id;
      assert.ok(snapshot.id);

      const snapshots = await client.sandboxes.listRootFSSnapshots(source.id);
      assert.ok(snapshots.some((item) => item.id === snapshot.id));

      const fetchedSnapshot = await client.sandboxes.getRootFSSnapshot(snapshot.id);
      assert.strictEqual(fetchedSnapshot.id, snapshot.id);

      await client.sandboxes.resume(source.id);
      await source.writeFile(markerPath, "rootfs-v2\n");
      await client.sandboxes.pause(source.id);

      const restored = await client.sandboxes.restoreRootFS(source.id, {
        snapshotId: snapshot.id,
      });
      assert.strictEqual(restored.snapshotId, snapshot.id);

      const forked = await client.sandboxes.fork(source.id);
      forkId = forked.sandbox.id;
      assert.strictEqual(forked.sourceSandboxId, source.id);
      assert.ok(forkId);

      await client.sandboxes.deleteRootFSSnapshot(snapshot.id);
      snapshotId = "";

      await client.sandboxes.resume(source.id);
      await client.sandboxes.resume(forkId);

      const sourceContent = Buffer.from(await source.readFile(markerPath)).toString("utf-8");
      assert.strictEqual(sourceContent, "rootfs-v1\n");
      const forkContent = Buffer.from(await client.sandbox(forkId).readFile(markerPath)).toString("utf-8");
      assert.strictEqual(forkContent, "rootfs-v1\n");
    } finally {
      await cleanup();
    }
  });
});
