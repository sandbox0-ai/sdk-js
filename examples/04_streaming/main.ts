import { createClient } from "../_shared.ts";

async function main() {
  const client = createClient();
  const sandbox = await client.sandboxes.claim("default", { hardTtl: 300 });

  try {
    // Example 1: REPL stream using createContext + connectWsContext
    console.log("REPL stream:");
    const replCtx = await sandbox.createContext({
      type: "repl",
      repl: { language: "python" },
    });
    const replStream = await sandbox.connectWsContext(replCtx.id);

    // Consume outputs in background
    const outputPromise = (async () => {
      for await (const output of replStream.outputs()) {
        process.stdout.write(output.data);
      }
    })();

    // Send inputs while outputs are being consumed
    replStream.sendInput("print('hello from repl')\n");
    replStream.sendInput("print(1 + 2)\n");

    // Wait briefly for server to process inputs before closing
    await new Promise((resolve) => setTimeout(resolve, 1000));
    replStream.close();

    await outputPromise;

    // Example 2: CMD stream using createContext + connectWsContext
    console.log("\nCMD stream:");
    const cmdCtx = await sandbox.createContext({
      type: "cmd",
      cmd: { command: ["bash", "-c", "for i in 1 2 3; do echo line-$i; done"] },
      waitUntilDone: false,
    });
    const cmdStream = await sandbox.connectWsContext(cmdCtx.id);

    for await (const output of cmdStream.outputs()) {
      process.stdout.write(output.data);
    }
    await sandbox.deleteContext(cmdCtx.id);

    // Example 3: Using writable stream for input with backpressure
    console.log("\nWritable stream input:");
    const streamCtx = await sandbox.createContext({
      type: "repl",
      repl: { language: "python" },
    });
    const stream = await sandbox.connectWsContext(streamCtx.id);
    const writer = stream.writable.getWriter();

    const readPromise = (async () => {
      for await (const output of stream.outputs()) {
        process.stdout.write(output.data);
      }
    })();

    await writer.write({ type: "input", data: "for i in range(3): print(f'item {i}')\n\n" });
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await writer.close();

    await readPromise;
  } finally {
    await client.sandboxes.delete(sandbox.id);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
