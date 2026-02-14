import { createClient } from "../_shared.ts";

async function main() {
  const client = createClient();
  const sandbox = await client.sandboxes.claim("default", { hardTtl: 300 });

  try {
    let runResult = await sandbox.run("python", "x = 2");
    process.stdout.write(runResult.outputRaw);

    runResult = await sandbox.run("python", "print(x)");
    process.stdout.write(runResult.outputRaw);

    console.log('\nRunning command: /bin/sh -c "x=3"');
    await sandbox.cmd('/bin/sh -c "x=3"');

    console.log('Running command: /bin/sh -c "echo $x"');
    const cmdResult = await sandbox.cmd('/bin/sh -c "echo $x"');
    process.stdout.write(cmdResult.outputRaw);
  } finally {
    await client.sandboxes.delete(sandbox.id);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
