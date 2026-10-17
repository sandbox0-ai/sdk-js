import assert from "node:assert/strict";
import test from "node:test";
import {Client} from "../../src/index";

test("restored lookup binds current generation to the original running attempt without retry",async()=>{
 let calls=0,status=200,origin=1,phase="running",finished: string|undefined;
 const sandbox=new Client({token:"test",fetch:async(input,init)=>{
  calls++;const url=new URL(String(input));assert.equal(init?.method,"GET");assert.equal(url.pathname,"/api/v1/sandboxes/sandbox/sessions/conditional/lookup");
  assert.equal(url.searchParams.get("runtime_generation"),"5");assert.equal(url.searchParams.get("creation_runtime_generation"),"1");
  return new Response(JSON.stringify(status===200?{success:true,data:{id:"session",runtime_generation:5,phase,spec:{command:["x"]},
   attempt:{id:"original",number:1,runtime_generation:origin,finished_at:finished}}}:{success:false,error:{code:"unavailable",message:"unavailable"}}),{status});
 }}).sandbox("sandbox");
 assert.equal((await sandbox.findRestoredConditionalSession("original-key",5,1)).attempt?.id,"original");
 origin=5;await assert.rejects(sandbox.findRestoredConditionalSession("original-key",5,1));origin=1;
 phase="stopped";await assert.rejects(sandbox.findRestoredConditionalSession("original-key",5,1));phase="running";
 finished="2026-10-15T00:00:00Z";await assert.rejects(sandbox.findRestoredConditionalSession("original-key",5,1));
 for(const code of [404,405,409,503]){status=code;await assert.rejects(sandbox.findRestoredConditionalSession("original-key",5,1));}
 for(const invalid of [0,-1,5,6,NaN,1.5,Number.MAX_SAFE_INTEGER+1])await assert.rejects(sandbox.findRestoredConditionalSession("original-key",5,invalid));
 assert.equal(calls,8);
});
