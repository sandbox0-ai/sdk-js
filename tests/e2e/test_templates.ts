import { describe, it, before, skip } from "node:test";
import assert from "node:assert";
import { loadE2EConfig, newClient, type E2EConfig } from "./helpers.ts";
import type { SandboxTemplateSpec } from "../../src/apispec/src/models/index.ts";

describe("Templates", () => {
  let cfg: E2EConfig | null;

  before(() => {
    cfg = loadE2EConfig();
    if (!cfg) {
      skip("S0_E2E_BASE_URL or S0_E2E_PASSWORD not set");
    }
  });

  it("should handle template crud", async () => {
    if (!cfg) return;
    const client = await newClient(cfg);

    // List existing templates to get a source template
    const listResp = await client.apispec.templates.apiV1TemplatesGet();
    const data = listResp as { templates?: Array<{ spec?: SandboxTemplateSpec; templateId?: string }> };
    const templates = data.templates;
    if (!templates || templates.length === 0) {
      // Skip test if no templates available (environment issue)
      return;
    }
    const source = templates[0];
    const sourceSpec = source.spec!;

    const templateId = `sdk-js-e2e-${Date.now()}`;
    const created = await client.apispec.templates.apiV1TemplatesPost({
      templateCreateRequest: {
        templateId,
        spec: sourceSpec,
      },
    });
    let deleted = false;

    const cleanup = async () => {
      if (deleted) return;
      try {
        await client.apispec.templates.apiV1TemplatesIdDelete({ id: templateId });
      } catch {
        // Ignore cleanup errors
      }
    };

    try {
      const createdData = created as { templateId?: string };
      assert.strictEqual(createdData.templateId, templateId);

      const fetched = await client.apispec.templates.apiV1TemplatesIdGet({ id: templateId });
      const fetchedData = fetched as { templateId?: string };
      assert.strictEqual(fetchedData.templateId, templateId);

      const updated = await client.apispec.templates.apiV1TemplatesIdPut({
        id: templateId,
        templateUpdateRequest: {
          spec: {
            ...sourceSpec,
            displayName: "SDK JS E2E Updated",
          },
        },
      });
      const updatedData = updated as { templateId?: string };
      assert.strictEqual(updatedData.templateId, templateId);

      await client.apispec.templates.apiV1TemplatesIdDelete({ id: templateId });
      deleted = true;
    } finally {
      await cleanup();
    }
  });
});
