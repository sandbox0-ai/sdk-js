import { createClient, sleep } from "../_shared.ts";

async function waitForFirstEvent(stream: AsyncIterable<any>, timeoutMs: number) {
  const iterator = stream[Symbol.asyncIterator]();
  const timeout = sleep(timeoutMs).then(() => ({ timeout: true }));
  const result = await Promise.race([iterator.next(), timeout]);
  if ((result as any).timeout) {
    return null;
  }
  if ((result as IteratorResult<any>).done) {
    return null;
  }
  return (result as IteratorResult<any>).value;
}

async function main() {
  const client = createClient();
  const sandbox = await client.sandboxes.claim("default", { hardTtl: 300 });

  try {
    const dir = "/tmp/sdk-js";
    const path = `${dir}/hello.txt`;

    await sandbox.mkdir(dir, true);
    console.log("file created");

    await sandbox.writeFile(path, "hello from file\n");
    console.log("file written");

    const content = await sandbox.readFile(path);
    console.log(`file content: ${Buffer.from(content).toString("utf-8").trim()}`);

    const entries = await sandbox.listFiles(dir);
    console.log(`dir entries: ${entries.length}`);
    for (const entry of entries) {
      if (entry.path) {
        console.log(`- ${entry.path}`);
      }
    }

    const watch = await sandbox.watchFiles(dir, true);
    await sandbox.writeFile(path, "hello from file\nsecond line\n");

    const event = await waitForFirstEvent(watch.events(), 5000);
    if (event) {
      console.log(
        `watch event: type=${event.type} path=${event.path ?? ""} event=${event.event ?? ""}`,
      );
    } else {
      console.log("watch timeout");
    }
    watch.close();

    const cmdResult = await sandbox.cmd("cat /tmp/sdk-js/hello.txt");
    console.log("run output:");
    process.stdout.write(cmdResult.outputRaw);
  } finally {
    await client.sandboxes.delete(sandbox.id);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
