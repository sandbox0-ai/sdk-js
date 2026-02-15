import { describe, it, before, skip } from "node:test";
import assert from "node:assert";
import { Client } from "../../src/index.ts";
import { loadE2EConfig, e2eToken, type E2EConfig } from "./helpers.ts";

describe("Client", () => {
  let cfg: E2EConfig | null;

  before(() => {
    cfg = loadE2EConfig();
    if (!cfg) {
      skip("S0_E2E_BASE_URL or S0_E2E_PASSWORD not set");
    }
  });

  it("should create client with options", async () => {
    if (!cfg) return;
    const token = await e2eToken(cfg);

    const client = new Client({
      token,
      baseUrl: cfg.baseUrl,
      userAgent: "sdk-js-e2e",
      headers: { "X-SDK-E2E": "1" },
    });

    assert.ok(client);
    assert.ok(client.sandboxes);
    assert.ok(client.volumes);
    assert.ok(client.apispec);

    const sandbox = client.sandbox("sandbox-id");
    assert.strictEqual(sandbox.id, "sandbox-id");

    const wsUrl = client.websocketUrl("/api/v1/sandboxes");
    assert.ok(wsUrl.startsWith("ws"));
  });
});
