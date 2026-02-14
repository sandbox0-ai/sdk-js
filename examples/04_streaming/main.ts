import { createClient, sleep } from "../_shared.ts";

async function readStream(stream: AsyncIterable<{ data: string }>) {
  for await (const output of stream) {
    process.stdout.write(output.data);
  }
}

async function main() {
  const client = createClient();
  const sandbox = await client.sandboxes.claim("default", { hardTtl: 300 });

  try {
    console.log("REPL stream:");
    const replStream = await sandbox.runStream("python");
    replStream.sendInput("print('hello from repl')");
    replStream.sendInput("print(1 + 2)");
    await sleep(500);
    replStream.close();
    await readStream(replStream.outputs());

    console.log("CMD stream:");
    const cmdStream = await sandbox.cmdStream(
      'bash -c "for i in 1 2 3; do echo line-$i; done"',
    );
    await sleep(3000);
    cmdStream.close();
    await readStream(cmdStream.outputs());
    await sandbox.deleteContext(cmdStream.id);
  } finally {
    await client.sandboxes.delete(sandbox.id);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
