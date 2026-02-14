import type {
  ExposedPortConfig,
  UpdateExposedPortsRequest,
} from "./apispec/src/models/index";
import type { Client } from "./client";
import { wrapApiCall } from "./errors";
import { ensureData } from "./response";
import type { ExposedPort, ExposedPortsResponse } from "./models";
import { Sandbox } from "./sandbox";

function getClient(sandbox: Sandbox): Client {
  return (sandbox as any).client as Client;
}

declare module "./sandbox" {
  interface Sandbox {
    getExposedPorts(): Promise<ExposedPortsResponse>;
    updateExposedPorts(ports: ExposedPort[]): Promise<ExposedPortsResponse>;
    exposePort(port: number, resume: boolean): Promise<ExposedPortsResponse>;
    unexposePort(port: number): Promise<ExposedPortsResponse>;
    clearExposedPorts(): Promise<void>;
  }
}

Sandbox.prototype.getExposedPorts = async function (
  this: Sandbox,
): Promise<ExposedPortsResponse> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.sandboxes.apiV1SandboxesIdExposedPortsGet({ id: this.id }),
  );
  const data = ensureData(response, "get exposed ports returned empty response");
  return toExposedPortsResponse(data);
};

Sandbox.prototype.updateExposedPorts = async function (
  this: Sandbox,
  ports: ExposedPort[],
): Promise<ExposedPortsResponse> {
  const client = getClient(this);
  const request: UpdateExposedPortsRequest = {
    ports: ports.map(
      (port) => ({ port: port.port, resume: port.resume } as ExposedPortConfig),
    ),
  };
  const response = await wrapApiCall(() =>
    client.apispec.sandboxes.apiV1SandboxesIdExposedPortsPut({
      id: this.id,
      updateExposedPortsRequest: request,
    }),
  );
  const data = ensureData(response, "update exposed ports returned empty response");
  return toExposedPortsResponse(data);
};

Sandbox.prototype.exposePort = async function (
  this: Sandbox,
  port: number,
  resume: boolean,
): Promise<ExposedPortsResponse> {
  const current = await this.getExposedPorts();
  const updated: ExposedPort[] = [];
  let replaced = false;
  for (const item of current.ports) {
    if (item.port === port) {
      updated.push({ ...item, resume });
      replaced = true;
    } else {
      updated.push(item);
    }
  }
  if (!replaced) {
    updated.push({ port, resume });
  }
  return this.updateExposedPorts(updated);
};

Sandbox.prototype.unexposePort = async function (
  this: Sandbox,
  port: number,
): Promise<ExposedPortsResponse> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.sandboxes.apiV1SandboxesIdExposedPortsPortDelete({
      id: this.id,
      port,
    }),
  );
  const data = ensureData(response, "unexpose port returned empty response");
  return toExposedPortsResponse(data);
};

Sandbox.prototype.clearExposedPorts = async function (this: Sandbox): Promise<void> {
  const client = getClient(this);
  await wrapApiCall(() =>
    client.apispec.sandboxes.apiV1SandboxesIdExposedPortsDelete({ id: this.id }),
  );
};

function toExposedPortsResponse(data: any): ExposedPortsResponse {
  const ports = (data.exposedPorts ?? []).map((item: any) => ({
    port: item.port,
    resume: item.resume,
    publicUrl: item.publicUrl ?? undefined,
  }));
  return {
    ports,
    exposureDomain: data.exposureDomain ?? undefined,
  };
}
