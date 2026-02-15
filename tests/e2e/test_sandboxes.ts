import { describe, it, before, skip } from "node:test";
import assert from "node:assert";
import { loadE2EConfig, newClient, type E2EConfig } from "./helpers.ts";

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
});
