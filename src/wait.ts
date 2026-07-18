export function validateWaitDuration(
  name: string,
  value: number,
  allowZero: boolean,
): void {
  if (!Number.isFinite(value) || (allowZero ? value < 0 : value <= 0)) {
    const requirement = allowZero ? "a finite number >= 0" : "a finite number > 0";
    throw new RangeError(`${name} must be ${requirement}`);
  }
}

function abortReason(signal: AbortSignal, fallbackMessage: string): unknown {
  if (signal.reason !== undefined) {
    return signal.reason;
  }
  const error = new Error(fallbackMessage);
  error.name = "AbortError";
  return error;
}

export function throwIfAborted(
  signal: AbortSignal | undefined,
  fallbackMessage: string,
): void {
  if (signal?.aborted) {
    throw abortReason(signal, fallbackMessage);
  }
}

export function sleepWithSignal(
  durationMs: number,
  signal: AbortSignal | undefined,
  fallbackMessage: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(abortReason(signal, fallbackMessage));
      return;
    }

    let settled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const onAbort = () => {
      if (settled) {
        return;
      }
      settled = true;
      if (timer !== undefined) {
        clearTimeout(timer);
      }
      signal?.removeEventListener("abort", onAbort);
      reject(signal ? abortReason(signal, fallbackMessage) : new Error(fallbackMessage));
    };
    timer = setTimeout(() => {
      if (settled) {
        return;
      }
      settled = true;
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, durationMs);
    signal?.addEventListener("abort", onAbort, { once: true });
    if (signal?.aborted) {
      onAbort();
    }
  });
}
