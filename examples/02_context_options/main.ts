import { createClient } from "../_shared.ts";
import { ProcessType } from "../../src/apispec/src/models/index.ts";

async function main() {
  const client = createClient();
  const sandbox = await client.sandboxes.claim("default", { hardTtl: 300 });

  try {
    // Create a custom REPL context with specific cwd, env vars, and TTL.
    // This is useful when you need fine-grained control over the context settings.
    const customCtx = await sandbox.createContext({
      type: ProcessType.Repl,
      repl: { alias: "python" },
      cwd: "/workspace",
      envVars: { GREETING: "hello from repl" },
      ttlSec: 120,
      idleTimeoutSec: 60,
    });
    console.log(`Created context: ${customCtx.id}`);

    // Run using the custom context via contextId.
    const runResult = await sandbox.run(
      "python",
      `import os, pathlib; print(pathlib.Path.cwd()); print(os.getenv("GREETING"))`,
      { contextId: customCtx.id },
    );
    process.stdout.write(runResult.outputRaw);

    // Cmd always creates a new context, so options work directly.
    const cmdResult = await sandbox.cmd("bash -c 'echo $GREETING && pwd'", {
      cwd: "/tmp",
      envVars: { GREETING: "hello from cmd" },
      ttlSec: 120,
      idleTimeoutSec: 60,
    });
    console.log("cmd output:");
    process.stdout.write(cmdResult.outputRaw);
  } finally {
    await client.sandboxes.delete(sandbox.id);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
