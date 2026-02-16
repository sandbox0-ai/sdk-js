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

## Examples

Runnable examples are available in the `examples/` directory:

| Example                    | Description                              |
|----------------------------|------------------------------------------|
| `01_hello_world`           | Basic sandbox usage                      |
| `02_context_options`       | Context configuration options            |
| `03_files`                 | File read/write/list operations          |
| `04_streaming`             | Streaming execution output               |
| `05_templates`             | Working with sandbox templates           |
| `06_volumes`               | Persistent volumes and snapshots         |
| `07_webhook`               | Webhook event delivery                   |
| `08_network`               | Network policy configuration             |
| `09_expose_port`           | Exposing ports publicly                  |

Run an example:

```bash
cd examples/01_hello_world
SANDBOX0_TOKEN=your-token npx tsx main.ts
```

## Links

- [Documentation](https://sandbox0.ai/docs)
- [API Reference](https://sandbox0.ai/docs/api)
- [GitHub Repository](https://github.com/sandbox0-ai/sdk-js)

## License

Apache-2.0
