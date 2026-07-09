import type * as runtimeTypes from "./apispec/src/runtime";
import type * as apisTypes from "./apispec/src/apis/index";
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
  SandboxObservabilityEvents,
  SandboxObservabilityLogOptions,
  SandboxObservabilityLogWatchOptions,
  SandboxObservabilityLogs,
  SandboxObservabilityMetricOptions,
  SandboxObservabilityMetricWatchOptions,
  SandboxObservabilityMetrics,
  SandboxObservabilityWatchStream,
  ProcessEventStream,
  ProcessEventWatchOptions,
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
    audit: apisTypes.AuditApi;
    processes: apisTypes.ProcessesApi;
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
      audit: new apis.AuditApi(this.configuration),
      processes: new apis.ProcessesApi(this.configuration),
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
    const response = await wrapApiCall(() =>
      this.apispec.observability.apiV1SandboxesIdObservabilityEventsGet({
        id: sandboxId,
        ...options,
      }),
    );
    return ensureData(response, "list sandbox observability events returned empty response");
  }

  async listSandboxAuditEvents(
    sandboxId: string,
    options?: SandboxObservabilityEventOptions,
  ): Promise<SandboxObservabilityEvents> {
    const response = await wrapApiCall(() =>
      this.apispec.audit.apiV1SandboxesIdAuditEventsGet({
        id: sandboxId,
        ...options,
      }),
    );
    return ensureData(response, "list sandbox audit events returned empty response");
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

  async listSandboxObservabilityMetrics(
    sandboxId: string,
    options?: SandboxObservabilityMetricOptions,
  ): Promise<SandboxObservabilityMetrics> {
    const response = await wrapApiCall(() =>
      this.apispec.observability.apiV1SandboxesIdObservabilityMetricsGet({
        id: sandboxId,
        ...options,
      }),
    );
    return ensureData(response, "list sandbox observability metrics returned empty response");
  }

  async watchSandboxObservabilityEvents(
    sandboxId: string,
    options?: SandboxObservabilityEventWatchOptions,
  ): Promise<SandboxObservabilityWatchStream> {
    return this.watchSandboxObservability(
      `/api/v1/sandboxes/${encodeURIComponent(sandboxId)}/observability/events`,
      toSandboxObservabilityEventQuery(options),
    );
  }

  async watchSandboxAuditEvents(
    sandboxId: string,
    options?: SandboxObservabilityEventWatchOptions,
  ): Promise<SandboxObservabilityWatchStream> {
    return this.watchSandboxObservability(
      `/api/v1/sandboxes/${encodeURIComponent(sandboxId)}/audit/events`,
      toSandboxObservabilityEventQuery(options),
    );
  }

  async watchSandboxObservabilityLogs(
    sandboxId: string,
    options?: SandboxObservabilityLogWatchOptions,
  ): Promise<SandboxObservabilityWatchStream> {
    return this.watchSandboxObservability(
      `/api/v1/sandboxes/${encodeURIComponent(sandboxId)}/observability/logs`,
      toSandboxObservabilityLogQuery(options),
    );
  }

  async watchSandboxObservabilityMetrics(
    sandboxId: string,
    options?: SandboxObservabilityMetricWatchOptions,
  ): Promise<SandboxObservabilityWatchStream> {
    return this.watchSandboxObservability(
      `/api/v1/sandboxes/${encodeURIComponent(sandboxId)}/observability/metrics`,
      toSandboxObservabilityMetricQuery(options),
    );
  }

  async watchSandboxProcessEvents(
    sandboxId: string,
    processId: string,
    options?: ProcessEventWatchOptions,
  ): Promise<ProcessEventStream> {
    const response = await this.fetchRaw(
      `/api/v1/sandboxes/${encodeURIComponent(sandboxId)}/processes/${encodeURIComponent(processId)}/events`,
      { cursor: numberQuery(options?.cursor) },
      { Accept: "text/event-stream" },
    );
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().startsWith("text/event-stream")) {
      throw new APIError({
        statusCode: response.status,
        code: "unexpected_response",
        message: `unexpected process event stream content type: ${contentType}`,
      });
    }
    if (!response.body) {
      throw new APIError({
        statusCode: response.status,
        code: "unexpected_response",
        message: "process event stream response did not include a body",
      });
    }
    return createProcessEventStream(response);
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

  private async watchSandboxObservability(
    path: string,
    query: Record<string, string | undefined>,
  ): Promise<SandboxObservabilityWatchStream> {
    const response = await this.fetchRaw(
      path,
      { ...query, watch: "true" },
      { Accept: "application/x-ndjson" },
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
    const response = await fetchApi(url.toString(), { method: "GET", headers });
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
    source: options?.source,
    event_type: options?.eventType,
    outcome: options?.outcome,
  };
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

function toSandboxObservabilityMetricQuery(
  options?: SandboxObservabilityMetricWatchOptions,
): Record<string, string | undefined> {
  return {
    ...toSandboxObservabilityQuery(options),
    context_id: options?.contextId,
    name: options?.name?.join(","),
    names: options?.names,
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
              yield models.SandboxObservabilityWatchLineFromJSON(JSON.parse(line));
            }
            newlineIndex = buffer.indexOf("\n");
          }
        }
        buffer += decoder.decode();
        const line = buffer.trim();
        if (line) {
          yield models.SandboxObservabilityWatchLineFromJSON(JSON.parse(line));
        }
      } finally {
        reader.releaseLock();
      }
    },
  };
}

function createProcessEventStream(response: Response): ProcessEventStream {
  const body = response.body;
  if (!body) {
    throw new APIError({
      statusCode: response.status,
      code: "unexpected_response",
      message: "process event stream response did not include a body",
    });
  }
  return {
    body,
    response,
    async *[Symbol.asyncIterator]() {
      const reader = body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let eventData: string[] = [];
      const flush = function* flushEvents() {
        if (eventData.length === 0) return;
        const data = eventData.join("\n").trim();
        eventData = [];
        if (data) {
          yield models.ProcessEventFromJSON(JSON.parse(data));
        }
      };
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            break;
          }
          buffer += decoder.decode(value, { stream: true });
          let newlineIndex = buffer.indexOf("\n");
          while (newlineIndex >= 0) {
            const line = buffer.slice(0, newlineIndex).replace(/\r$/, "");
            buffer = buffer.slice(newlineIndex + 1);
            if (line === "") {
              yield* flush();
            } else if (line.startsWith("data:")) {
              eventData.push(line.slice(5).trimStart());
            }
            newlineIndex = buffer.indexOf("\n");
          }
        }
        buffer += decoder.decode();
        if (buffer) {
          const line = buffer.replace(/\r$/, "");
          if (line.startsWith("data:")) {
            eventData.push(line.slice(5).trimStart());
          } else if (line === "") {
            yield* flush();
          }
        }
        yield* flush();
      } finally {
        reader.releaseLock();
      }
    },
  };
}

function hasHeader(headers: Record<string, string>, name: string): boolean {
  const normalized = name.toLowerCase();
  return Object.keys(headers).some((key) => key.toLowerCase() === normalized);
}
