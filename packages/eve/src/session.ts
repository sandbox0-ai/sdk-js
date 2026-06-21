import { posix as path } from "node:path";

import {
  WORKSPACE_ROOT,
  type EveSandboxNetworkPolicy,
  type Sandbox0EveSession,
  type SandboxCommandResult,
  type SandboxProcess,
  type SandboxReadFileOptions,
  type SandboxReadTextFileOptions,
  type SandboxRemovePathOptions,
  type SandboxRunOptions,
  type SandboxSpawnOptions,
  type SandboxWriteBinaryFileOptions,
  type SandboxWriteFileOptions,
  type SandboxWriteTextFileOptions,
} from "./types";

export interface Sandbox0ContextOutput {
  source: string;
  data: string;
}

export interface Sandbox0ContextStream {
  outputs(): AsyncGenerator<Sandbox0ContextOutput>;
  wait(): Promise<{ exitCode?: number }>;
  sendSignal(signal: string): void;
  close(): void;
}

export interface Sandbox0SessionSandbox {
  readonly id: string;
  cmdStream(
    command: string,
    options?: {
      command?: string[];
      cwd?: string;
      envVars?: Record<string, string>;
      wait?: boolean;
    },
  ): Promise<Sandbox0ContextStream>;
  readFile(path: string): Promise<Uint8Array>;
  writeFile(path: string, data: Uint8Array | string): Promise<unknown>;
  mkdir(path: string, recursive?: boolean): Promise<unknown>;
  statFile(path: string): Promise<{ type?: string }>;
  deleteFile(path: string): Promise<unknown>;
}

export interface CreateSandbox0EveSessionInput {
  readonly id: string;
  readonly sandbox: Sandbox0SessionSandbox;
  readonly setNetworkPolicy: (policy: EveSandboxNetworkPolicy) => Promise<void>;
}

export function createSandbox0EveSession(
  input: CreateSandbox0EveSessionInput,
): Sandbox0EveSession {
  const { id, sandbox, setNetworkPolicy } = input;

  return {
    id,
    resolvePath,
    async run(options: SandboxRunOptions): Promise<SandboxCommandResult> {
      const process = await spawnSandboxProcess(sandbox, options);
      const [stdout, stderr, waitResult] = await Promise.all([
        collectStreamToString(process.stdout),
        collectStreamToString(process.stderr),
        process.wait(),
      ]);
      return {
        exitCode: waitResult.exitCode,
        stdout,
        stderr,
      };
    },
    async spawn(options: SandboxSpawnOptions): Promise<SandboxProcess> {
      return spawnSandboxProcess(sandbox, options);
    },
    async readFile(options: SandboxReadFileOptions): Promise<ReadableStream<Uint8Array> | null> {
      throwIfAborted(options.abortSignal);
      try {
        return bufferToStream(await sandbox.readFile(resolvePath(options.path)));
      } catch (error) {
        if (isNotFoundError(error)) {
          return null;
        }
        throw error;
      }
    },
    async readBinaryFile(options: SandboxReadFileOptions): Promise<Uint8Array | null> {
      const stream = await this.readFile(options);
      return stream ? await streamToUint8Array(stream) : null;
    },
    async readTextFile(options: SandboxReadTextFileOptions): Promise<string | null> {
      validateReadTextFileOptions(options);
      const bytes = await this.readBinaryFile(options);
      if (bytes === null) {
        return null;
      }
      return applyLineRange(decodeBytes(bytes, options.encoding ?? "utf-8"), options);
    },
    async writeFile(options: SandboxWriteFileOptions): Promise<void> {
      throwIfAborted(options.abortSignal);
      const resolvedPath = resolvePath(options.path);
      await ensureParentDirectory(sandbox, resolvedPath);
      await sandbox.writeFile(resolvedPath, await streamToUint8Array(options.content));
    },
    async writeBinaryFile(options: SandboxWriteBinaryFileOptions): Promise<void> {
      throwIfAborted(options.abortSignal);
      const resolvedPath = resolvePath(options.path);
      await ensureParentDirectory(sandbox, resolvedPath);
      await sandbox.writeFile(resolvedPath, binaryToUint8Array(options.content));
    },
    async writeTextFile(options: SandboxWriteTextFileOptions): Promise<void> {
      throwIfAborted(options.abortSignal);
      const resolvedPath = resolvePath(options.path);
      await ensureParentDirectory(sandbox, resolvedPath);
      await sandbox.writeFile(resolvedPath, encodeString(options.content, options.encoding ?? "utf-8"));
    },
    async setNetworkPolicy(policy: EveSandboxNetworkPolicy): Promise<void> {
      await setNetworkPolicy(policy);
    },
    async removePath(options: SandboxRemovePathOptions): Promise<void> {
      throwIfAborted(options.abortSignal);
      const resolvedPath = resolvePath(options.path);
      let stat: { type?: string };
      try {
        stat = await sandbox.statFile(resolvedPath);
      } catch (error) {
        if (options.force && isNotFoundError(error)) {
          return;
        }
        throw error;
      }
      if (stat.type === "dir" && !options.recursive) {
        throw new Error(`cannot remove directory without recursive=true: ${options.path}`);
      }
      try {
        await sandbox.deleteFile(resolvedPath);
      } catch (error) {
        if (options.force && isNotFoundError(error)) {
          return;
        }
        throw error;
      }
    },
  };
}

export function resolvePath(inputPath: string): string {
  return inputPath.startsWith("/") ? inputPath : `${WORKSPACE_ROOT}/${inputPath}`;
}

export function isNotFoundError(error: unknown): boolean {
  if (!error || typeof error !== "object") {
    return false;
  }
  const candidate = error as {
    status?: unknown;
    statusCode?: unknown;
    code?: unknown;
  };
  return candidate.status === 404
    || candidate.statusCode === 404
    || candidate.code === "not_found"
    || candidate.code === "not-found";
}

async function spawnSandboxProcess(
  sandbox: Sandbox0SessionSandbox,
  options: SandboxSpawnOptions,
): Promise<SandboxProcess> {
  throwIfAborted(options.abortSignal);
  if (!options.command.trim()) {
    throw new Error("command cannot be empty");
  }

  const context = await sandbox.cmdStream(options.command, {
    command: ["bash", "-lc", options.command],
    cwd: options.workingDirectory ?? options.cwd ?? WORKSPACE_ROOT,
    envVars: options.env,
    wait: false,
  });
  return adaptContextStream(context, options.abortSignal);
}

function adaptContextStream(
  context: Sandbox0ContextStream,
  abortSignal?: AbortSignal,
): SandboxProcess {
  const encoder = new TextEncoder();
  let stdoutController: ReadableStreamDefaultController<Uint8Array> | undefined;
  let stderrController: ReadableStreamDefaultController<Uint8Array> | undefined;
  let pumpError: unknown;

  const stdout = new ReadableStream<Uint8Array>({
    start(controller) {
      stdoutController = controller;
    },
  });
  const stderr = new ReadableStream<Uint8Array>({
    start(controller) {
      stderrController = controller;
    },
  });

  const abortListener = () => {
    try {
      context.sendSignal("SIGTERM");
    } catch {
      context.close();
    }
  };
  abortSignal?.addEventListener("abort", abortListener, { once: true });

  const pumpDone = (async () => {
    try {
      for await (const output of context.outputs()) {
        const bytes = encoder.encode(output.data);
        if (output.source === "stderr") {
          stderrController?.enqueue(bytes);
        } else {
          stdoutController?.enqueue(bytes);
        }
      }
      safeClose(stdoutController);
      safeClose(stderrController);
    } catch (error) {
      pumpError = error;
      safeError(stdoutController, error);
      safeError(stderrController, error);
    }
  })();

  return {
    stdout,
    stderr,
    async wait(): Promise<{ exitCode: number }> {
      try {
        const done = await context.wait();
        await pumpDone;
        if (pumpError !== undefined) {
          throw pumpError;
        }
        return { exitCode: done.exitCode ?? 0 };
      } finally {
        abortSignal?.removeEventListener("abort", abortListener);
      }
    },
    async kill(): Promise<void> {
      try {
        context.sendSignal("SIGTERM");
      } catch {
        context.close();
      }
    },
  };
}

async function ensureParentDirectory(
  sandbox: Sandbox0SessionSandbox,
  filePath: string,
): Promise<void> {
  const parent = path.dirname(filePath);
  if (!parent || parent === "/" || parent === WORKSPACE_ROOT) {
    return;
  }
  await sandbox.mkdir(parent, true);
}

function validateReadTextFileOptions(options: SandboxReadTextFileOptions): void {
  const { startLine, endLine } = options;
  if (startLine !== undefined && (!Number.isInteger(startLine) || startLine < 1)) {
    throw new Error("startLine must be a positive integer (1-based).");
  }
  if (endLine !== undefined && (!Number.isInteger(endLine) || endLine < 1)) {
    throw new Error("endLine must be a positive integer (1-based).");
  }
  if (startLine !== undefined && endLine !== undefined && startLine > endLine) {
    throw new Error("startLine must not be greater than endLine.");
  }
}

function applyLineRange(text: string, options: SandboxReadTextFileOptions): string {
  if (options.startLine === undefined && options.endLine === undefined) {
    return text;
  }
  const lines = splitLinesPreservingEndings(text);
  const start = options.startLine ?? 1;
  const end = Math.min(options.endLine ?? lines.length, lines.length);
  return start > lines.length ? "" : lines.slice(start - 1, end).join("");
}

function splitLinesPreservingEndings(text: string): string[] {
  const lines: string[] = [];
  let start = 0;
  for (let i = 0; i < text.length; i += 1) {
    if (text[i] === "\r") {
      if (i + 1 < text.length && text[i + 1] === "\n") {
        lines.push(text.slice(start, i + 2));
        start = i + 2;
        i += 1;
      } else {
        lines.push(text.slice(start, i + 1));
        start = i + 1;
      }
    } else if (text[i] === "\n") {
      lines.push(text.slice(start, i + 1));
      start = i + 1;
    }
  }
  if (start < text.length) {
    lines.push(text.slice(start));
  }
  return lines;
}

async function collectStreamToString(stream: ReadableStream<Uint8Array>): Promise<string> {
  return new TextDecoder().decode(await streamToUint8Array(stream));
}

async function streamToUint8Array(stream: ReadableStream<Uint8Array>): Promise<Uint8Array> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      chunks.push(value);
      total += value.byteLength;
    }
  } finally {
    reader.releaseLock();
  }

  const output = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    output.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return output;
}

function bufferToStream(buffer: Uint8Array): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(buffer);
      controller.close();
    },
  });
}

function binaryToUint8Array(content: Uint8Array | ArrayBuffer | ArrayBufferView): Uint8Array {
  if (content instanceof Uint8Array) {
    return content;
  }
  if (content instanceof ArrayBuffer) {
    return new Uint8Array(content);
  }
  return new Uint8Array(content.buffer, content.byteOffset, content.byteLength);
}

function decodeBytes(bytes: Uint8Array, encoding: BufferEncoding | "utf-8" | "utf8"): string {
  if (encoding === "utf-8" || encoding === "utf8") {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  }
  return Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength).toString(encoding);
}

function encodeString(text: string, encoding: BufferEncoding | "utf-8" | "utf8"): Uint8Array {
  if (encoding === "utf-8" || encoding === "utf8") {
    return new TextEncoder().encode(text);
  }
  return Buffer.from(text, encoding);
}

function throwIfAborted(signal?: AbortSignal): void {
  if (!signal?.aborted) {
    return;
  }
  if (signal.reason instanceof Error) {
    throw signal.reason;
  }
  const error = new Error("The operation was aborted");
  error.name = "AbortError";
  throw error;
}

function safeClose(
  controller: ReadableStreamDefaultController<Uint8Array> | undefined,
): void {
  try {
    controller?.close();
  } catch {
    // The consumer may have already canceled the stream.
  }
}

function safeError(
  controller: ReadableStreamDefaultController<Uint8Array> | undefined,
  error: unknown,
): void {
  try {
    controller?.error(error);
  } catch {
    // The consumer may have already canceled the stream.
  }
}
