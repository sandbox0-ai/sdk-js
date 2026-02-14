import { Client, apispec } from "../src/index.ts";

export function mustEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required`);
  }
  return value;
}

export function optionalEnv(name: string): string | undefined {
  const value = process.env[name];
  if (!value) {
    return undefined;
  }
  return value;
}

export function createClient(): Client {
  return new Client({
    token: mustEnv("SANDBOX0_TOKEN"),
    baseUrl: optionalEnv("SANDBOX0_BASE_URL"),
  });
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { apispec };
