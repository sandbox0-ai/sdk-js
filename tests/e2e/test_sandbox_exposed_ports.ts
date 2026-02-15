import { describe, it, before, skip } from "node:test";
import assert from "node:assert";
import { loadE2EConfig, newClient, type E2EConfig } from "./helpers.ts";

describe("SandboxExposedPorts", () => {
  let cfg: E2EConfig | null;

  before(() => {
    cfg = loadE2EConfig();
    if (!cfg) {
      skip("S0_E2E_BASE_URL or S0_E2E_PASSWORD not set");
    }
  });

  it("should handle exposed ports lifecycle", async () => {
    if (!cfg) return;
    const client = await newClient(cfg);
    // Enable auto_resume to allow resume=True on exposed ports
    const sandbox = await client.sandboxes.claim(cfg.template, { autoResume: true });
    assert.ok(sandbox.id);

    const cleanup = async () => {
      try {
        await client.sandboxes.delete(sandbox.id);
      } catch {
        // Ignore cleanup errors
      }
    };

    try {
      await sandbox.clearExposedPorts();
      let resp = await sandbox.getExposedPorts();
      assert.strictEqual(resp.ports.length, 0);

      resp = await sandbox.exposePort(3000, false);
      assert.strictEqual(resp.ports.length, 1);
      assert.strictEqual(resp.ports[0].port, 3000);
      assert.strictEqual(resp.ports[0].resume, false);

      resp = await sandbox.exposePort(3000, true);
      assert.strictEqual(resp.ports.length, 1);
      assert.strictEqual(resp.ports[0].resume, true);

      resp = await sandbox.exposePort(8080, false);
      assert.strictEqual(resp.ports.length, 2);

      resp = await sandbox.unexposePort(3000);
      assert.strictEqual(resp.ports.length, 1);
      assert.strictEqual(resp.ports[0].port, 8080);

      resp = await sandbox.updateExposedPorts([
        { port: 4000, resume: true },
        { port: 5000, resume: false },
        { port: 6000, resume: true },
      ]);
      const ports = new Map(resp.ports.map((p) => [p.port, p.resume]));
      assert.strictEqual(ports.get(4000), true);
      assert.strictEqual(ports.get(5000), false);
      assert.strictEqual(ports.get(6000), true);

      await sandbox.clearExposedPorts();
      resp = await sandbox.getExposedPorts();
      assert.strictEqual(resp.ports.length, 0);
    } finally {
      await cleanup();
    }
  });
});
