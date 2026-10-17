import assert from "node:assert/strict";
import test from "node:test";
import { Client } from "../../src/index";

function observation(state: string, reason: string, source: string) {
  return { state, reason, source, observed_at: source === "none" ? null : "2026-10-15T00:00:01Z" };
}
function healthData() {
  return {
    sandbox_id: "sandbox", runtime_generation: 7, lifecycle_epoch: 8,
    desired_state: "active", active_lifecycle: false, observed_at: "2026-10-15T00:00:02Z",
    runtime: {
      launch_authority: observation("available", "external_launch_authority_present", "regional_authority"),
      liveness: observation("available", "runsc_running", "node_runtime"),
    },
    execution: observation("unavailable", "command_start_failed", "guest_diagnostic"),
    terminal: observation("unknown", "guest_diagnostics_unavailable", "none"),
    storage: {
      identity: observation("available", "rootfs_identity_present", "regional_authority"),
      writer_authority: observation("available", "current_writer_lease_present", "regional_authority"),
      io: observation("unknown", "storage_io_unobserved", "none"),
    },
  };
}

test("health preserves independent evidence in one request", async () => {
  let calls = 0;
  const client = new Client({ token: "test", fetch: async (url, init) => {
    calls++;
    const request = new URL(String(url));
    assert.equal(init?.method, "GET");
    assert.equal(request.pathname, "/api/v1/sandboxes/sandbox/health");
    assert.equal(request.search, "");
    assert.equal(init?.body, undefined);
    return new Response(JSON.stringify({ success: true, data: healthData() }), { status: 200 });
  } });
  const health = await client.sandboxes.getHealth("sandbox");
  assert.equal(health.runtime.liveness.state, "available");
  assert.equal(health.execution.state, "unavailable");
  assert.equal(health.terminal.state, "unknown");
  assert.equal(health.terminal.observedAt, null);
  assert.equal(health.storage.io.state, "unknown");
  assert.equal(health.execution.observedAt?.toISOString(), "2026-10-15T00:00:01.000Z");
  assert.notEqual(health.execution.observedAt?.getTime(), health.observedAt.getTime());
  assert.equal(calls, 1);
});

test("health rejects malformed or foreign evidence, including generated decoder coercion", async () => {
  const changes: [string, unknown][] = [
    ["sandbox_id", "foreign"], ["runtime_generation", 9007199254740992], ["lifecycle_epoch", true],
    ["runtime_generation", 0.5], ["active_lifecycle", "false"], ["desired_state", "ready"],
    ["observed_at", null], ["observed_at", 0], ["observed_at", "2026-10-15"],
    ["execution.state", "healthy"], ["execution.reason", "private backend error"],
    ["execution.source", "guest"], ["execution.observed_at", null], ["execution.observed_at", 0],
    ["execution.observed_at", "invalid"], ["execution.observed_at", "2026-10-15T00:00:01"],
    ["terminal.observed_at", undefined], ["terminal.observed_at", "2026-10-15T00:00:01Z"],
    ["terminal.state", "available"], ["storage.io", null], ["runtime", null],
  ];
  for (const [path, value] of changes) {
    const data = healthData();
    let target = data as Record<string, unknown>;
    const parts = path.split(".");
    for (const part of parts.slice(0, -1)) target = target[part] as Record<string, unknown>;
    target[parts.at(-1)!] = value;
    const client = new Client({ token: "test", fetch: async () => new Response(JSON.stringify({ success: true, data }), { status: 200 }) });
    await assert.rejects(client.sandboxes.getHealth("sandbox"), path);
  }
});

test("health errors never retry or trigger lifecycle fallback", async () => {
  for (const status of [401, 403, 404, 503]) {
    let calls = 0;
    const client = new Client({ token: "test", fetch: async () => {
      calls++;
      return new Response(JSON.stringify({ success: false, error: { code: "unavailable", message: "unavailable" } }), { status });
    } });
    await assert.rejects(client.sandboxes.getHealth("sandbox"));
    for (const invalid of ["", " sandbox", "sandbox "]) await assert.rejects(client.sandboxes.getHealth(invalid));
    assert.equal(calls, 1);
  }
});

test("health forwards caller cancellation without additional requests", async () => {
  const controller = new AbortController();
  let calls = 0;
  const client = new Client({ token: "test", fetch: async (_url, init) => {
    calls++;
    assert.equal(init?.signal, controller.signal);
    controller.abort();
    throw new DOMException("aborted", "AbortError");
  } });
  await assert.rejects(client.sandboxes.getHealth("sandbox", { signal: controller.signal }));
  assert.equal(calls, 1);
});
