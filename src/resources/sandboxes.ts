import type {
  ClaimMountRequest,
  ClaimRequest,
  CreateSandboxRootFSSnapshotRequest,
  ForkSandboxRequest,
  ForkSandboxResponse,
  MountStatus,
  PauseSandboxResponse,
  RestoreSandboxRootFSRequest,
  RestoreSandboxRootFSResponse,
  SandboxRefreshRequest,
  RefreshResponse,
  ResumeSandboxResponse,
  Sandbox,
  SandboxConfig,
  SandboxRootFSSnapshot,
  SandboxStatus,
  SandboxUpdateRequest,
  SuccessMessageResponse,
  SuccessDeletedResponse,
} from "../apispec/src/models/index";
import type {
  SandboxLifecyclePredicate,
  SandboxLifecycleWaitOptions,
  SandboxListOptions,
  SandboxListResult,
} from "../models";
import { ensureData, ensureModel } from "../response";
import { SandboxWaitTimeoutError, wrapApiCall } from "../errors";
import type { Client } from "../client";
import { Sandbox as SandboxHandle } from "../sandbox";
import { SandboxSession } from "../sessions";
import {
  sleepWithSignal,
  throwIfAborted,
  validateWaitDuration,
} from "../wait";

export interface ClaimSandboxOptions {
  config?: SandboxConfig;
  mounts?: ClaimMountRequest[];
  snapshotId?: string;
  memory?: string;
}

const DEFAULT_LIFECYCLE_TIMEOUT_MS = 60_000;
const DEFAULT_LIFECYCLE_POLL_INTERVAL_MS = 500;

function isClaimSandboxOptions(
  value: SandboxConfig | ClaimSandboxOptions | undefined,
): value is ClaimSandboxOptions {
  return !!value && typeof value === "object" && (
    "config" in value ||
    "mounts" in value ||
    "snapshotId" in value ||
    "memory" in value
  );
}

function withMemory(config: SandboxConfig | undefined, memory: string | undefined): SandboxConfig | undefined {
  if (!memory) {
    return config;
  }
  return {
    ...config,
    resources: { ...config?.resources, memory },
  };
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
    config: withMemory(options.config, options.memory),
    mounts: options.mounts,
    snapshotId: options.snapshotId,
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
    return this.getWithSignal(sandboxId);
  }

  private async getWithSignal(sandboxId: string, signal?: AbortSignal): Promise<Sandbox> {
    const response = await wrapApiCall(() =>
      this.client.apispec.sandboxes.apiV1SandboxesIdGet(
        { id: sandboxId },
        signal ? { signal } : undefined,
      ),
    );
    return ensureData(response, "get sandbox returned empty response");
  }

  /**
   * Polls committed sandbox details until the predicate matches.
   *
   * Abort stops the local wait but cannot undo a lifecycle request that the
   * server has already accepted.
   */
  async waitForLifecycle(
    sandboxId: string,
    predicate: SandboxLifecyclePredicate,
    options: SandboxLifecycleWaitOptions = {},
  ): Promise<Sandbox> {
    const timeoutMs = options.timeoutMs ?? DEFAULT_LIFECYCLE_TIMEOUT_MS;
    const pollIntervalMs = options.pollIntervalMs ?? DEFAULT_LIFECYCLE_POLL_INTERVAL_MS;
    validateWaitDuration("timeoutMs", timeoutMs, true);
    validateWaitDuration("pollIntervalMs", pollIntervalMs, false);

    const startedAt = Date.now();
    let lastSandbox: Sandbox | undefined;
    while (true) {
      throwIfAborted(options.signal, "sandbox lifecycle wait was aborted");
      lastSandbox = await this.getWithSignal(sandboxId, options.signal);
      throwIfAborted(options.signal, "sandbox lifecycle wait was aborted");
      if (await predicate(lastSandbox)) {
        return lastSandbox;
      }

      const remainingMs = timeoutMs - (Date.now() - startedAt);
      if (remainingMs <= 0) {
        throw new SandboxWaitTimeoutError({ sandboxId, timeoutMs, lastSandbox });
      }
      await sleepWithSignal(
        Math.min(pollIntervalMs, remainingMs),
        options.signal,
        "sandbox lifecycle wait was aborted",
      );
    }
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

  async updateMemory(sandboxId: string, memory: string): Promise<Sandbox> {
    return this.update(sandboxId, {
      config: {
        resources: { memory },
      },
    });
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

  /** Requests a pause and waits for its durable checkpoint to commit. */
  async pauseAndWait(
    sandboxId: string,
    options?: SandboxLifecycleWaitOptions,
  ): Promise<Sandbox> {
    throwIfAborted(options?.signal, "sandbox lifecycle wait was aborted");
    await this.pause(sandboxId);
    return this.waitForLifecycle(
      sandboxId,
      (sandbox) => sandbox.status === "paused" && sandbox.paused,
      options,
    );
  }

  async resume(sandboxId: string): Promise<ResumeSandboxResponse> {
    const response = await wrapApiCall(() =>
      this.client.apispec.sandboxes.apiV1SandboxesIdResumePost({ id: sandboxId }),
    );
    return ensureData(response, "resume sandbox returned empty response");
  }

  /** Requests a resume and waits for the committed running generation. */
  async resumeAndWait(
    sandboxId: string,
    options?: SandboxLifecycleWaitOptions,
  ): Promise<Sandbox> {
    throwIfAborted(options?.signal, "sandbox lifecycle wait was aborted");
    const before = await this.getWithSignal(sandboxId, options?.signal);
    throwIfAborted(options?.signal, "sandbox lifecycle wait was aborted");
    await this.resume(sandboxId);

    const minimumRuntimeGeneration = before.paused || before.status === "paused"
      ? before.runtimeGeneration + 1
      : before.runtimeGeneration;
    return this.waitForLifecycle(
      sandboxId,
      (sandbox) => (
        sandbox.status === "running"
        && !sandbox.paused
        && sandbox.runtimeGeneration >= minimumRuntimeGeneration
      ),
      options,
    );
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

  async createRootFSSnapshot(
    sandboxId: string,
    request?: CreateSandboxRootFSSnapshotRequest,
  ): Promise<SandboxRootFSSnapshot> {
    const response = await wrapApiCall(() =>
      this.client.apispec.sandboxRootfs.apiV1SandboxesIdSnapshotsPost({
        id: sandboxId,
        createSandboxRootFSSnapshotRequest: request,
      }),
    );
    return ensureData(response, "create sandbox rootfs snapshot returned empty response");
  }

  async listRootFSSnapshots(sandboxId: string): Promise<SandboxRootFSSnapshot[]> {
    const response = await wrapApiCall(() =>
      this.client.apispec.sandboxRootfs.apiV1SandboxesIdSnapshotsGet({ id: sandboxId }),
    );
    const data = ensureData(response, "list sandbox rootfs snapshots returned empty response");
    return data.snapshots ?? [];
  }

  async getRootFSSnapshot(snapshotId: string): Promise<SandboxRootFSSnapshot> {
    const response = await wrapApiCall(() =>
      this.client.apispec.sandboxRootfs.apiV1SandboxRootfsSnapshotsSnapshotIdGet({
        snapshotId,
      }),
    );
    return ensureData(response, "get sandbox rootfs snapshot returned empty response");
  }

  async deleteRootFSSnapshot(snapshotId: string): Promise<SuccessDeletedResponse> {
    const response = await wrapApiCall(() =>
      this.client.apispec.sandboxRootfs.apiV1SandboxRootfsSnapshotsSnapshotIdDelete({
        snapshotId,
      }),
    );
    return ensureModel(response, "delete sandbox rootfs snapshot returned empty response");
  }

  async restoreRootFS(
    sandboxId: string,
    request: RestoreSandboxRootFSRequest,
  ): Promise<RestoreSandboxRootFSResponse> {
    const response = await wrapApiCall(() =>
      this.client.apispec.sandboxRootfs.apiV1SandboxesIdRootfsRestorePost({
        id: sandboxId,
        restoreSandboxRootFSRequest: request,
      }),
    );
    return ensureData(response, "restore sandbox rootfs returned empty response");
  }

  async fork(sandboxId: string, request?: ForkSandboxRequest): Promise<ForkSandboxResponse> {
    const response = await wrapApiCall(() =>
      this.client.apispec.sandboxRootfs.apiV1SandboxesIdForkPost({
        id: sandboxId,
        forkSandboxRequest: request ?? {},
      }),
    );
    return ensureData(response, "fork sandbox returned empty response");
  }

  sandbox(sandboxId: string): SandboxHandle {
    return new SandboxHandle({ id: sandboxId, client: this.client });
  }
}
