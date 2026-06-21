import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";

export interface CommandResult {
  readonly code: number;
  readonly stderr: string;
  readonly stdout: string;
}

export interface RunCommandOptions {
  readonly cwd: string;
  readonly env?: NodeJS.ProcessEnv;
  readonly timeoutMs?: number;
}

export async function runCommand(
  command: string,
  args: readonly string[],
  options: RunCommandOptions,
): Promise<CommandResult> {
  const child = spawn(command, [...args], {
    cwd: options.cwd,
    env: options.env ?? process.env,
  });
  const output = captureOutput(child);
  const timeout = startTimeout(child, options.timeoutMs);

  const code = await new Promise<number>((resolve, reject) => {
    child.on("error", reject);
    child.on("close", (exitCode) => resolve(exitCode ?? 0));
  }).finally(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
  });

  const result = { code, stdout: output.stdout(), stderr: output.stderr() };
  if (code !== 0) {
    throw new Error(formatCommandFailure(command, args, result));
  }
  return result;
}

export function startCommand(
  command: string,
  args: readonly string[],
  options: RunCommandOptions,
): {
  readonly child: ChildProcessWithoutNullStreams;
  readonly output: CapturedOutput;
  stop(): Promise<void>;
} {
  const child = spawn(command, [...args], {
    cwd: options.cwd,
    env: options.env ?? process.env,
  });
  const output = captureOutput(child);
  startTimeout(child, options.timeoutMs);

  return {
    child,
    output,
    async stop() {
      await stopProcess(child);
    },
  };
}

export interface CapturedOutput {
  readonly combined: () => string;
  readonly stderr: () => string;
  readonly stdout: () => string;
}

function captureOutput(child: ChildProcessWithoutNullStreams): CapturedOutput {
  const stdout: string[] = [];
  const stderr: string[] = [];
  child.stdout.setEncoding("utf8");
  child.stderr.setEncoding("utf8");
  child.stdout.on("data", (chunk: string) => {
    stdout.push(chunk);
    if (process.env.S0_E2E_VERBOSE === "1") {
      process.stdout.write(chunk);
    }
  });
  child.stderr.on("data", (chunk: string) => {
    stderr.push(chunk);
    if (process.env.S0_E2E_VERBOSE === "1") {
      process.stderr.write(chunk);
    }
  });
  return {
    combined: () => `${stdout.join("")}${stderr.join("")}`,
    stderr: () => stderr.join(""),
    stdout: () => stdout.join(""),
  };
}

function startTimeout(
  child: ChildProcessWithoutNullStreams,
  timeoutMs: number | undefined,
): NodeJS.Timeout | undefined {
  if (!timeoutMs) {
    return undefined;
  }
  const timeout = setTimeout(() => {
    child.kill("SIGTERM");
    setTimeout(() => child.kill("SIGKILL"), 5_000).unref();
  }, timeoutMs);
  timeout.unref();
  return timeout;
}

export async function stopProcess(
  child: ChildProcessWithoutNullStreams,
): Promise<void> {
  if (child.exitCode !== null || child.killed) {
    return;
  }
  child.kill("SIGTERM");
  await Promise.race([
    new Promise<void>((resolve) => child.once("close", () => resolve())),
    new Promise<void>((resolve) => setTimeout(resolve, 5_000)),
  ]);
  if (child.exitCode === null && !child.killed) {
    child.kill("SIGKILL");
  }
}

function formatCommandFailure(
  command: string,
  args: readonly string[],
  result: CommandResult,
): string {
  return [
    `command failed: ${command} ${args.join(" ")}`,
    `exit code: ${result.code}`,
    result.stdout ? `stdout:\n${result.stdout}` : undefined,
    result.stderr ? `stderr:\n${result.stderr}` : undefined,
  ].filter(Boolean).join("\n");
}
