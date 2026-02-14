import { apispec, createClient } from "../_shared.ts";

async function main() {
  const client = createClient();
  const sandbox = await client.sandboxes.claim("default", {
    hardTtl: 600,
    network: { mode: apispec.TplSandboxNetworkPolicyModeEnum.AllowAll },
  });

  try {
    const current = await sandbox.getNetworkPolicy();
    console.log(`current policy: ${JSON.stringify(current)}`);

    const shell =
      '/bin/curl -s -o /dev/null -w "%{http_code}\\n" --max-time 3 https://github.com';
    let resp = await sandbox.cmd(shell);
    process.stdout.write(resp.outputRaw);

    await sandbox.updateNetworkPolicy({
      mode: apispec.TplSandboxNetworkPolicyModeEnum.BlockAll,
    });
    resp = await sandbox.cmd(shell);
    process.stdout.write(resp.outputRaw);

    await sandbox.updateNetworkPolicy({
      mode: apispec.TplSandboxNetworkPolicyModeEnum.BlockAll,
      egress: { allowedDomains: ["github.com"] },
    });
    resp = await sandbox.cmd(shell);
    process.stdout.write(resp.outputRaw);
  } finally {
    await client.sandboxes.delete(sandbox.id);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
