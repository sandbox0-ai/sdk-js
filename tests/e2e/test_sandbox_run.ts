import { describe, it, before, skip } from "node:test";
import assert from "node:assert";
import { loadE2EConfig, newClient, type E2EConfig } from "./helpers.ts";

describe("SandboxRun", () => {
  let cfg: E2EConfig | null;

  before(() => {
    cfg = loadE2EConfig();
    if (!cfg) {
      skip("S0_E2E_BASE_URL or S0_E2E_PASSWORD not set");
    }
  });

  it("should run and cmd", async () => {
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
      const runResult = await sandbox.run("python", "print('hello')\n", {
        ttlSec: 120,
        idleTimeoutSec: 60,
        cwd: "/tmp",
        envVars: { SDK_JS_E2E: "true" },
        ptyRows: 24,
        ptyCols: 80,
      });
      assert.ok(runResult.contextId);

      // Reuse context
      await sandbox.run("python", "print('reuse')\n", {
        contextId: runResult.contextId,
      });

      const cmdResult = await sandbox.cmd("echo hello", {
        command: ["sh", "-c", "echo hello"],
        ttlSec: 120,
        idleTimeoutSec: 60,
        cwd: "/tmp",
        envVars: { SDK_JS_E2E_CMD: "true" },
        ptyRows: 24,
        ptyCols: 80,
      });
      assert.ok(cmdResult.contextId);
    } finally {
      await cleanup();
    }
  });
});
