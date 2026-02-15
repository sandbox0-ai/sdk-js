import { describe, it, before, skip } from "node:test";
import assert from "node:assert";
import { loadE2EConfig, newClient, waitForWatchEvent, type E2EConfig } from "./helpers.ts";

describe("SandboxFiles", () => {
  let cfg: E2EConfig | null;

  before(() => {
    cfg = loadE2EConfig();
    if (!cfg) {
      skip("S0_E2E_BASE_URL or S0_E2E_PASSWORD not set");
    }
  });

  it("should handle file operations", async () => {
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
      const baseDir = `/tmp/sdk-js-e2e-${Date.now()}`;
      const filePath = `${baseDir}/hello.txt`;
      const movedPath = `${baseDir}/moved.txt`;

      await sandbox.mkdir(baseDir, true);
      await sandbox.writeFile(filePath, "hello e2e");
      const stat = await sandbox.statFile(filePath);
      assert.ok(stat);

      const content = await sandbox.readFile(filePath);
      const contentStr = Buffer.from(content).toString("utf-8");
      assert.strictEqual(contentStr, "hello e2e");

      const entries = await sandbox.listFiles(baseDir);
      assert.ok(entries.some((entry) => entry.name === "hello.txt"));

      await sandbox.moveFile(filePath, movedPath);

      const watch = await sandbox.watchFiles(baseDir, true);
      try {
        await sandbox.writeFile(`${baseDir}/watch.txt`, "watch");
        const event = await waitForWatchEvent(watch.events(), 10000);
        assert.ok(event);
        assert.ok(event.path);
      } finally {
        watch.close();
      }

      await sandbox.deleteFile(movedPath);
      await sandbox.deleteFile(baseDir);
    } finally {
      await cleanup();
    }
  });
});
