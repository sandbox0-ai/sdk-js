import { createClient } from "../_shared.ts";

async function main() {
  const client = createClient();
  const sandbox = await client.sandboxes.claim("default", { hardTtl: 300 });

  try {
    const runResult = await sandbox.run(
      "python",
      "import os, pathlib\nprint(pathlib.Path.cwd())\nprint(os.getenv('GREETING'))",
      {
        cwd: "/workspace",
        envVars: { GREETING: "hello from repl" },
        ttlSec: 120,
        idleTimeoutSec: 60,
      },
    );
    process.stdout.write(runResult.outputRaw);

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
