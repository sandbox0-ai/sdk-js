import assert from "node:assert/strict";
import test from "node:test";
import { Client } from "../../src/index";

const step = (from: number, to: number) => ({ operation_id: `restore-${to}`, capture_operation_id: `capture-${from}`, from_runtime_generation: from, to_runtime_generation: to, restore_id: "a".repeat(64), managed_files_size_bytes: 8388608 });
const data = () => ({ sandbox_id: "sandbox", runtime_generation: 5, filesystem_id: "filesystem", runtime_compatibility_digest: "sha256:" + "b".repeat(64), steps: [step(1, 3), step(3, 5)], observed_at: "2026-10-15T00:00:00Z" });

test("memory lineage reads once and preserves skipped generations and legacy projection", async () => {
  for (const size of [0, 8388608]) {
    let calls = 0;
    const value = data(); value.steps.forEach(s => s.managed_files_size_bytes = size);
    const client = new Client({ token: "test", fetch: async (url, init) => {
      calls++; const request = new URL(String(url));
      assert.equal(init?.method, "GET"); assert.equal(request.pathname, "/api/v1/sandboxes/sandbox/memory-restoration");
      assert.equal(request.search, "?runtime_generation=5");
      return new Response(JSON.stringify({ success: true, data: value }), { status: 200 });
    } });
    const result = await client.sandboxes.getMemoryRestoration("sandbox", 5);
    assert.deepEqual(result.steps.map(s => [s.fromRuntimeGeneration, s.toRuntimeGeneration]), [[1, 3], [3, 5]]);
    assert.equal(result.steps[0].managedFilesSizeBytes, size); assert.equal(calls, 1);
  }
});

test("memory lineage rejects malformed and discontinuous authority", async () => {
  const changes = [
    { sandbox_id: "foreign" }, { runtime_generation: 4 }, { filesystem_id: "" }, { runtime_compatibility_digest: "bad" },
    { observed_at: null }, { observed_at: 0 }, { observed_at: "invalid" }, { observed_at: "2026-10-15T00:00:00" },
    { steps: [] }, { steps: Array(65).fill(step(1, 5)) }, { steps: [step(1, 3), step(4, 5)] },
    { steps: [step(1, 3)] }, { steps: [step(5, 5)] }, { steps: [step(0, 5)] },
    ...[{ restore_id: "bad" }, { operation_id: "" }, { capture_operation_id: "" }, { from_runtime_generation: true },
      { from_runtime_generation: 1.5 }, { to_runtime_generation: 9007199254740992 }, { managed_files_size_bytes: -1 }, { managed_files_size_bytes: 67108865 }].map(change => ({ steps: [{ ...step(1, 5), ...change }] })),
  ];
  for (const change of changes) {
    const client = new Client({ token: "test", fetch: async () => new Response(JSON.stringify({ success: true, data: { ...data(), ...change } }), { status: 200 }) });
    await assert.rejects(client.sandboxes.getMemoryRestoration("sandbox", 5), JSON.stringify(change));
  }
});

test("memory lineage validates inputs before I/O and never retries errors", async () => {
  let calls = 0;
  const client = new Client({ token: "test", fetch: async () => { calls++; throw new Error("unexpected I/O"); } });
  for (const generation of [0, -1, NaN, 1.5, 9007199254740992]) await assert.rejects(client.sandboxes.getMemoryRestoration("sandbox", generation));
  for (const sandbox of ["", "..", "a/b", "a?b"]) await assert.rejects(client.sandboxes.getMemoryRestoration(sandbox, 5));
  assert.equal(calls, 0);
  for (const status of [404, 409, 503]) {
    calls = 0;
    const failing = new Client({ token: "test", fetch: async () => { calls++; return new Response(JSON.stringify({ success: false, error: { code: "unavailable", message: "unavailable" } }), { status }); } });
    await assert.rejects(failing.sandboxes.getMemoryRestoration("sandbox", 5)); assert.equal(calls, 1);
  }
});
