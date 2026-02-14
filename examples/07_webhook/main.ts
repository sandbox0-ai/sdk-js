import { createClient, mustEnv } from "../_shared.ts";

async function main() {
  const webhookUrl = mustEnv("SANDBOX0_WEBHOOK_URL");
  const webhookSecret = process.env.SANDBOX0_WEBHOOK_SECRET;

  const client = createClient();
  const baseDir = "/tmp33/webhook-demo";
  const sandbox = await client.sandboxes.claim("default", {
    hardTtl: 300,
    webhook: {
      url: webhookUrl,
      secret: webhookSecret,
      watchDir: baseDir,
    },
  });

  try {
    await sandbox.run("bash", "echo webhook test");
    console.log("process started");

    await client.sandboxes.pause(sandbox.id);
    console.log("sandbox paused");
    await client.sandboxes.resume(sandbox.id);
    console.log("sandbox resumed");

    try {
      await sandbox.cmd('/bin/sh -c "exit 2"');
    } catch (err) {
      console.log(`expected command error: ${err}`);
    }
    console.log("process crashed");

    await sandbox.mkdir(baseDir, true);
    await sandbox.writeFile(`${baseDir}/file.txt`, "hello");
    await sandbox.moveFile(`${baseDir}/file.txt`, `${baseDir}/file-renamed.txt`);
    await sandbox.cmd(
      `/bin/sh -c "chmod 600 ${baseDir.replace(/\/$/, "")}/file-renamed.txt"`,
    );
    await sandbox.deleteFile(`${baseDir}/file-renamed.txt`);
    console.log("file modified");
  } finally {
    await client.sandboxes.delete(sandbox.id);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
