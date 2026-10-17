import { validateMemoryRestorationTarget, validateMemoryRestoration } from "../memory_restoration";
import { validateForkLaunchInput, validateForkLaunchWire, validateForkLaunchReceipt, type RootFSForkLaunchOptions } from "../fork_launch";
import { validateMemoryOperationLookup, validateMemoryOperation, type MemoryOperationLookupOptions } from "../memory_operation";
import { validateCaptureTarget, validateCaptureName, validateCaptureReceipt, validateFinalCapture, decodeFinalCaptureFile, type RestartFinalCaptureFile } from "../restart_final_capture";
import type {
  ClaimRequest,
  CreateSandboxRootFSSnapshotRequest,
  CaptureSandboxRootFSSnapshotRequest,
  ForkSandboxRequest,
  ForkSandboxResponse,
  PauseSandboxResponse,
  RebaseSandboxRootFSRequest,
  RebaseSandboxRootFSResponse,
  RestoreSandboxRootFSRequest,
  RestoreSandboxRootFSResponse,
  SandboxRefreshRequest,
  RefreshResponse,
  ResumeSandboxResponse,
  Sandbox,
  SandboxConfig,
  SandboxRootFSSnapshot,
  SandboxRootFSIdentity,
  SandboxRootFSForkObservation,
  SandboxRootFSForkLaunch,
  SandboxMemoryRestoration,
  SandboxMemoryOperation,
  SandboxHealth,
  SandboxRestartOperation,
  SandboxSnapshotRestoreOperation,
  SandboxSnapshotRestoreRequest,
  SandboxRestartFinalCapture,
  SandboxStatus,
  SandboxUpdateRequest,
  SuccessMessageResponse,
  SuccessDeletedResponse,
} from "../apispec/src/models/index";
import { validateSandboxHealth, validateSandboxHealthWireTimes } from "../health";
import type {
  SandboxExecutionStateOptions,
  SandboxLifecyclePredicate,
  SandboxLifecycleWaitOptions,
  SandboxListOptions,
  SandboxListResult,
} from "../models";
import { ensureData, ensureModel } from "../response";
import { SandboxWaitTimeoutError, SandboxLifecycleFailedError, wrapApiCall } from "../errors";
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
  snapshotId?: string;
  memory?: string;
}

export interface ForkSandboxOptions {
  /** Stable retry key. Reusing it for another source is safely namespaced. */
  idempotencyKey?: string;
}

const DEFAULT_LIFECYCLE_TIMEOUT_MS = 60_000;
const DEFAULT_LIFECYCLE_POLL_INTERVAL_MS = 500;

function isClaimSandboxOptions(
  value: SandboxConfig | ClaimSandboxOptions | undefined,
): value is ClaimSandboxOptions {
  return !!value && typeof value === "object" && (
    "config" in value ||
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
      runtimeId: data.runtimeId,
      status: data.status,
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

  /** Explicitly restores one snapshot and discards processes. Retain every input after uncertainty. */
  async restoreSnapshot(sandboxId: string, options: SandboxSnapshotRestoreRequest & { idempotencyKey: string }): Promise<SandboxSnapshotRestoreOperation> {
    if (!Number.isSafeInteger(options.expectedRuntimeGeneration) || options.expectedRuntimeGeneration < 1 || options.expectedRuntimeGeneration >= Number.MAX_SAFE_INTEGER) {
      throw new Error("expectedRuntimeGeneration must be nonnegative with a safe integer successor");
    }
    validateSnapshotRestoreIdentity(options.snapshotId); validateSnapshotRestoreIdentity(options.snapshotGenerationId);
    if (options.discardProcessState !== true) throw new Error("explicit process-state discard required");
    validateRestartKey(options.idempotencyKey);
    const response = await wrapApiCall(() => this.client.apispec.sandboxes.restoreSandboxSnapshot({
      id: sandboxId, idempotencyKey: options.idempotencyKey,
      sandboxSnapshotRestoreRequest: { expectedRuntimeGeneration: options.expectedRuntimeGeneration, snapshotId: options.snapshotId, snapshotGenerationId: options.snapshotGenerationId, discardProcessState: options.discardProcessState },
    }));
    const operation = validateSnapshotRestoreReceipt(ensureData(response, "snapshot restore returned empty response"), sandboxId);
    if (operation.requestKey !== options.idempotencyKey || operation.fromRuntimeGeneration !== options.expectedRuntimeGeneration || operation.snapshotId !== options.snapshotId || operation.snapshotGenerationId !== options.snapshotGenerationId) {
      throw new Error("snapshot restore receipt does not match request");
    }
    return operation;
  }

  /** Historical operation status; this does not report current application health. */
  async getSnapshotRestoreOperation(sandboxId: string, operationId: string): Promise<SandboxSnapshotRestoreOperation> {
    if (!restartOperationIDPattern.test(operationId)) throw new Error("invalid snapshot restore operation ID");
    const response = await wrapApiCall(() => this.client.apispec.sandboxes.getSandboxSnapshotRestoreOperation({ id: sandboxId, operationId }));
    const operation = validateSnapshotRestoreReceipt(ensureData(response, "snapshot restore lookup returned empty response"), sandboxId);
    if (operation.id !== operationId) throw new Error("snapshot restore receipt does not match operation");
    return operation;
  }

  /** Recovers a lost acknowledgement without submitting or retrying a mutation. */
  async findSnapshotRestoreOperation(sandboxId: string, requestKey: string): Promise<SandboxSnapshotRestoreOperation> {
    validateRestartKey(requestKey);
    const response = await wrapApiCall(() => this.client.apispec.sandboxes.findSandboxSnapshotRestoreOperation({ id: sandboxId, requestKey }));
    const operation = validateSnapshotRestoreReceipt(ensureData(response, "snapshot restore lookup returned empty response"), sandboxId);
    if (operation.requestKey !== requestKey) throw new Error("snapshot restore receipt does not match request key");
    return operation;
  }

  /** Explicitly discards process state. Retain both inputs after an uncertain reply. */
  async restart(sandboxId: string, options: { expectedRuntimeGeneration: number; idempotencyKey: string }): Promise<SandboxRestartOperation> {
    if (!Number.isSafeInteger(options.expectedRuntimeGeneration) || options.expectedRuntimeGeneration < 0 || options.expectedRuntimeGeneration >= Number.MAX_SAFE_INTEGER) {
      throw new Error("expectedRuntimeGeneration must be nonnegative with a safe integer successor");
    }
    validateRestartKey(options.idempotencyKey);
    const response = await wrapApiCall(() => this.client.apispec.sandboxes.restartSandbox({
      id: sandboxId, idempotencyKey: options.idempotencyKey,
      sandboxRestartRequest: { expectedRuntimeGeneration: options.expectedRuntimeGeneration },
    }));
    const operation = validateRestartReceipt(ensureData(response, "restart returned empty response"), sandboxId);
    if (operation.requestKey !== options.idempotencyKey || operation.fromRuntimeGeneration !== options.expectedRuntimeGeneration) {
      throw new Error("restart receipt does not match request");
    }
    return operation;
  }

  /** Historical operation status; this does not report current application health. */
  async getRestartOperation(sandboxId: string, operationId: string): Promise<SandboxRestartOperation> {
    if (!restartOperationIDPattern.test(operationId)) throw new Error("invalid restart operation ID");
    const response = await wrapApiCall(() => this.client.apispec.sandboxes.getSandboxRestartOperation({ id: sandboxId, operationId }));
    const operation = validateRestartReceipt(ensureData(response, "restart lookup returned empty response"), sandboxId);
    if (operation.id !== operationId) throw new Error("restart receipt does not match operation");
    return operation;
  }

  /** Recovers a lost acknowledgement without submitting or retrying a mutation. */
  async findRestartOperation(sandboxId: string, requestKey: string): Promise<SandboxRestartOperation> {
    validateRestartKey(requestKey);
    const response = await wrapApiCall(() => this.client.apispec.sandboxes.findSandboxRestartOperation({ id: sandboxId, requestKey }));
    const operation = validateRestartReceipt(ensureData(response, "restart lookup returned empty response"), sandboxId);
    if (operation.requestKey !== requestKey) throw new Error("restart receipt does not match request key");
    return operation;
  }

  /** Durable stopped-source metadata, independent of guest execution. */
  async getSnapshotRestoreFinalCapture(sandboxId: string, operationId: string): Promise<SandboxRestartFinalCapture> {
    validateCaptureTarget(sandboxId, operationId);
    const response = await wrapApiCall(() => this.client.apispec.sandboxes.getSandboxSnapshotRestoreFinalCapture({ id: sandboxId, operationId }));
    return validateFinalCapture(ensureData(response, "final capture status missing"), sandboxId, operationId);
  }

  /** Only found=false attests absence. Errors never become logout or trigger fallback. */
  async readSnapshotRestoreFinalCaptureFile(sandboxId: string, operationId: string, captureId: string, namespace: string, name: string): Promise<RestartFinalCaptureFile> {
    validateCaptureTarget(sandboxId, operationId, captureId); validateCaptureName(namespace); validateCaptureName(name);
    const response = await wrapApiCall(() => this.client.apispec.sandboxes.readSandboxSnapshotRestoreFinalCaptureFile({ id: sandboxId, operationId, captureId, namespace, name }));
    return decodeFinalCaptureFile(ensureData(response, "final capture file response missing"), operationId, captureId);
  }

  /** Call only after durable owner commit. Retry the identical receipt after uncertainty. */
  async acknowledgeSnapshotRestoreFinalCapture(sandboxId: string, operationId: string, captureId: string, receiptId: string): Promise<SandboxRestartFinalCapture> {
    validateCaptureTarget(sandboxId, operationId, captureId); validateCaptureReceipt(receiptId);
    const response = await wrapApiCall(() => this.client.apispec.sandboxes.acknowledgeSandboxSnapshotRestoreFinalCapture({ id: sandboxId, operationId, sandboxRestartFinalCaptureAcknowledgement: { captureId, receiptId } }));
    const result = validateFinalCapture(ensureData(response, "final capture acknowledgement missing"), sandboxId, operationId);
    if (result.captureId !== captureId || result.receiptId !== receiptId || !["acknowledged", "released"].includes(result.state)) throw new Error("final capture acknowledgement changed receipt");
    return result;
  }

  /** Independent observations. Guest evidence is advisory; never resumes or restarts. */
  /** Durable stopped-source metadata, independent of guest execution. */
  async getRestartFinalCapture(sandboxId: string, operationId: string): Promise<SandboxRestartFinalCapture> {
    validateCaptureTarget(sandboxId, operationId);
    const response = await wrapApiCall(() => this.client.apispec.sandboxes.getSandboxRestartFinalCapture({ id: sandboxId, operationId }));
    return validateFinalCapture(ensureData(response, "final capture status missing"), sandboxId, operationId);
  }

  /** Only found=false attests absence. Errors never become logout or trigger fallback. */
  async readRestartFinalCaptureFile(sandboxId: string, operationId: string, captureId: string, namespace: string, name: string): Promise<RestartFinalCaptureFile> {
    validateCaptureTarget(sandboxId, operationId, captureId); validateCaptureName(namespace); validateCaptureName(name);
    const response = await wrapApiCall(() => this.client.apispec.sandboxes.readSandboxRestartFinalCaptureFile({ id: sandboxId, operationId, captureId, namespace, name }));
    return decodeFinalCaptureFile(ensureData(response, "final capture file response missing"), operationId, captureId);
  }

  /** Call only after durable owner commit. Retry the identical receipt after uncertainty. */
  async acknowledgeRestartFinalCapture(sandboxId: string, operationId: string, captureId: string, receiptId: string): Promise<SandboxRestartFinalCapture> {
    validateCaptureTarget(sandboxId, operationId, captureId); validateCaptureReceipt(receiptId);
    const response = await wrapApiCall(() => this.client.apispec.sandboxes.acknowledgeSandboxRestartFinalCapture({ id: sandboxId, operationId, sandboxRestartFinalCaptureAcknowledgement: { captureId, receiptId } }));
    const result = validateFinalCapture(ensureData(response, "final capture acknowledgement missing"), sandboxId, operationId);
    if (result.captureId !== captureId || result.receiptId !== receiptId || !["acknowledged", "released"].includes(result.state)) throw new Error("final capture acknowledgement changed receipt");
    return result;
  }

  /** Independent observations. Guest evidence is advisory; never resumes or restarts. */
  async getHealth(sandboxId: string, options?: { signal?: AbortSignal }): Promise<SandboxHealth> {
    if (typeof sandboxId !== "string" || !sandboxId || sandboxId.trim() !== sandboxId) throw new Error("invalid sandbox identity");
    const response = await wrapApiCall(() => this.client.apispec.sandboxes.getSandboxHealthRaw(
      { id: sandboxId }, options?.signal ? { signal: options.signal } : undefined,
    ));
    // The generated Date decoder normalizes missing/null and numeric dates.
    // Inspect only their wire representation before the typed conversion.
    validateSandboxHealthWireTimes(await response.raw.clone().json());
    const health = ensureData(await response.value(), "health returned empty response");
    return validateSandboxHealth(health, sandboxId);
  }

  /** Committed memory lineage; bind to owned history before adopting a restored session. */
  async getMemoryRestoration(sandboxId: string, runtimeGeneration: number): Promise<SandboxMemoryRestoration> {
    validateMemoryRestorationTarget(sandboxId, runtimeGeneration);
    const response = await wrapApiCall(() => this.client.apispec.sandboxes.getSandboxMemoryRestorationRaw({ id: sandboxId, runtimeGeneration }));
    const wire = await response.raw.clone().json();
    if (typeof wire?.data?.observed_at !== "string" || !/^\d{4}-\d{2}-\d{2}T.*(?:Z|[+-]\d{2}:\d{2})$/.test(wire.data.observed_at)) throw new Error("invalid memory restoration observation time");
    return validateMemoryRestoration(ensureData(await response.value(), "memory restoration returned empty response"), sandboxId, runtimeGeneration);
  }

  /** Read the original request without dispatching it. current is a snapshot, never a lease. */
  async lookupMemoryOperation(sandboxId: string, options: MemoryOperationLookupOptions): Promise<SandboxMemoryOperation> {
    validateMemoryOperationLookup(sandboxId, options);
    const response = await wrapApiCall(() => this.client.apispec.sandboxes.lookupSandboxMemoryOperationRaw({
      id: sandboxId, action: options.action, expectedRuntimeGeneration: options.expectedRuntimeGeneration,
      idempotencyKey: options.idempotencyKey, checkpointId: options.checkpointId,
    }));
    // Optional nulls are normalized away by the generated decoder; they are not
    // valid absent evidence in this contract.
    const wire = await response.raw.clone().json();
    if (wire?.data?.reason === null || wire?.data?.result_runtime_generation === null) throw new Error("invalid memory operation observation");
    return validateMemoryOperation(ensureData(await response.value(), "memory operation lookup returned empty response"), sandboxId, options);
  }

  /** External provenance only; never a credential-clean or storage-liveness attestation. */
  async getRootFSIdentity(sandboxId: string): Promise<SandboxRootFSIdentity> {
    if (typeof sandboxId !== "string" || !sandboxId || sandboxId.trim() !== sandboxId) throw new Error("invalid sandbox identity");
    const response = await wrapApiCall(() => this.client.apispec.sandboxRootfs.getSandboxRootFSIdentity({ id: sandboxId }));
    const identity = ensureData(response, "RootFS identity returned empty response");
    if (identity.sandboxId !== sandboxId ||
        [identity.runtimeGeneration, identity.lifecycleEpoch, identity.writerEpoch, identity.managedFilesSizeBytes].some(value => !Number.isSafeInteger(value) || value < 0) ||
        [identity.filesystemId, identity.headGenerationId, identity.baseArtifactDigest, identity.sourceOciDigest].some(value => typeof value !== "string" || !value) ||
        [identity.observedAt, identity.sandboxCreatedAt, identity.filesystemCreatedAt].some(value => !(value instanceof Date) || !Number.isFinite(value.getTime())) ||
        typeof identity.hasImportedFilesystem !== "boolean" || typeof identity.activeLifecycle !== "boolean" ||
        !["active", "paused", "terminated"].includes(identity.desiredState)) throw new Error("invalid external RootFS identity");
    for (const digest of [identity.runtimeCompatibilityDigest, identity.retainedRuntimeCompatibilityDigest]) {
      if (digest !== undefined && (typeof digest !== "string" || !/^sha256:[a-f0-9]{64}$/.test(digest) ||
          identity.desiredState !== "active" || identity.activeLifecycle || identity.runtimeGeneration <= 0)) throw new Error("invalid external runtime compatibility");
    }
    return identity;
  }

  async pause(sandboxId: string, options?: SandboxExecutionStateOptions): Promise<PauseSandboxResponse> {
    const response = await wrapApiCall(() =>
      this.client.apispec.sandboxes.apiV1SandboxesIdPausePost({
        id: sandboxId,
        sandboxPauseRequest: options === undefined ? undefined : { memory: options.memory ?? false },
      }),
    );
    return ensureData(response, "pause sandbox returned empty response");
  }

  /** Bind memory pause to one source generation. Retry with the same inputs after an uncertain reply. */
  async pauseMemoryForOperation(sandboxId: string, options: { expectedRuntimeGeneration: number; idempotencyKey: string }): Promise<PauseSandboxResponse> {
    if (!Number.isSafeInteger(options.expectedRuntimeGeneration) || options.expectedRuntimeGeneration <= 0 ||
        typeof options.idempotencyKey !== "string" || !/^[A-Za-z0-9._:-]{1,255}$/.test(options.idempotencyKey)) {
      throw new Error("invalid conditional memory pause generation or idempotency key");
    }
    const response = await wrapApiCall(() => this.client.apispec.sandboxes.apiV1SandboxesIdPausePost({
      id: sandboxId, idempotencyKey: options.idempotencyKey,
      sandboxPauseRequest: { memory: true, expectedRuntimeGeneration: options.expectedRuntimeGeneration },
    }));
    const result = ensureData(response, "conditional memory pause returned empty response");
    if (result.sandboxId !== sandboxId || result.runtimeGeneration !== options.expectedRuntimeGeneration ||
        typeof result.operationId !== "string" || !/^idem-[a-f0-9]{64}$/.test(result.operationId) || typeof result.paused !== "boolean") {
      throw new Error("conditional memory pause response does not match request");
    }
    return result;
  }

  /** Requests a pause and waits for its durable checkpoint to commit. */
  async pauseAndWait(
    sandboxId: string,
    options?: SandboxLifecycleWaitOptions,
  ): Promise<Sandbox> {
    throwIfAborted(options?.signal, "sandbox lifecycle wait was aborted");
    await this.pause(sandboxId, options);
    const sandbox = await this.waitForLifecycle(
      sandboxId,
      (sandbox) => (sandbox.status === "paused" && sandbox.paused) ||
        (options?.memory === true && sandbox.status === "failed"),
      options,
    );
    if (options?.memory && sandbox.status === "failed") {
      throw new SandboxLifecycleFailedError(sandboxId, "memory pause", sandbox);
    }
    return sandbox;
  }

  async resume(sandboxId: string, options?: SandboxExecutionStateOptions): Promise<ResumeSandboxResponse> {
    const response = await wrapApiCall(() =>
      this.client.apispec.sandboxes.apiV1SandboxesIdResumePost({
        id: sandboxId,
        sandboxExecutionStateRequest: options === undefined ? undefined : { memory: options.memory ?? false },
      }),
    );
    return ensureData(response, "resume sandbox returned empty response");
  }

  /** Restore one retained checkpoint. Retain all inputs after an uncertain reply. */
  async resumeMemoryForOperation(sandboxId: string, options: { expectedRuntimeGeneration: number; checkpointId: string; idempotencyKey: string }): Promise<ResumeSandboxResponse> {
    if (!Number.isSafeInteger(options.expectedRuntimeGeneration) || options.expectedRuntimeGeneration < 0 || options.expectedRuntimeGeneration >= Number.MAX_SAFE_INTEGER ||
        typeof options.checkpointId !== "string" || !/^[!-~]{1,256}$/.test(options.checkpointId) ||
        typeof options.idempotencyKey !== "string" || !/^[A-Za-z0-9._:-]{1,255}$/.test(options.idempotencyKey)) {
      throw new Error("invalid conditional memory resume generation, checkpoint or idempotency key");
    }
    const response = await wrapApiCall(() => this.client.apispec.sandboxes.apiV1SandboxesIdResumePost({
      id: sandboxId, idempotencyKey: options.idempotencyKey,
      sandboxExecutionStateRequest: { memory: true, expectedRuntimeGeneration: options.expectedRuntimeGeneration, checkpointId: options.checkpointId },
    }));
    const result = ensureData(response, "conditional memory resume returned empty response");
    if (result.sandboxId !== sandboxId || result.resumed !== true || result.checkpointId !== options.checkpointId ||
        result.fromRuntimeGeneration !== options.expectedRuntimeGeneration || result.runtimeGeneration !== options.expectedRuntimeGeneration + 1 ||
        typeof result.operationId !== "string" || !/^idem-[a-f0-9]{64}$/.test(result.operationId)) {
      throw new Error("conditional memory resume response does not match request");
    }
    return result;
  }

  /** Requests a resume and waits for the committed running generation. */
  async resumeAndWait(
    sandboxId: string,
    options?: SandboxLifecycleWaitOptions,
  ): Promise<Sandbox> {
    throwIfAborted(options?.signal, "sandbox lifecycle wait was aborted");
    const before = await this.getWithSignal(sandboxId, options?.signal);
    throwIfAborted(options?.signal, "sandbox lifecycle wait was aborted");
    await this.resume(sandboxId, options);

    const minimumRuntimeGeneration = before.paused || before.status === "paused"
      ? before.runtimeGeneration + 1
      : before.runtimeGeneration;
    const sandbox = await this.waitForLifecycle(
      sandboxId,
      (sandbox) => (
        sandbox.runtimeGeneration >= minimumRuntimeGeneration
        && ((sandbox.status === "running" && !sandbox.paused)
          || (options?.memory === true && sandbox.status === "failed"))
      ),
      options,
    );
    if (options?.memory && sandbox.status === "failed") {
      throw new SandboxLifecycleFailedError(sandboxId, "memory resume", sandbox);
    }
    return sandbox;
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

  /** One conditional capture. Retry uncertainty with the same key and metadata. */
  async captureRootFSSnapshot(sandboxId: string, options: CaptureSandboxRootFSSnapshotRequest & { idempotencyKey: string }): Promise<SandboxRootFSSnapshot> {
    const { idempotencyKey, ...request } = options;
    if (!sandboxId || !Number.isSafeInteger(request.expectedRuntimeGeneration) || request.expectedRuntimeGeneration <= 0 ||
        !/^[A-Za-z0-9._:-]{1,255}$/.test(idempotencyKey)) throw new Error("conditional snapshot requires a source, positive safe generation and canonical key");
    const response = await wrapApiCall(() => this.client.apispec.sandboxRootfs.captureSandboxRootFSSnapshot({
      id: sandboxId, idempotencyKey, captureSandboxRootFSSnapshotRequest: request,
    }));
    const snapshot = ensureData(response, "conditional snapshot returned no receipt");
    if (!snapshot.id || snapshot.sandboxId !== sandboxId || !Number.isFinite(snapshot.createdAt.getTime())) {
      throw new Error("conditional snapshot returned mismatched identity");
    }
    return snapshot;
  }

  /** Read only the original capture. Missing/pending results remain errors and never authorize a replacement. */
  async getCapturedRootFSSnapshot(sandboxId: string, options: { expectedRuntimeGeneration: number; idempotencyKey: string }): Promise<SandboxRootFSSnapshot> {
    if (!sandboxId || !Number.isSafeInteger(options.expectedRuntimeGeneration) || options.expectedRuntimeGeneration <= 0 ||
        !/^[A-Za-z0-9._:-]{1,255}$/.test(options.idempotencyKey)) throw new Error("snapshot observation requires a source, positive safe generation and canonical key");
    const response = await wrapApiCall(() => this.client.apispec.sandboxRootfs.getCapturedSandboxRootFSSnapshot({ id: sandboxId, ...options }));
    const snapshot = ensureData(response, "snapshot observation returned no receipt");
    if (!snapshot.id || snapshot.sandboxId !== sandboxId || !Number.isFinite(snapshot.createdAt.getTime())) {
      throw new Error("snapshot observation returned mismatched identity");
    }
    return snapshot;
  }

  /** Reads original fork provenance without retrying or submitting work. Not a state reservation or credential-safety attestation. */
  async getRootFSFork(sandboxId: string, options: { expectedRuntimeGeneration: number; idempotencyKey: string }): Promise<SandboxRootFSForkObservation> {
    if (!sandboxId || !Number.isSafeInteger(options.expectedRuntimeGeneration) || options.expectedRuntimeGeneration < 0 ||
        typeof options.idempotencyKey !== "string" || !/^[A-Za-z0-9._:-]{1,255}$/.test(options.idempotencyKey)) {
      throw new Error("fork observation requires a source, nonnegative safe generation and canonical key");
    }
    const response = await wrapApiCall(() => this.client.apispec.sandboxRootfs.getSandboxRootFSFork({ id: sandboxId, ...options }));
    const r = ensureData(response, "fork observation returned no receipt");
    if (r.sourceSandboxId !== sandboxId || r.sourceRuntimeGeneration !== options.expectedRuntimeGeneration || r.targetSandboxId === sandboxId ||
        r.targetFilesystemId !== r.targetSandboxId ||
        [r.operationId, r.targetSandboxId, r.sourceFilesystemId, r.sourceHeadGenerationId, r.targetHeadGenerationId, r.baseArtifactDigest, r.sourceOciDigest].some(v => typeof v !== "string" || !v) ||
        !Number.isSafeInteger(r.writerEpoch) || r.writerEpoch <= 0 || !Number.isSafeInteger(r.managedFilesSizeBytes) || r.managedFilesSizeBytes < 0 ||
        typeof r.autoResume !== "boolean" || typeof r.automaticRoutes !== "boolean" ||
        [r.sandboxCreatedAt, r.filesystemCreatedAt, r.observedAt].some(v => !(v instanceof Date) || !Number.isFinite(v.getTime()))) {
      throw new Error("fork observation returned mismatched identity");
    }
    return r;
  }

  /** Exactly one conditional first launch; no waiting, retry or ordinary resume fallback. */
  async launchRootFSFork(sandboxId: string, options: RootFSForkLaunchOptions): Promise<SandboxRootFSForkLaunch> {
    const q = { ...options };
    validateForkLaunchInput(sandboxId, q);
    const response = await wrapApiCall(() => this.client.apispec.sandboxRootfs.launchSandboxRootFSForkRaw({
      id: sandboxId, idempotencyKey: q.idempotencyKey,
      sandboxRootFSForkLaunchRequest: { forkOperationId: q.forkOperationId, filesystemId: q.filesystemId, headGenerationId: q.headGenerationId, writerEpoch: q.writerEpoch },
    }));
    if (![200, 202].includes(response.raw.status)) throw new Error("unexpected fork launch response status");
    validateForkLaunchWire(await response.raw.clone().json());
    const r = validateForkLaunchReceipt(ensureData(await response.value(), "fork launch returned no receipt"), sandboxId, q);
    if (response.raw.status === 202 && r.state !== "pending") throw new Error("accepted fork launch returned terminal evidence");
    return r;
  }

  /** Original-condition lookup, including completed history with current=false. Never submits work. */
  async getRootFSForkLaunch(sandboxId: string, options: RootFSForkLaunchOptions): Promise<SandboxRootFSForkLaunch> {
    const q = { ...options };
    validateForkLaunchInput(sandboxId, q);
    const response = await wrapApiCall(() => this.client.apispec.sandboxRootfs.getSandboxRootFSForkLaunchRaw({
      id: sandboxId, idempotencyKey: q.idempotencyKey, forkOperationId: q.forkOperationId,
      filesystemId: q.filesystemId, headGenerationId: q.headGenerationId, writerEpoch: q.writerEpoch,
    }));
    if (response.raw.status !== 200) throw new Error("unexpected fork launch lookup status");
    validateForkLaunchWire(await response.raw.clone().json());
    return validateForkLaunchReceipt(ensureData(await response.value(), "fork launch lookup returned no receipt"), sandboxId, q);
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

  async rebaseRootFS(
    sandboxId: string,
    request: RebaseSandboxRootFSRequest,
  ): Promise<RebaseSandboxRootFSResponse> {
    const response = await wrapApiCall(() =>
      this.client.apispec.sandboxRootfs.apiV1SandboxesIdRootfsRebasePut({
        id: sandboxId,
        rebaseSandboxRootFSRequest: request,
      }),
    );
    return ensureData(response, "rebase sandbox rootfs returned empty response");
  }

  async fork(
    sandboxId: string,
    request?: ForkSandboxRequest,
    options: ForkSandboxOptions = {},
  ): Promise<ForkSandboxResponse> {
    const generation=request?.expectedRuntimeGeneration;
    if (generation!==undefined && (!Number.isSafeInteger(generation) || generation<0 || (request?.memory && generation===Number.MAX_SAFE_INTEGER))) {
      throw new Error("invalid expected runtime generation for fork");
    }
    if ((request?.memory || generation!==undefined) && (!options.idempotencyKey?.trim() || new TextEncoder().encode(options.idempotencyKey).length > 255)) {
      throw new Error("conditional or memory fork requires a stable idempotencyKey of at most 255 bytes");
    }
    const response = await wrapApiCall(() =>
      this.client.apispec.sandboxRootfs.apiV1SandboxesIdForkPost({
        id: sandboxId,
        idempotencyKey: options.idempotencyKey,
        forkSandboxRequest: request ?? {},
      }),
    );
    return ensureData(response, "fork sandbox returned empty response");
  }

  sandbox(sandboxId: string): SandboxHandle {
    return new SandboxHandle({ id: sandboxId, client: this.client });
  }
}

const restartOperationIDPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
function validateRestartKey(key: string): void {
  if (typeof key !== "string" || !/^[A-Za-z0-9._:-]{1,255}$/.test(key)) throw new Error("invalid restart request key");
}
function validateRestartReceipt(operation: SandboxRestartOperation, sandboxId: string): SandboxRestartOperation {
  validateRestartKey(operation.requestKey);
  if (operation.sandboxId !== sandboxId || !restartOperationIDPattern.test(operation.id) ||
      !Number.isSafeInteger(operation.fromRuntimeGeneration) || operation.fromRuntimeGeneration < 0 || operation.fromRuntimeGeneration >= Number.MAX_SAFE_INTEGER ||
      !["pausing", "paused", "resuming", "succeeded", "failed", "superseded"].includes(operation.state)) {
    throw new Error("invalid restart receipt");
  }
  if (operation.state === "succeeded") {
    if (!Number.isSafeInteger(operation.resultRuntimeGeneration) || operation.resultRuntimeGeneration !== operation.fromRuntimeGeneration + 1) {
      throw new Error("invalid restart result generation");
    }
  } else if (operation.resultRuntimeGeneration !== undefined) throw new Error("uncommitted restart result generation");
  return operation;
}

function validateSnapshotRestoreIdentity(value: string): void {
  if (typeof value !== "string" || !value || value.trim() !== value || new TextEncoder().encode(value).length > 512 || value.includes("\0")) throw new Error("invalid snapshot identity");
}
function validateSnapshotRestoreReceipt(operation: SandboxSnapshotRestoreOperation, sandboxId: string): SandboxSnapshotRestoreOperation {
  validateRestartReceipt(operation, sandboxId);
  validateSnapshotRestoreIdentity(operation.snapshotId); validateSnapshotRestoreIdentity(operation.snapshotGenerationId);
  if (operation.discardProcessState !== true || operation.fromRuntimeGeneration < 1) throw new Error("invalid snapshot restore receipt");
  if (operation.restoredRootfsGenerationId !== undefined) validateSnapshotRestoreIdentity(operation.restoredRootfsGenerationId);
  if (["resuming", "succeeded"].includes(operation.state) && !operation.restoredRootfsGenerationId) throw new Error("restored head receipt missing");
  return operation;
}
