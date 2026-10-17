import assert from "node:assert/strict";
import { test } from "node:test";
import { Client, APIError, type RootFSForkLaunchOptions } from "../../src/index.ts";

const options: RootFSForkLaunchOptions = { forkOperationId: "fork", filesystemId: "child", headGenerationId: "head", writerEpoch: 7, idempotencyKey: "original", expectedOperationId: "launch" };
const fixture = { operation_id: "launch", sandbox_id: "child", fork_operation_id: "fork", filesystem_id: "child", head_generation_id: "head", writer_epoch: 7, lifecycle_epoch: 1, runtime_generation: 0, state: "pending", current: true };
const completed = { ...fixture, runtime_generation: 1, state: "completed", current: false, launch_digest: "a".repeat(64), completed_at: "2026-10-17T00:00:00Z" };
const methodNames = ["launchRootFSFork", "getRootFSForkLaunch"] as const;

for (const method of methodNames) {
  for (const status of [200, 202, 404, 409, 429, 503]) {
    if (method === "getRootFSForkLaunch" && status === 202) continue;
    test(`${method}: original conditions and one request (${status})`, async () => {
      let calls = 0;
      const client = new Client({ token: "fixture", fetch: async (url, init) => {
        calls++;
        const u = new URL(String(url));
        assert.equal(u.pathname, "/api/v1/sandboxes/child/fork-launch");
        assert.equal(new Headers(init?.headers).get("Idempotency-Key"), "original");
        const conditions = { fork_operation_id: "fork", filesystem_id: "child", head_generation_id: "head", writer_epoch: 7 };
        if (method === "launchRootFSFork") {
          assert.equal(init?.method, "POST"); assert.equal(u.search, "");
          assert.deepEqual(JSON.parse(String(init?.body)), conditions);
        } else {
          assert.equal(init?.method, "GET"); assert.equal(init?.body, undefined);
          assert.deepEqual(Object.fromEntries(u.searchParams), { ...conditions, writer_epoch: "7" });
        }
        return Response.json(status >= 400 ? { success: false, error: { code: "retained", message: "retain original" } } : { success: true, data: status === 202 ? fixture : completed }, { status });
      } });
      if (status >= 400) await assert.rejects(client.sandboxes[method]("child", options), (e: unknown) => e instanceof APIError && e.statusCode === status);
      else {
        const r = await client.sandboxes[method]("child", options);
        assert.equal(r.state, status === 202 ? "pending" : "completed");
        assert.equal(r.current, status === 202); // Historical completion is accepted without waking it.
      }
      assert.equal(calls, 1);
    });
  }

  test(`${method}: invalid input never reaches the network`, async () => {
    let calls = 0;
    const client = new Client({ token: "fixture", fetch: async () => { calls++; return Response.json({ success: true, data: fixture }); } });
    for (const change of [{ writerEpoch: 0 }, { writerEpoch: 1.5 }, { writerEpoch: Number.MAX_SAFE_INTEGER + 1 }, { writerEpoch: true }, { forkOperationId: "" }, { filesystemId: "bad id" }, { headGenerationId: "a".repeat(513) }, { idempotencyKey: "" }, { idempotencyKey: "bad key" }, { expectedOperationId: "bad id" }]) {
      await assert.rejects(client.sandboxes[method]("child", { ...options, ...change } as RootFSForkLaunchOptions));
    }
    await assert.rejects(client.sandboxes[method](" child", options));
    assert.equal(calls, 0);
  });

  test(`${method}: rejects mismatches and inconsistent completion evidence`, async () => {
    let data: Record<string, unknown> = fixture; let calls = 0;
    const client = new Client({ token: "fixture", fetch: async () => { calls++; return Response.json({ success: true, data }); } });
    const changes = [
      { sandbox_id: "foreign" }, { fork_operation_id: "foreign" }, { filesystem_id: "foreign" }, { head_generation_id: "foreign" },
      { writer_epoch: 8 }, { operation_id: "different" }, { lifecycle_epoch: 2 }, { runtime_generation: 1 }, { current: "true" },
      { current: undefined }, { state: "unknown" }, { state: "aborted" }, { launch_digest: "a".repeat(64) },
      { launch_digest: null }, { completed_at: null }, { completed_at: "2026-10-17T00:00:00Z" },
    ];
    for (const change of changes) {
      data = { ...fixture, ...change }; await assert.rejects(client.sandboxes[method]("child", options));
    }
    for (const change of [{ runtime_generation: 0 }, { launch_digest: undefined }, { launch_digest: "bad" }, { completed_at: undefined }, { completed_at: 1792195200000 }, { completed_at: "2026-10-17" }, { completed_at: "invalid" }]) {
      data = { ...completed, ...change }; await assert.rejects(client.sandboxes[method]("child", options));
    }
    data = { ...fixture, state: "aborted", current: false };
    assert.equal((await client.sandboxes[method]("child", options)).state, "aborted");
    data = { ...fixture, current: false };
    assert.equal((await client.sandboxes[method]("child", options)).current, false);
    assert.equal(calls, changes.length + 9);
  });
}

test("lost launch reply is not retried; a later explicit lookup preserves the original request", async () => {
  let calls = 0;
  const client = new Client({ token: "fixture", fetch: async (_url, init) => {
    calls++;
    if (calls === 1) { assert.equal(init?.method, "POST"); throw new DOMException("lost reply", "TimeoutError"); }
    assert.equal(init?.method, "GET"); return Response.json({ success: true, data: completed });
  } });
  await assert.rejects(client.sandboxes.launchRootFSFork("child", options)); assert.equal(calls, 1);
  assert.equal((await client.sandboxes.getRootFSForkLaunch("child", options)).current, false); assert.equal(calls, 2);
});

test("caller mutations cannot rewrite the in-flight original conditions", async () => {
  const q = { ...options };
  const client = new Client({ token: "fixture", fetch: async () => {
    q.writerEpoch = 8; q.headGenerationId = "changed";
    return Response.json({ success: true, data: completed });
  } });
  assert.equal((await client.sandboxes.launchRootFSFork("child", q)).writerEpoch, 7);
});

test("accepted terminal receipts and noncontract lookup statuses are rejected", async () => {
  const client = new Client({ token: "fixture", fetch: async () => Response.json({ success: true, data: completed }, { status: 202 }) });
  await assert.rejects(client.sandboxes.launchRootFSFork("child", options));
  await assert.rejects(client.sandboxes.getRootFSForkLaunch("child", options));
});
