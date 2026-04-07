import { describe, it, before, skip } from "node:test";
import assert from "node:assert";
import { loadE2EConfig, newClient, type E2EConfig } from "./helpers.ts";

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
    const templates = await client.templates.list();
    if (!templates || templates.length === 0) {
      // Skip test if no templates available (environment issue)
      return;
    }
    const source = templates[0];
    const sourceSpec = source.spec!;
    const sidecars = [
      {
        name: "codex",
        image: "busybox:latest",
        command: ["sh", "-lc", "touch /tmp/ready; tail -f /dev/null"],
        resources: {
          cpu: "250m",
          memory: "1Gi",
        },
        readinessProbe: {
          exec: { command: ["test", "-f", "/tmp/ready"] },
          initialDelaySeconds: 1,
          periodSeconds: 1,
          failureThreshold: 1,
        },
      },
    ];

    const templateId = `sdk-js-e2e-${Date.now()}`;
    const created = await client.templates.create({
      templateId,
      spec: {
        ...sourceSpec,
        sidecars,
      },
    });
    let deleted = false;

    const cleanup = async () => {
      if (deleted) return;
      try {
        await client.templates.delete(templateId);
      } catch {
        // Ignore cleanup errors
      }
    };

    try {
      assert.strictEqual(created.templateId, templateId);
      assert.strictEqual(created.spec?.sidecars?.length, 1);
      assert.deepStrictEqual(created.spec?.sidecars?.[0]?.readinessProbe?.exec?.command, [
        "test",
        "-f",
        "/tmp/ready",
      ]);

      const fetched = await client.templates.get(templateId);
      assert.strictEqual(fetched.templateId, templateId);
      assert.strictEqual(fetched.spec?.sidecars?.length, 1);

      const updated = await client.templates.update(templateId, {
        spec: {
          ...fetched.spec!,
          displayName: "SDK JS E2E Updated",
        },
      });
      assert.strictEqual(updated.templateId, templateId);
      assert.strictEqual(updated.spec?.sidecars?.length, 1);

      await client.templates.delete(templateId);
      deleted = true;
    } finally {
      await cleanup();
    }
  });
});
