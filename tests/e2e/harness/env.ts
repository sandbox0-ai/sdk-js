export interface Sandbox0E2EConfig {
  readonly baseUrl: string;
  readonly hardTtlSec: number;
  readonly template: string;
  readonly token: string;
}

export interface MissingE2EConfig {
  readonly missing: string[];
  readonly reason: string;
}

export type E2EConfigResult<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: MissingE2EConfig };

export function readSandbox0E2EConfig(): E2EConfigResult<Sandbox0E2EConfig> {
  const token = firstEnv(
    "S0_E2E_SANDBOX0_TOKEN",
    "S0_EVE_E2E_SANDBOX0_TOKEN",
    "SANDBOX0_TOKEN",
    "SANDBOX0_API_KEY",
  );
  const baseUrl = firstEnv(
    "S0_E2E_SANDBOX0_BASE_URL",
    "S0_EVE_E2E_SANDBOX0_BASE_URL",
    "SANDBOX0_BASE_URL",
  );
  const template = firstEnv(
    "S0_E2E_SANDBOX0_TEMPLATE",
    "S0_EVE_E2E_SANDBOX0_TEMPLATE",
    "SANDBOX0_TEMPLATE",
  ) ?? "default";
  const hardTtlSec = parsePositiveInteger(
    firstEnv("S0_E2E_SANDBOX_HARD_TTL_SEC", "S0_EVE_E2E_SANDBOX_HARD_TTL_SEC"),
    15 * 60,
  );

  const missing = [
    token ? undefined : "SANDBOX0_TOKEN",
    baseUrl ? undefined : "SANDBOX0_BASE_URL",
  ].filter((item): item is string => item !== undefined);

  if (missing.length > 0) {
    return {
      ok: false,
      error: {
        missing,
        reason: `missing required Sandbox0 e2e env: ${missing.join(", ")}`,
      },
    };
  }

  return { ok: true, value: { baseUrl: baseUrl!, hardTtlSec, template, token: token! } };
}

export function firstEnv(...names: string[]): string | undefined {
  for (const name of names) {
    const value = process.env[name]?.trim();
    if (value) {
      return value;
    }
  }
  return undefined;
}

export function parsePositiveInteger(
  value: string | undefined,
  fallback: number,
): number {
  if (!value) {
    return fallback;
  }
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}
