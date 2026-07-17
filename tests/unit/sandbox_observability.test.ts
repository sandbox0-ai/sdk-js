import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  Client,
  SandboxRuntimeMetricName,
  SandboxRuntimeMetricStatistic,
} from "../../src/index.ts";

describe("sandbox observability", () => {
  it("lists canonical signed audit events with v2 filters", async () => {
    let requestedUrl = "";
    const client = new Client({
      token: "test-token",
      baseUrl: "http://example.test/base",
      fetch: async (input) => {
        requestedUrl = String(input);
        return new Response(
          JSON.stringify({
            data: {
              events: [
                {
                  event_id: "c48d73ec-a08f-41bb-82d2-3f48a827f9b2",
                  schema_version: 2,
                  team_id: "team_1",
                  sandbox_id: "sb_123",
                  region_id: "local",
                  cluster_id: "cluster-a",
                  occurred_at: "2026-07-13T13:00:00.123456789Z",
                  ingested_at: "2026-07-13T13:00:00.223456789Z",
                  source: "cluster_gateway",
                  event_type: "api_access",
                  phase: "result",
                  outcome: "failed",
                  actor: {
                    kind: "api_key",
                    id: "key_1",
                    api_key_id: "key_1",
                    auth_method: "api_key",
                  },
                  action: "sandbox.delete",
                  resource: { type: "sandbox", id: "sb_123" },
                  operation_id: "72ae77fe-d25e-41dc-bd25-f537aa9d1597",
                  parent_event_id: "13cb9417-bb36-4c13-85da-6050f75728da",
                  producer: {
                    service: "cluster-gateway",
                    instance: "cluster-gateway-0",
                    sequence: 7,
                  },
                  request: {
                    request_id: "req_1",
                    http_method: "DELETE",
                    route: "/api/v1/sandboxes/:id",
                    status_code: 503,
                  },
                  integrity: {
                    algorithm: "ed25519-sha256-v1",
                    payload_hash: "a".repeat(64),
                    signature: "signature",
                    signing_key_id: "b".repeat(64),
                    signature_status: "verified",
                    event_id_conflict: false,
                  },
                  attributes: { operation_executed: false },
                },
              ],
              next_cursor: "next",
              watermark: "watermark",
            },
          }),
          {
            status: 200,
            headers: { "content-type": "application/json" },
          },
        );
      },
    });

    const events = await client.sandbox("sb_123").listObservabilityEvents({
      startTime: new Date("2026-07-13T12:00:00Z"),
      endTime: new Date("2026-07-13T14:00:00Z"),
      limit: 50,
      cursor: "previous",
      source: "cluster_gateway",
      eventType: "api_access",
      outcome: "failed",
      actorKind: "api_key",
      actorId: "key_1",
      action: "sandbox.delete",
      resourceType: "sandbox",
      operationId: "72ae77fe-d25e-41dc-bd25-f537aa9d1597",
    });

    const url = new URL(requestedUrl);
    assert.equal(url.pathname, "/base/api/v1/sandboxes/sb_123/observability/events");
    assert.equal(url.searchParams.get("start_time"), "2026-07-13T12:00:00.000Z");
    assert.equal(url.searchParams.get("end_time"), "2026-07-13T14:00:00.000Z");
    assert.equal(url.searchParams.get("limit"), "50");
    assert.equal(url.searchParams.get("cursor"), "previous");
    assert.equal(url.searchParams.get("source"), "cluster_gateway");
    assert.equal(url.searchParams.get("event_type"), "api_access");
    assert.equal(url.searchParams.get("outcome"), "failed");
    assert.equal(url.searchParams.get("actor_kind"), "api_key");
    assert.equal(url.searchParams.get("actor_id"), "key_1");
    assert.equal(url.searchParams.get("action"), "sandbox.delete");
    assert.equal(url.searchParams.get("resource_type"), "sandbox");
    assert.equal(
      url.searchParams.get("operation_id"),
      "72ae77fe-d25e-41dc-bd25-f537aa9d1597",
    );

    const event = events.events[0];
    assert.equal(event?.eventId, "c48d73ec-a08f-41bb-82d2-3f48a827f9b2");
    assert.equal(event?.schemaVersion, 2);
    assert.ok(event?.occurredAt instanceof Date);
    assert.equal(event?.actor.kind, "api_key");
    assert.equal(event?.resource.id, "sb_123");
    assert.equal(event?.producer.sequence, 7);
    assert.equal(event?.request?.statusCode, 503);
    assert.equal(event?.integrity.signatureStatus, "verified");
    assert.equal(event?.integrity.eventIdConflict, false);
    assert.equal(events.nextCursor, "next");
  });

  it("supports exact audit event lookup", async () => {
    let requestedUrl = "";
    const client = new Client({
      token: "test-token",
      baseUrl: "http://example.test/base",
      fetch: async (input) => {
        requestedUrl = String(input);
        return new Response(JSON.stringify({ data: { events: [] } }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      },
    });

    await client.listSandboxObservabilityEvents("sb_123", {
      eventId: "c48d73ec-a08f-41bb-82d2-3f48a827f9b2",
    });

    const url = new URL(requestedUrl);
    assert.equal(url.searchParams.get("event_id"), "c48d73ec-a08f-41bb-82d2-3f48a827f9b2");
    assert.equal([...url.searchParams.keys()].length, 1);
  });

  it("streams canonical event filters as NDJSON query parameters", async () => {
    let requestedUrl = "";
    const client = new Client({
      token: "test-token",
      baseUrl: "http://example.test/base",
      fetch: async (input) => {
        requestedUrl = String(input);
        return new Response(new ReadableStream<Uint8Array>({
          start(controller) {
            controller.close();
          },
        }), {
          status: 200,
          headers: { "content-type": "application/x-ndjson" },
        });
      },
    });

    await client.sandbox("sb_123").watchObservabilityEvents({
      source: "netd",
      eventType: "network_audit",
      outcome: "denied",
      actorKind: "sandbox_workload",
      actorId: "sb_123",
      action: "deny",
      resourceType: "network_flow",
      operationId: "72ae77fe-d25e-41dc-bd25-f537aa9d1597",
    });

    const url = new URL(requestedUrl);
    assert.equal(url.searchParams.get("watch"), "true");
    assert.equal(url.searchParams.get("source"), "netd");
    assert.equal(url.searchParams.get("event_type"), "network_audit");
    assert.equal(url.searchParams.get("outcome"), "denied");
    assert.equal(url.searchParams.get("actor_kind"), "sandbox_workload");
    assert.equal(url.searchParams.get("actor_id"), "sb_123");
    assert.equal(url.searchParams.get("action"), "deny");
    assert.equal(url.searchParams.get("resource_type"), "network_flow");
    assert.equal(
      url.searchParams.get("operation_id"),
      "72ae77fe-d25e-41dc-bd25-f537aa9d1597",
    );
  });

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

  it("parses snake_case event and log data in watch lines", async () => {
    const event = {
      event_id: "c48d73ec-a08f-41bb-82d2-3f48a827f9b2",
      schema_version: 2,
      team_id: "team_1",
      sandbox_id: "sb_123",
      region_id: "local",
      cluster_id: "cluster-a",
      occurred_at: "2026-07-13T13:00:00.123Z",
      ingested_at: "2026-07-13T13:00:00.223Z",
      source: "netd",
      event_type: "network_audit",
      phase: "effect",
      outcome: "denied",
      actor: { kind: "sandbox_workload", id: "sb_123" },
      action: "network.deny",
      resource: { type: "sandbox_network", id: "sb_123" },
      operation_id: "72ae77fe-d25e-41dc-bd25-f537aa9d1597",
      producer: { service: "netd", sequence: 8 },
      integrity: {
        algorithm: "ed25519-sha256-v1",
        payload_hash: "a".repeat(64),
        signature: "signature",
        signing_key_id: "b".repeat(64),
        signature_status: "verified",
      },
      attributes: { host: "blocked.example", dest_port: 443 },
    };
    const log = {
      team_id: "team_1",
      sandbox_id: "sb_123",
      region_id: "local",
      cluster_id: "cluster-a",
      context_id: "ctx_1",
      occurred_at: "2026-07-13T13:00:01Z",
      ingested_at: "2026-07-13T13:00:02Z",
      stream: "stderr",
      message: "connection denied",
      cursor: "log-cursor",
    };
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(
          new TextEncoder().encode(
            `${JSON.stringify({ type: "event", data: event })}\n` +
              `${JSON.stringify({ type: "log", data: log })}\n`,
          ),
        );
        controller.close();
      },
    });
    const client = new Client({
      token: "test-token",
      baseUrl: "http://example.test/base",
      fetch: async () =>
        new Response(body, {
          status: 200,
          headers: { "content-type": "application/x-ndjson" },
        }),
    });

    const stream = await client.sandbox("sb_123").watchObservabilityEvents();
    const lines = [];
    for await (const line of stream) {
      lines.push(line);
    }

    const eventData = lines[0]?.data;
    assert.equal(lines[0]?.type, "event");
    assert.ok(eventData && "eventId" in eventData);
    if (eventData && "eventId" in eventData) {
      assert.equal(eventData.eventId, event.event_id);
      assert.equal(eventData.action, "network.deny");
      assert.ok(eventData.occurredAt instanceof Date);
      assert.equal(eventData.attributes?.host, "blocked.example");
    }

    const logData = lines[1]?.data;
    assert.equal(lines[1]?.type, "log");
    assert.ok(logData && "message" in logData);
    if (logData && "message" in logData) {
      assert.equal(logData.message, "connection denied");
      assert.equal(logData.contextId, "ctx_1");
      assert.ok(logData.occurredAt instanceof Date);
    }
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
