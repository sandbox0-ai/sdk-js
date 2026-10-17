import assert from "node:assert/strict";
import { test } from "node:test";
import { APIError, Client } from "../../src/index.ts";

const state = { runtime_generation: 7, mutation_sequence: "9007199254740993", size_bytes: 8 << 20, guest_path: "/run/sandbox0/credentials" };

for (const namespace of [undefined, "codex"]) {
  test(`managed files preserve bytes and uint64 sequence: ${namespace ?? "root"}`, async () => {
    const calls: { path: string; method: string; sequence: string | null; body?: any }[] = [];
    const client = new Client({ token: "test", baseUrl: "https://example.test", fetch: async (input, init) => {
      const url = new URL(String(input));
      assert.equal(url.searchParams.get("runtime_generation"), "7");
      calls.push({ path: url.pathname, method: init!.method!, sequence: url.searchParams.get("expected_mutation_sequence"), body: init?.body ? JSON.parse(String(init.body)) : undefined });
      return new Response(JSON.stringify({ success: true, data: { ...state, content: "AP+ACg==" } }), { headers: { "Content-Type": "application/json" } });
    } });
    const options = { runtimeGeneration: 7, namespace };
    const files = client.sandbox("sb_123").managedFiles(options);
    options.runtimeGeneration = 8; // the helper must retain its original generation
    const inspected = await files.inspect();
    await files.write("auth.json", Uint8Array.of(0,255,128,10), inspected.mutationSequence);
    const read = await files.read("auth.json");
    assert.deepEqual(read.content, Uint8Array.of(0,255,128,10));
    await files.delete("auth.json", "18446744073709551615");
    assert.equal(calls.length, 4);
    const root = "/api/v1/sandboxes/sb_123/managed-files";
    const path = namespace ? `/api/v1/sandboxes/sb_123/managed-file-namespaces/${namespace}/auth.json` : `${root}/auth.json`;
    assert.deepEqual(calls.map(c => [c.method, c.path]), [["GET",root],["PUT",path],["GET",path],["DELETE",path]]);
    assert.deepEqual(calls[1].body, { expected_mutation_sequence: "9007199254740993", content: "AP+ACg==" });
    assert.equal(calls[3].sequence,"18446744073709551615");
  });
}

test("managed files never retry an ambiguous mutation or fall back on old services", async () => {
  for (const status of [404,409,503]) {
    let calls = 0;
    const client = new Client({ token: "test", fetch: async (url, init) => {
      calls++;
      assert.match(String(url), /managed-file-namespaces\/codex\/auth.json/);
      assert.equal(init!.method,"PUT");
      assert.equal(JSON.parse(String(init!.body)).content,"");
      return new Response(JSON.stringify({success:false,error:{code:"unavailable",message:"unavailable"}}),{status, headers:{"Content-Type":"application/json"}});
    } });
    await assert.rejects(client.sandbox("sb_123").managedFiles({runtimeGeneration:7,namespace:"codex"}).write("auth.json",new Uint8Array(),"0"),e => e instanceof APIError && e.statusCode === status);
    assert.equal(calls,1);
  }
});

test("managed files reject unsafe names, imprecise generation and sequences locally", async () => {
  const client = new Client({token:"test",fetch:async () => {assert.fail("invalid request reached transport");}});
  const sandbox = client.sandbox("sb_123");
  for (const runtimeGeneration of [0,-1,1.5,Number.MAX_SAFE_INTEGER+1]) assert.throws(() => sandbox.managedFiles({runtimeGeneration}));
  const files = sandbox.managedFiles({runtimeGeneration:7});
  for (const name of ["", "../auth", "auth?x", ".", "..", ".s0-write-hidden", "é"]) {
    assert.throws(() => sandbox.managedFiles({runtimeGeneration:7,namespace:name}));
    await assert.rejects(files.read(name));
  }
  for (const seq of ["01", "-1", "18446744073709551616"]) await assert.rejects(files.write("auth.json",new Uint8Array(),seq));
  await assert.rejects(files.write("auth.json",new Uint8Array((4<<20)+1),"0"));
});

test("managed files reject mismatched generations and malformed base64 without content in errors", async () => {
  for (const data of [{...state,runtime_generation:8,content:""},{...state,content:"private-invalid-base64"}]) {
    const client = new Client({token:"test",fetch:async () => new Response(JSON.stringify({success:true,data}),{headers:{"Content-Type":"application/json"}})});
    await assert.rejects(client.sandbox("sb_123").managedFiles({runtimeGeneration:7}).read("auth.json"), e => e instanceof Error && !e.message.includes("private-invalid-base64"));
  }
});
