import { describe, it, before, skip } from "node:test";
import assert from "node:assert";
import { loadE2EConfig, newClient, type E2EConfig } from "./helpers.ts";
import { models } from "../../src/index.ts";

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
      // Create a custom REPL context with specific settings
      const customCtx = await sandbox.createContext({
        type: models.ProcessType.Repl,
        repl: { alias: "python" },
        cwd: "/tmp",
        envVars: { SDK_JS_E2E: "true" },
        ttlSec: 120,
        idleTimeoutSec: 60,
        ptySize: { rows: 24, cols: 80 },
      });
      assert.ok(customCtx.id);

      // Run using the custom context
      const runResult = await sandbox.run("python", "print('hello')\n", {
        contextId: customCtx.id,
      });
      assert.ok(runResult.contextId);

      // Reuse context
      await sandbox.run("python", "print('reuse')\n", {
        contextId: runResult.contextId,
      });

      // Cmd always creates a new context, so options work directly
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

      const stream = await sandbox.cmdStream("echo helper", {
        command: ["sh", "-c", "echo helper"],
      });
      try {
        const reader = stream.readable.getReader();
        const first = await reader.read();
        assert.strictEqual(first.done, false);
        assert.ok(first.value);
        assert.ok(first.value.data.length > 0);

        const doneResult = await stream.wait();
        assert.strictEqual(doneResult.exitCode ?? 0, 0);

        const second = await reader.read();
        assert.strictEqual(second.done, true);
        reader.releaseLock();
      } finally {
        stream.close();
      }
    } finally {
      await cleanup();
    }
  });
});
