import type * as runtimeTypes from "./apispec/src/runtime";
import type * as apisTypes from "./apispec/src/apis/index";
import { apis, runtime } from "./apispec_compat";
import { normalizeNullMapMiddleware } from "./response_normalize";
import { Sandboxes } from "./resources/sandboxes";
import { Volumes } from "./resources/volumes";
import { Sandbox } from "./sandbox";

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
  };

  readonly sandboxes: Sandboxes;
  readonly volumes: Volumes;

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
    };

    this.sandboxes = new Sandboxes(this);
    this.volumes = new Volumes(this);
  }

  sandbox(id: string): Sandbox {
    return new Sandbox({ id, client: this });
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
}
