import { Client } from "../../../src/index.ts";
import type { Sandbox0E2EConfig } from "./env.ts";

export interface SandboxInventory {
  readonly ids: Set<string>;
}

export function createSandbox0E2EClient(config: Sandbox0E2EConfig): Client {
  return new Client({
    baseUrl: config.baseUrl,
    token: config.token,
    userAgent: "sandbox0-sdk-js-e2e",
  });
}

export async function listSandboxInventory(client: Client): Promise<SandboxInventory> {
  const result = await client.sandboxes.list({ limit: 100 });
  return {
    ids: new Set(result.sandboxes.map((sandbox) => sandbox.id).filter(Boolean)),
  };
}

export async function cleanupNewSandboxes(
  client: Client,
  before: SandboxInventory,
): Promise<void> {
  const after = await client.sandboxes.list({ limit: 100 });
  const created = after.sandboxes.filter((sandbox) => !before.ids.has(sandbox.id));

  for (const sandbox of created) {
    try {
      const snapshots = await client.sandboxes.listRootFSSnapshots(sandbox.id);
      for (const snapshot of snapshots) {
        await ignoreNotFound(() => client.sandboxes.deleteRootFSSnapshot(snapshot.id));
      }
    } catch {
      // Snapshot cleanup is best effort; deleting the sandbox is the hard stop.
    }
    await ignoreNotFound(() => client.sandboxes.delete(sandbox.id));
  }
}

async function ignoreNotFound(action: () => Promise<unknown>): Promise<void> {
  try {
    await action();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!message.includes("404") && !message.includes("not_found")) {
      throw error;
    }
  }
}
