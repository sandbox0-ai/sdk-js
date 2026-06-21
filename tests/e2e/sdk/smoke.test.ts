import assert from "node:assert";
import { describe, it } from "node:test";

import { readSandbox0E2EConfig } from "../harness/env.ts";
import {
  cleanupNewSandboxes,
  createSandbox0E2EClient,
  listSandboxInventory,
} from "../harness/sandbox0.ts";
import { installEnvProxyDispatcher } from "../harness/proxy.ts";

installEnvProxyDispatcher();

describe("SDK e2e smoke", () => {
  it("claims a sandbox and runs a command", { timeout: 180_000 }, async (t) => {
    const config = readSandbox0E2EConfig();
    if (!config.ok) {
      t.skip(config.error.reason);
      return;
    }

    const client = createSandbox0E2EClient(config.value);
    const before = await listSandboxInventory(client);

    try {
      const sandbox = await client.sandboxes.claim(config.value.template, {
        config: { hardTtl: config.value.hardTtlSec },
      });
      assert.ok(sandbox.id);

      const command = await sandbox.cmdStream("printf sdk-e2e-ok", {
        command: ["bash", "-lc", "printf sdk-e2e-ok"],
      });
      const chunks: string[] = [];
      try {
        for await (const output of command.outputs()) {
          if (output.source === "stdout") {
            chunks.push(output.data);
          }
        }
        const result = await command.wait();
        assert.strictEqual(result.exitCode, 0);
      } finally {
        command.close();
      }

      assert.strictEqual(chunks.join(""), "sdk-e2e-ok");
    } finally {
      await cleanupNewSandboxes(client, before);
    }
  });
});
