# Sandbox0 JavaScript/TypeScript SDK

The official JavaScript/TypeScript SDK for Sandbox0, providing typed models and ergonomic high-level APIs for managing secure code execution sandboxes.

> This SDK remains open source. Current Sandbox0 runtime development is closed source.
> Sandbox0 Cloud is the supported service. Self-hosting is no longer supported.
> Bring Your Own Cloud (BYOC) is planned and is not available yet.
> See [deployment options](https://sandbox0.ai/docs/sandbox/deployment).

## Installation

```bash
npm install sandbox0
# or
yarn add sandbox0
# or
pnpm add sandbox0
```

## Requirements

- Node.js 18.0.0 or later

Streaming APIs prefer a runtime-native `globalThis.WebSocket` when a Node-compatible host exposes one, and fall back to the `ws` package on older Node runtimes. This keeps the main SDK entry compatible with SandFunc-style runtimes that expose a standard outbound WebSocket client without requiring raw socket access in user code.

## RootFS capacity

Template `resources.ephemeralStorage` sets the initial RootFS filesystem capacity
for image imports: the default is `8Gi`, and supported values are `300Mi` through
`1Ti`, aligned to 4096 bytes. On deployments with automatic growth enabled, XFS
expands online within the configured sparse-device ceiling while the sandbox's
processes continue running. Existing generations retain their committed geometry.

Persistent blocks reside in regional object storage. Compute nodes retain bounded
caches and write journals; slow or unavailable storage can apply write backpressure.
The initial size is distinct from stored data usage and service storage quotas.
Automatic growth requires operator enablement; see the
[deployment guide](https://github.com/sandbox0-ai/sandbox0/blob/main/deploy/nomad/rootfs-autogrow.md).

## Configuration

| Environment Variable | Required | Default                   | Description          |
|---------------------|----------|---------------------------|----------------------|
| `SANDBOX0_TOKEN`    | Yes      | -                         | API authentication token |
| `SANDBOX0_BASE_URL` | No       | `https://api.sandbox0.ai` | API base URL         |

## Quick Start

```typescript
import { Client } from "sandbox0";

const client = new Client({
  token: process.env.SANDBOX0_TOKEN!,
});

async function main() {
  // Claim a sandbox
  const sandbox = await client.sandboxes.claim("default");

  try {
    // Execute Python code (REPL - stateful)
    const result = await sandbox.run("python", "print('Hello, Sandbox0!')");
    process.stdout.write(result.outputRaw);
  } finally {
    // Cleanup
    await client.sandboxes.delete(sandbox.id);
  }
}

main().catch(console.error);
```

## CMD Streaming

```typescript
const stream = await sandbox.cmdStream("sh -c 'echo hello && echo warn >&2'", {
  command: ["sh", "-c", "echo hello && echo warn >&2"],
});

for await (const output of stream.outputs()) {
  process.stdout.write(output.data);
}

const done = await stream.wait();
console.log(`exit=${done.exitCode} state=${done.state}`);
```

## Documentation

- [Sandbox0 docs](https://sandbox0.ai/docs)

## Wait For Lifecycle Changes

Pause is accepted before its rootfs checkpoint is fully committed. Use the
waiting helpers when the next operation depends on committed lifecycle state:

```typescript
const paused = await client.sandboxes.pauseAndWait(sandbox.id, {
  timeoutMs: 120_000,
  signal: abortController.signal,
});

const resumed = await client.sandboxes.resumeAndWait(paused.id);
console.log(resumed.status, resumed.runtimeGeneration);
```

`waitForLifecycle()` is available for other committed-state conditions. Aborting
a wait stops polling locally; it does not undo a pause or resume already accepted
by Sandbox0.

## Create A Template From A Sandbox

Capture the current root filesystem of an existing sandbox into a new template:

```typescript
const template = await client.templates.createFromSandbox(
  {
    templateId: "python-ready",
    sandboxId: sandbox.id,
    specOverrides: {
      displayName: "Python Ready",
      tags: ["python"],
    },
  },
  {
    idempotencyKey: "python-ready-v1",
    wait: true,
    timeoutMs: 10 * 60_000,
  },
);

console.log(template.templateId, template.status?.creation?.state);
```

Without `wait: true`, creation returns as soon as Sandbox0 accepts the request.
The rootfs capture point is `status.creation.capturedAt`, not request
acceptance, so keep the source sandbox available until capture completes. A
running source is briefly write-barriered and remains running afterward.
`waitUntilReady()` can wait for the same template later. Aborting a wait only
stops local polling; it does not cancel creation of the immutable RootFS base on
the server.

## Runtime Metrics

`getMetrics()` returns bounded, chart-ready sandbox metrics. Each series is split
into segments at runtime restarts and collector resets, so chart segments should
not be connected across those boundaries.

```typescript
import { SandboxRuntimeMetricName } from "sandbox0";

const metrics = await sandbox.getMetrics({
  startTime: new Date(Date.now() - 60 * 60 * 1000),
  metrics: [
    SandboxRuntimeMetricName.SandboxCpuUtilization,
    SandboxRuntimeMetricName.SandboxMemoryUtilization,
  ],
  maxPoints: 240,
});

for (const series of metrics.series) {
  for (const segment of series.segments) {
    console.log(series.metric, segment.points);
  }
}
```

Use `sandbox.getMetricsCatalog()` to discover metric kinds, units, and
dimensions supported by the API.

## Tenant Usage Windows

`client.usage.listWindows()` incrementally reads immutable, closed usage
windows for the team derived from the SDK token. The API never accepts a team
id from the caller. Retain `nextCursor` only after durably processing the
returned page.

```typescript
let cursor: string | undefined;

do {
  const page = await client.usage.listWindows({
    cursor,
    limit: 1000,
    windowType: "sandbox.runtime_mib_milliseconds",
  });

  for (const window of page.windows) {
    console.log(
      window.sandboxId,
      window.windowStart,
      window.windowEnd,
      window.value,
      window.unit,
    );
  }

  cursor = page.nextCursor || undefined;
} while (cursor);
```

The token needs `usage:read`, and the Sandbox0 region must have metering and
its ClickHouse query projection enabled. `GET /api/v1/quotas` reports current
operational quota status; it is not a cumulative usage API.

## Independent sandbox health (unreleased)

```typescript
const health = await client.sandboxes.getHealth(sandboxId, {
  signal: AbortSignal.timeout(10_000),
});
console.log(health.runtime.liveness.state, health.execution.state, health.terminal.state);
```

Generations outside JavaScript's safe integer range are rejected rather than rounded.

Health is returned as separate runtime launch/liveness, execution, terminal,
and storage identity/writer/I/O observations. Each includes `state`, a fixed
`reason`, its evidence `source`, and the original observation time (null when
unobserved). Guest evidence is advisory. A storage identity or writer lease does
not prove current storage I/O; that check currently remains `unknown`.

The query may run bounded fixed guest diagnostics, but never resumes or restarts
a sandbox. Paused sandboxes and active lifecycle transitions skip those probes.
Unavailable guest diagnostics are a successful observation response, not an API
failure or a reason to retry a lifecycle mutation. This API requires a server
version with the health endpoint; SDKs do not fall back to guest commands.

## Links

- [Documentation](https://sandbox0.ai/docs)
- [API Reference](https://sandbox0.ai/docs/api)
- [GitHub Repository](https://github.com/sandbox0-ai/sdk-js)

## License

Apache-2.0


Conditional session receipts can be read without auto-resume or process creation:
`sandbox.findConditionalSession(originalKey, generation)`.
This uses the distinct `/sessions/conditional/lookup` route and checks the original
generation. Errors never fall back to ordinary lookup or creation. A missing
receipt does not authorize replay: an earlier create may still be in flight.
The result is process information, not credential/storage qualification or proof
that the process is still running when a later action begins.

### Conditional Session attachment

`sandbox.connectConditionalSession(sessionId, key, generation, attemptId, options)` opens the distinct `/sessions/{session_id}/conditional/ws` endpoint, bound to the original conditional creation key, runtime generation and attempt. It accepts the existing Session WebSocket replay options. Every control message is checked against that binding, and generation handover revokes the connection. Errors never trigger an ordinary attachment, retry or auto-resume. Closing the connection detaches without stopping the process. This is not lifecycle, storage or credential qualification.

### Reconnect an explicitly memory-restored original attempt

```typescript
const session = await sandbox.findRestoredConditionalSession(originalKey, currentGeneration, creationGeneration);
const connection = await sandbox.connectRestoredConditionalSession(session.id, originalKey, currentGeneration, creationGeneration, originalAttemptId, {after});
```

Verify the external memory-restoration lineage and your owned credential/session
history first. These helpers explicitly send `creation_runtime_generation`, which
must precede the current generation. They require the original still-running
attempt and never create a session, restart an attempt, resume the sandbox or
retry through ordinary endpoints. Existing same-generation helpers remain strict.
The restored socket can replay the original attempt's earlier-generation events;
its controls are bound to the current generation and the original attempt ID.
A subsequent handover revokes the socket. Old gateways that discard the optional
origin cannot authorize a restored original creation and must return an error.

## Explicit snapshot recovery

Use `client.sandboxes.restoreSnapshot(sandboxId, { expectedRuntimeGeneration: 7, snapshotId, snapshotGenerationId, discardProcessState: true, idempotencyKey })` to explicitly end old processes and replace writable RootFS. Keep every field and the key after an uncertain reply. `findSnapshotRestoreOperation` and `getSnapshotRestoreOperation` observe the original operation without submitting work. Only `succeeded` proves fresh runtime launch; `restoredRootfsGenerationId` alone proves the head change committed.

The `getSnapshotRestoreFinalCapture`, `readSnapshotRestoreFinalCaptureFile` and `acknowledgeSnapshotRestoreFinalCapture` methods preserve stopped-source credential custody. Acknowledge only after durable encrypted owner commit. Helpers never retry, refresh coordinates or fall back to guest execution or disk-only memory recovery. Source and successor generations must be safe integers.

## Read original RootFS fork provenance

```typescript
const receipt = await client.sandboxes.getRootFSFork(sourceSandboxId, {
  expectedRuntimeGeneration: 7, idempotencyKey: "original-fork",
});
```

Keep the original source sandbox, generation (including zero), key and
authenticated identity. This performs one GET and never retries or submits a
fork. Missing, conflicting and pending results remain errors; a 404 is not
proof of cancellation. The receipt requires the original unchanged, never-run
paused child and retained storage evidence. Memory forks are excluded. It is
not a credential-safety attestation or a state reservation; later mutations
need their own identity conditions.

## Conditional first launch of a RootFS fork

```typescript
const original = {
  forkOperationId: receipt.operationId, filesystemId: receipt.targetFilesystemId,
  headGenerationId: receipt.targetHeadGenerationId, writerEpoch: receipt.writerEpoch,
  idempotencyKey: "original-child-launch",
}; // Persist these conditions before submitting.
const launch = await client.sandboxes.launchRootFSFork(receipt.targetSandboxId, original);
const observation = await client.sandboxes.getRootFSForkLaunch(receipt.targetSandboxId, {
  ...original, expectedOperationId: launch.operationId,
});
```

Each method sends exactly one request. After a lost reply, query with the same
original conditions and key, omitting `expectedOperationId` if no receipt was
received. Never refresh the original writer epoch or fall back to ordinary
resume. A completed receipt retains its digest and time even when `current` is
false after later lifecycle changes. `current` is an owner snapshot, not a live
lease, health check or credential authorization. Pending has no completion
proof; neither aborted nor 404 proves physical absence. Helpers validate the
returned identity and state-specific evidence and never poll or retry for you.
