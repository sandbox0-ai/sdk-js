import assert from "node:assert";
import { describe, it } from "node:test";

import { Observability } from "../../src/resources/observability.ts";

describe("Observability resource", () => {
  it("lists trace spans with query filters", async () => {
    let gotRequest: unknown;
    const startTime = new Date("2026-05-07T00:00:00Z");
    const endTime = new Date("2026-05-07T01:00:00Z");
    const client = {
      apispec: {
        observability: {
          apiV1ObservabilityTracesGet: async (request: unknown) => {
            gotRequest = request;
            return {
              data: {
                spans: [
                  {
                    traceId: "trace-1",
                    spanId: "span-1",
                    name: "managed-agent.run",
                    attributes: { "sandbox0.sandbox_id": "sb_123" },
                  },
                ],
              },
            };
          },
        },
      },
    } as any;

    const spans = await new Observability(client).listTraceSpans({
      sandboxId: "sb_123",
      traceId: "trace-1",
      startTime,
      endTime,
      limit: 25,
    });

    assert.deepStrictEqual(gotRequest, {
      sandboxId: "sb_123",
      traceId: "trace-1",
      startTime,
      endTime,
      limit: 25,
    });
    assert.strictEqual(spans[0]?.name, "managed-agent.run");
  });

  it("lists logs with query filters", async () => {
    let gotRequest: unknown;
    const client = {
      apispec: {
        observability: {
          apiV1ObservabilityLogsGet: async (request: unknown) => {
            gotRequest = request;
            return {
              data: {
                logs: [
                  {
                    traceId: "trace-1",
                    body: "agent phase started",
                    attributes: { "sandbox0.managed_agent.run_id": "run_123" },
                  },
                ],
              },
            };
          },
        },
      },
    } as any;

    const logs = await new Observability(client).listLogs({
      sandboxId: "sb_123",
      traceId: "trace-1",
      limit: 10,
    });

    assert.deepStrictEqual(gotRequest, {
      sandboxId: "sb_123",
      traceId: "trace-1",
      startTime: undefined,
      endTime: undefined,
      limit: 10,
    });
    assert.strictEqual(logs[0]?.body, "agent phase started");
  });
});
