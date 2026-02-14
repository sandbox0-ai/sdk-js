import type {
  ClaimRequest,
  PauseSandboxResponse,
  RefreshRequest,
  RefreshResponse,
  ResumeSandboxResponse,
  Sandbox,
  SandboxConfig,
  SandboxStatus,
  SandboxUpdateRequest,
  SuccessMessageResponse,
} from "../apispec/src/models/index";
import { ensureData, ensureModel } from "../response";
import { wrapApiCall } from "../errors";
import type { Client } from "../client";
import { Sandbox as SandboxHandle } from "../sandbox";
import { SandboxSession } from "../sessions";

export class Sandboxes {
  constructor(private readonly client: Client) {}

  async claim(template: string, config?: SandboxConfig): Promise<SandboxHandle> {
    const request: ClaimRequest = config ? { template, config } : { template };
    const response = await wrapApiCall(() =>
      this.client.apispec.sandboxes.apiV1SandboxesPost({
        claimRequest: request,
      }),
    );
    const data = ensureData(response, "claim sandbox returned empty response");
    return new SandboxHandle({
      id: data.sandboxId,
      client: this.client,
      template: data.template,
      clusterId: data.clusterId ?? undefined,
      podName: data.podName,
      status: data.status,
    });
  }

  async open(template: string, config?: SandboxConfig): Promise<SandboxSession> {
    const sandbox = await this.claim(template, config);
    return new SandboxSession(sandbox, async () => {
      await this.delete(sandbox.id);
    });
  }

  async get(sandboxId: string): Promise<Sandbox> {
    const response = await wrapApiCall(() =>
      this.client.apispec.sandboxes.apiV1SandboxesIdGet({ id: sandboxId }),
    );
    return ensureData(response, "get sandbox returned empty response");
  }

  async update(sandboxId: string, request: SandboxUpdateRequest): Promise<Sandbox> {
    const response = await wrapApiCall(() =>
      this.client.apispec.sandboxes.apiV1SandboxesIdPut({
        id: sandboxId,
        sandboxUpdateRequest: request,
      }),
    );
    return ensureData(response, "update sandbox returned empty response");
  }

  async delete(sandboxId: string): Promise<SuccessMessageResponse> {
    const response = await wrapApiCall(() =>
      this.client.apispec.sandboxes.apiV1SandboxesIdDelete({ id: sandboxId }),
    );
    return ensureModel(response, "delete sandbox returned empty response");
  }

  async status(sandboxId: string): Promise<SandboxStatus> {
    const response = await wrapApiCall(() =>
      this.client.apispec.sandboxes.apiV1SandboxesIdStatusGet({ id: sandboxId }),
    );
    return ensureData(response, "get sandbox status returned empty response");
  }

  async pause(sandboxId: string): Promise<PauseSandboxResponse> {
    const response = await wrapApiCall(() =>
      this.client.apispec.sandboxes.apiV1SandboxesIdPausePost({ id: sandboxId }),
    );
    return ensureData(response, "pause sandbox returned empty response");
  }

  async resume(sandboxId: string): Promise<ResumeSandboxResponse> {
    const response = await wrapApiCall(() =>
      this.client.apispec.sandboxes.apiV1SandboxesIdResumePost({ id: sandboxId }),
    );
    return ensureData(response, "resume sandbox returned empty response");
  }

  async refresh(
    sandboxId: string,
    request?: RefreshRequest,
  ): Promise<RefreshResponse> {
    const params = request
      ? { id: sandboxId, refreshRequest: request }
      : { id: sandboxId };
    const response = await wrapApiCall(() =>
      this.client.apispec.sandboxes.apiV1SandboxesIdRefreshPost(params),
    );
    return ensureData(response, "refresh sandbox returned empty response");
  }

  sandbox(sandboxId: string): SandboxHandle {
    return new SandboxHandle({ id: sandboxId, client: this.client });
  }
}
