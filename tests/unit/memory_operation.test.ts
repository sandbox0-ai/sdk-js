import assert from "node:assert/strict";
import { it } from "node:test";
import { Client, APIError, type MemoryOperationLookupOptions } from "../../src/index.ts";

const operationId = "idem-" + "b".repeat(64);
const options: MemoryOperationLookupOptions = { action: "pause", expectedRuntimeGeneration: 7, idempotencyKey: "pause-7", expectedOperationId: operationId };
const base = { sandbox_id: "sb_1", action: "pause", operation_id: operationId, checkpoint_id: operationId,
  from_runtime_generation: 7, lifecycle_epoch: 3, state: "canceled", reason: "before_capture", current: true };

it("memory lookup reads exact requests and distinguishes cancellation, failed restore and history", async () => {
  for (const action of ["pause", "resume"] as const) for (const state of ["pending", "completed", "canceled", "failed"] as const) {
    for (const current of [false, true]) {
      if (current && (state === "pending" || (action === "pause" && state === "failed"))) continue;
      const input = { ...options, action, checkpointId: action === "resume" ? "capture-7" : undefined };
      let calls = 0;
      const client = new Client({ token: "test-token", fetch: async (url, init) => {
        calls++;
        const parsed = new URL(String(url));
        assert.equal(parsed.pathname, "/api/v1/sandboxes/sb_1/memory-operations/lookup");
        assert.equal(init?.method, "GET");
        assert.equal(init?.body, undefined);
        assert.equal(new Headers(init?.headers).get("Idempotency-Key"), input.idempotencyKey);
        assert.deepEqual(Object.fromEntries(parsed.searchParams), { action, expected_runtime_generation: "7", ...(action === "resume" ? { checkpoint_id: "capture-7" } : {}) });
        return Response.json({ success: true, data: { ...base, action, state, current, checkpoint_id: input.checkpointId ?? operationId,
          reason: state === "canceled" ? (action === "pause" ? "before_capture" : "before_restore") : state === "failed" ? (action === "pause" ? "capture_failed" : "restore_failed") : undefined,
          result_runtime_generation: action === "resume" && ["completed", "failed"].includes(state) ? 8 : undefined } });
      }});
      const result = await client.sandboxes.lookupMemoryOperation("sb_1", input);
      assert.equal(result.state, state); assert.equal(result.current, current); assert.equal(calls, 1);
    }
  }
});

it("memory lookup rejects changed coordinates and contradictory terminal evidence", async () => {
  for (const change of [{ sandbox_id: "other" }, { action: "resume" }, { operation_id: "idem-" + "c".repeat(64) },
    { checkpoint_id: "other" }, { from_runtime_generation: 8 }, { lifecycle_epoch: 0 }, { lifecycle_epoch: 1.5 },
    { current: "true" }, { current: undefined }, { state: "unknown" }, { reason: undefined }, { reason: "before_restore" },
    { reason: null }, { result_runtime_generation: null }, { result_runtime_generation: 8 },
    { state: "pending", reason: undefined }, { state: "completed" }, { state: "failed", reason: "capture_failed" }]) {
    let calls = 0;
    const client = new Client({ token: "test-token", fetch: async () => { calls++; return Response.json({ success: true, data: { ...base, ...change } }); } });
    await assert.rejects(client.sandboxes.lookupMemoryOperation("sb_1", options));
    assert.equal(calls, 1);
  }
  const client = new Client({ token: "test-token", fetch: async () => { throw new Error("unexpected request"); } });
  for (const change of [{ action: "other" }, { expectedRuntimeGeneration: 0 }, { expectedRuntimeGeneration: 1.5 },
    { idempotencyKey: "bad/key" }, { checkpointId: "forbidden" }, { expectedOperationId: "bad" },
    { action: "resume" }, { action: "resume", checkpointId: "capture-7", expectedRuntimeGeneration: Number.MAX_SAFE_INTEGER }]) {
    await assert.rejects(client.sandboxes.lookupMemoryOperation("sb_1", { ...options, ...change } as MemoryOperationLookupOptions), /invalid memory operation lookup/);
  }
});

it("memory lookup never turns missing or unavailable evidence into cancellation or retry", async () => {
  for (const status of [404, 409, 503]) {
    let calls = 0;
    const client = new Client({ token: "test-token", fetch: async () => { calls++; return Response.json({ success: false, error: { code: "unavailable", message: "no proof" } }, { status }); } });
    await assert.rejects(client.sandboxes.lookupMemoryOperation("sb_1", options), (error: unknown) => error instanceof APIError && error.statusCode === status);
    assert.equal(calls, 1);
  }
});
