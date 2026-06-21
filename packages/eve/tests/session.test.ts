import assert from "node:assert";
import { describe, it } from "node:test";

import {
  createSandbox0EveSession,
  type Sandbox0ContextOutput,
  type Sandbox0ContextStream,
  type Sandbox0SessionSandbox,
} from "../src/session.ts";

describe("Sandbox0 Eve session", () => {
  it("runs commands through bash and splits stdout and stderr", async () => {
    const calls: unknown[] = [];
    const sandbox = fakeSandbox({
      cmdStream: async (command, options) => {
        calls.push({ command, options });
        return fakeContextStream([
          { source: "stdout", data: "hello\n" },
          { source: "stderr", data: "warn\n" },
        ], 7);
      },
    });
    const session = createSandbox0EveSession({
      id: "session-1",
      sandbox,
      setNetworkPolicy: async () => {},
    });

    const result = await session.run({
      command: "echo hello",
      workingDirectory: "/workspace/app",
      env: { NODE_ENV: "test" },
    });

    assert.deepStrictEqual(result, {
      exitCode: 7,
      stdout: "hello\n",
      stderr: "warn\n",
    });
    assert.deepStrictEqual(calls, [
      {
        command: "echo hello",
        options: {
          command: ["bash", "-lc", "echo hello"],
          cwd: "/workspace/app",
          envVars: { NODE_ENV: "test" },
          wait: false,
        },
      },
    ]);
  });

  it("resolves paths and reads text file line ranges", async () => {
    const session = createSandbox0EveSession({
      id: "session-1",
      sandbox: fakeSandbox({
        readFile: async (path) => {
          assert.strictEqual(path, "/workspace/log.txt");
          return new TextEncoder().encode("one\ntwo\nthree\n");
        },
      }),
      setNetworkPolicy: async () => {},
    });

    assert.strictEqual(session.resolvePath("log.txt"), "/workspace/log.txt");
    assert.strictEqual(
      await session.readTextFile({ path: "log.txt", startLine: 2, endLine: 3 }),
      "two\nthree\n",
    );
  });

  it("requires recursive=true for directories and honors force on missing paths", async () => {
    const deleted: string[] = [];
    const session = createSandbox0EveSession({
      id: "session-1",
      sandbox: fakeSandbox({
        statFile: async (path) => {
          if (path.endsWith("missing")) {
            const error = new Error("not found") as Error & { statusCode: number };
            error.statusCode = 404;
            throw error;
          }
          return { type: "dir" };
        },
        deleteFile: async (path) => {
          deleted.push(path);
        },
      }),
      setNetworkPolicy: async () => {},
    });

    await assert.rejects(
      () => session.removePath({ path: "dir" }),
      /recursive=true/,
    );
    await session.removePath({ path: "missing", force: true });
    await session.removePath({ path: "dir", recursive: true });
    assert.deepStrictEqual(deleted, ["/workspace/dir"]);
  });

  it("creates parent directories before writing nested files", async () => {
    const calls: unknown[] = [];
    const session = createSandbox0EveSession({
      id: "session-1",
      sandbox: fakeSandbox({
        mkdir: async (path, recursive) => {
          calls.push({ mkdir: path, recursive });
        },
        writeFile: async (path, data) => {
          calls.push({ writeFile: path, data: new TextDecoder().decode(data as Uint8Array) });
        },
      }),
      setNetworkPolicy: async () => {},
    });

    await session.writeTextFile({ path: "dir/file.txt", content: "hello" });

    assert.deepStrictEqual(calls, [
      { mkdir: "/workspace/dir", recursive: true },
      { writeFile: "/workspace/dir/file.txt", data: "hello" },
    ]);
  });
});

function fakeSandbox(
  overrides: Partial<Sandbox0SessionSandbox> = {},
): Sandbox0SessionSandbox {
  return {
    id: "sb_123",
    cmdStream: async () => fakeContextStream([], 0),
    readFile: async () => new Uint8Array(),
    writeFile: async () => {},
    mkdir: async () => {},
    statFile: async () => ({ type: "file" }),
    deleteFile: async () => {},
    ...overrides,
  };
}

function fakeContextStream(
  outputs: Sandbox0ContextOutput[],
  exitCode: number,
): Sandbox0ContextStream {
  return {
    async *outputs() {
      yield* outputs;
    },
    async wait() {
      return { exitCode };
    },
    sendSignal() {},
    close() {},
  };
}
