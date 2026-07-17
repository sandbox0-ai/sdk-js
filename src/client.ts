import type * as runtimeTypes from "./apispec/src/runtime";
import type * as apisTypes from "./apispec/src/apis/index";
import type { SandboxObservabilityWatchLine } from "./apispec/src/models/index";
import { apis, models, runtime } from "./apispec_compat";
import { normalizeNullMapMiddleware } from "./response_normalize";
import { CredentialSources } from "./resources/credential_sources";
import { Sandboxes } from "./resources/sandboxes";
import { Templates } from "./resources/templates";
import { Volumes } from "./resources/volumes";
import { Sandbox } from "./sandbox";
import { APIError, apiErrorFromResponse, wrapApiCall } from "./errors";
import { ensureData } from "./response";
import type {
  SandboxObservabilityEventOptions,
  SandboxObservabilityEventWatchOptions,
  SandboxObservabilityExecutionScopeFilter,
  SandboxObservabilityEvents,
  SandboxObservabilityLogOptions,
  SandboxObservabilityLogWatchOptions,
  SandboxObservabilityLogs,
  SandboxObservabilityWatchStream,
  SandboxMetrics,
  SandboxMetricsCatalog,
  SandboxMetricsOptions,
  SessionEventStreamOptions,
} from "./models";

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
    sandboxRootfs: apisTypes.SandboxRootfsApi;
    sandboxVolumes: apisTypes.SandboxVolumesApi;
    snapshots: apisTypes.SnapshotsApi;
    templates: apisTypes.TemplatesApi;
    credentialSources: apisTypes.CredentialSourcesApi;
    teams: apisTypes.TeamsApi;
    observability: apisTypes.ObservabilityApi;
    sessions: apisTypes.SessionsApi;
  };

  readonly sandboxes: Sandboxes;
  readonly templates: Templates;
  readonly volumes: Volumes;
  readonly credentialSources: CredentialSources;

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
      sandboxRootfs: new apis.SandboxRootfsApi(this.configuration),
      sandboxVolumes: new apis.SandboxVolumesApi(this.configuration),
      snapshots: new apis.SnapshotsApi(this.configuration),
      templates: new apis.TemplatesApi(this.configuration),
      credentialSources: new apis.CredentialSourcesApi(this.configuration),
      teams: new apis.TeamsApi(this.configuration),
      observability: new apis.ObservabilityApi(this.configuration),
      sessions: new apis.SessionsApi(this.configuration),
    };

    this.sandboxes = new Sandboxes(this);
    this.templates = new Templates(this);
    this.volumes = new Volumes(this);
    this.credentialSources = new CredentialSources(this);
  }

  sandbox(id: string): Sandbox {
    return new Sandbox({ id, client: this });
  }

  async listSandboxObservabilityEvents(
    sandboxId: string,
    options?: SandboxObservabilityEventOptions,
  ): Promise<SandboxObservabilityEvents> {
    const normalizedOptions = normalizeSandboxObservabilityEventOptions(options);
    const response = await wrapApiCall(() =>
      this.apispec.observability.apiV1SandboxesIdObservabilityEventsGet({
        id: sandboxId,
        ...normalizedOptions,
      }),
    );
    const data = ensureData(
      response,
      "list sandbox observability events returned empty response",
    );
    if (!data.effectiveQuery) {
      throw new APIError({
        statusCode: 200,
        code: "observability_effective_query_missing",
        message:
          "sandbox observability response did not acknowledge its effective query",
      });
    }
    return data;
  }

  async listSandboxObservabilityLogs(
    sandboxId: string,
    options?: SandboxObservabilityLogOptions,
  ): Promise<SandboxObservabilityLogs> {
    const response = await wrapApiCall(() =>
      this.apispec.observability.apiV1SandboxesIdObservabilityLogsGet({
        id: sandboxId,
        ...options,
      }),
    );
    return ensureData(response, "list sandbox observability logs returned empty response");
  }

  async getSandboxMetrics(
    sandboxId: string,
    options?: SandboxMetricsOptions,
  ): Promise<SandboxMetrics> {
    const { metrics, ...query } = options ?? {};
    const response = await wrapApiCall(() =>
      this.apispec.observability.getSandboxRuntimeMetrics({
        id: sandboxId,
        ...query,
        metrics: metrics && metrics.length > 0 ? metrics.join(",") : undefined,
      }),
    );
    return ensureData(response, "get sandbox metrics returned empty response");
  }

  async getSandboxMetricsCatalog(sandboxId: string): Promise<SandboxMetricsCatalog> {
    const response = await wrapApiCall(() =>
      this.apispec.observability.getSandboxRuntimeMetricsCatalog({ id: sandboxId }),
    );
    return ensureData(response, "get sandbox metrics catalog returned empty response");
  }

  async watchSandboxObservabilityEvents(
    sandboxId: string,
    options?: SandboxObservabilityEventWatchOptions,
  ): Promise<SandboxObservabilityWatchStream> {
    const normalizedOptions = normalizeSandboxObservabilityEventOptions(options);
    return this.watchSandboxObservability(
      `/api/v1/sandboxes/${encodeURIComponent(sandboxId)}/observability/events`,
      toSandboxObservabilityEventQuery(normalizedOptions),
      options?.signal,
    );
  }

  async watchSandboxObservabilityLogs(
    sandboxId: string,
    options?: SandboxObservabilityLogWatchOptions,
  ): Promise<SandboxObservabilityWatchStream> {
    return this.watchSandboxObservability(
      `/api/v1/sandboxes/${encodeURIComponent(sandboxId)}/observability/logs`,
      toSandboxObservabilityLogQuery(options),
      options?.signal,
    );
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

  async openSandboxSessionEventStream(
    sandboxId: string,
    sessionId: string,
    options?: SessionEventStreamOptions,
  ): Promise<Response> {
    return this.fetchRaw(
      `/api/v1/sandboxes/${encodeURIComponent(sandboxId)}/sessions/${encodeURIComponent(sessionId)}/events/stream`,
      { after: numberQuery(options?.after) },
      {
        Accept: "text/event-stream",
        ...(options?.lastEventId ? { "Last-Event-ID": options.lastEventId } : {}),
      },
      options?.signal,
    );
  }

  private async watchSandboxObservability(
    path: string,
    query: Record<string, string | undefined>,
    signal?: AbortSignal,
  ): Promise<SandboxObservabilityWatchStream> {
    const response = await this.fetchRaw(
      path,
      { ...query, watch: "true" },
      { Accept: "application/x-ndjson" },
      signal,
    );
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().startsWith("application/x-ndjson")) {
      throw new APIError({
        statusCode: response.status,
        code: "unexpected_response",
        message: `unexpected observability watch content type: ${contentType}`,
      });
    }
    if (!response.body) {
      throw new APIError({
        statusCode: response.status,
        code: "unexpected_response",
        message: "observability watch response did not include a body",
      });
    }
    return createSandboxObservabilityWatchStream(response);
  }

  private async fetchRaw(
    path: string,
    query: Record<string, string | undefined>,
    extraHeaders?: Record<string, string>,
    signal?: AbortSignal,
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
      ...(extraHeaders ?? {}),
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
    const response = await fetchApi(url.toString(), { method: "GET", headers, signal });
    if (!response.ok) {
      throw await apiErrorFromResponse(response);
    }
    return response;
  }
}

function toSandboxObservabilityQuery(
  options?: {
    startTime?: Date;
    limit?: number;
    cursor?: string;
  },
): Record<string, string | undefined> {
  return {
    start_time: dateQuery(options?.startTime),
    limit: numberQuery(options?.limit),
    cursor: options?.cursor,
  };
}

function toSandboxObservabilityEventQuery(
  options?: SandboxObservabilityEventWatchOptions,
): Record<string, string | undefined> {
  return {
    ...toSandboxObservabilityQuery(options),
    max_schema_version: numberQuery(
      options?.maxSchemaVersion ?? CURRENT_SANDBOX_OBSERVABILITY_EVENT_SCHEMA_VERSION,
    ),
    source: options?.source,
    event_type: options?.eventType,
    outcome: options?.outcome,
    actor_kind: options?.actorKind,
    actor_id: options?.actorId,
    execution_scope_namespace: options?.executionScopeNamespace,
    execution_scope_kind: options?.executionScopeKind,
    execution_scope_id: options?.executionScopeId,
    execution_scope_attribution: options?.executionScopeAttribution,
    action: options?.action,
    resource_type: options?.resourceType,
    operation_id: options?.operationId,
  };
}

const CURRENT_SANDBOX_OBSERVABILITY_EVENT_SCHEMA_VERSION = 3;

function normalizeSandboxObservabilityEventOptions<
  T extends SandboxObservabilityEventOptions | SandboxObservabilityEventWatchOptions,
>(options?: T): T & { maxSchemaVersion: number } {
  const maxSchemaVersion =
    options?.maxSchemaVersion ?? CURRENT_SANDBOX_OBSERVABILITY_EVENT_SCHEMA_VERSION;
  if (
    hasExecutionScopeFilter(options) &&
    maxSchemaVersion < CURRENT_SANDBOX_OBSERVABILITY_EVENT_SCHEMA_VERSION
  ) {
    throw new RangeError(
      `sandbox observability execution scope filters require maxSchemaVersion >= ${CURRENT_SANDBOX_OBSERVABILITY_EVENT_SCHEMA_VERSION}`,
    );
  }
  return {
    ...(options ?? ({} as T)),
    maxSchemaVersion,
  };
}

function hasExecutionScopeFilter(
  options?: SandboxObservabilityExecutionScopeFilter,
): boolean {
  return Boolean(
    options?.executionScopeNamespace ||
      options?.executionScopeKind ||
      options?.executionScopeId ||
      options?.executionScopeAttribution,
  );
}

function toSandboxObservabilityLogQuery(
  options?: SandboxObservabilityLogWatchOptions,
): Record<string, string | undefined> {
  return {
    ...toSandboxObservabilityQuery(options),
    context_id: options?.contextId,
    stream: options?.stream,
  };
}

function numberQuery(value: number | undefined): string | undefined {
  return value === undefined ? undefined : String(value);
}

function dateQuery(value: Date | undefined): string | undefined {
  return value === undefined ? undefined : value.toISOString();
}

function createSandboxObservabilityWatchStream(
  response: Response,
): SandboxObservabilityWatchStream {
  const body = response.body;
  if (!body) {
    throw new APIError({
      statusCode: response.status,
      code: "unexpected_response",
      message: "observability watch response did not include a body",
    });
  }
  return {
    body,
    response,
    async *[Symbol.asyncIterator]() {
      const reader = body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            break;
          }
          buffer += decoder.decode(value, { stream: true });
          let newlineIndex = buffer.indexOf("\n");
          while (newlineIndex >= 0) {
            const line = buffer.slice(0, newlineIndex).trim();
            buffer = buffer.slice(newlineIndex + 1);
            if (line) {
              yield parseSandboxObservabilityWatchLine(line);
            }
            newlineIndex = buffer.indexOf("\n");
          }
        }
        buffer += decoder.decode();
        const line = buffer.trim();
        if (line) {
          yield parseSandboxObservabilityWatchLine(line);
        }
      } finally {
        reader.releaseLock();
      }
    },
  };
}

/**
 * The generated oneOf parser checks camelCase model properties before it has
 * converted the server's snake_case JSON, so event and log watch payloads would
 * otherwise become empty objects. The outer watch line type is the protocol
 * discriminator and selects the corresponding generated deserializer here.
 */
function parseSandboxObservabilityWatchLine(
  line: string,
): SandboxObservabilityWatchLine {
  const raw: unknown = JSON.parse(line);
  const parsed = models.SandboxObservabilityWatchLineFromJSON(raw);
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) {
    return parsed;
  }

  const data = (raw as Record<string, unknown>).data;
  if (data === null || data === undefined) {
    return parsed;
  }

  if (parsed.type === "event") {
    parsed.data = models.SandboxObservabilityEventFromJSON(data);
  } else if (parsed.type === "log") {
    parsed.data = models.SandboxObservabilityLogEntryFromJSON(data);
  }
  return parsed;
}

function hasHeader(headers: Record<string, string>, name: string): boolean {
  const normalized = name.toLowerCase();
  return Object.keys(headers).some((key) => key.toLowerCase() === normalized);
}
