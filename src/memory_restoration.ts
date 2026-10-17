import type { SandboxMemoryRestoration } from "./apispec/src/models/index";

export function validateMemoryRestorationTarget(sandboxId: string, generation: number): void {
  if (typeof sandboxId !== "string" || !/^[A-Za-z0-9_-]+$/.test(sandboxId) || !Number.isSafeInteger(generation) || generation < 1) {
    throw new Error("invalid memory restoration target");
  }
}

/** External lineage only. The caller must bind it to owned publication/session history. */
export function validateMemoryRestoration(value: SandboxMemoryRestoration, sandboxId: string, generation: number): SandboxMemoryRestoration {
  const fail = () => { throw new Error("invalid external memory restoration"); };
  if (value.sandboxId !== sandboxId || value.runtimeGeneration !== generation ||
      typeof value.filesystemId !== "string" || !value.filesystemId ||
      typeof value.runtimeCompatibilityDigest !== "string" || !/^sha256:[a-f0-9]{64}$/.test(value.runtimeCompatibilityDigest) ||
      !(value.observedAt instanceof Date) || !Number.isFinite(value.observedAt.getTime()) ||
      !Array.isArray(value.steps) || value.steps.length < 1 || value.steps.length > 64) fail();
  let previous: number | undefined;
  for (const step of value.steps) {
    if (!step || [step.operationId, step.captureOperationId].some(id => typeof id !== "string" || id.length < 1 || id.length > 512) ||
        typeof step.restoreId !== "string" || !/^[a-f0-9]{64}$/.test(step.restoreId) ||
        !Number.isSafeInteger(step.fromRuntimeGeneration) || step.fromRuntimeGeneration < 1 ||
        !Number.isSafeInteger(step.toRuntimeGeneration) || step.toRuntimeGeneration <= step.fromRuntimeGeneration ||
        !Number.isSafeInteger(step.managedFilesSizeBytes) || step.managedFilesSizeBytes < 0 || step.managedFilesSizeBytes > 67108864 ||
        (previous !== undefined && step.fromRuntimeGeneration !== previous)) fail();
    previous = step.toRuntimeGeneration;
  }
  if (previous !== generation) fail();
  return value;
}
