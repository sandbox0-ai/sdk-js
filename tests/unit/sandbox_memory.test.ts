import assert from "node:assert/strict";
import { it } from "node:test";
import { Client, APIError } from "../../src/index.ts";

for (const action of ["pause", "resume"] as const) {
  for (const memory of [undefined, false, true]) {
    it(`${action} serializes explicit memory=${memory} through the generated client`, async () => {
      let calls = 0;
      const client = new Client({token:"test-token", baseUrl:"https://example.test", fetch:async (url,init) => {
        calls++;
        assert.equal(new URL(String(url)).pathname, `/api/v1/sandboxes/sb_1/${action}`);
        if (memory === undefined) assert.equal(init?.body, undefined);
        else assert.deepEqual(JSON.parse(String(init?.body)), {memory});
        return Response.json({success:true, data:{sandbox_id:"sb_1", paused:true, resumed:true, status:"paused"}});
      }});
      await client.sandboxes[action]("sb_1", memory === undefined ? undefined : {memory});
      assert.equal(calls,1);
    });
  }
  it(`${action} propagates memory failure without cold fallback`, async () => {
    let calls = 0;
    const client = new Client({token:"test-token", fetch:async (_url,init) => {
      calls++;
      assert.deepEqual(JSON.parse(String(init?.body)), {memory:true});
      return Response.json({success:false,error:{code:"unavailable",message:"memory unavailable"}}, {status:503});
    }});
    await assert.rejects(client.sandboxes[action]("sb_1",{memory:true}), (error: unknown) => error instanceof APIError && error.statusCode === 503);
    assert.equal(calls,1);
  });
}

it("memory fork requires a stable key and preserves it on caller retry",async () => {
  let calls = 0;
  const client = new Client({token:"test-token",fetch:async (_url,init) => {
    calls++;
    assert.equal(new Headers(init?.headers).get("Idempotency-Key"), "fork-one");
    assert.deepEqual(JSON.parse(String(init?.body)),{memory:true});
    return Response.json({success:false,error:{code:"unavailable",message:"capture pending"}},{status:503});
  }});
  await assert.rejects(client.sandboxes.fork("sb_1",{memory:true}), /idempotencyKey/);
  assert.equal(calls,0);
  for(let attempt=0; attempt<2; attempt++) {
    await assert.rejects(client.sandboxes.fork("sb_1",{memory:true},{idempotencyKey:"fork-one"}),APIError);
  }
  assert.equal(calls,2);
});

it("memory pause wait rejects failed capture without retrying in filesystem mode", async () => {
  const { SandboxLifecycleFailedError } = await import("../../src/index.ts");
  let posts = 0;
  let gets = 0;
  const client = new Client({ token: "test-token", fetch: async (_url, init) => {
    if (init?.method === "POST") {
      posts++;
      assert.deepEqual(JSON.parse(String(init.body)), { memory: true });
      return Response.json({ success: true, data: { sandbox_id: "sb_1", paused: false, status: "starting" } }, { status: 202 });
    }
    gets++;
    return Response.json({ success: true, data: { id: "sb_1", status: "failed", paused: true, runtime_generation: 1 } });
  }});
  await assert.rejects(client.sandboxes.pauseAndWait("sb_1", { memory: true }),
    (error: unknown) => error instanceof SandboxLifecycleFailedError && error.lastSandbox.paused);
  assert.equal(posts, 1);
  assert.equal(gets, 1);
});

it("memory resume wait ignores old failure and reports the new attempt without restarting it", async () => {
  const { SandboxLifecycleFailedError } = await import("../../src/index.ts");
  let posts = 0;
  let gets = 0;
  const client = new Client({ token: "test-token", fetch: async (_url, init) => {
    if (init?.method === "POST") {
      posts++;
      assert.deepEqual(JSON.parse(String(init.body)), { memory: true });
      return Response.json({ success: true, data: { sandbox_id: "sb_1", resumed: true } });
    }
    gets++;
    return Response.json({ success: true, data: { id: "sb_1", status: "failed", paused: true, runtime_generation: gets < 3 ? 1 : 2 } });
  }});
  await assert.rejects(client.sandboxes.resumeAndWait("sb_1", { memory: true, pollIntervalMs: 1 }),
    (error: unknown) => error instanceof SandboxLifecycleFailedError && error.action === "memory resume" && error.lastSandbox.runtimeGeneration === 2);
  assert.equal(posts, 1);
  assert.equal(gets, 3);
});
