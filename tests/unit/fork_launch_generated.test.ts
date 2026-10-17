import assert from "node:assert/strict";
import { it } from "node:test";
import { Client } from "../../src/index.ts";
const conditions={forkOperationId:"fork",filesystemId:"child",headGenerationId:"head",writerEpoch:7};
for(const method of ["GET","POST"])for(const status of [200,202,404,409,503]){
 if(method==="GET"&&status===202)continue;
 it(`generated first fork launch preserves original conditions (${method}, ${status})`,async()=>{
  let calls=0;
  const c=new Client({token:"test",fetch:async(url,init)=>{
   calls++;const u=new URL(String(url));assert.equal(u.pathname,"/api/v1/sandboxes/child/fork-launch");assert.equal(init?.method,method);assert.equal(new Headers(init?.headers).get("Idempotency-Key"),"original");
   const expected={fork_operation_id:"fork",filesystem_id:"child",head_generation_id:"head",writer_epoch:7};
   if(method==="POST"){assert.deepEqual(JSON.parse(String(init?.body)),expected);assert.equal(u.search,"");}
   else{assert.equal(init?.body,undefined);assert.deepEqual(Object.fromEntries(u.searchParams),{...expected,writer_epoch:"7"});}
   return Response.json(status<400?{success:true,data:{operation_id:"launch",sandbox_id:"child",...expected,lifecycle_epoch:1,runtime_generation:0,state:"pending",current:true}}:{success:false,error:{code:"unavailable",message:"retain original"}},{status});
  }});
  const invoke=()=>method==="POST"?c.apispec.sandboxRootfs.launchSandboxRootFSFork({id:"child",idempotencyKey:"original",sandboxRootFSForkLaunchRequest:conditions}):c.apispec.sandboxRootfs.getSandboxRootFSForkLaunch({id:"child",idempotencyKey:"original",...conditions});
  if(status<400){const result=await invoke();assert.equal(result.data.runtimeGeneration,0);assert.equal(result.data.headGenerationId,"head");}else await assert.rejects(invoke());
  assert.equal(calls,1);
 });
}
