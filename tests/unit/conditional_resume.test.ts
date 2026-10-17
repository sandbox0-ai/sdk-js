import assert from "node:assert/strict";
import { it } from "node:test";
import { Client, APIError } from "../../src/index.ts";

const operationId = "idem-" + "b".repeat(64);
const options = { expectedRuntimeGeneration: 7, checkpointId: "capture-7", idempotencyKey: "resume-7" };

it("conditional memory resume retries only the original checkpoint and generation", async () => {
  for (const expectedRuntimeGeneration of [0, 7]) {
    let calls = 0;
    const input = { ...options, expectedRuntimeGeneration };
    const client = new Client({ token: "test-token", fetch: async (url, init) => {
      calls++;
      assert.equal(new URL(String(url)).pathname, "/api/v1/sandboxes/sb_1/resume");
      assert.equal(init?.method, "POST");
      assert.equal(new Headers(init?.headers).get("Idempotency-Key"), input.idempotencyKey);
      assert.deepEqual(JSON.parse(String(init?.body)), { memory: true, expected_runtime_generation: expectedRuntimeGeneration, checkpoint_id: input.checkpointId });
      if (calls === 1) return Response.json({ success: false, error: { code: "unavailable", message: "restore reply uncertain" } }, { status: 503 });
      return Response.json({ success: true, data: { sandbox_id: "sb_1", resumed: true, operation_id: operationId, checkpoint_id: input.checkpointId, from_runtime_generation: expectedRuntimeGeneration, runtime_generation: expectedRuntimeGeneration + 1 } });
    }});
    await assert.rejects(client.sandboxes.resumeMemoryForOperation("sb_1", input), APIError);
    assert.equal(calls, 1, "no implicit retry or generation refresh");
    const result = await client.sandboxes.resumeMemoryForOperation("sb_1", input);
    assert.equal(result.resumed, true);
    assert.equal(result.operationId, operationId);
    assert.equal(result.fromRuntimeGeneration, expectedRuntimeGeneration);
    assert.equal(result.runtimeGeneration, expectedRuntimeGeneration + 1);
    const replay = await client.sandboxes.resumeMemoryForOperation("sb_1", input);
    assert.deepEqual(result, replay);
    assert.equal(calls, 3);
  }
});

it("conditional memory resume rejects malformed input before sending a request", async () => {
  const client = new Client({ token: "test-token", fetch: async () => { throw new Error("unexpected network request"); } });
  for (const expectedRuntimeGeneration of [-1, 1.5, Number.NaN, Number.MAX_SAFE_INTEGER]) {
    await assert.rejects(client.sandboxes.resumeMemoryForOperation("sb_1", { ...options, expectedRuntimeGeneration }), /invalid conditional/);
  }
  for (const checkpointId of ["", " padded", "line\nbreak", "🙂", "x".repeat(257)]) {
    await assert.rejects(client.sandboxes.resumeMemoryForOperation("sb_1", { ...options, checkpointId }), /invalid conditional/);
  }
  for (const idempotencyKey of ["", " padded", "resume/7", "x".repeat(256)]) {
    await assert.rejects(client.sandboxes.resumeMemoryForOperation("sb_1", { ...options, idempotencyKey }), /invalid conditional/);
  }
});

it("conditional memory resume rejects generic success and mismatched restore evidence", async () => {
  for (const change of [{ operation_id: undefined }, { operation_id: "other" }, { checkpoint_id: undefined }, { checkpoint_id: "other" },
    { from_runtime_generation: undefined }, { from_runtime_generation: 8 }, { runtime_generation: undefined }, { runtime_generation: 9 }, { sandbox_id: "other" }, { resumed: false }, { resumed: "true" }]) {
    let calls = 0;
    const client = new Client({ token: "test-token", fetch: async () => {
      calls++;
      return Response.json({ success: true, data: { sandbox_id: "sb_1", resumed: true, operation_id: operationId, checkpoint_id: options.checkpointId, from_runtime_generation: 7, runtime_generation: 8, ...change } });
    }});
    await assert.rejects(client.sandboxes.resumeMemoryForOperation("sb_1", options), /does not match/);
    assert.equal(calls, 1);
  }
});
