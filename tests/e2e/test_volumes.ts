import { describe, it, before, skip } from "node:test";
import assert from "node:assert";
import { loadE2EConfig, newClient, waitForWatchEvent, type E2EConfig } from "./helpers.ts";

describe("Volumes", () => {
  let cfg: E2EConfig | null;

  before(() => {
    cfg = loadE2EConfig();
    if (!cfg) {
      skip("S0_E2E_BASE_URL or S0_E2E_PASSWORD not set");
    }
  });

  it("should handle volume and snapshot lifecycle", async () => {
    if (!cfg) return;
    const client = await newClient(cfg);

    const volume = await client.volumes.create({});
    assert.ok(volume.id);
    let deleted = false;

    const cleanup = async () => {
      if (deleted) return;
      try {
        await client.volumes.delete(volume.id);
      } catch {
        // Ignore cleanup errors
      }
    };

    try {
      const volumes = await client.volumes.list();
      assert.ok(volumes.some((v) => v.id === volume.id));

      const fetched = await client.volumes.get(volume.id);
      assert.strictEqual(fetched.id, volume.id);

      const snapshotName = `sdk-js-e2e-snap-${Date.now()}`;
      const snapshot = await client.volumes.createSnapshot(volume.id, {
        name: snapshotName,
        description: "sdk js e2e snapshot",
      });
      assert.ok(snapshot.id);

      try {
        const snapshots = await client.volumes.listSnapshots(volume.id);
        assert.ok(snapshots.some((s) => s.id === snapshot.id));

        const fetchedSnapshot = await client.volumes.getSnapshot(volume.id, snapshot.id);
        assert.strictEqual(fetchedSnapshot.id, snapshot.id);

        const restoreResp = await client.volumes.restoreSnapshot(volume.id, snapshot.id);
        assert.ok(restoreResp.success);

        await client.volumes.deleteSnapshot(volume.id, snapshot.id);
      } catch {
        // Try to clean up snapshot
        try {
          await client.volumes.deleteSnapshot(volume.id, snapshot.id);
        } catch {
          // Ignore
        }
        throw new Error("Snapshot operations failed");
      }

      await client.volumes.delete(volume.id);
      deleted = true;
    } finally {
      await cleanup();
    }
  });

  it("should open volume session", async () => {
    if (!cfg) return;
    const client = await newClient(cfg);

    const session = await client.volumes.open({});
    assert.ok(session.volume.id);
    await session.close();
  });

  it("should handle direct volume file operations", async () => {
    if (!cfg) return;
    const client = await newClient(cfg);

    const volume = await client.volumes.create({});
    assert.ok(volume.id);
    let deleted = false;

    const cleanup = async () => {
      if (deleted) return;
      try {
        await client.volumes.delete(volume.id);
      } catch {
        // Ignore cleanup errors
      }
    };

    try {
      const baseDir = `/sdk-js-volume-${Date.now()}`;
      const filePath = `${baseDir}/hello.txt`;
      const movedPath = `${baseDir}/moved.txt`;

      await client.volumes.mkdir(volume.id, baseDir, true);
      await client.volumes.writeFile(volume.id, filePath, "hello volume");
      const stat = await client.volumes.statFile(volume.id, filePath);
      assert.ok(stat);

      const content = await client.volumes.readFile(volume.id, filePath);
      assert.strictEqual(Buffer.from(content).toString("utf-8"), "hello volume");

      const entries = await client.volumes.listFiles(volume.id, baseDir);
      assert.ok(entries.some((entry) => entry.name === "hello.txt"));

      await client.volumes.moveFile(volume.id, filePath, movedPath);

      const watch = await client.volumes.watchFiles(volume.id, baseDir, true);
      try {
        await client.volumes.writeFile(volume.id, `${baseDir}/watch.txt`, "watch");
        const event = await waitForWatchEvent(watch.events(), 10000);
        assert.ok(event);
        assert.ok(event.path);
      } finally {
        watch.close();
      }

      await client.volumes.deleteFile(volume.id, movedPath);
      await client.volumes.deleteFile(volume.id, baseDir);

      await client.volumes.delete(volume.id);
      deleted = true;
    } finally {
      await cleanup();
    }
  });

  it("should isolate writes between source and forked volumes", async () => {
    if (!cfg) return;
    const client = await newClient(cfg);
    const sandbox = await client.sandboxes.claim(cfg.template);
    assert.ok(sandbox.id);

    const source = await client.volumes.create({});
    assert.ok(source.id);
    let sourceDeleted = false;
    let forkDeleted = false;
    let sourceSessionId = "";
    let forkSessionId = "";
    let forkVolumeId = "";

    const cleanup = async () => {
      if (forkSessionId) {
        try {
          await sandbox.unmount(forkVolumeId, forkSessionId);
        } catch {
          // Ignore cleanup errors
        }
      }
      if (sourceSessionId) {
        try {
          await sandbox.unmount(source.id, sourceSessionId);
        } catch {
          // Ignore cleanup errors
        }
      }
      if (forkVolumeId && !forkDeleted) {
        try {
          await client.volumes.delete(forkVolumeId);
        } catch {
          // Ignore cleanup errors
        }
      }
      if (!sourceDeleted) {
        try {
          await client.volumes.delete(source.id);
        } catch {
          // Ignore cleanup errors
        }
      }
      try {
        await client.sandboxes.delete(sandbox.id);
      } catch {
        // Ignore cleanup errors
      }
    };

    try {
      const initSession = await sandbox.mount(source.id, `/mnt/src-init-${Date.now()}`);
      await sandbox.writeFile(`${initSession.mountPoint}/hello.txt`, "source-original\n");
      await sandbox.unmount(source.id, initSession.mountSessionId);

      const forked = await client.volumes.fork(source.id, {});
      forkVolumeId = forked.id;
      assert.ok(forked.id);
      assert.strictEqual(forked.sourceVolumeId, source.id);

      const sourceSession = await sandbox.mount(source.id, `/mnt/src-${Date.now()}`);
      sourceSessionId = sourceSession.mountSessionId;
      const forkSession = await sandbox.mount(forked.id, `/mnt/fork-${Date.now()}`);
      forkSessionId = forkSession.mountSessionId;

      await sandbox.writeFile(`${forkSession.mountPoint}/hello.txt`, "fork-updated\n");

      const sourceContent = await sandbox.readFile(`${sourceSession.mountPoint}/hello.txt`);
      assert.strictEqual(Buffer.from(sourceContent).toString("utf-8"), "source-original\n");

      await sandbox.unmount(forked.id, forkSession.mountSessionId);
      forkSessionId = "";
      await sandbox.unmount(source.id, sourceSession.mountSessionId);
      sourceSessionId = "";

      await client.volumes.delete(forked.id);
      forkDeleted = true;
      await client.volumes.delete(source.id);
      sourceDeleted = true;
    } finally {
      await cleanup();
    }
  });
});
