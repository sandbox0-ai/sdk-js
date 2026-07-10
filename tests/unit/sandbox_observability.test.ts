import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  Client,
  SandboxRuntimeMetricName,
  SandboxRuntimeMetricStatistic,
} from "../../src/index.ts";

describe("sandbox observability", () => {
  it("lists logs through the observability API", async () => {
    let requestedUrl = "";
    const client = new Client({
      token: "test-token",
      baseUrl: "http://example.test/base",
      fetch: async (input) => {
        requestedUrl = String(input);
        return new Response(
          JSON.stringify({
            data: {
              logs: [
                {
                  team_id: "team_1",
                  sandbox_id: "sb_123",
                  region_id: "local",
                  cluster_id: "cluster-a",
                  context_id: "ctx_1",
                  occurred_at: "2026-07-03T00:00:00Z",
                  ingested_at: "2026-07-03T00:00:01Z",
                  stream: "stdout",
                  message: "ready",
                  cursor: "log-cursor",
                },
              ],
              next_cursor: "next",
              watermark: "2026-07-03T00:00:01Z",
            },
          }),
          {
            status: 200,
            headers: { "content-type": "application/json" },
          },
        );
      },
    });

    const logs = await client.sandbox("sb_123").listLogs({
      limit: 10,
      contextId: "ctx_1",
      stream: "stdout",
    });

    const url = new URL(requestedUrl);
    assert.equal(url.pathname, "/base/api/v1/sandboxes/sb_123/observability/logs");
    assert.equal(url.searchParams.get("limit"), "10");
    assert.equal(url.searchParams.get("context_id"), "ctx_1");
    assert.equal(url.searchParams.get("stream"), "stdout");
    assert.equal(logs.logs[0]?.message, "ready");
    assert.equal(logs.nextCursor, "next");
  });

  it("streams watch lines as NDJSON", async () => {
    let requestedUrl = "";
    let requestedAuth = "";
    let requestedAccept = "";
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(
          new TextEncoder().encode(
            '{"type":"heartbeat","time":"2026-07-03T00:00:00Z"}\n' +
              '{"type":"watermark","cursor":"c1","watermark":"2026-07-03T00:00:01Z"}\n',
          ),
        );
        controller.close();
      },
    });
    const client = new Client({
      token: "test-token",
      baseUrl: "http://example.test/base",
      fetch: async (input, init) => {
        requestedUrl = String(input);
        const headers = init?.headers as Record<string, string>;
        requestedAuth = String(headers["Authorization"] ?? "");
        requestedAccept = String(headers.Accept ?? "");
        return new Response(body, {
          status: 200,
          headers: { "content-type": "application/x-ndjson" },
        });
      },
    });

    const stream = await client.sandbox("sb_123").watchLogs({
      cursor: "c0",
      limit: 5,
    });
    const lines = [];
    for await (const line of stream) {
      lines.push(line);
    }

    const url = new URL(requestedUrl);
    assert.equal(url.pathname, "/base/api/v1/sandboxes/sb_123/observability/logs");
    assert.equal(url.searchParams.get("watch"), "true");
    assert.equal(url.searchParams.get("cursor"), "c0");
    assert.equal(url.searchParams.get("limit"), "5");
    assert.equal(requestedAuth, "Bearer test-token");
    assert.equal(requestedAccept, "application/x-ndjson");
    assert.equal(lines[0]?.type, "heartbeat");
    assert.ok(lines[0]?.time instanceof Date);
    assert.equal(lines[1]?.cursor, "c1");
  });

  it("queries chart-ready runtime metrics and parses time fields", async () => {
    let requestedUrl = "";
    const client = new Client({
      token: "test-token",
      baseUrl: "http://example.test/base",
      fetch: async (input) => {
        requestedUrl = String(input);
        return new Response(
          JSON.stringify({
            data: {
              start_time: "2026-07-03T00:00:00Z",
              end_time: "2026-07-03T01:00:00Z",
              step_seconds: 30,
              series: [
                {
                  metric: "sandbox.cpu.utilization",
                  kind: "gauge",
                  unit: "ratio",
                  statistic: "average",
                  segments: [
                    {
                      points: [
                        { time: "2026-07-03T00:00:30Z", value: 0.25 },
                        { time: "2026-07-03T00:01:00Z", value: 0.5 },
                      ],
                    },
                    {
                      points: [{ time: "2026-07-03T00:02:00Z", value: 0.1 }],
                    },
                  ],
                },
              ],
              freshness: {
                newest_observed_at: "2026-07-03T00:59:55Z",
                age_seconds: 5,
                status: "fresh",
              },
              gaps: [
                {
                  metric: "sandbox.cpu.utilization",
                  start_time: "2026-07-03T00:01:00Z",
                  end_time: "2026-07-03T00:02:00Z",
                  reason: "series_reset",
                },
              ],
              partial: true,
            },
          }),
          {
            status: 200,
            headers: { "content-type": "application/json" },
          },
        );
      },
    });

    const metrics = await client.sandbox("sb/123").getMetrics({
      startTime: new Date("2026-07-03T00:00:00Z"),
      endTime: new Date("2026-07-03T01:00:00Z"),
      metrics: [
        SandboxRuntimeMetricName.SandboxCpuUtilization,
        SandboxRuntimeMetricName.SandboxNetworkIo,
      ],
      stepSeconds: 30,
      statistic: SandboxRuntimeMetricStatistic.Average,
      maxPoints: 120,
    });

    const url = new URL(requestedUrl);
    assert.equal(url.pathname, "/base/api/v1/sandboxes/sb%2F123/metrics");
    assert.equal(url.searchParams.get("start_time"), "2026-07-03T00:00:00.000Z");
    assert.equal(url.searchParams.get("end_time"), "2026-07-03T01:00:00.000Z");
    assert.equal(
      url.searchParams.get("metrics"),
      "sandbox.cpu.utilization,sandbox.network.io",
    );
    assert.equal(url.searchParams.get("step_seconds"), "30");
    assert.equal(url.searchParams.get("statistic"), "average");
    assert.equal(url.searchParams.get("max_points"), "120");

    assert.ok(metrics.startTime instanceof Date);
    assert.ok(metrics.endTime instanceof Date);
    assert.equal(metrics.series[0]?.segments.length, 2);
    assert.ok(metrics.series[0]?.segments[0]?.points[0]?.time instanceof Date);
    assert.equal(metrics.series[0]?.segments[1]?.points[0]?.value, 0.1);
    assert.ok(metrics.freshness.newestObservedAt instanceof Date);
    assert.ok(metrics.gaps[0]?.startTime instanceof Date);
    assert.ok(metrics.gaps[0]?.endTime instanceof Date);
    assert.equal(metrics.partial, true);
  });

  it("returns the runtime metric catalog", async () => {
    let requestedUrl = "";
    const client = new Client({
      token: "test-token",
      baseUrl: "http://example.test/base",
      fetch: async (input) => {
        requestedUrl = String(input);
        return new Response(
          JSON.stringify({
            data: {
              metrics: [
                {
                  name: "sandbox.network.io",
                  kind: "counter",
                  unit: "bytes",
                  dimensions: ["direction"],
                  description: "Cumulative network bytes.",
                },
              ],
            },
          }),
          {
            status: 200,
            headers: { "content-type": "application/json" },
          },
        );
      },
    });

    const catalog = await client.sandbox("sb_123").getMetricsCatalog();

    assert.equal(
      new URL(requestedUrl).pathname,
      "/base/api/v1/sandboxes/sb_123/metrics/catalog",
    );
    assert.deepEqual(catalog.metrics[0], {
      name: "sandbox.network.io",
      kind: "counter",
      unit: "bytes",
      dimensions: ["direction"],
      description: "Cumulative network bytes.",
    });
  });

  it("does not expose the removed raw metric sample methods", () => {
    const client = new Client({ token: "test-token" });
    const sandbox = client.sandbox("sb_123");

    assert.equal("listMetrics" in sandbox, false);
    assert.equal("watchMetrics" in sandbox, false);
    assert.equal("listSandboxObservabilityMetrics" in client, false);
    assert.equal("watchSandboxObservabilityMetrics" in client, false);

    // @ts-expect-error listMetrics was removed with the raw metric sample API.
    assert.equal(sandbox.listMetrics, undefined);
    // @ts-expect-error watchMetrics was removed with the raw metric sample API.
    assert.equal(sandbox.watchMetrics, undefined);
    // @ts-expect-error The client no longer exposes raw metric samples.
    assert.equal(client.listSandboxObservabilityMetrics, undefined);
    // @ts-expect-error The client no longer exposes raw metric watches.
    assert.equal(client.watchSandboxObservabilityMetrics, undefined);
  });
});
