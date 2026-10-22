import assert from "node:assert/strict";
import test from "node:test";
import { Client, models } from "../../src/index";

const binding = { sourceRef: "customer-data", mountPath: "/data", prefix: "runs/", access: models.ExternalMountBindingAccessEnum.ReadWrite };
const wireBinding = { source_ref: "customer-data", mount_path: "/data", prefix: "runs/", access: "read_write" };

function response(data: unknown, status = 200) {
  return new Response(JSON.stringify({ success: true, data }), { status });
}

test("external mount claim uses generated bindings and preserves memory overrides", async () => {
  let calls = 0;
  const client = new Client({ token: "test", fetch: async (url, init) => {
    calls++;
    assert.equal(new URL(String(url)).pathname, "/api/v1/sandboxes");
    assert.equal(init?.method, "POST");
    assert.deepEqual(JSON.parse(String(init?.body)), { template: "default", config: {
      external_mounts: [wireBinding], resources: { memory: "1Gi" },
    } });
    return response({ sandbox_id: "sb_1", template: "default", runtime_id: "alloc", status: "running" }, 201);
  } });
  const sandbox = await client.sandboxes.claim("default", { config: { externalMounts: [binding] }, memory: "1Gi" });
  assert.equal(sandbox.id, "sb_1");
  assert.equal(calls, 1);
});

test("paused sandbox details preserve binding without a resume request", async () => {
  let calls = 0;
  const client = new Client({ token: "test", fetch: async (url, init) => {
    calls++;
    assert.equal(new URL(String(url)).pathname, "/api/v1/sandboxes/sb_1");
    assert.equal(init?.method, "GET");
    return response({ id: "sb_1", template_id: "default", team_id: "team", status: "paused", paused: true,
      auto_resume: false, runtime_id: "", runtime_generation: 2, external_mounts: [wireBinding],
      claimed_at: "2026-10-20T00:00:00Z", created_at: "2026-10-20T00:00:00Z", updated_at: "2026-10-20T00:00:00Z" });
  } });
  const detail = await client.sandboxes.get("sb_1");
  assert.equal(detail.paused, true);
  assert.deepEqual(detail.externalMounts, [binding]);
  assert.equal(calls, 1);
});

test("S3 source credentials go only to the source endpoint", async () => {
  const source = { bucket: "customer-bucket", region: "us-east-1", accessKey: "test-access", secretKey: "test-secret",
    sessionToken: "test-session", prefix: "agents/", endpointUrl: "https://s3.example.test", allowWrite: true };
  let calls = 0;
  const client = new Client({ token: "test", fetch: async (url, init) => {
    calls++;
    assert.equal(new URL(String(url)).pathname, "/api/v1/credential-sources");
    assert.equal(init?.method, "POST");
    assert.deepEqual(JSON.parse(String(init?.body)), { name: "customer-data", resolverKind: "static_s3", spec: { staticS3: source } });
    return response({ name: "customer-data", resolverKind: "static_s3", currentVersion: 1, status: "active" }, 201);
  } });
  const metadata = await client.credentialSources.create({ name: "customer-data", resolverKind: models.CredentialSourceResolverKind.StaticS3, spec: { staticS3: source } });
  assert.equal(metadata.resolverKind, "static_s3");
  assert.equal("spec" in metadata, false);
  assert.equal(calls, 1);
});

test("mount claim denial does not retry or fall back to guest commands", async () => {
  let calls = 0;
  const client = new Client({ token: "test", fetch: async () => {
    calls++;
    return new Response(JSON.stringify({ success: false, error: { code: "conflict", message: "mount unavailable" } }), { status: 409 });
  } });
  await assert.rejects(client.sandboxes.claim("default", { externalMounts: [binding] }));
  assert.equal(calls, 1);
});
