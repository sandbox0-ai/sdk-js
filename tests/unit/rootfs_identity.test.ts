import assert from "node:assert/strict";
import test from "node:test";
import { Client } from "../../src/index";
const identity={sandbox_id:"sandbox",runtime_generation:7,lifecycle_epoch:8,desired_state:"paused",managed_files_size_bytes:0,filesystem_id:"filesystem",head_generation_id:"head",writer_epoch:9,base_artifact_digest:"sha256:base",source_oci_digest:"sha256:image",has_imported_filesystem:true,active_lifecycle:false,sandbox_created_at:"2026-10-15T00:00:00Z",filesystem_created_at:"2026-10-15T00:00:00Z",observed_at:"2026-10-15T00:00:01Z"};
test("RootFS identity uses one external read without guest or resume",async()=>{
 let calls=0;const client=new Client({token:"test",fetch:async(url,init)=>{calls++;const request=new URL(String(url));assert.equal(init?.method,"GET");assert.equal(request.pathname,"/api/v1/sandboxes/sandbox/rootfs/identity");assert.equal(request.search,"");return new Response(JSON.stringify({success:true,data:identity}),{status:200});}});
 const result=await client.sandboxes.getRootFSIdentity("sandbox");assert.equal(result.hasImportedFilesystem,true);assert.equal(result.filesystemId,"filesystem");assert.equal(result.observedAt.toISOString(),identity.observed_at.replace("Z",".000Z"));assert.equal(calls,1);
});
test("RootFS identity rejects unsafe integers and malformed authority",async()=>{
 for(const change of [{sandbox_id:"foreign"},{writer_epoch:9007199254740992},{runtime_generation:0.5},{lifecycle_epoch:true},{has_imported_filesystem:"false"},{observed_at:"invalid"},{filesystem_id:""}]) {
 const client=new Client({token:"test",fetch:async()=>new Response(JSON.stringify({success:true,data:{...identity,...change}}),{status:200})});await assert.rejects(client.sandboxes.getRootFSIdentity("sandbox"));
 }
});
test("RootFS identity errors never retry or invent pristine storage",async()=>{
 for(const status of [404,409,503]) {let calls=0;const client=new Client({token:"test",fetch:async()=>{calls++;return new Response(JSON.stringify({success:false,error:{code:"unavailable",message:"unavailable"}}),{status});}});await assert.rejects(client.sandboxes.getRootFSIdentity("sandbox"));assert.equal(calls,1);}
});
test("RootFS runtime class is optional and never adopted across transitions",async()=>{
 const digest="sha256:"+"a".repeat(64);
 const read=(change:object)=>new Client({token:"test",fetch:async()=>new Response(JSON.stringify({success:true,data:{...identity,...change}}),{status:200})}).sandboxes.getRootFSIdentity("sandbox");
 assert.equal((await read({})).runtimeCompatibilityDigest,undefined);
 assert.equal((await read({desired_state:"active",runtime_compatibility_digest:digest})).runtimeCompatibilityDigest,digest);
 for(const change of [{runtime_compatibility_digest:"bad",desired_state:"active"},{runtime_compatibility_digest:digest},{runtime_compatibility_digest:digest,desired_state:"active",active_lifecycle:true},{runtime_compatibility_digest:digest,desired_state:"active",runtime_generation:0}])await assert.rejects(read(change));
});

test("retained recovery metadata does not invent a live runtime class",async()=>{
 const digest="sha256:"+"a".repeat(64);
 const read=(change:object)=>new Client({token:"test",fetch:async()=>new Response(JSON.stringify({success:true,data:{...identity,desired_state:"active",retained_runtime_compatibility_digest:digest,...change}}),{status:200})}).sandboxes.getRootFSIdentity("sandbox");
 const result=await read({});assert.equal(result.retainedRuntimeCompatibilityDigest,digest);assert.equal(result.runtimeCompatibilityDigest,undefined);
 for(const change of [{retained_runtime_compatibility_digest:"bad"},{desired_state:"paused"},{active_lifecycle:true},{runtime_generation:0}])await assert.rejects(read(change));
});
