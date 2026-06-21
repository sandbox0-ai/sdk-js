import { mkdir, readFile, rename, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

import { Client, type ClientOptions } from "sandbox0";

import { toSandbox0NetworkPolicy } from "./network_policy";
import { createSandbox0EveSession, isNotFoundError, type Sandbox0SessionSandbox } from "./session";
import {
  type EveSandboxNetworkPolicy,
  type Sandbox0BackendDispose,
  type Sandbox0ClaimMount,
  type Sandbox0EveSession,
  type Sandbox0EveUseOptions,
  type Sandbox0SandboxConfig,
  type SandboxBackend,
  type SandboxBackendCreateInput,
  type SandboxBackendHandle,
  type SandboxBackendPrewarmInput,
  SandboxTemplateNotProvisionedError,
} from "./types";

export const DEFAULT_PREWARM_SANDBOX_HARD_TTL_SEC = 60 * 60;
const PREWARM_PAUSE_TIMEOUT_MS = 60_000;
const PREWARM_PAUSE_POLL_INTERVAL_MS = 500;

export {
  UnsupportedNetworkPolicyError,
  toSandbox0NetworkPolicy,
} from "./network_policy";
export {
  SandboxTemplateNotProvisionedError,
  type EveSandboxNetworkPolicy,
  type Sandbox0EveSession,
  type Sandbox0EveUseOptions,
  type SandboxBackend,
  type SandboxBackendCreateInput,
  type SandboxBackendHandle,
  type SandboxBackendPrewarmInput,
  type SandboxBackendPrewarmResult,
  type SandboxBackendSessionState,
  type SandboxBootstrapContext,
  type SandboxCommandResult,
  type SandboxProcess,
  type SandboxReadFileOptions,
  type SandboxReadTextFileOptions,
  type SandboxRemovePathOptions,
  type SandboxRunOptions,
  type SandboxSeedFile,
  type SandboxSpawnOptions,
  type SandboxWriteBinaryFileOptions,
  type SandboxWriteFileOptions,
  type SandboxWriteTextFileOptions,
} from "./types";

export interface Sandbox0EveBackendOptions {
  /**
   * Existing Sandbox0 SDK client. If omitted, the adapter creates one from
   * token/apiKey or SANDBOX0_TOKEN/SANDBOX0_API_KEY.
   */
  client?: Client;
  token?: ClientOptions["token"];
  apiKey?: ClientOptions["token"];
  baseUrl?: string;
  clientOptions?: Omit<ClientOptions, "token" | "baseUrl">;
  /**
   * Sandbox0 template to claim. Eve templateKey is mapped to rootfs snapshots,
   * not to Sandbox0 template names.
   */
  template?: string;
  config?: Sandbox0SandboxConfig;
  mounts?: ReadonlyArray<Sandbox0ClaimMount>;
  networkPolicy?: EveSandboxNetworkPolicy;
  /**
   * Sandbox0 currently has no provider resource tags in the public claim API.
   * Eve runtime tags are accepted by the adapter but not forwarded.
   */
  dispose?: Sandbox0BackendDispose;
  deletePrewarmSandbox?: boolean;
  /**
   * Hard TTL in seconds for the paused prewarm sandbox kept after snapshot capture.
   * Defaults to 1 hour. Set to null to omit the adapter-managed hard TTL.
   */
  prewarmSandboxHardTtlSec?: number | null;
  backendName?: string;
}

interface PrewarmedTemplate {
  readonly templateKey: string;
  readonly sandboxId: string;
  readonly snapshotId: string;
}

interface StoredPrewarmedTemplate extends PrewarmedTemplate {
  readonly version: 1;
  readonly backendName: string;
  readonly sandbox0Template: string;
  readonly updatedAt: string;
}

export function sandbox0(
  options: Sandbox0EveBackendOptions = {},
): SandboxBackend<Sandbox0EveUseOptions, Sandbox0EveUseOptions> {
  const backendName = options.backendName ?? "sandbox0";
  const template = options.template ?? "default";
  const prewarmedTemplates = new Map<string, PrewarmedTemplate>();
  let cachedClient = options.client;

  async function getClient(): Promise<Client> {
    if (cachedClient) {
      return cachedClient;
    }
    const token = options.token ?? options.apiKey ?? process.env.SANDBOX0_TOKEN ?? process.env.SANDBOX0_API_KEY;
    if (!token) {
      throw new Error(
        "Sandbox0 Eve adapter requires a token, apiKey, SANDBOX0_TOKEN, or SANDBOX0_API_KEY",
      );
    }
    cachedClient = new Client({
      ...(options.clientOptions ?? {}),
      token,
      baseUrl: options.baseUrl ?? process.env.SANDBOX0_BASE_URL,
      userAgent: options.clientOptions?.userAgent ?? "@sandbox0/eve/0.1.0",
    });
    return cachedClient;
  }

  async function create(input: SandboxBackendCreateInput): Promise<SandboxBackendHandle<Sandbox0EveUseOptions>> {
    const client = await getClient();
    const existingSandboxId = getExistingSandboxId(input.existingMetadata);
    let sandbox: Sandbox0SessionSandbox | undefined;

    if (existingSandboxId) {
      sandbox = await tryOpenExistingSandbox(client, existingSandboxId);
    }

    if (!sandbox) {
      const snapshotId = await snapshotIdForCreate({
        appRoot: input.runtimeContext.appRoot,
        backendName,
        sandbox0Template: template,
        templates: prewarmedTemplates,
        templateKey: input.templateKey,
      });
      try {
        sandbox = await client.sandboxes.claim(template, buildClaimOptions(options, snapshotId) as any) as Sandbox0SessionSandbox;
      } catch (error) {
        if (snapshotId && isNotFoundError(error) && input.templateKey !== null) {
          prewarmedTemplates.delete(input.templateKey);
          await deleteStoredPrewarmedTemplate({
            appRoot: input.runtimeContext.appRoot,
            backendName,
            templateKey: input.templateKey,
          });
          throw new SandboxTemplateNotProvisionedError({
            backendName,
            templateKey: input.templateKey,
          });
        }
        throw error;
      }
    }

    return createHandle({
      backendName,
      client,
      dispose: options.dispose ?? "keep",
      sandbox,
      sessionKey: input.sessionKey,
    });
  }

  async function prewarm(
    input: SandboxBackendPrewarmInput<Sandbox0EveUseOptions>,
  ) {
    const existing = await loadPrewarmedTemplate({
      appRoot: input.runtimeContext.appRoot,
      backendName,
      sandbox0Template: template,
      templates: prewarmedTemplates,
      templateKey: input.templateKey,
    });
    if (existing) {
      return { reused: true };
    }

    const client = await getClient();
    let sandbox: Sandbox0SessionSandbox | undefined;
    try {
      input.log?.("claiming Sandbox0 template sandbox");
      sandbox = await client.sandboxes.claim(
        template,
        buildClaimOptions(options, undefined, buildPrewarmConfigOverrides(options)) as any,
      ) as Sandbox0SessionSandbox;
      const session = createSession(sandbox, input.templateKey);

      if (input.bootstrap) {
        input.log?.("running sandbox bootstrap");
        await input.bootstrap({
          use: async (useOptions?: Sandbox0EveUseOptions) => {
            if (useOptions?.networkPolicy !== undefined) {
              await session.setNetworkPolicy(useOptions.networkPolicy);
            }
            return session;
          },
        });
      }

      for (const file of input.seedFiles) {
        if (typeof file.content === "string") {
          await session.writeTextFile({ path: file.path, content: file.content });
        } else {
          await session.writeBinaryFile({ path: file.path, content: file.content });
        }
      }

      input.log?.("pausing Sandbox0 template sandbox");
      await pauseSandboxForRootFSSnapshot(client, sandbox.id);

      input.log?.("capturing Sandbox0 rootfs snapshot");
      const snapshot = await client.sandboxes.createRootFSSnapshot(sandbox.id, {
        name: `eve-${input.templateKey}`,
      });
      const prewarmedTemplate = {
        templateKey: input.templateKey,
        sandboxId: sandbox.id,
        snapshotId: snapshot.id,
      };
      prewarmedTemplates.set(input.templateKey, prewarmedTemplate);
      await storePrewarmedTemplate({
        appRoot: input.runtimeContext.appRoot,
        backendName,
        sandbox0Template: template,
        template: prewarmedTemplate,
      });
      if (options.deletePrewarmSandbox) {
        await releasePrewarmSandbox(client, sandbox.id, true, input.log);
      }
      return { reused: false };
    } catch (error) {
      if (sandbox) {
        await cleanupFailedPrewarmSandbox(client, sandbox.id, options.deletePrewarmSandbox, input.log);
      }
      throw new Error(
        `Failed to prewarm Sandbox0 sandbox template "${input.templateKey}": ${errorMessage(error)}`,
        { cause: error },
      );
    }
  }

  return {
    name: backendName,
    create,
    prewarm,
  };
}

export const createSandbox0EveBackend = sandbox0;
export default sandbox0;

function createHandle(input: {
  readonly backendName: string;
  readonly client: Client;
  readonly dispose: Sandbox0BackendDispose;
  readonly sandbox: Sandbox0SessionSandbox;
  readonly sessionKey: string;
}): SandboxBackendHandle<Sandbox0EveUseOptions> {
  const session = createSession(input.sandbox, input.sessionKey);
  return {
    session,
    useSessionFn: async (options?: Sandbox0EveUseOptions): Promise<Sandbox0EveSession> => {
      if (options?.networkPolicy !== undefined) {
        await session.setNetworkPolicy(options.networkPolicy);
      }
      return session;
    },
    async captureState() {
      return {
        backendName: input.backendName,
        metadata: { sandboxId: input.sandbox.id },
        sessionKey: input.sessionKey,
      };
    },
    async dispose() {
      if (input.dispose === "delete") {
        await input.client.sandboxes.delete(input.sandbox.id);
      }
    },
  };
}

function createSession(sandbox: Sandbox0SessionSandbox, sessionId: string): Sandbox0EveSession {
  const networkSandbox = sandbox as Sandbox0SessionSandbox & {
    updateNetworkPolicy?: (policy: ReturnType<typeof toSandbox0NetworkPolicy>) => Promise<unknown>;
  };
  return createSandbox0EveSession({
    id: sessionId,
    sandbox,
    setNetworkPolicy: async (policy: EveSandboxNetworkPolicy) => {
      if (!networkSandbox.updateNetworkPolicy) {
        throw new Error("Sandbox0 SDK Sandbox.updateNetworkPolicy is not available");
      }
      await networkSandbox.updateNetworkPolicy(toSandbox0NetworkPolicy(policy));
    },
  });
}

function buildClaimOptions(
  options: Sandbox0EveBackendOptions,
  snapshotId?: string,
  configOverrides?: Partial<Sandbox0SandboxConfig>,
): {
  config?: Sandbox0SandboxConfig;
  mounts?: ReadonlyArray<Sandbox0ClaimMount>;
  snapshotId?: string;
} {
  const config = { ...(options.config ?? {}), ...(configOverrides ?? {}) };
  if (options.networkPolicy !== undefined) {
    config.network = toSandbox0NetworkPolicy(options.networkPolicy);
  }

  const claimOptions: {
    config?: Sandbox0SandboxConfig;
    mounts?: ReadonlyArray<Sandbox0ClaimMount>;
    snapshotId?: string;
  } = {};
  if (Object.keys(config).length > 0) {
    claimOptions.config = config;
  }
  if (options.mounts && options.mounts.length > 0) {
    claimOptions.mounts = options.mounts;
  }
  if (snapshotId) {
    claimOptions.snapshotId = snapshotId;
  }
  return claimOptions;
}

function buildPrewarmConfigOverrides(
  options: Sandbox0EveBackendOptions,
): Partial<Sandbox0SandboxConfig> | undefined {
  const hardTtl = options.prewarmSandboxHardTtlSec === undefined
    ? DEFAULT_PREWARM_SANDBOX_HARD_TTL_SEC
    : options.prewarmSandboxHardTtlSec;
  if (hardTtl === null) {
    return undefined;
  }
  if (!Number.isInteger(hardTtl) || hardTtl <= 0) {
    throw new Error("prewarmSandboxHardTtlSec must be a positive integer or null");
  }
  return { hardTtl };
}

async function snapshotIdForCreate(input: {
  readonly appRoot: string;
  readonly backendName: string;
  readonly sandbox0Template: string;
  readonly templates: Map<string, PrewarmedTemplate>;
  readonly templateKey: string | null;
}): Promise<string | undefined> {
  if (input.templateKey === null) {
    return undefined;
  }
  const template = await loadPrewarmedTemplate({
    appRoot: input.appRoot,
    backendName: input.backendName,
    sandbox0Template: input.sandbox0Template,
    templates: input.templates,
    templateKey: input.templateKey,
  });
  if (!template) {
    throw new SandboxTemplateNotProvisionedError({
      backendName: input.backendName,
      templateKey: input.templateKey,
    });
  }
  return template.snapshotId;
}

async function loadPrewarmedTemplate(input: {
  readonly appRoot: string;
  readonly backendName: string;
  readonly sandbox0Template: string;
  readonly templates: Map<string, PrewarmedTemplate>;
  readonly templateKey: string;
}): Promise<PrewarmedTemplate | undefined> {
  const cached = input.templates.get(input.templateKey);
  if (cached) {
    return cached;
  }

  let stored: StoredPrewarmedTemplate | undefined;
  for (const filePath of storedPrewarmedTemplateCandidatePaths(
    input.appRoot,
    input.backendName,
    input.templateKey,
  )) {
    stored = await readStoredPrewarmedTemplate(filePath);
    if (!stored) {
      continue;
    }
    if (
      stored.backendName === input.backendName
      && stored.sandbox0Template === input.sandbox0Template
      && stored.templateKey === input.templateKey
    ) {
      break;
    }
    stored = undefined;
  }

  if (!stored) {
    return undefined;
  }

  const template = {
    templateKey: stored.templateKey,
    sandboxId: stored.sandboxId,
    snapshotId: stored.snapshotId,
  };
  input.templates.set(input.templateKey, template);
  return template;
}

async function storePrewarmedTemplate(input: {
  readonly appRoot: string;
  readonly backendName: string;
  readonly sandbox0Template: string;
  readonly template: PrewarmedTemplate;
}): Promise<void> {
  const filePath = storedPrewarmedTemplatePath(input.appRoot, input.backendName, input.template.templateKey);
  await mkdir(path.dirname(filePath), { recursive: true });
  const payload: StoredPrewarmedTemplate = {
    version: 1,
    backendName: input.backendName,
    sandbox0Template: input.sandbox0Template,
    templateKey: input.template.templateKey,
    sandboxId: input.template.sandboxId,
    snapshotId: input.template.snapshotId,
    updatedAt: new Date().toISOString(),
  };
  const tempPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(tempPath, `${JSON.stringify(payload, null, 2)}\n`);
  await rename(tempPath, filePath);
}

async function deleteStoredPrewarmedTemplate(input: {
  readonly appRoot: string;
  readonly backendName: string;
  readonly templateKey: string;
}): Promise<void> {
  try {
    await Promise.all(storedPrewarmedTemplateCandidatePaths(
      input.appRoot,
      input.backendName,
      input.templateKey,
    ).map(async (filePath) => {
      try {
        await unlink(filePath);
      } catch (error) {
        if (!isNodeError(error) || error.code !== "ENOENT") {
          throw error;
        }
      }
    }));
  } catch (error) {
    throw error;
  }
}

function storedPrewarmedTemplatePath(
  appRoot: string,
  backendName: string,
  templateKey: string,
): string {
  return path.join(
    appRoot,
    ".eve",
    "sandbox0",
    "templates",
    safePathSegment(backendName),
    `${Buffer.from(templateKey).toString("base64url")}.json`,
  );
}

function storedPrewarmedTemplateCandidatePaths(
  appRoot: string,
  backendName: string,
  templateKey: string,
): string[] {
  return registryAppRootCandidates(appRoot).map((candidate) => {
    return storedPrewarmedTemplatePath(candidate, backendName, templateKey);
  });
}

function registryAppRootCandidates(appRoot: string): string[] {
  const roots = new Set<string>();
  const normalizedAppRoot = normalizePath(appRoot);
  roots.add(normalizedAppRoot);

  for (const marker of ["/.output/server", "/.output", "/.eve/compile", "/.eve/nitro"]) {
    const index = normalizedAppRoot.indexOf(marker);
    if (index > 0) {
      roots.add(normalizedAppRoot.slice(0, index));
    }
  }

  roots.add(normalizePath(process.cwd()));
  return [...roots];
}

function normalizePath(value: string): string {
  return path.resolve(value).replaceAll("\\", "/");
}

function safePathSegment(value: string): string {
  const safe = value.replace(/[^a-zA-Z0-9._-]/g, "_");
  return safe.length > 0 ? safe : "sandbox0";
}

function parseStoredPrewarmedTemplate(value: unknown): StoredPrewarmedTemplate | undefined {
  if (typeof value !== "object" || value === null) {
    return undefined;
  }
  const record = value as Record<string, unknown>;
  if (
    record.version !== 1
    || typeof record.backendName !== "string"
    || typeof record.sandbox0Template !== "string"
    || typeof record.templateKey !== "string"
    || typeof record.sandboxId !== "string"
    || typeof record.snapshotId !== "string"
    || typeof record.updatedAt !== "string"
  ) {
    return undefined;
  }
  return record as unknown as StoredPrewarmedTemplate;
}

async function readStoredPrewarmedTemplate(
  filePath: string,
): Promise<StoredPrewarmedTemplate | undefined> {
  let raw: string;
  try {
    raw = await readFile(filePath, "utf8");
  } catch (error) {
    if (isNodeError(error) && error.code === "ENOENT") {
      return undefined;
    }
    throw new Error(`failed to read Sandbox0 Eve prewarm registry at ${filePath}: ${errorMessage(error)}`);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new Error(`failed to parse Sandbox0 Eve prewarm registry at ${filePath}: ${errorMessage(error)}`);
  }

  const stored = parseStoredPrewarmedTemplate(parsed);
  if (!stored) {
    throw new Error(`invalid Sandbox0 Eve prewarm registry at ${filePath}`);
  }
  return stored;
}

async function tryOpenExistingSandbox(
  client: Client,
  sandboxId: string,
): Promise<Sandbox0SessionSandbox | undefined> {
  try {
    const current = await client.sandboxes.get(sandboxId);
    if (current.paused) {
      await client.sandboxes.resume(sandboxId);
    }
    return client.sandbox(sandboxId) as Sandbox0SessionSandbox;
  } catch (error) {
    if (isNotFoundError(error)) {
      return undefined;
    }
    throw error;
  }
}

function getExistingSandboxId(metadata: Record<string, unknown> | undefined): string | undefined {
  const sandboxId = metadata?.sandboxId;
  return typeof sandboxId === "string" && sandboxId.length > 0 ? sandboxId : undefined;
}

async function pauseSandboxForRootFSSnapshot(
  client: Client,
  sandboxId: string,
): Promise<void> {
  await client.sandboxes.pause(sandboxId);
  const deadline = Date.now() + PREWARM_PAUSE_TIMEOUT_MS;
  while (Date.now() < deadline) {
    const sandbox = await client.sandboxes.get(sandboxId);
    if (sandbox.paused || sandbox.status === "paused") {
      return;
    }
    await sleep(PREWARM_PAUSE_POLL_INTERVAL_MS);
  }
  throw new Error(`sandbox ${sandboxId} did not become paused before rootfs snapshot`);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function releasePrewarmSandbox(
  client: Client,
  sandboxId: string,
  shouldDelete: boolean | undefined,
  log: ((message: string) => void) | undefined,
): Promise<void> {
  try {
    if (shouldDelete) {
      await client.sandboxes.delete(sandboxId);
    } else {
      await client.sandboxes.pause(sandboxId);
    }
  } catch (error) {
    log?.(`failed to release Sandbox0 prewarm sandbox: ${errorMessage(error)}`);
  }
}

async function cleanupFailedPrewarmSandbox(
  client: Client,
  sandboxId: string,
  shouldDelete: boolean | undefined,
  log: ((message: string) => void) | undefined,
): Promise<void> {
  try {
    if (shouldDelete) {
      await client.sandboxes.delete(sandboxId);
    } else {
      await client.sandboxes.pause(sandboxId);
    }
  } catch (error) {
    log?.(`failed to clean up Sandbox0 prewarm sandbox: ${errorMessage(error)}`);
  }
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && "code" in error;
}
