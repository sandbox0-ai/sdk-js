import { describe, it, before, skip } from "node:test";
import assert from "node:assert";
import { loadE2EConfig, newClient, type E2EConfig } from "./helpers.ts";

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
});
