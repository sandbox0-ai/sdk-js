import type { SandboxRestartFinalCapture, SandboxRestartFinalCaptureFile } from "./apispec/src/models/index";

const operationPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const capturePattern = /^[a-f0-9]{64}$/;
export type RestartFinalCaptureFile = Omit<SandboxRestartFinalCaptureFile, "content"> & { content: Uint8Array };

export function validateCaptureTarget(sandbox: string, operation: string, capture?: string): void {
  if (typeof sandbox !== "string" || !sandbox || sandbox.trim() !== sandbox || sandbox === "." || sandbox === ".." || typeof operation !== "string" || !operationPattern.test(operation) ||
      (arguments.length >= 3 && (typeof capture !== "string" || !capturePattern.test(capture)))) throw new Error("invalid restart final capture identity");
}
export function validateCaptureName(name: string): void {
  if (typeof name !== "string" || !/^[A-Za-z0-9._-]{1,128}$/.test(name) || name === "." || name === ".." || name.startsWith(".s0-write-")) throw new Error("invalid final capture file name or namespace");
}
export function validateCaptureReceipt(receipt: string): void {
  if (typeof receipt !== "string" || !/^[A-Za-z0-9._:-]{1,255}$/.test(receipt)) throw new Error("invalid final capture receipt");
}
export function validateFinalCapture(value: SandboxRestartFinalCapture, sandbox: string, operation: string): SandboxRestartFinalCapture {
  if (value.sandboxId !== sandbox || value.operationId !== operation || !Number.isSafeInteger(value.fromRuntimeGeneration) || value.fromRuntimeGeneration < 1 ||
      !["pending", "stopped", "acknowledged", "released"].includes(value.state)) throw new Error("invalid final capture status");
  if (value.state === "pending") {
    if (value.captureId !== undefined || value.stoppedAt !== undefined || value.receiptId !== undefined) throw new Error("pending final capture has a receipt");
  } else {
    if (typeof value.captureId !== "string" || !capturePattern.test(value.captureId) || !(value.stoppedAt instanceof Date) || !Number.isFinite(value.stoppedAt.getTime())) throw new Error("invalid stopped capture identity");
    if (value.state === "stopped") {
      if (value.receiptId !== undefined) throw new Error("unacknowledged capture has a receipt");
    } else validateCaptureReceipt(value.receiptId!);
  }
  return value;
}
export function decodeFinalCaptureFile(value: SandboxRestartFinalCaptureFile, operation: string, capture: string): RestartFinalCaptureFile {
  if (value.operationId !== operation || value.captureId !== capture || !Number.isSafeInteger(value.runtimeGeneration) || value.runtimeGeneration < 1 ||
      typeof value.found !== "boolean" || !Number.isSafeInteger(value.sizeBytes) || value.sizeBytes < 1048576 || value.sizeBytes > 67108864 ||
      typeof value.mutationSequence !== "string" || !/^(0|[1-9][0-9]{0,19})$/.test(value.mutationSequence) || BigInt(value.mutationSequence) > 18446744073709551615n) throw new Error("invalid final capture file authority");
  try {
    if (typeof value.content !== "string" || value.content.length > 4 * Math.ceil(4194304 / 3)) throw new Error();
    const binary = atob(value.content);
    if (binary.length > 4194304 || btoa(binary) !== value.content || (!value.found && binary.length !== 0)) throw new Error();
    return { ...value, content: Uint8Array.from(binary, c => c.charCodeAt(0)) };
  } catch { throw new Error("invalid final capture file content"); }
}
