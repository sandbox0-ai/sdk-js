import type { PublicGatewayConfig } from "./apispec/src/models/index";
import type { Client } from "./client";
import { wrapApiCall } from "./errors";
import type { PublicGatewayResponse } from "./models";
import { ensureData } from "./response";
import { Sandbox } from "./sandbox";

function getClient(sandbox: Sandbox): Client {
  return (sandbox as any).client as Client;
}

declare module "./sandbox" {
  interface Sandbox {
    getPublicGateway(): Promise<PublicGatewayResponse>;
    updatePublicGateway(
      publicGateway: PublicGatewayConfig,
    ): Promise<PublicGatewayResponse>;
    clearPublicGateway(): Promise<PublicGatewayResponse>;
  }
}

Sandbox.prototype.getPublicGateway = async function (
  this: Sandbox,
): Promise<PublicGatewayResponse> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.sandboxes.apiV1SandboxesIdPublicGatewayGet({ id: this.id }),
  );
  const data = ensureData(response, "get public gateway returned empty response");
  return toPublicGatewayResponse(data);
};

Sandbox.prototype.updatePublicGateway = async function (
  this: Sandbox,
  publicGateway: PublicGatewayConfig,
): Promise<PublicGatewayResponse> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.sandboxes.apiV1SandboxesIdPublicGatewayPut({
      id: this.id,
      publicGatewayConfig: publicGateway,
    }),
  );
  const data = ensureData(response, "update public gateway returned empty response");
  return toPublicGatewayResponse(data);
};

Sandbox.prototype.clearPublicGateway = async function (
  this: Sandbox,
): Promise<PublicGatewayResponse> {
  return this.updatePublicGateway({ enabled: false });
};

function toPublicGatewayResponse(data: any): PublicGatewayResponse {
  return {
    sandboxId: data.sandboxId,
    publicGateway: data.publicGateway,
    exposureDomain: data.exposureDomain ?? undefined,
  };
}
