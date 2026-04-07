# Sandbox0 JavaScript/TypeScript SDK

The official JavaScript/TypeScript SDK for Sandbox0, providing typed models and ergonomic high-level APIs for managing secure code execution sandboxes.

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
```

## Documentation

- [Sandbox0 docs](https://sandbox0.ai/docs)
- [Template sidecars and shared volumes](https://sandbox0.ai/docs/template/sidecars)
- [Volume mounts](https://sandbox0.ai/docs/volume/mounts)

## Bootstrap Mounts At Claim Time

```typescript
const volume = await client.volumes.create({});

const sandbox = await client.sandboxes.claim("default", {
  mounts: [{ sandboxvolumeId: volume.id, mountPoint: "/workspace/data" }],
  waitForMounts: true,
  mountWaitTimeoutMs: 45_000,
});

for (const mount of sandbox.bootstrapMounts) {
  console.log(mount.sandboxvolumeId, mount.state);
}
```

## Links

- [Documentation](https://sandbox0.ai/docs)
- [API Reference](https://sandbox0.ai/docs/api)
- [GitHub Repository](https://github.com/sandbox0-ai/sdk-js)

## License

Apache-2.0
