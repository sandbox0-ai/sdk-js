import type {
  ClaimMountRequest,
  ClaimRequest,
  MountStatus,
  PauseSandboxResponse,
  SandboxRefreshRequest,
  RefreshResponse,
  ResumeSandboxResponse,
  Sandbox,
  SandboxConfig,
  SandboxStatus,
  SandboxUpdateRequest,
  SuccessMessageResponse,
} from "../apispec/src/models/index";
import type { SandboxListOptions, SandboxListResult } from "../models";
import { ensureData, ensureModel } from "../response";
import { wrapApiCall } from "../errors";
import type { Client } from "../client";
import { Sandbox as SandboxHandle } from "../sandbox";
import { SandboxSession } from "../sessions";

export interface ClaimSandboxOptions {
  config?: SandboxConfig;
  mounts?: ClaimMountRequest[];
  waitForMounts?: boolean;
  mountWaitTimeoutMs?: number;
}

function isClaimSandboxOptions(
  value: SandboxConfig | ClaimSandboxOptions | undefined,
): value is ClaimSandboxOptions {
  return !!value && typeof value === "object" && (
    "config" in value ||
    "mounts" in value ||
    "waitForMounts" in value ||
    "mountWaitTimeoutMs" in value
  );
}

function toClaimRequest(
  template: string,
  options?: SandboxConfig | ClaimSandboxOptions,
): ClaimRequest {
  if (!options) {
    return { template };
  }
  if (!isClaimSandboxOptions(options)) {
    return { template, config: options };
  }
  return {
    template,
    config: options.config,
    mounts: options.mounts,
    waitForMounts: options.waitForMounts,
    mountWaitTimeoutMs: options.mountWaitTimeoutMs,
  };
}

export class Sandboxes {
  constructor(private readonly client: Client) {}

  async claim(
    template: string,
    options?: SandboxConfig | ClaimSandboxOptions,
  ): Promise<SandboxHandle> {
    const request = toClaimRequest(template, options);
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
      bootstrapMounts: data.bootstrapMounts as MountStatus[] | undefined,
    });
  }

  async list(options?: SandboxListOptions): Promise<SandboxListResult> {
    const response = await wrapApiCall(() =>
      this.client.apispec.sandboxes.apiV1SandboxesGet({
        status: options?.status,
        templateId: options?.templateId,
        paused: options?.paused,
        limit: options?.limit,
        offset: options?.offset,
      }),
    );
    const data = ensureData(response, "list sandboxes returned empty response");
    return {
      sandboxes: data.sandboxes ?? [],
      count: data.count ?? 0,
      hasMore: data.hasMore ?? false,
    };
  }

  async open(
    template: string,
    options?: SandboxConfig | ClaimSandboxOptions,
  ): Promise<SandboxSession> {
    const sandbox = await this.claim(template, options);
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
    request?: SandboxRefreshRequest,
  ): Promise<RefreshResponse> {
    const params = request
      ? { id: sandboxId, sandboxRefreshRequest: request }
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
