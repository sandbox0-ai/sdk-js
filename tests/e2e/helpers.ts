import type { Sandbox, Client } from "../../src/index.ts";
import { Client as ClientClass } from "../../src/index.ts";

export interface E2EConfig {
  baseUrl: string;
  email: string;
  password: string;
  template: string;
}

let config: E2EConfig | null = null;
let cachedToken: string | null = null;

export function loadE2EConfig(): E2EConfig | null {
  if (config) {
    return config;
  }
  const baseUrl = (process.env.S0_E2E_BASE_URL ?? "").trim();
  const password = (process.env.S0_E2E_PASSWORD ?? "").trim();
  if (!baseUrl || !password) {
    return null;
  }
  const email = (process.env.S0_E2E_EMAIL ?? "").trim() || "admin@example.com";
  const template = (process.env.S0_E2E_TEMPLATE ?? "").trim() || "default";
  config = { baseUrl, email, password, template };
  return config;
}

export function requireConfig(test: { skip: (msg: string) => never }): E2EConfig {
  const cfg = loadE2EConfig();
  if (!cfg) {
    test.skip("S0_E2E_BASE_URL or S0_E2E_PASSWORD not set");
  }
  return cfg!;
}

async function loginOnce(cfg: E2EConfig): Promise<string> {
  const response = await fetch(`${cfg.baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: cfg.email, password: cfg.password }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`login failed: status=${response.status} body=${body}`);
  }

  const data = (await response.json()) as { data?: { access_token?: string }; error?: { message?: string } };

  if (data.error) {
    throw new Error(`login failed: ${data.error.message}`);
  }

  if (!data.data?.access_token) {
    throw new Error("login response missing access_token");
  }

  return data.data.access_token;
}

async function loginWithRetry(cfg: E2EConfig, timeoutMs = 180000): Promise<string> {
  const deadline = Date.now() + timeoutMs;
  let lastError: Error | null = null;

  while (Date.now() < deadline) {
    try {
      const token = await loginOnce(cfg);
      if (token) {
        return token;
      }
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      console.error(`login attempt failed: ${lastError.message}`);
    }
    await sleep(5000);
  }

  throw lastError ?? new Error("login timed out without error");
}

export async function e2eToken(cfg: E2EConfig): Promise<string> {
  if (cachedToken) {
    return cachedToken;
  }
  cachedToken = await loginWithRetry(cfg);
  return cachedToken;
}

export async function newClient(cfg: E2EConfig, token?: string): Promise<Client> {
  const accessToken = token ?? (await e2eToken(cfg));
  return new ClientClass({
    token: accessToken,
    baseUrl: cfg.baseUrl,
  });
}

export async function claimSandbox(
  client: Client,
  cfg: E2EConfig,
  cleanup: (fn: () => Promise<void>) => void,
): Promise<Sandbox> {
  const sandbox = await client.sandboxes.claim(cfg.template);
  if (!sandbox || !sandbox.id) {
    throw new Error("claim sandbox returned empty sandbox");
  }
  cleanup(async () => {
    try {
      await client.sandboxes.delete(sandbox.id);
    } catch {
      // Ignore cleanup errors
    }
  });
  return sandbox;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function waitForWatchEvent(
  stream: AsyncIterable<{ event?: string; path?: string; error?: string }>,
  timeoutMs = 10000,
): Promise<{ event?: string; path?: string; error?: string } | null> {
  const iterator = stream[Symbol.asyncIterator]();
  const timeoutPromise = new Promise<null>((resolve) =>
    setTimeout(() => resolve(null), timeoutMs),
  );

  const result = await Promise.race([
    iterator.next().then((r) => (r.done ? null : r.value)),
    timeoutPromise,
  ]);

  return result;
}
