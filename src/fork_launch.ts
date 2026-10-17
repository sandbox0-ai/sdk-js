import type { SandboxRootFSForkLaunch } from "./apispec/src/models/index";

export interface RootFSForkLaunchOptions {
  forkOperationId: string;
  filesystemId: string;
  headGenerationId: string;
  /** Original pre-admission epoch, never refreshed after uncertainty. */
  writerEpoch: number;
  idempotencyKey: string;
  /** Bind a receipt received earlier for this request. */
  expectedOperationId?: string;
}

const coordinate = (v: unknown): v is string => typeof v === "string" && /^[A-Za-z0-9._:-]{1,512}$/.test(v);
const mismatch = () => new Error("fork launch receipt does not match original conditions or completion evidence");

export function validateForkLaunchInput(sandboxId: string, q: RootFSForkLaunchOptions): void {
  if (typeof sandboxId !== "string" || !sandboxId || sandboxId.length > 512 || sandboxId.trim() !== sandboxId ||
      !coordinate(q.forkOperationId) || !coordinate(q.filesystemId) || !coordinate(q.headGenerationId) ||
      !Number.isSafeInteger(q.writerEpoch) || q.writerEpoch < 1 || typeof q.idempotencyKey !== "string" ||
      !/^[A-Za-z0-9._:-]{1,255}$/.test(q.idempotencyKey) || (q.expectedOperationId !== undefined && !coordinate(q.expectedOperationId))) {
    throw new Error("invalid original fork launch conditions");
  }
}

// The generated decoder normalizes nulls and accepts numeric/unzoned Date inputs.
export function validateForkLaunchWire(wire: unknown): void {
  const r = (wire as { data?: Record<string, unknown> } | null)?.data;
  if (!r || r.launch_digest === null || r.completed_at === null ||
      (r.completed_at !== undefined && (typeof r.completed_at !== "string" ||
        !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/i.test(r.completed_at)))) throw mismatch();
}

export function validateForkLaunchReceipt(r: SandboxRootFSForkLaunch, sandboxId: string, q: RootFSForkLaunchOptions): SandboxRootFSForkLaunch {
  if (!r || r.sandboxId !== sandboxId || r.forkOperationId !== q.forkOperationId || r.filesystemId !== q.filesystemId ||
      r.headGenerationId !== q.headGenerationId || r.writerEpoch !== q.writerEpoch || r.lifecycleEpoch !== 1 ||
      !coordinate(r.operationId) || (q.expectedOperationId !== undefined && r.operationId !== q.expectedOperationId) || typeof r.current !== "boolean") throw mismatch();
  switch (r.state) {
    case "pending": case "aborted":
      if (r.runtimeGeneration !== 0 || r.launchDigest !== undefined || r.completedAt !== undefined || (r.state === "aborted" && r.current)) throw mismatch();
      break;
    case "completed":
      if (r.runtimeGeneration !== 1 || typeof r.launchDigest !== "string" || !/^[a-f0-9]{64}$/.test(r.launchDigest) ||
          !(r.completedAt instanceof Date) || !Number.isFinite(r.completedAt.getTime())) throw mismatch();
      break;
    default: throw mismatch();
  }
  return r;
}
