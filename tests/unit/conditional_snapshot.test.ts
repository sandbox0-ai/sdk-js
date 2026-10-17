import assert from "node:assert/strict";
import { it } from "node:test";
import { Client, APIError } from "../../src/index.ts";

it("conditional snapshot retains the exact generation and key after an uncertain reply",async()=>{
  let calls=0;
  const client=new Client({token:"test",fetch:async(url,init)=>{
    calls++;assert.equal(new URL(String(url)).pathname,"/api/v1/sandboxes/source/snapshots/capture");
    assert.equal(init?.method,"POST");assert.equal(new Headers(init?.headers).get("Idempotency-Key"),"capture-7");
    assert.deepEqual(JSON.parse(String(init?.body)),{expected_runtime_generation:7,name:"before edit"});
    if(calls===1)return Response.json({success:false,error:{code:"unavailable",message:"uncertain"}},{status:503});
    return Response.json({success:true,data:{id:"snapshot",sandbox_id:"source",generation_id:"captured-head",created_at:"2026-10-16T00:00:00Z"}},{status:201});
  }});
  const options={expectedRuntimeGeneration:7,idempotencyKey:"capture-7",name:"before edit"};
  await assert.rejects(client.sandboxes.captureRootFSSnapshot("source",options),APIError);assert.equal(calls,1);
  assert.equal((await client.sandboxes.captureRootFSSnapshot("source",options)).generationId,"captured-head");assert.equal(calls,2);
});

it("conditional snapshot refuses invalid input and mismatched receipts",async()=>{
  const input={expectedRuntimeGeneration:7,idempotencyKey:"capture-7"};let calls=0;
  const client=new Client({token:"test",fetch:async()=>{calls++;return Response.json({success:true,data:{id:"snapshot",sandbox_id:"foreign",created_at:"2026-10-16T00:00:00Z"}},{status:201});}});
  for(const generation of [0,-1,1.5,Number.MAX_SAFE_INTEGER+1])await assert.rejects(client.sandboxes.captureRootFSSnapshot("source",{...input,expectedRuntimeGeneration:generation}));
  assert.equal(calls,0);
  await assert.rejects(client.sandboxes.captureRootFSSnapshot("source",input),/mismatched identity/);assert.equal(calls,1);
});

for (const status of [200, 404, 409, 503]) it(`snapshot observation only GETs the original coordinates (${status})`, async () => {
  let calls=0;
  const client=new Client({token:"test",fetch:async(url,init)=>{
    calls++;
    const parsed=new URL(String(url));
    assert.equal(parsed.pathname,"/api/v1/sandboxes/source/snapshots/capture");
    assert.equal(parsed.searchParams.get("expected_runtime_generation"),"7");
    assert.equal(init?.method,"GET");assert.equal(init?.body,undefined);
    assert.equal(new Headers(init?.headers).get("Idempotency-Key"),"capture-7");
    return Response.json(status===200 ? {success:true,data:{id:"original",sandbox_id:"source",generation_id:"captured-head",created_at:"2026-10-16T00:00:00Z"}} : {success:false,error:{code:"unavailable",message:"retained request"}}, {status});
  }});
  const request=()=>client.sandboxes.getCapturedRootFSSnapshot("source",{expectedRuntimeGeneration:7,idempotencyKey:"capture-7"});
  if(status===200)assert.equal((await request()).generationId,"captured-head");else await assert.rejects(request(),APIError);
  assert.equal(calls,1);
});
