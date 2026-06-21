import assert from "node:assert";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, it, type TestContext } from "node:test";

import {
  SandboxTemplateNotProvisionedError,
  sandbox0,
} from "../src/index.ts";
import type {
  Sandbox0ContextOutput,
  Sandbox0ContextStream,
  Sandbox0SessionSandbox,
} from "../src/session.ts";

describe("Sandbox0 Eve backend", () => {
  it("prewarms templates and creates live sessions from snapshots", async (t) => {
    const appRoot = await createTempAppRoot(t);
    const calls: unknown[] = [];
    let claimCount = 0;
    const client = {
      sandboxes: {
        claim: async (template: string, options: unknown) => {
          claimCount += 1;
          const sandboxId = claimCount === 1 ? "sb_template" : "sb_live";
          calls.push({ claim: { template, options, sandboxId } });
          return fakeSandbox(sandboxId, calls);
        },
        createRootFSSnapshot: async (sandboxId: string, request: unknown) => {
          calls.push({ createRootFSSnapshot: { sandboxId, request } });
          return { id: "snap_1", sandboxId, createdAt: new Date() };
        },
        pause: async (sandboxId: string) => {
          calls.push({ pause: sandboxId });
        },
        get: async (sandboxId: string) => {
          calls.push({ get: sandboxId });
          return { id: sandboxId, paused: true };
        },
        delete: async (sandboxId: string) => {
          calls.push({ delete: sandboxId });
        },
      },
      sandbox: (sandboxId: string) => fakeSandbox(sandboxId, calls),
    } as any;

    const backend = sandbox0({
      client,
      template: "node",
      networkPolicy: "deny-all",
      dispose: "delete",
    });

    assert.deepStrictEqual(
      await backend.prewarm({
        templateKey: "tpl_1",
        runtimeContext: { appRoot },
        seedFiles: [{ path: "seed.txt", content: "seed" }],
        bootstrap: async ({ use }) => {
          const session = await use({ networkPolicy: { allow: ["github.com"] } });
          const result = await session.run({ command: "echo boot" });
          assert.strictEqual(result.stdout, "boot\n");
        },
      }),
      { reused: false },
    );
    assert.deepStrictEqual(
      await backend.prewarm({
        templateKey: "tpl_1",
        runtimeContext: { appRoot },
        seedFiles: [],
      }),
      { reused: true },
    );

    const handle = await backend.create({
      templateKey: "tpl_1",
      sessionKey: "session_1",
      runtimeContext: { appRoot },
    });
    await handle.useSessionFn({ networkPolicy: "allow-all" });
    assert.deepStrictEqual(await handle.captureState(), {
      backendName: "sandbox0",
      metadata: { sandboxId: "sb_live" },
      sessionKey: "session_1",
    });
    await handle.dispose();

    assert.deepStrictEqual(calls, [
      {
        claim: {
          template: "node",
          options: { config: { hardTtl: 3600, network: { mode: "block-all" } } },
          sandboxId: "sb_template",
        },
      },
      {
        updateNetworkPolicy: {
          sandboxId: "sb_template",
          policy: {
            mode: "block-all",
            egress: {
              trafficRules: [
                {
                  name: "eve-allow-domains",
                  action: "allow",
                  domains: ["github.com"],
                  appProtocols: ["http", "tls"],
                },
              ],
            },
          },
        },
      },
      {
        cmdStream: {
          sandboxId: "sb_template",
          command: "echo boot",
          options: {
            command: ["bash", "-lc", "echo boot"],
            cwd: "/workspace",
            envVars: undefined,
            wait: false,
          },
        },
      },
      { writeFile: { sandboxId: "sb_template", path: "/workspace/seed.txt", data: "seed" } },
      { pause: "sb_template" },
      { get: "sb_template" },
      {
        createRootFSSnapshot: {
          sandboxId: "sb_template",
          request: { name: "eve-tpl_1" },
        },
      },
      {
        claim: {
          template: "node",
          options: { config: { network: { mode: "block-all" } }, snapshotId: "snap_1" },
          sandboxId: "sb_live",
        },
      },
      { updateNetworkPolicy: { sandboxId: "sb_live", policy: { mode: "allow-all" } } },
      { delete: "sb_live" },
    ]);
  });

  it("creates live sessions from a persisted prewarm registry", async (t) => {
    const appRoot = await createTempAppRoot(t);
    const prewarmClient = {
      sandboxes: {
        claim: async () => fakeSandbox("sb_template", []),
        createRootFSSnapshot: async () => ({ id: "snap_persisted", sandboxId: "sb_template", createdAt: new Date() }),
        pause: async () => {},
        get: async () => ({ id: "sb_template", paused: true }),
      },
    } as any;

    await sandbox0({ client: prewarmClient, template: "node" }).prewarm({
      templateKey: "tpl_persisted",
      runtimeContext: { appRoot },
      seedFiles: [],
    });

    const calls: unknown[] = [];
    const runtimeClient = {
      sandboxes: {
        claim: async (template: string, options: unknown) => {
          calls.push({ claim: { template, options } });
          return fakeSandbox("sb_live", calls);
        },
      },
      sandbox: (sandboxId: string) => fakeSandbox(sandboxId, calls),
    } as any;

    const handle = await sandbox0({ client: runtimeClient, template: "node" }).create({
      templateKey: "tpl_persisted",
      sessionKey: "session_persisted",
      runtimeContext: { appRoot: path.join(appRoot, ".output", "server") },
    });

    assert.deepStrictEqual(await handle.captureState(), {
      backendName: "sandbox0",
      metadata: { sandboxId: "sb_live" },
      sessionKey: "session_persisted",
    });
    assert.deepStrictEqual(calls, [
      {
        claim: {
          template: "node",
          options: { snapshotId: "snap_persisted" },
        },
      },
    ]);
  });

  it("reattaches existing sandbox metadata and resumes paused sandboxes", async () => {
    const calls: unknown[] = [];
    const client = {
      sandboxes: {
        get: async (sandboxId: string) => {
          calls.push({ get: sandboxId });
          return { id: sandboxId, paused: true };
        },
        resume: async (sandboxId: string) => {
          calls.push({ resume: sandboxId });
        },
        claim: async () => {
          throw new Error("claim should not be called");
        },
      },
      sandbox: (sandboxId: string) => fakeSandbox(sandboxId, calls),
    } as any;

    const handle = await sandbox0({ client }).create({
      templateKey: null,
      sessionKey: "session_2",
      existingMetadata: { sandboxId: "sb_existing" },
      runtimeContext: { appRoot: "/app" },
    });

    assert.deepStrictEqual(await handle.captureState(), {
      backendName: "sandbox0",
      metadata: { sandboxId: "sb_existing" },
      sessionKey: "session_2",
    });
    assert.deepStrictEqual(calls, [
      { get: "sb_existing" },
      { resume: "sb_existing" },
    ]);
  });

  it("allows disabling the adapter-managed prewarm sandbox hard TTL", async (t) => {
    const appRoot = await createTempAppRoot(t);
    let gotOptions: unknown;
    const client = {
      sandboxes: {
        claim: async (_template: string, options: unknown) => {
          gotOptions = options;
          return fakeSandbox("sb_template", []);
        },
        createRootFSSnapshot: async () => ({ id: "snap_1", sandboxId: "sb_template", createdAt: new Date() }),
        pause: async () => {},
        get: async () => ({ id: "sb_template", paused: true }),
      },
    } as any;

    await sandbox0({
      client,
      config: { ttl: 300 },
      prewarmSandboxHardTtlSec: null,
    }).prewarm({
      templateKey: "tpl_no_hard_ttl",
      runtimeContext: { appRoot },
      seedFiles: [],
    });

    assert.deepStrictEqual(gotOptions, { config: { ttl: 300 } });
  });

  it("throws an Eve-compatible error when a template was not prewarmed", async () => {
    const backend = sandbox0({ client: { sandboxes: {} } as any });

    await assert.rejects(
      () => backend.create({
        templateKey: "missing",
        sessionKey: "session_3",
        runtimeContext: { appRoot: "/app" },
      }),
      (error) => SandboxTemplateNotProvisionedError.is(error),
    );
  });
});

async function createTempAppRoot(t: TestContext): Promise<string> {
  const appRoot = await mkdtemp(path.join(tmpdir(), "sandbox0-eve-test-"));
  t.after(async () => {
    await rm(appRoot, { force: true, recursive: true });
  });
  return appRoot;
}

function fakeSandbox(
  sandboxId: string,
  calls: unknown[],
): Sandbox0SessionSandbox & {
  updateNetworkPolicy(policy: unknown): Promise<unknown>;
} {
  return {
    id: sandboxId,
    cmdStream: async (command, options) => {
      calls.push({ cmdStream: { sandboxId, command, options } });
      return fakeContextStream([{ source: "stdout", data: "boot\n" }], 0);
    },
    readFile: async () => new Uint8Array(),
    writeFile: async (filePath, data) => {
      calls.push({
        writeFile: {
          sandboxId,
          path: filePath,
          data: typeof data === "string" ? data : new TextDecoder().decode(data),
        },
      });
    },
    mkdir: async (filePath, recursive) => {
      calls.push({ mkdir: { sandboxId, path: filePath, recursive } });
    },
    statFile: async () => ({ type: "file" }),
    deleteFile: async () => {},
    updateNetworkPolicy: async (policy) => {
      calls.push({ updateNetworkPolicy: { sandboxId, policy } });
    },
  };
}

function fakeContextStream(
  outputs: Sandbox0ContextOutput[],
  exitCode: number,
): Sandbox0ContextStream {
  return {
    async *outputs() {
      yield* outputs;
    },
    async wait() {
      return { exitCode };
    },
    sendSignal() {},
    close() {},
  };
}
