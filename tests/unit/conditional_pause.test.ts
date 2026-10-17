import assert from "node:assert/strict";
import { it } from "node:test";
import { Client, APIError } from "../../src/index.ts";

const operationId = "idem-" + "a".repeat(64);
const options = { expectedRuntimeGeneration: 7, idempotencyKey: "pause-7" };

it("conditional memory pause retries the same intent and distinguishes accepted from complete", async () => {
  let calls = 0;
  const client = new Client({ token: "test-token", fetch: async (url, init) => {
    calls++;
    assert.equal(new URL(String(url)).pathname, "/api/v1/sandboxes/sb_1/pause");
    assert.equal(new Headers(init?.headers).get("Idempotency-Key"), options.idempotencyKey);
    assert.deepEqual(JSON.parse(String(init?.body)), { memory: true, expected_runtime_generation: 7 });
    if (calls === 1) return Response.json({ success: false, error: { code: "unavailable", message: "reply uncertain" } }, { status: 503 });
    return Response.json({ success: true, data: { sandbox_id: "sb_1", paused: calls === 3, runtime_generation: 7, operation_id: operationId } }, { status: calls === 2 ? 202 : 200 });
  }});
  await assert.rejects(client.sandboxes.pauseMemoryForOperation("sb_1", options), APIError);
  assert.equal(calls, 1, "no implicit retry or cold fallback");
  const pending = await client.sandboxes.pauseMemoryForOperation("sb_1", options);
  assert.equal(pending.paused, false);
  assert.equal(pending.operationId, operationId);
  const complete = await client.sandboxes.pauseMemoryForOperation("sb_1", options);
  assert.equal(complete.paused, true);
  assert.equal(complete.operationId, pending.operationId);
  assert.equal(calls, 3);
});

it("conditional memory pause rejects invalid input before any request", async () => {
  const client = new Client({ token: "test-token", fetch: async () => { throw new Error("unexpected network request"); } });
  for (const expectedRuntimeGeneration of [0, -1, 1.5, Number.NaN, Number.MAX_SAFE_INTEGER + 1]) {
    await assert.rejects(client.sandboxes.pauseMemoryForOperation("sb_1", { ...options, expectedRuntimeGeneration }), /invalid conditional/);
  }
  for (const idempotencyKey of ["", " pause-7", "pause/7", "x".repeat(256)]) {
    await assert.rejects(client.sandboxes.pauseMemoryForOperation("sb_1", { ...options, idempotencyKey }), /invalid conditional/);
  }
});

it("conditional memory pause rejects legacy or mismatched acknowledgements", async () => {
  for (const change of [{ operation_id: undefined }, { operation_id: "other" }, { runtime_generation: undefined }, { runtime_generation: 8 }, { sandbox_id: "other" }, { paused: undefined }]) {
    let calls = 0;
    const client = new Client({ token: "test-token", fetch: async () => {
      calls++;
      return Response.json({ success: true, data: { sandbox_id: "sb_1", paused: true, operation_id: operationId, runtime_generation: 7, ...change } });
    }});
    await assert.rejects(client.sandboxes.pauseMemoryForOperation("sb_1", options), /does not match/);
    assert.equal(calls, 1);
  }
});
