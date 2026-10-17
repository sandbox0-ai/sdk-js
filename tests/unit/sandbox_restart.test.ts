import assert from "node:assert/strict";
import { test } from "node:test";
import { Client } from "../../src/index.ts";

const operationId = "40ea02de-5ef4-4710-a742-c9854cdfb6ce";
const receipt = { id: operationId, sandbox_id: "sandbox", request_key: "retry-key", from_runtime_generation: 7, state: "pausing", created_at: "2026-10-15T00:00:00Z", updated_at: "2026-10-15T00:00:00Z" };

test("restart generated transport preserves request identity and recovers receipts read-only", async () => {
  const calls: { method?: string; path: string; key: string | null }[] = [];
  const client = new Client({token:"test",baseUrl:"https://example.test",fetch:async(input,init)=>{
    const url = new URL(String(input));
    calls.push({method:init?.method,path:url.pathname,key:url.searchParams.get("request_key")});
    if(init?.method === "POST") {
      assert.equal(new Headers(init.headers).get("Idempotency-Key"),"retry-key");
      assert.deepEqual(JSON.parse(String(init.body)),{expected_runtime_generation:7});
    }
    return new Response(JSON.stringify({success:true,data:calls.length === 1 ? receipt : {...receipt,state:"succeeded",result_runtime_generation:8}}),{status:calls.length===1?202:200,headers:{"Content-Type":"application/json"}});
  }});
  const pending=await client.sandboxes.restart("sandbox",{expectedRuntimeGeneration:7,idempotencyKey:"retry-key"});
  assert.equal(pending.state,"pausing");assert.equal(pending.resultRuntimeGeneration,undefined);
  assert.equal((await client.sandboxes.findRestartOperation("sandbox","retry-key")).resultRuntimeGeneration,8);
  assert.equal((await client.sandboxes.getRestartOperation("sandbox",operationId)).state,"succeeded");
  assert.deepEqual(calls,[{method:"POST",path:"/api/v1/sandboxes/sandbox/restart",key:null},{method:"GET",path:"/api/v1/sandboxes/sandbox/restart-operations",key:"retry-key"},{method:"GET",path:`/api/v1/sandboxes/sandbox/restart-operations/${operationId}`,key:null}]);
});

test("restart never refreshes generation, retries or falls back after errors",async()=>{
  for(const status of [404,409,503]) {
    let calls=0;
    const client=new Client({token:"test",fetch:async()=>{calls++;return new Response(JSON.stringify({success:false,error:{code:"unavailable",message:"unavailable"}}),{status});}});
    await assert.rejects(client.sandboxes.restart("sandbox",{expectedRuntimeGeneration:7,idempotencyKey:"retry-key"}));
    assert.equal(calls,1);
  }
});

test("restart rejects invalid caller conditions before transport",async()=>{
  const client=new Client({token:"test",fetch:async()=>{assert.fail("invalid input reached transport");}});
  for(const expectedRuntimeGeneration of [-1,1.5,NaN,Infinity,Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER+1]) await assert.rejects(client.sandboxes.restart("sandbox",{expectedRuntimeGeneration,idempotencyKey:"retry-key"}));
  for(const key of [""," spaced","x".repeat(256),undefined as any]) {
    await assert.rejects(client.sandboxes.restart("sandbox",{expectedRuntimeGeneration:7,idempotencyKey:key}));
    await assert.rejects(client.sandboxes.findRestartOperation("sandbox",key));
  }
  await assert.rejects(client.sandboxes.getRestartOperation("sandbox","not-an-operation"));
});

test("restart rejects unrelated or uncommitted success receipts",async()=>{
  for(const change of [{sandbox_id:"foreign"},{request_key:"wrong"},{from_runtime_generation:8},{state:"succeeded"},{state:"succeeded",result_runtime_generation:9},{result_runtime_generation:8},{state:"unknown"}]) {
    const client=new Client({token:"test",fetch:async()=>new Response(JSON.stringify({success:true,data:{...receipt,...change}}),{status:202})});
    await assert.rejects(client.sandboxes.restart("sandbox",{expectedRuntimeGeneration:7,idempotencyKey:"retry-key"}));
  }
});

test("storage diagnostic survives generated decoding without completion",async()=>{
 const client=new Client({token:"test",fetch:async()=>new Response(JSON.stringify({success:true,data:{...receipt,state:"resuming",retry:{attempts:3,observed_stage:"resuming",blocked_reason:"storage_not_writable"}}}),{headers:{"Content-Type":"application/json"}})});
 const result=await client.sandboxes.getRestartOperation("sandbox",operationId);
 assert.equal(result.retry?.blockedReason,"storage_not_writable");assert.equal(result.resultRuntimeGeneration,undefined);
});
