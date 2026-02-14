import { createClient, sleep } from "../_shared.ts";

async function main() {
  const client = createClient();
  const sandbox = await client.sandboxes.claim("default", {
    autoResume: true,
  });

  try {
    const htmlContent = "<html><body><h1>Hello from Sandbox0!</h1></body></html>";
    await sandbox.writeFile("/tmp/index.html", htmlContent);
    console.log("Uploaded index.html via file upload API");

    console.log("Starting web server on port 8080...");
    const serverResult = await sandbox.cmd(
      "python3 -m http.server 8080 --directory /tmp",
      { wait: false },
    );
    console.log(`Server started, context: ${serverResult.contextId}`);

    await sleep(2000);

    console.log("Exposing port 8080...");
    const portsResp = await sandbox.exposePort(8080, true);
    console.log(`Exposure domain: ${portsResp.exposureDomain ?? ""}`);
    console.log("Exposed ports:");
    for (const p of portsResp.ports) {
      console.log(
        `  - Port: ${p.port}, Resume: ${p.resume}, PublicURL: ${p.publicUrl ?? ""}`,
      );
    }

    console.log("Verifying server is running...");
    const resp = await sandbox.cmd("curl -s http://localhost:8080/index.html");
    console.log(`Server response:\n${resp.outputRaw}`);

    const allPorts = await sandbox.getExposedPorts();
    console.log("All exposed ports:");
    for (const p of allPorts.ports) {
      console.log(
        `  - Port: ${p.port}, Resume: ${p.resume}, PublicURL: ${p.publicUrl ?? ""}`,
      );
    }
  } finally {
    await client.sandboxes.delete(sandbox.id);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
