import { describe, it, before, skip } from "node:test";
import assert from "node:assert";
import { loadE2EConfig, newClient, type E2EConfig } from "./helpers.ts";

describe("SandboxMounts", () => {
  let cfg: E2EConfig | null;

  before(() => {
    cfg = loadE2EConfig();
    if (!cfg) {
      skip("S0_E2E_BASE_URL or S0_E2E_PASSWORD not set");
    }
  });

  it("should handle mount lifecycle", async () => {
    if (!cfg) return;
    const client = await newClient(cfg);
    const sandbox = await client.sandboxes.claim(cfg.template);
    assert.ok(sandbox.id);

    let volumeDeleted = false;
    const volume = await client.volumes.create({});
    assert.ok(volume.id);

    const volumeCleanup = async () => {
      if (volumeDeleted) return;
      try {
        await client.volumes.delete(volume.id);
      } catch {
        // Ignore cleanup errors
      }
    };

    const sandboxCleanup = async () => {
      try {
        await client.sandboxes.delete(sandbox.id);
      } catch {
        // Ignore cleanup errors
      }
    };

    try {
      const mountPoint = `/mnt/sdk-js-e2e-${Date.now()}`;
      const session = await sandbox.mount(volume.id, mountPoint);
      assert.strictEqual(session.mountPoint, mountPoint);

      const mounts = await sandbox.mountStatus();
      assert.ok(mounts.some((m) => m.mountPoint === mountPoint));

      await session.close();
      volumeDeleted = true;
      await client.volumes.delete(volume.id);
    } finally {
      await volumeCleanup();
      await sandboxCleanup();
    }
  });
});
