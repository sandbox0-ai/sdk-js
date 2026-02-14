import type { Middleware, ResponseContext } from "./apispec/src/runtime";

const NULL_MAP_KEYS = new Set([
  "annotations",
  "envVars",
  "env_vars",
  "labels",
  "matchLabels",
  "nodeSelector",
]);

const NULL_ARRAY_KEYS = new Set([
  "allowedCidrs",
  "allowedDomains",
  "allowedPorts",
  "allowedTeams",
  "api_keys",
  "args",
  "candidates",
  "command",
  "conditions",
  "contexts",
  "data",
  "deniedCidrs",
  "deniedDomains",
  "deniedPorts",
  "drop",
  "entries",
  "env",
  "exposed_ports",
  "identities",
  "matchExpressions",
  "matchFields",
  "members",
  "mounts",
  "namespaces",
  "nodeSelectorTerms",
  "preferredDuringSchedulingIgnoredDuringExecution",
  "providers",
  "requiredDuringSchedulingIgnoredDuringExecution",
  "roles",
  "sidecars",
  "tags",
  "teams",
  "templates",
  "tolerations",
  "values",
]);

function normalizeNullStringMap(value: Record<string, unknown>): boolean {
  let changed = false;
  for (const [key, raw] of Object.entries(value)) {
    if (raw === null) {
      value[key] = "";
      changed = true;
    }
  }
  return changed;
}

function normalizeNullMaps(payload: unknown): { value: unknown; changed: boolean } {
  if (Array.isArray(payload)) {
    let changed = false;
    const normalized = payload.map((item) => {
      const result = normalizeNullMaps(item);
      changed = changed || result.changed;
      return result.value;
    });
    return { value: normalized, changed };
  }

  if (payload && typeof payload === "object") {
    let changed = false;
    const normalized: Record<string, unknown> = {};
    for (const [key, raw] of Object.entries(payload as Record<string, unknown>)) {
      if (raw === null && NULL_MAP_KEYS.has(key)) {
        normalized[key] = {};
        changed = true;
        continue;
      }
      if (raw === null && NULL_ARRAY_KEYS.has(key)) {
        normalized[key] = [];
        changed = true;
        continue;
      }
      if (NULL_MAP_KEYS.has(key) && raw && typeof raw === "object" && !Array.isArray(raw)) {
        changed = normalizeNullStringMap(raw as Record<string, unknown>) || changed;
      }
      const next = normalizeNullMaps(raw);
      normalized[key] = next.value;
      changed = next.changed || changed;
    }
    return { value: normalized, changed };
  }

  return { value: payload, changed: false };
}

async function normalizeJsonResponse(response: Response): Promise<Response> {
  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.includes("application/json")) {
    return response;
  }
  const rawText = await response.clone().text();
  if (!rawText) {
    return response;
  }
  let payload: unknown;
  try {
    payload = JSON.parse(rawText);
  } catch {
    return response;
  }
  const normalized = normalizeNullMaps(payload);
  if (!normalized.changed) {
    return response;
  }
  const body = JSON.stringify(normalized.value);
  const headers = new Headers(response.headers);
  headers.set("content-length", String(body.length));
  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export function normalizeNullMapMiddleware(): Middleware {
  return {
    post: async ({ response }: ResponseContext) => normalizeJsonResponse(response),
  };
}
