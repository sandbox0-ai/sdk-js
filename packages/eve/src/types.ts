export const WORKSPACE_ROOT = "/workspace";

export type Sandbox0BackendDispose = "keep" | "delete";

export interface Sandbox0NetworkPolicyMatcherExact {
  exact: string;
}

export interface Sandbox0NetworkPolicyMatcherPrefix {
  startsWith: string;
}

export interface Sandbox0NetworkPolicyMatcherRegex {
  regex: string;
}

export type EveNetworkPolicyMatcher =
  | Sandbox0NetworkPolicyMatcherExact
  | Sandbox0NetworkPolicyMatcherPrefix
  | Sandbox0NetworkPolicyMatcherRegex;

export interface EveNetworkPolicyKeyValueMatcher {
  key?: EveNetworkPolicyMatcher;
  value?: EveNetworkPolicyMatcher;
}

export interface EveNetworkPolicyMatch {
  path?: EveNetworkPolicyMatcher;
  method?: string[];
  queryString?: EveNetworkPolicyKeyValueMatcher[];
  headers?: EveNetworkPolicyKeyValueMatcher[];
}

export interface EveNetworkTransformer {
  headers?: Record<string, string>;
}

export interface EveNetworkPolicyRule {
  match?: EveNetworkPolicyMatch;
  transform?: EveNetworkTransformer[];
  forwardURL?: string;
}

export type EveSandboxNetworkPolicy =
  | "allow-all"
  | "deny-all"
  | {
      allow?: string[] | Record<string, EveNetworkPolicyRule[]>;
      subnets?: {
        allow?: string[];
        deny?: string[];
      };
    };

export interface Sandbox0TrafficRule {
  name?: string;
  action: "allow" | "deny";
  cidrs?: string[];
  domains?: string[];
  ports?: Array<Record<string, unknown>>;
  appProtocols?: string[];
}

export interface Sandbox0NetworkPolicy {
  mode: "allow-all" | "block-all";
  egress?: {
    allowedCidrs?: string[];
    allowedDomains?: string[];
    deniedCidrs?: string[];
    deniedDomains?: string[];
    trafficRules?: Sandbox0TrafficRule[];
    [key: string]: unknown;
  };
  credentialBindings?: unknown[];
}

export interface Sandbox0SandboxConfig {
  envVars?: Record<string, string>;
  ttl?: number;
  hardTtl?: number;
  network?: Sandbox0NetworkPolicy;
  webhook?: unknown;
  autoResume?: boolean;
  services?: unknown[];
  [key: string]: unknown;
}

export interface Sandbox0ClaimMount {
  sandboxvolumeId?: string;
  mountPoint?: string;
  [key: string]: unknown;
}

export interface Sandbox0EveUseOptions {
  networkPolicy?: EveSandboxNetworkPolicy;
}

export interface SandboxBackendRuntimeContext {
  readonly appRoot: string;
}

export interface SandboxSeedFile {
  readonly path: string;
  readonly content: string | Buffer;
}

export type SandboxBackendTags = Readonly<Record<string, string>>;

export interface SandboxBackendCreateInput {
  readonly templateKey: string | null;
  readonly sessionKey: string;
  readonly existingMetadata?: Record<string, unknown>;
  readonly tags?: SandboxBackendTags;
  readonly runtimeContext: SandboxBackendRuntimeContext;
}

export interface SandboxBackendPrewarmInput<BO = Record<string, never>> {
  readonly templateKey: string;
  readonly bootstrap?: (input: SandboxBootstrapContext<BO>) => void | Promise<void>;
  readonly log?: (message: string) => void;
  readonly runtimeContext: SandboxBackendRuntimeContext;
  readonly seedFiles: ReadonlyArray<SandboxSeedFile>;
}

export interface SandboxBootstrapContext<BO = Record<string, never>> {
  use(options?: BO): Promise<Sandbox0EveSession>;
}

export interface SandboxBackendPrewarmResult {
  readonly reused: boolean;
}

export interface SandboxBackendSessionState {
  readonly backendName: string;
  readonly metadata: Record<string, unknown>;
  readonly sessionKey: string;
}

export interface SandboxBackendHandle<SO = Record<string, never>> {
  readonly session: Sandbox0EveSession;
  readonly useSessionFn: (options?: SO) => Promise<Sandbox0EveSession>;
  captureState(): Promise<SandboxBackendSessionState>;
  dispose(): Promise<void>;
}

export interface SandboxBackend<BO = Record<string, never>, SO = Record<string, never>> {
  readonly name: string;
  create(input: SandboxBackendCreateInput): Promise<SandboxBackendHandle<SO>>;
  prewarm(input: SandboxBackendPrewarmInput<BO>): Promise<SandboxBackendPrewarmResult>;
}

export interface SandboxRunOptions {
  command: string;
  workingDirectory?: string;
  cwd?: string;
  env?: Record<string, string>;
  abortSignal?: AbortSignal;
}

export type SandboxSpawnOptions = SandboxRunOptions;

export interface SandboxCommandResult {
  exitCode: number;
  stdout: string;
  stderr: string;
}

export interface SandboxProcess {
  stdout: ReadableStream<Uint8Array>;
  stderr: ReadableStream<Uint8Array>;
  wait(): Promise<{ exitCode: number }>;
  kill(): Promise<void>;
}

export interface SandboxReadFileOptions {
  path: string;
  abortSignal?: AbortSignal;
}

export interface SandboxReadTextFileOptions extends SandboxReadFileOptions {
  encoding?: BufferEncoding | "utf-8" | "utf8";
  startLine?: number;
  endLine?: number;
}

export interface SandboxWriteFileOptions {
  path: string;
  content: ReadableStream<Uint8Array>;
  abortSignal?: AbortSignal;
}

export interface SandboxWriteBinaryFileOptions {
  path: string;
  content: Uint8Array | ArrayBuffer | ArrayBufferView;
  abortSignal?: AbortSignal;
}

export interface SandboxWriteTextFileOptions {
  path: string;
  content: string;
  encoding?: BufferEncoding | "utf-8" | "utf8";
  abortSignal?: AbortSignal;
}

export interface SandboxRemovePathOptions {
  path: string;
  abortSignal?: AbortSignal;
  force?: boolean;
  recursive?: boolean;
}

export interface Sandbox0EveSession {
  readonly id: string;
  resolvePath(path: string): string;
  run(options: SandboxRunOptions): Promise<SandboxCommandResult>;
  spawn(options: SandboxSpawnOptions): Promise<SandboxProcess>;
  readFile(options: SandboxReadFileOptions): Promise<ReadableStream<Uint8Array> | null>;
  readBinaryFile(options: SandboxReadFileOptions): Promise<Uint8Array | null>;
  readTextFile(options: SandboxReadTextFileOptions): Promise<string | null>;
  writeFile(options: SandboxWriteFileOptions): Promise<void>;
  writeBinaryFile(options: SandboxWriteBinaryFileOptions): Promise<void>;
  writeTextFile(options: SandboxWriteTextFileOptions): Promise<void>;
  setNetworkPolicy(policy: EveSandboxNetworkPolicy): Promise<void>;
  removePath(options: SandboxRemovePathOptions): Promise<void>;
}

export class SandboxTemplateNotProvisionedError extends Error {
  readonly backendName: string;
  readonly templateKey: string;

  constructor(input: { readonly backendName: string; readonly templateKey: string }) {
    super(
      `Sandbox template "${input.templateKey}" is not provisioned for backend "${input.backendName}". Run \`eve build\` or invoke \`prewarmAppSandboxes()\` before serving traffic.`,
    );
    this.name = "SandboxTemplateNotProvisionedError";
    this.backendName = input.backendName;
    this.templateKey = input.templateKey;
  }

  static is(error: unknown): error is SandboxTemplateNotProvisionedError {
    return error instanceof SandboxTemplateNotProvisionedError
      || (
        typeof error === "object"
        && error !== null
        && (error as { name?: unknown }).name === "SandboxTemplateNotProvisionedError"
        && typeof (error as { backendName?: unknown }).backendName === "string"
        && typeof (error as { templateKey?: unknown }).templateKey === "string"
      );
  }
}
