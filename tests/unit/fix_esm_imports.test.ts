import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { join } from "node:path";
import { describe, it } from "node:test";

const execFileAsync = promisify(execFile);
const rewriteScript = fileURLToPath(
  new URL("../../scripts/fix-esm-imports.mjs", import.meta.url),
);

describe("ESM declaration rewriting", () => {
  it("rewrites relative module augmentations for NodeNext consumers", async () => {
    const directory = await mkdtemp(join(tmpdir(), "sandbox0-sdk-js-esm-"));
    const declaration = join(directory, "sandbox_sessions.d.ts");
    try {
      await writeFile(
        declaration,
        [
          'import type { Sandbox } from "./sandbox";',
          'declare module "./sandbox" {',
          "  interface Sandbox { listSessions(): Promise<unknown[]>; }",
          "}",
          "",
        ].join("\n"),
      );

      await execFileAsync(process.execPath, [rewriteScript, directory]);

      assert.strictEqual(
        await readFile(declaration, "utf8"),
        [
          'import type { Sandbox } from "./sandbox.js";',
          'declare module "./sandbox.js" {',
          "  interface Sandbox { listSessions(): Promise<unknown[]>; }",
          "}",
          "",
        ].join("\n"),
      );
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });
});
