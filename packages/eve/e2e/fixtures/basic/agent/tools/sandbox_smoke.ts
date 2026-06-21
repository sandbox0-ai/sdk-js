import { defineTool } from "eve/tools";
import { z } from "zod";

export default defineTool({
  description: "Run a deterministic smoke test against the configured Eve sandbox backend.",
  inputSchema: z.object({}),
  async execute(_input, ctx) {
    const sandbox = await ctx.getSandbox();
    const bootstrap = await sandbox.readTextFile({ path: "bootstrap.txt" });
    const commandSeed = await sandbox.readTextFile({ path: "bootstrap-command.txt" });
    const seed = await sandbox.readTextFile({ path: "seed.txt" });
    const onSession = await sandbox.readTextFile({ path: "on-session.txt" });

    await sandbox.writeTextFile({ path: "nested/live.txt", content: "live-ok" });
    const command = await sandbox.run({
      command: "printf stdout-ok; printf stderr-ok >&2",
    });
    const live = await sandbox.readTextFile({ path: "nested/live.txt" });

    return {
      bootstrap,
      command,
      commandSeed,
      live,
      onSession,
      seed,
      sandboxId: sandbox.id,
    };
  },
});
