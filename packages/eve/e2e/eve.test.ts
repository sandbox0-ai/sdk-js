import assert from "node:assert";
import { cp, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

import {
  firstEnv,
  parsePositiveInteger,
  readSandbox0E2EConfig,
  type Sandbox0E2EConfig,
} from "../../../tests/e2e/harness/env.ts";
import { runCommand, startCommand } from "../../../tests/e2e/harness/exec.ts";
import { findFreePort, waitForHttp } from "../../../tests/e2e/harness/net.ts";
import { installEnvProxyDispatcher } from "../../../tests/e2e/harness/proxy.ts";
import {
  cleanupNewSandboxes,
  createSandbox0E2EClient,
  listSandboxInventory,
} from "../../../tests/e2e/harness/sandbox0.ts";

installEnvProxyDispatcher();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../..");
const evePackageRoot = path.resolve(repoRoot, "packages/eve");
const fixtureRoot = path.resolve(__dirname, "fixtures/basic");
const CLIENT_RESULT_MARKER = "@@SANDBOX0_EVE_E2E_RESULT@@";

interface EveModelE2EConfig {
  readonly apiKey: string;
  readonly baseUrl: string;
  readonly contextWindowTokens: number;
  readonly modelId: string;
}

interface EveSmokeSummary {
  readonly message?: string;
  readonly output?: {
    readonly bootstrap?: string | null;
    readonly command?: {
      readonly exitCode?: number;
      readonly stderr?: string;
      readonly stdout?: string;
    };
    readonly commandSeed?: string | null;
    readonly live?: string | null;
    readonly onSession?: string | null;
    readonly seed?: string | null;
  };
  readonly sessionId?: string;
  readonly status?: string;
}

describe("Vercel Eve adapter e2e", () => {
  it("runs an Eve app against Sandbox0", { timeout: 10 * 60_000 }, async (t) => {
    const sandbox0Config = readSandbox0E2EConfig();
    const modelConfig = readEveModelE2EConfig();
    if (!sandbox0Config.ok) {
      t.skip(sandbox0Config.error.reason);
      return;
    }
    if (!modelConfig.ok) {
      t.skip(modelConfig.error.reason);
      return;
    }

    const sandbox0Client = createSandbox0E2EClient(sandbox0Config.value);
    const before = await listSandboxInventory(sandbox0Client);
    const tempRoot = await mkdtemp(path.join(tmpdir(), "sandbox0-eve-e2e-"));
    const appRoot = path.join(tempRoot, "app");
    const packageDir = path.join(tempRoot, "packages");
    let server: ReturnType<typeof startCommand> | undefined;

    try {
      await cp(fixtureRoot, appRoot, { recursive: true });
      const packages = await packLocalPackages(packageDir);
      await writeFixturePackageJson({ appRoot, packages });

      await runCommand("npm", ["install", "--legacy-peer-deps", "--foreground-scripts", "--loglevel=warn"], {
        cwd: appRoot,
        timeoutMs: 4 * 60_000,
      });
      const port = await findFreePort();
      const serverEnv = buildEveServerEnv({
        modelConfig: modelConfig.value,
        port,
        sandbox0Config: sandbox0Config.value,
      });
      await runCommand("npm", ["run", "build"], {
        cwd: appRoot,
        env: serverEnv,
        timeoutMs: 3 * 60_000,
      });

      server = startCommand(
        "npm",
        ["exec", "--", "eve", "start", "--host", "0.0.0.0", "--port", String(port)],
        {
          cwd: appRoot,
          env: serverEnv,
        },
      );
      const earlyExit = failIfProcessExits(server, "eve start");
      await Promise.race([
        waitForHttp(`http://127.0.0.1:${port}/`, {
          getProcessOutput: server.output.combined,
          timeoutMs: 3 * 60_000,
        }),
        earlyExit.promise,
      ]);
      earlyExit.cancel();

      const summary = await runEveClientSmoke(appRoot, port, serverEnv);
      assert.notStrictEqual(summary.status, "failed", summary.message);
      assert.ok(summary.sessionId);
      assert.strictEqual(summary.output?.bootstrap, "bootstrap-ok");
      assert.strictEqual(summary.output?.commandSeed, "command-ok");
      assert.strictEqual(summary.output?.seed, "seed-ok\n");
      assert.strictEqual(summary.output?.onSession, "session-ok");
      assert.strictEqual(summary.output?.live, "live-ok");
      assert.strictEqual(summary.output?.command?.exitCode, 0);
      assert.strictEqual(summary.output?.command?.stdout, "stdout-ok");
      assert.strictEqual(summary.output?.command?.stderr, "stderr-ok");
    } finally {
      await server?.stop();
      await cleanupNewSandboxes(sandbox0Client, before);
      if (process.env.S0_EVE_E2E_KEEP_TEMP !== "1") {
        await rm(tempRoot, { force: true, recursive: true });
      }
    }
  });
});

async function writeFixturePackageJson(input: {
  readonly appRoot: string;
  readonly packages: PackedLocalPackages;
}): Promise<void> {
  await writeFile(path.join(input.appRoot, "package.json"), `${JSON.stringify({
    name: "sandbox0-eve-e2e-fixture",
    private: true,
    type: "module",
    scripts: {
      build: "eve build",
    },
    dependencies: {
      "@ai-sdk/openai-compatible": process.env.S0_EVE_E2E_OPENAI_COMPATIBLE_VERSION ?? "^2.0.51",
      "@sandbox0/eve": `file:${input.packages.eve}`,
      ai: process.env.S0_EVE_E2E_AI_VERSION ?? "7.0.0-canary.171",
      eve: process.env.S0_EVE_E2E_EVE_VERSION ?? "0.11.10",
      sandbox0: `file:${input.packages.sdk}`,
      undici: process.env.S0_EVE_E2E_UNDICI_VERSION ?? "^8.5.0",
      zod: process.env.S0_EVE_E2E_ZOD_VERSION ?? "4.4.3",
    },
  }, null, 2)}\n`);
}

interface PackedLocalPackages {
  readonly eve: string;
  readonly sdk: string;
}

async function packLocalPackages(packageDir: string): Promise<PackedLocalPackages> {
  await mkdir(packageDir, { recursive: true });
  const sdk = await runCommand("npm", ["pack", "--pack-destination", packageDir, "--silent"], {
    cwd: repoRoot,
    timeoutMs: 60_000,
  });
  const eve = await runCommand("npm", ["pack", "--pack-destination", packageDir, "--silent"], {
    cwd: evePackageRoot,
    timeoutMs: 60_000,
  });
  return {
    eve: path.join(packageDir, parsePackedTarballName(eve.stdout, "@sandbox0/eve")),
    sdk: path.join(packageDir, parsePackedTarballName(sdk.stdout, "sandbox0")),
  };
}

function parsePackedTarballName(stdout: string, packageName: string): string {
  const fileName = stdout.trim().split(/\s+/u).at(-1);
  if (!fileName?.endsWith(".tgz")) {
    throw new Error(`failed to parse npm pack output for ${packageName}: ${stdout}`);
  }
  return fileName;
}

function buildEveServerEnv(input: {
  readonly modelConfig: EveModelE2EConfig;
  readonly port: number;
  readonly sandbox0Config: Sandbox0E2EConfig;
}): NodeJS.ProcessEnv {
  const noProxy = [
    process.env.NO_PROXY,
    process.env.no_proxy,
    "localhost",
    "127.0.0.1",
    "::1",
  ].filter(Boolean).join(",");

  return {
    ...process.env,
    EVE_E2E_PORT: String(input.port),
    NO_PROXY: noProxy,
    SANDBOX0_BASE_URL: input.sandbox0Config.baseUrl,
    SANDBOX0_EVE_E2E_SANDBOX_HARD_TTL_SEC: String(input.sandbox0Config.hardTtlSec),
    SANDBOX0_TEMPLATE: input.sandbox0Config.template,
    SANDBOX0_TOKEN: input.sandbox0Config.token,
    S0_EVE_E2E_MODEL_API_KEY: input.modelConfig.apiKey,
    S0_EVE_E2E_MODEL_BASE_URL: input.modelConfig.baseUrl,
    S0_EVE_E2E_MODEL_CONTEXT_WINDOW_TOKENS: String(input.modelConfig.contextWindowTokens),
    S0_EVE_E2E_MODEL_ID: input.modelConfig.modelId,
  };
}

async function runEveClientSmoke(
  appRoot: string,
  port: number,
  env: NodeJS.ProcessEnv,
): Promise<EveSmokeSummary> {
  const clientPath = path.join(appRoot, "e2e-client.mjs");
  await writeFile(clientPath, `
import { Client } from "eve/client";

const client = new Client({ host: "http://127.0.0.1:${port}" });
const session = client.session();
const response = await session.send("Call the sandbox_smoke tool exactly once. Do not answer from memory. After the tool returns, summarize the JSON result.");
const result = await response.result();
const actionResult = result.events.find((event) => event.type === "action.result" && event.data?.result?.toolName === "sandbox_smoke");
const summary = {
  status: result.status,
  sessionId: result.sessionId,
  message: result.message,
  output: actionResult?.data?.result?.output,
};
console.log("${CLIENT_RESULT_MARKER}" + JSON.stringify(summary));
process.exit(summary.status === "failed" ? 1 : 0);
`);

  const result = await runCommand("node", [clientPath], {
    cwd: appRoot,
    env,
    timeoutMs: 4 * 60_000,
  });
  const line = result.stdout
    .split(/\r?\n/u)
    .find((item) => item.startsWith(CLIENT_RESULT_MARKER));
  if (!line) {
    throw new Error(`Eve client did not emit result marker. stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);
  }
  return JSON.parse(line.slice(CLIENT_RESULT_MARKER.length)) as EveSmokeSummary;
}

function failIfProcessExits(
  started: ReturnType<typeof startCommand>,
  label: string,
): { readonly promise: Promise<never>; cancel(): void } {
  let active = true;
  return {
    cancel() {
      active = false;
    },
    promise: new Promise((_, reject) => {
      started.child.once("close", (code) => {
        if (active) {
          reject(new Error(`${label} exited early with code ${code}\n${started.output.combined()}`));
        }
      });
    }),
  };
}

function readEveModelE2EConfig(): ReturnType<typeof readModelConfig> {
  return readModelConfig();
}

function readModelConfig(): { readonly ok: true; readonly value: EveModelE2EConfig } | {
  readonly ok: false;
  readonly error: { readonly reason: string };
} {
  const apiKey = firstEnv("S0_EVE_E2E_MODEL_API_KEY", "KIMI_API_KEY", "OPENAI_API_KEY");
  const baseUrl = normalizeModelBaseUrl(firstEnv(
    "S0_EVE_E2E_MODEL_BASE_URL",
    "KIMI_OPENAI_BASE_URL",
    "KIMI_API_HOST",
    "OPENAI_BASE_URL",
  ));
  const modelId = firstEnv("S0_EVE_E2E_MODEL_ID", "KIMI_MODEL", "OPENAI_MODEL");
  const contextWindowTokens = parsePositiveInteger(
    firstEnv("S0_EVE_E2E_MODEL_CONTEXT_WINDOW_TOKENS", "KIMI_CONTEXT_WINDOW_TOKENS"),
    131_072,
  );
  const missing = [
    apiKey ? undefined : "S0_EVE_E2E_MODEL_API_KEY",
    baseUrl ? undefined : "S0_EVE_E2E_MODEL_BASE_URL",
    modelId ? undefined : "S0_EVE_E2E_MODEL_ID",
  ].filter((item): item is string => item !== undefined);

  if (missing.length > 0) {
    return {
      ok: false,
      error: { reason: `missing required Eve model e2e env: ${missing.join(", ")}` },
    };
  }

  return { ok: true, value: { apiKey: apiKey!, baseUrl: baseUrl!, contextWindowTokens, modelId: modelId! } };
}

function normalizeModelBaseUrl(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }
  return value.replace(/\/anthropic\/?$/u, "/v1");
}
