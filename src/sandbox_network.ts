import type { SandboxNetworkPolicy } from "./apispec/src/models/index";
import type { Client } from "./client";
import { wrapApiCall } from "./errors";
import { ensureData } from "./response";
import { Sandbox } from "./sandbox";

function getClient(sandbox: Sandbox): Client {
  return (sandbox as any).client as Client;
}

declare module "./sandbox" {
  interface Sandbox {
    getNetworkPolicy(): Promise<SandboxNetworkPolicy>;
    updateNetworkPolicy(
      policy: SandboxNetworkPolicy,
    ): Promise<SandboxNetworkPolicy>;
  }
}

Sandbox.prototype.getNetworkPolicy = async function (
  this: Sandbox,
): Promise<SandboxNetworkPolicy> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.sandboxes.apiV1SandboxesIdNetworkGet({ id: this.id }),
  );
  return ensureData(response, "get network policy returned empty response");
};

Sandbox.prototype.updateNetworkPolicy = async function (
  this: Sandbox,
  policy: SandboxNetworkPolicy,
): Promise<SandboxNetworkPolicy> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.sandboxes.apiV1SandboxesIdNetworkPut({
      id: this.id,
      sandboxNetworkPolicy: policy,
    }),
  );
  return ensureData(response, "update network policy returned empty response");
};
