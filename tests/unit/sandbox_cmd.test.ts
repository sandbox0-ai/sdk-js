import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { Sandbox } from "../../src/index.ts";
import type { Client } from "../../src/client.ts";

describe("Sandbox cmd", () => {
  it("returns split command output and terminal status", async () => {
    let gotRequest: unknown;
    const client = {
      apispec: {
        contexts: {
          apiV1SandboxesIdContextsPost: async (request: unknown) => {
            gotRequest = request;
            return {
              data: {
                id: "ctx_cmd",
                type: "cmd",
                running: false,
                paused: false,
                createdAt: "2026-06-18T00:00:00Z",
                outputRaw: "outerr",
                stdout: "out",
                stderr: "err",
                exitCode: 7,
                state: "crashed",
              },
            };
          },
        },
      },
    } as unknown as Client;

    const sandbox = new Sandbox({ id: "sb_test", client });
    const result = await sandbox.cmd("/bin/sh -c 'exit 7'");

    assert.deepStrictEqual(gotRequest, {
      id: "sb_test",
      createContextRequest: {
        type: "cmd",
        cmd: { command: ["/bin/sh", "-c", "exit 7"] },
        waitUntilDone: true,
        cwd: undefined,
        envVars: undefined,
        ptySize: undefined,
        idleTimeoutSec: undefined,
        ttlSec: undefined,
      },
    });
    assert.deepStrictEqual(result, {
      sandboxId: "sb_test",
      contextId: "ctx_cmd",
      outputRaw: "outerr",
      stdout: "out",
      stderr: "err",
      exitCode: 7,
      state: "crashed",
    });
  });
});
