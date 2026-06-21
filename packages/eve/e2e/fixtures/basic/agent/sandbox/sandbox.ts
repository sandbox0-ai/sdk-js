import "../proxy";

import { defineSandbox } from "eve/sandbox";
import { sandbox0 } from "@sandbox0/eve";

const hardTtlSec = Number.parseInt(
  process.env.SANDBOX0_EVE_E2E_SANDBOX_HARD_TTL_SEC ?? "900",
  10,
);

export default defineSandbox({
  backend: sandbox0({
    config: { hardTtl: Number.isFinite(hardTtlSec) ? hardTtlSec : 900 },
    dispose: "delete",
    networkPolicy: "allow-all",
    prewarmSandboxHardTtlSec: Number.isFinite(hardTtlSec) ? hardTtlSec : 900,
    template: process.env.SANDBOX0_TEMPLATE ?? "default",
  }),
  revalidationKey: () => "sandbox0-eve-e2e-v1",
  async bootstrap({ use }) {
    const sandbox = await use();
    await sandbox.writeTextFile({ path: "bootstrap.txt", content: "bootstrap-ok" });
    const result = await sandbox.run({
      command: "printf command-ok > /workspace/bootstrap-command.txt",
    });
    if (result.exitCode !== 0) {
      throw new Error(`bootstrap command failed: ${result.stderr}`);
    }
  },
  async onSession({ use }) {
    const sandbox = await use({ networkPolicy: "allow-all" });
    await sandbox.writeTextFile({ path: "on-session.txt", content: "session-ok" });
  },
});
