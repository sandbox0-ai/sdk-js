import type { SandboxMemoryOperation } from "./apispec/src/models/index";

export interface MemoryOperationLookupOptions {
  action: "pause" | "resume";
  expectedRuntimeGeneration: number;
  idempotencyKey: string;
  checkpointId?: string;
  /** Bind to an earlier receipt when one was received. */
  expectedOperationId?: string;
}

const operationPattern = /^idem-[a-f0-9]{64}$/;

export function validateMemoryOperationLookup(sandboxId: string, input: MemoryOperationLookupOptions): void {
  if (typeof sandboxId !== "string" || !sandboxId || sandboxId.trim() !== sandboxId ||
      !["pause", "resume"].includes(input.action) || !Number.isSafeInteger(input.expectedRuntimeGeneration) ||
      (input.action === "pause" ? input.expectedRuntimeGeneration <= 0 : input.expectedRuntimeGeneration < 0 || input.expectedRuntimeGeneration >= Number.MAX_SAFE_INTEGER) ||
      typeof input.idempotencyKey !== "string" || !/^[A-Za-z0-9._:-]{1,255}$/.test(input.idempotencyKey) ||
      (input.action === "pause" ? input.checkpointId !== undefined : typeof input.checkpointId !== "string" || !/^[!-~]{1,256}$/.test(input.checkpointId)) ||
      (input.expectedOperationId !== undefined && (typeof input.expectedOperationId !== "string" || !operationPattern.test(input.expectedOperationId)))) {
    throw new Error("invalid memory operation lookup request");
  }
}

export function validateMemoryOperation(result: SandboxMemoryOperation, sandboxId: string, input: MemoryOperationLookupOptions): SandboxMemoryOperation {
  if (result.sandboxId !== sandboxId || result.action !== input.action || result.fromRuntimeGeneration !== input.expectedRuntimeGeneration ||
      typeof result.operationId !== "string" || !operationPattern.test(result.operationId) ||
      (input.expectedOperationId !== undefined && result.operationId !== input.expectedOperationId) ||
      result.checkpointId !== (input.action === "pause" ? result.operationId : input.checkpointId) ||
      !Number.isSafeInteger(result.lifecycleEpoch) || result.lifecycleEpoch <= 0 || typeof result.current !== "boolean") throw mismatch();
  const resume = input.action === "resume";
  const consumesGeneration = resume && (result.state === "completed" || result.state === "failed");
  if (result.resultRuntimeGeneration !== (consumesGeneration ? input.expectedRuntimeGeneration + 1 : undefined)) throw mismatch();
  switch (result.state) {
    case "pending":
      if (result.current || result.reason !== undefined) throw mismatch();
      break;
    case "completed":
      if (result.reason !== undefined) throw mismatch();
      break;
    case "canceled":
      if (result.reason !== (resume ? "before_restore" : "before_capture")) throw mismatch();
      break;
    case "failed":
      if (result.reason !== (resume ? "restore_failed" : "capture_failed") || (!resume && result.current)) throw mismatch();
      break;
    default: throw mismatch();
  }
  return result;
}
function mismatch() { return new Error("memory operation observation does not match request or terminal evidence"); }
