import { models } from "./apispec_compat";
import type { SandboxHealth } from "./apispec/src/models/index";

const {
  SandboxHealthDesiredStateEnum,
  SandboxHealthObservationReasonEnum,
  SandboxHealthObservationSourceEnum,
  SandboxHealthObservationStateEnum,
} = models;

function validDate(value: unknown): value is Date {
  return value instanceof Date && Number.isFinite(value.getTime());
}

// Require an RFC3339 time with an explicit zone, as declared by the contract.
function validWireTime(value: unknown): boolean {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/i.test(value) && Number.isFinite(Date.parse(value));
}

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("invalid sandbox health observation");
  return value as Record<string, unknown>;
}

export function validateSandboxHealthWireTimes(response: unknown): void {
  const data = record(record(response).data);
  if (!validWireTime(data.observed_at)) throw new Error("invalid sandbox health observation time");
  const runtime = record(data.runtime);
  const storage = record(data.storage);
  for (const value of [runtime.launch_authority, runtime.liveness, data.execution, data.terminal, storage.identity, storage.writer_authority, storage.io]) {
    const check = record(value);
    if (!("observed_at" in check) || (check.observed_at !== null && !validWireTime(check.observed_at))) {
      throw new Error("invalid sandbox health observation time");
    }
  }
}

export function validateSandboxHealth(health: SandboxHealth, sandboxId: string): SandboxHealth {
  if (health.sandboxId !== sandboxId ||
      [health.runtimeGeneration, health.lifecycleEpoch].some(value => !Number.isSafeInteger(value) || value < 0) ||
      typeof health.activeLifecycle !== "boolean" || !validDate(health.observedAt) ||
      !Object.values(SandboxHealthDesiredStateEnum).includes(health.desiredState)) {
    throw new Error("invalid sandbox health observation");
  }
  for (const check of [health.runtime.launchAuthority, health.runtime.liveness, health.execution, health.terminal, health.storage.identity, health.storage.writerAuthority, health.storage.io]) {
    if (!Object.values(SandboxHealthObservationStateEnum).includes(check.state) ||
        !Object.values(SandboxHealthObservationReasonEnum).includes(check.reason) ||
        !Object.values(SandboxHealthObservationSourceEnum).includes(check.source) ||
        (check.source === SandboxHealthObservationSourceEnum.HealthSourceNone
          ? check.state !== SandboxHealthObservationStateEnum.HealthUnknown || check.observedAt !== null
          : !validDate(check.observedAt))) {
      throw new Error("invalid sandbox health observation");
    }
  }
  return health;
}
