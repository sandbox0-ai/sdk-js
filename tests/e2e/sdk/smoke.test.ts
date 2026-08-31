import assert from "node:assert";
import { describe, it } from "node:test";

import { APIError } from "../../../src/index.ts";
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

  it("snapshots, forks, restores, and resumes block-COW rootfs", { timeout: 300_000 }, async (t) => {
    const config = readSandbox0E2EConfig();
    if (!config.ok) {
      t.skip(config.error.reason);
      return;
    }

    const client = createSandbox0E2EClient(config.value);
    const before = await listSandboxInventory(client);
    let snapshotId: string | undefined;

    try {
      const source = await client.sandboxes.claim(config.value.template, {
        config: { hardTtl: config.value.hardTtlSec },
      });
      assert.ok(source.runtimeId, "claim should expose the current runtime ID");

      const markerPath = "/tmp/sdk-js-rootfs-marker.txt";
      await source.writeFile(markerPath, "rootfs-v1\n");
      const snapshot = await client.sandboxes.createRootFSSnapshot(source.id, {
        name: "sdk-js-e2e-rootfs",
      });
      snapshotId = snapshot.id;
      assert.ok(snapshotId);
      assert.ok(
        (await client.sandboxes.listRootFSSnapshots(source.id))
          .some((item) => item.id === snapshotId),
      );
      assert.strictEqual(
        (await client.sandboxes.getRootFSSnapshot(snapshotId)).id,
        snapshotId,
      );

      await source.writeFile(markerPath, "rootfs-v2\n");
      const forked = await client.sandboxes.fork(source.id);
      assert.strictEqual(forked.sourceSandboxId, source.id);
      assert.strictEqual(forked.sandbox.paused, true);

      await client.sandboxes.pauseAndWait(source.id);
      await assert.rejects(
        client.sandboxes.rebaseRootFS(source.id, {
          targetBaseArtifactDigest: "not-a-digest",
        }),
        (error: unknown) => error instanceof APIError && error.statusCode === 400,
      );
      const restored = await client.sandboxes.restoreRootFS(source.id, {
        snapshotId,
      });
      assert.strictEqual(restored.snapshotId, snapshotId);

      await client.sandboxes.deleteRootFSSnapshot(snapshotId);
      snapshotId = undefined;
      await client.sandboxes.resumeAndWait(source.id);
      await client.sandboxes.resumeAndWait(forked.sandbox.id);

      const decoder = new TextDecoder();
      assert.strictEqual(decoder.decode(await source.readFile(markerPath)), "rootfs-v1\n");
      assert.strictEqual(
        decoder.decode(await client.sandboxes.sandbox(forked.sandbox.id).readFile(markerPath)),
        "rootfs-v2\n",
      );
    } finally {
      if (snapshotId) {
        try {
          await client.sandboxes.deleteRootFSSnapshot(snapshotId);
        } catch {
          // Sandbox cleanup below remains the hard stop.
        }
      }
      await cleanupNewSandboxes(client, before);
    }
  });
});
