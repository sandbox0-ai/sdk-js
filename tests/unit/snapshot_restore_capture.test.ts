import assert from "node:assert/strict";
import { test } from "node:test";
import { Client } from "../../src/index.ts";

const operation = "40ea02de-5ef4-4710-a742-c9854cdfb6ce";
const capture = "a".repeat(64);
const status = { operation_id: operation, sandbox_id: "sandbox", from_runtime_generation: 7, state: "stopped", capture_id: capture, stopped_at: "2026-10-15T00:00:00Z" };
const file = { operation_id: operation, capture_id: capture, runtime_generation: 7, mutation_sequence: "18446744073709551615", size_bytes: 8388608, found: true, content: "eA==" };
const prefix = `/api/v1/sandboxes/sandbox/snapshot-restore-operations/${operation}/final-capture`;
const response = (data: unknown) => new Response(JSON.stringify({ success: true, data }), { headers: { "Content-Type": "application/json" } });

test("final capture preserves stopped identity and exact acknowledgement replay", async () => {
  const calls: string[] = [];
  const client = new Client({ token: "test", baseUrl: "https://example.test", fetch: async (input, init) => {
    const url = new URL(String(input));
    calls.push(`${init?.method} ${url.pathname}`);
    if (url.pathname.endsWith("/auth.json")) {
      assert.equal(url.searchParams.get("capture_id"), capture);
      return response(file);
    }
    if (init?.method === "POST") {
      assert.deepEqual(JSON.parse(String(init.body)), { capture_id: capture, receipt_id: "receipt-1" });
      return response({ ...status, state: "acknowledged", receipt_id: "receipt-1" });
    }
    return response(status);
  } });
  assert.equal((await client.sandboxes.getSnapshotRestoreFinalCapture("sandbox", operation)).state, "stopped");
  assert.equal(new TextDecoder().decode((await client.sandboxes.readSnapshotRestoreFinalCaptureFile("sandbox", operation, capture, "native", "auth.json")).content), "x");
  for (let i = 0; i < 2; i++) assert.equal((await client.sandboxes.acknowledgeSnapshotRestoreFinalCapture("sandbox", operation, capture, "receipt-1")).receiptId, "receipt-1");
  assert.deepEqual(calls, [`GET ${prefix}`, `GET ${prefix}/namespaces/native/auth.json`, `POST ${prefix}/acknowledgement`, `POST ${prefix}/acknowledgement`]);
});

test("final capture distinguishes empty files and authoritative absence", async () => {
  for (const found of [true, false]) {
    const client = new Client({ token: "test", fetch: async () => response({ ...file, found, content: "" }) });
    const result = await client.sandboxes.readSnapshotRestoreFinalCaptureFile("sandbox", operation, capture, "native", "auth.json");
    assert.equal(result.found, found); assert.equal(result.content.length, 0);
  }
});

test("final capture errors never fall back, retry, or manufacture absence", async () => {
  for (const code of [404, 409, 503]) {
    let calls = 0;
    const client = new Client({ token: "test", fetch: async () => { calls++; return new Response(JSON.stringify({ success: false, error: { code: "unavailable", message: "unavailable" } }), { status: code }); } });
    await assert.rejects(client.sandboxes.readSnapshotRestoreFinalCaptureFile("sandbox", operation, capture, "native", "auth.json"));
    await assert.rejects(client.sandboxes.acknowledgeSnapshotRestoreFinalCapture("sandbox", operation, capture, "receipt-1"));
    assert.equal(calls, 2);
  }
});

test("final capture rejects malformed authority and content", async () => {
  for (const change of [{ capture_id: "b".repeat(64) }, { operation_id: "foreign" }, { runtime_generation: 0 }, { mutation_sequence: "18446744073709551616" }, { size_bytes: 0 }, { found: "false" }, { found: false }, { content: "eB==" }, { content: "private-invalid" }]) {
    const client = new Client({ token: "test", fetch: async () => response({ ...file, ...change }) });
    await assert.rejects(client.sandboxes.readSnapshotRestoreFinalCaptureFile("sandbox", operation, capture, "native", "auth.json"), error => !String(error).includes("private-invalid"));
  }
  for (const change of [{ sandbox_id: "foreign" }, { state: "pending" }, { capture_id: null }, { stopped_at: "bad" }, { state: "acknowledged" }, { receipt_id: "premature" }]) {
    const client = new Client({ token: "test", fetch: async () => response({ ...status, ...change }) });
    await assert.rejects(client.sandboxes.getSnapshotRestoreFinalCapture("sandbox", operation));
  }
  const client = new Client({ token: "test", fetch: async () => response({ ...status, state: "acknowledged", receipt_id: "changed" }) });
  await assert.rejects(client.sandboxes.acknowledgeSnapshotRestoreFinalCapture("sandbox", operation, capture, "receipt-1"));
});

test("final capture validates all inputs before dispatch", async () => {
  const client = new Client({ token: "test", fetch: async () => assert.fail("invalid input reached transport") });
  for (const value of [undefined, null, "", "A".repeat(64)] as any[]) {
    await assert.rejects(client.sandboxes.readSnapshotRestoreFinalCaptureFile("sandbox", operation, value, "native", "auth.json"));
    await assert.rejects(client.sandboxes.acknowledgeSnapshotRestoreFinalCapture("sandbox", operation, value, "receipt-1"));
  }
  for (const value of ["..", "a/b", ".s0-write-secret", ""]) await assert.rejects(client.sandboxes.readSnapshotRestoreFinalCaptureFile("sandbox", operation, capture, value, "auth.json"));
  await assert.rejects(client.sandboxes.getSnapshotRestoreFinalCapture("..", operation));
  await assert.rejects(client.sandboxes.getSnapshotRestoreFinalCapture("sandbox", "invalid"));
  await assert.rejects(client.sandboxes.acknowledgeSnapshotRestoreFinalCapture("sandbox", operation, capture, ""));
});
