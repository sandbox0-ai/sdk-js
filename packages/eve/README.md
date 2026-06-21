# @sandbox0/eve

Vercel Eve sandbox backend adapter for Sandbox0.

## Installation

Eve 0.11.x requires Node.js 24 or newer.

```bash
npm install eve sandbox0 @sandbox0/eve
```

## Usage

```ts
import { defineSandbox } from "eve/sandbox";
import { sandbox0 } from "@sandbox0/eve";

export default defineSandbox({
  backend: sandbox0({
    template: "default",
    networkPolicy: "allow-all",
  }),
  async bootstrap({ use }) {
    const sandbox = await use();
    await sandbox.run({ command: "npm install" });
  },
});
```

The adapter reads `SANDBOX0_TOKEN` or `SANDBOX0_API_KEY` by default. Set
`SANDBOX0_BASE_URL` for non-default regional gateways.

## Behavior

- Eve `prewarm()` claims a Sandbox0 sandbox, runs `bootstrap`, writes seed files, pauses the prewarm sandbox, then captures a rootfs snapshot.
- Paused prewarm sandboxes get `hardTtl: 3600` by default so they do not remain forever. Override with `prewarmSandboxHardTtlSec`, or set it to `null` to omit the adapter-managed hard TTL.
- Eve `create()` claims a live Sandbox0 sandbox from the prewarmed rootfs snapshot.
- The adapter stores the Eve `templateKey` to Sandbox0 `snapshotId` mapping under `.eve/sandbox0/`.
- `captureState()` stores `sandboxId`; later Eve resumes that Sandbox0 sandbox through `existingMetadata`.
- `dispose()` keeps the sandbox by default. Pass `dispose: "delete"` to delete it when Eve releases the handle.

## Network Policy

Supported Eve policies:

- `"allow-all"`
- `"deny-all"`
- object policies with domain `allow` and subnet `allow`/`deny`

Vercel `transform` and `forwardURL` rules are rejected because Sandbox0's
credential injection model is explicit credential binding, not raw header
rewriting in this adapter.

## Current Limits

Call Eve's prewarm/build flow before serving requests so the `.eve/sandbox0/`
template registry exists for runtime sandbox creation.
