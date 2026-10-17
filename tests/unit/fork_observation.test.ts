import assert from "node:assert/strict";
import { it } from "node:test";
import { Client, APIError } from "../../src/index.ts";
const fixture = {"operation_id":"fork-op","source_sandbox_id":"source","target_sandbox_id":"child","source_runtime_generation":7,"source_filesystem_id":"source-fs","source_head_generation_id":"source-head","target_filesystem_id":"child","target_head_generation_id":"child-head","base_artifact_digest":"base","source_oci_digest":"oci","writer_epoch":1,"managed_files_size_bytes":100,"auto_resume":false,"automatic_routes":false,"sandbox_created_at":"2026-10-17T00:00:00Z","filesystem_created_at":"2026-10-17T00:00:00Z","observed_at":"2026-10-17T00:00:00Z"};
for (const generation of [0,7]) for (const status of [200,404,409,503]) it(`fork lookup only reads original coordinates (${generation}, ${status})`, async () => {
 let calls=0;
 const client=new Client({token:"test",fetch:async(url,init)=>{
  calls++;const parsed=new URL(String(url));assert.equal(parsed.pathname,"/api/v1/sandboxes/source/fork");
  assert.equal(parsed.searchParams.get("expected_runtime_generation"),String(generation));
  assert.equal(init?.method,"GET");assert.equal(init?.body,undefined);assert.equal(new Headers(init?.headers).get("Idempotency-Key"),"original-fork");
  return Response.json(status===200?{success:true,data:{...fixture,source_runtime_generation:generation}}:{success:false,error:{code:"unavailable",message:"retain request"}},{status});
 }});
 const read=()=>client.sandboxes.getRootFSFork("source",{expectedRuntimeGeneration:generation,idempotencyKey:"original-fork"});
 if(status===200)assert.equal((await read()).targetSandboxId,"child");else await assert.rejects(read(),APIError);
 assert.equal(calls,1);
});
it("fork lookup rejects invalid inputs and mismatched or incomplete receipts",async()=>{
 let calls=0;let data:Record<string,unknown>={...fixture};
 const client=new Client({token:"test",fetch:async()=>{calls++;return Response.json({success:true,data});}});
 const options={expectedRuntimeGeneration:7,idempotencyKey:"original-fork"};
 for(const generation of [-1,1.5,Number.MAX_SAFE_INTEGER+1])await assert.rejects(client.sandboxes.getRootFSFork("source",{...options,expectedRuntimeGeneration:generation}));
 for(const key of ["","bad key"])await assert.rejects(client.sandboxes.getRootFSFork("source",{...options,idempotencyKey:key}));
 assert.equal(calls,0);
 for(const [key,value] of [["source_sandbox_id","foreign"],["source_runtime_generation",8],["target_filesystem_id","foreign"],["writer_epoch",Number.MAX_SAFE_INTEGER+1],["auto_resume",undefined],["observed_at","invalid"]]){
  data={...fixture,[String(key)]:value};await assert.rejects(client.sandboxes.getRootFSFork("source",options));
 }
 assert.equal(calls,6);
});
