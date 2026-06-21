import net from "node:net";

export async function findFreePort(): Promise<number> {
  return await new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(0, "0.0.0.0", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        server.close(() => reject(new Error("failed to allocate free port")));
        return;
      }
      const port = address.port;
      server.close(() => resolve(port));
    });
  });
}

export async function waitForHttp(
  url: string,
  options: {
    readonly getProcessOutput?: () => string;
    readonly timeoutMs: number;
  },
): Promise<void> {
  const deadline = Date.now() + options.timeoutMs;
  let lastError: unknown;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
      lastError = new Error(`status ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await sleep(500);
  }

  const output = options.getProcessOutput?.();
  throw new Error([
    `timed out waiting for ${url}: ${errorMessage(lastError)}`,
    output ? `process output:\n${output}` : undefined,
  ].filter(Boolean).join("\n"));
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
