import { describe, it, before, skip } from "node:test";
import assert from "node:assert";
import { loadE2EConfig, newClient, type E2EConfig } from "./helpers.ts";
import { models } from "../../src/index.ts";

describe("SandboxContexts", () => {
  let cfg: E2EConfig | null;

  before(() => {
    cfg = loadE2EConfig();
    if (!cfg) {
      skip("S0_E2E_BASE_URL or S0_E2E_PASSWORD not set");
    }
  });

  it("should handle context operations", async () => {
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
      const replReq = {
        type: models.ProcessType.Repl,
        repl: { language: "python" },
        ptySize: { rows: 24, cols: 80 },
        envVars: { SDK_JS_E2E_CTX: "true" },
        idleTimeoutSec: 60,
        ttlSec: 120,
      };

      const replCtx = await sandbox.createContext(replReq);
      assert.ok(replCtx.id);

      try {
        const contexts = await sandbox.listContexts();
        assert.ok(contexts.some((ctx) => ctx.id === replCtx.id));

        const fetched = await sandbox.getContext(replCtx.id);
        assert.strictEqual(fetched.id, replCtx.id);

        await sandbox.contextInput(replCtx.id, "print('hi')\n");
        await sandbox.contextExec(replCtx.id, "print('exec')\n");
        await sandbox.contextResize(replCtx.id, 40, 100);
        await sandbox.contextSignal(replCtx.id, "SIGINT");
        await sandbox.contextStats(replCtx.id);
        await sandbox.restartContext(replCtx.id);

        const stream = await sandbox.connectWsContext(replCtx.id);
        stream.close();
      } finally {
        try {
          await sandbox.deleteContext(replCtx.id);
        } catch {
          // Ignore cleanup errors
        }
      }

      const cmdReq = {
        type: models.ProcessType.Cmd,
        cmd: { command: ["/bin/sh", "-lc", "echo sdk-js-e2e"] },
        waitUntilDone: true,
      };

      const cmdCtx = await sandbox.createContext(cmdReq);
      assert.ok(cmdCtx.id);
      try {
        await sandbox.deleteContext(cmdCtx.id);
      } catch {
        // Ignore cleanup errors
      }
    } finally {
      await cleanup();
    }
  });
});
