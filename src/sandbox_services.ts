import type { SandboxAppService } from "./apispec/src/models/index";
import type { Client } from "./client";
import { wrapApiCall } from "./errors";
import type { SandboxServicesResponse } from "./models";
import { ensureData } from "./response";
import { Sandbox } from "./sandbox";

function getClient(sandbox: Sandbox): Client {
  return (sandbox as any).client as Client;
}

declare module "./sandbox" {
  interface Sandbox {
    getServices(): Promise<SandboxServicesResponse>;
    updateServices(services: SandboxAppService[]): Promise<SandboxServicesResponse>;
    clearServices(): Promise<SandboxServicesResponse>;
  }
}

Sandbox.prototype.getServices = async function (
  this: Sandbox,
): Promise<SandboxServicesResponse> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.sandboxes.apiV1SandboxesIdServicesGet({ id: this.id }),
  );
  const data = ensureData(response, "get sandbox services returned empty response");
  return toSandboxServicesResponse(data);
};

Sandbox.prototype.updateServices = async function (
  this: Sandbox,
  services: SandboxAppService[],
): Promise<SandboxServicesResponse> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.sandboxes.apiV1SandboxesIdServicesPut({
      id: this.id,
      sandboxServicesUpdateRequest: { services: services ?? [] },
    }),
  );
  const data = ensureData(response, "update sandbox services returned empty response");
  return toSandboxServicesResponse(data);
};

Sandbox.prototype.clearServices = async function (
  this: Sandbox,
): Promise<SandboxServicesResponse> {
  return this.updateServices([]);
};

function toSandboxServicesResponse(data: any): SandboxServicesResponse {
  return {
    sandboxId: data.sandboxId,
    services: data.services ?? [],
  };
}

