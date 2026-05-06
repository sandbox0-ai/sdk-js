import type * as runtimeTypes from "./apispec/src/runtime";
import type * as apisTypes from "./apispec/src/apis/index";
import { apis, runtime } from "./apispec_compat";
import { normalizeNullMapMiddleware } from "./response_normalize";
import { CredentialSources } from "./resources/credential_sources";
import { Observability } from "./resources/observability";
import { Sandboxes } from "./resources/sandboxes";
import { Templates } from "./resources/templates";
import { Volumes } from "./resources/volumes";
import { Sandbox } from "./sandbox";
import { APIError, apiErrorFromResponse, wrapApiCall } from "./errors";
import { ensureData } from "./response";
import type { SandboxLogs, SandboxLogsOptions, SandboxLogsStream } from "./models";

export const DEFAULT_BASE_URL = "https://api.sandbox0.ai";

export type TokenProvider =
  | string
  | (() => string | Promise<string>);

export interface ClientOptions {
  token: TokenProvider;
  baseUrl?: string;
  userAgent?: string;
  headers?: Record<string, string>;
  fetch?: runtimeTypes.FetchAPI;
  middleware?: runtimeTypes.Middleware[];
}

function resolveToken(provider: TokenProvider): () => Promise<string> {
  if (typeof provider === "function") {
    return async () => {
      const value = provider();
      return value instanceof Promise ? await value : value;
    };
  }
  return async () => provider;
}

export class Client {
  private readonly configuration: runtimeTypes.Configuration;
  private readonly accessToken: () => Promise<string>;
  private readonly baseUrl: string;

  readonly apispec: {
    sandboxes: apisTypes.SandboxesApi;
    contexts: apisTypes.ContextsApi;
    files: apisTypes.FilesApi;
    sandboxVolumes: apisTypes.SandboxVolumesApi;
    snapshots: apisTypes.SnapshotsApi;
    templates: apisTypes.TemplatesApi;
    credentialSources: apisTypes.CredentialSourcesApi;
    observability: apisTypes.ObservabilityApi;
  };

  readonly sandboxes: Sandboxes;
  readonly templates: Templates;
  readonly volumes: Volumes;
  readonly credentialSources: CredentialSources;
  readonly observability: Observability;

  constructor(options: ClientOptions) {
    const headers: Record<string, string> = {
      ...(options.headers ?? {}),
    };
    if (options.userAgent) {
      headers["User-Agent"] = options.userAgent;
    }
    this.baseUrl = options.baseUrl ?? DEFAULT_BASE_URL;
    this.accessToken = resolveToken(options.token);

    this.configuration = new runtime.Configuration({
      basePath: this.baseUrl,
      accessToken: this.accessToken,
      headers,
      fetchApi: options.fetch,
      middleware: [normalizeNullMapMiddleware(), ...(options.middleware ?? [])],
    });

    this.apispec = {
      sandboxes: new apis.SandboxesApi(this.configuration),
      contexts: new apis.ContextsApi(this.configuration),
      files: new apis.FilesApi(this.configuration),
      sandboxVolumes: new apis.SandboxVolumesApi(this.configuration),
      snapshots: new apis.SnapshotsApi(this.configuration),
      templates: new apis.TemplatesApi(this.configuration),
      credentialSources: new apis.CredentialSourcesApi(this.configuration),
      observability: new apis.ObservabilityApi(this.configuration),
    };

    this.sandboxes = new Sandboxes(this);
    this.templates = new Templates(this);
    this.volumes = new Volumes(this);
    this.credentialSources = new CredentialSources(this);
    this.observability = new Observability(this);
  }

  sandbox(id: string): Sandbox {
    return new Sandbox({ id, client: this });
  }

  async getSandboxLogs(
    sandboxId: string,
    options?: SandboxLogsOptions,
  ): Promise<SandboxLogs> {
    const response = await wrapApiCall(() =>
      this.apispec.sandboxes.apiV1SandboxesIdLogsGetRaw({
        id: sandboxId,
        ...toSandboxLogsRequest(options),
      }),
    );
    const logs = await response.value();
    return {
      sandboxId: response.raw.headers.get("x-sandbox-id") ?? sandboxId,
      podName: response.raw.headers.get("x-sandbox-pod-name") ?? "",
      container: response.raw.headers.get("x-sandbox-log-container") ?? "",
      previous: response.raw.headers.get("x-sandbox-log-previous") === "true",
      logs,
    };
  }

  async streamSandboxLogs(
    sandboxId: string,
    options?: SandboxLogsOptions,
  ): Promise<SandboxLogsStream> {
    const response = await this.fetchRaw(
      `/api/v1/sandboxes/${encodeURIComponent(sandboxId)}/logs`,
      { ...toSandboxLogsQuery(options), follow: "true" },
    );
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().startsWith("text/plain")) {
      throw new APIError({
        statusCode: response.status,
        code: "unexpected_response",
        message: `unexpected log stream content type: ${contentType}`,
      });
    }
    if (!response.body) {
      throw new APIError({
        statusCode: response.status,
        code: "unexpected_response",
        message: "log stream response did not include a body",
      });
    }
    return {
      body: response.body,
      response,
      sandboxId: response.headers.get("x-sandbox-id") ?? undefined,
      podName: response.headers.get("x-sandbox-pod-name") ?? undefined,
      container: response.headers.get("x-sandbox-log-container") ?? undefined,
    };
  }

  websocketUrl(path: string): string {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const base = new URL(this.baseUrl);
    if (base.protocol === "https:") {
      base.protocol = "wss:";
    } else if (base.protocol === "http:") {
      base.protocol = "ws:";
    }
    base.pathname = base.pathname.replace(/\/$/, "") + normalizedPath;
    base.search = "";
    base.hash = "";
    return base.toString();
  }

  async wsHeaders(): Promise<Record<string, string>> {
    const headers = { ...(this.configuration.headers ?? {}) };
    if (!headers["Authorization"]) {
      const token = (await this.accessToken()).trim();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return headers;
  }

  private async fetchRaw(
    path: string,
    query: Record<string, string | undefined>,
  ): Promise<Response> {
    const url = new URL(this.baseUrl);
    url.pathname = url.pathname.replace(/\/$/, "") + path;
    url.search = "";
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) {
        url.searchParams.set(key, value);
      }
    }

    const headers: Record<string, string> = {
      ...(this.configuration.headers ?? {}),
    };
    if (!hasHeader(headers, "authorization")) {
      const token = (await this.accessToken()).trim();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    const fetchApi = this.configuration.fetchApi ?? globalThis.fetch?.bind(globalThis);
    if (!fetchApi) {
      throw new Error("fetch API is not available");
    }
    const response = await fetchApi(url.toString(), { method: "GET", headers });
    if (!response.ok) {
      throw await apiErrorFromResponse(response);
    }
    return response;
  }
}

function toSandboxLogsRequest(options?: SandboxLogsOptions) {
  return {
    container: options?.container,
    tailLines: options?.tailLines,
    limitBytes: options?.limitBytes,
    previous: options?.previous,
    timestamps: options?.timestamps,
    sinceSeconds: options?.sinceSeconds,
  };
}

function toSandboxLogsQuery(options?: SandboxLogsOptions): Record<string, string | undefined> {
  return {
    container: options?.container,
    tail_lines: numberQuery(options?.tailLines),
    limit_bytes: numberQuery(options?.limitBytes),
    previous: boolQuery(options?.previous),
    timestamps: boolQuery(options?.timestamps),
    since_seconds: numberQuery(options?.sinceSeconds),
  };
}

function numberQuery(value: number | undefined): string | undefined {
  return value === undefined ? undefined : String(value);
}

function boolQuery(value: boolean | undefined): string | undefined {
  return value ? "true" : undefined;
}

function hasHeader(headers: Record<string, string>, name: string): boolean {
  const normalized = name.toLowerCase();
  return Object.keys(headers).some((key) => key.toLowerCase() === normalized);
}
