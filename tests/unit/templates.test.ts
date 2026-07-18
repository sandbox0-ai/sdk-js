import assert from "node:assert";
import { describe, it } from "node:test";

import { normalizeNullMapMiddleware } from "../../src/response_normalize.ts";
import {
  TemplateCreationFailedError,
  TemplateWaitTimeoutError,
} from "../../src/errors.ts";
import { Templates } from "../../src/resources/templates.ts";
import {
  container,
  resources,
  templateCreateRequest,
  templateFromSandboxCreateRequest,
  templateSpec,
  templateUpdateRequest,
} from "../../src/template_helpers.ts";

describe("Template models", () => {
  it("passes envVars through template create", async () => {
    let gotRequest: unknown;
    const client = {
      apispec: {
        templates: {
          apiV1TemplatesPost: async ({ templateCreateRequest }: { templateCreateRequest: unknown }) => {
            gotRequest = templateCreateRequest;
            return {
              data: {
                templateId: "tpl-env-vars",
                spec: templateCreateRequest,
              },
            };
          },
        },
      },
    } as any;

    const templates = new Templates(client);
    await templates.create({
      templateId: "tpl-env-vars",
      spec: {
        mainContainer: {
          image: "nginx:1.27-alpine",
          resources: { memory: "2Gi" },
        },
        envVars: { MODE: "template" },
      },
    });

    assert.deepStrictEqual(gotRequest, {
      templateId: "tpl-env-vars",
      spec: {
        mainContainer: {
          image: "nginx:1.27-alpine",
          resources: { memory: "2Gi" },
        },
        envVars: { MODE: "template" },
      },
    });
  });

  it("normalizes null tags arrays in template responses", async () => {
    const middleware = normalizeNullMapMiddleware();
    const response = new Response(
      JSON.stringify({
        data: {
          templateId: "tpl_123",
          spec: {
            tags: null,
          },
        },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      },
    );

    const normalized = await middleware.post!({ response } as any);
    assert.ok(normalized instanceof Response);
    const body = await normalized.json();

    assert.deepStrictEqual(body.data.spec.tags, []);
  });

  it("builds template requests with helper functions", () => {
    const spec = templateSpec(container("ubuntu:24.04", resources("4Gi")), {
      displayName: "Helper Template",
      envVars: { MODE: "template" },
    });

    const createRequest = templateCreateRequest("tpl-helper", spec);
    const fromSandboxRequest = templateFromSandboxCreateRequest(
      "tpl-derived",
      "sb_123",
      { displayName: "Derived Template" },
    );
    const updateRequest = templateUpdateRequest(spec);

    assert.deepStrictEqual(createRequest, {
      templateId: "tpl-helper",
      spec: {
        mainContainer: {
          image: "ubuntu:24.04",
          resources: { memory: "4Gi" },
        },
        displayName: "Helper Template",
        envVars: { MODE: "template" },
      },
    });
    assert.deepStrictEqual(fromSandboxRequest, {
      templateId: "tpl-derived",
      sandboxId: "sb_123",
      specOverrides: { displayName: "Derived Template" },
    });
    assert.deepStrictEqual(updateRequest, { spec: createRequest.spec });
  });

  it("creates a template from a sandbox with an idempotency key", async () => {
    let createRequest: unknown;
    let initOverrides: RequestInit | undefined;
    const created = templateDetails("creating");
    const templates = new Templates({
      apispec: {
        templates: {
          apiV1TemplatesFromSandboxPost: async (
            request: unknown,
            init?: RequestInit,
          ) => {
            createRequest = request;
            initOverrides = init;
            return { data: created };
          },
        },
      },
    } as any);

    const controller = new AbortController();
    const result = await templates.createFromSandbox(
      { templateId: "tpl-derived", sandboxId: "sb_123" },
      {
        idempotencyKey: "create-derived-1",
        signal: controller.signal,
      },
    );

    assert.strictEqual(result, created);
    assert.deepStrictEqual(createRequest, {
      templateFromSandboxCreateRequest: {
        templateId: "tpl-derived",
        sandboxId: "sb_123",
      },
      idempotencyKey: "create-derived-1",
    });
    assert.strictEqual(initOverrides?.signal, controller.signal);
  });

  it("waits for template creation to become ready", async () => {
    const observations = [
      templateDetails("creating"),
      templateDetails("ready"),
    ];
    let calls = 0;
    const templates = new Templates({
      apispec: {
        templates: {
          apiV1TemplatesIdGet: async () => ({
            data: observations[Math.min(calls++, observations.length - 1)],
          }),
        },
      },
    } as any);

    const result = await templates.waitUntilReady("tpl-derived", {
      timeoutMs: 100,
      pollIntervalMs: 1,
    });

    assert.equal(result.status?.creation?.state, "ready");
    assert.equal(calls, 2);
  });

  it("treats a template without creation status as ready", async () => {
    const legacy = templateDetails();
    const templates = new Templates({
      apispec: {
        templates: {
          apiV1TemplatesIdGet: async () => ({ data: legacy }),
        },
      },
    } as any);

    assert.strictEqual(
      await templates.waitUntilReady("tpl-legacy", {
        timeoutMs: 0,
        pollIntervalMs: 1,
      }),
      legacy,
    );
  });

  it("reports template creation failures and wait timeouts", async () => {
    const failed = templateDetails("failed");
    failed.status!.creation!.stage = "publishing";
    failed.status!.creation!.reason = "registry_push_failed";
    failed.status!.creation!.message = "registry rejected the image";
    const failedTemplates = new Templates({
      apispec: {
        templates: {
          apiV1TemplatesIdGet: async () => ({ data: failed }),
        },
      },
    } as any);

    await assert.rejects(
      failedTemplates.waitUntilReady("tpl-derived", {
        timeoutMs: 100,
        pollIntervalMs: 1,
      }),
      (error: unknown) => {
        assert.ok(error instanceof TemplateCreationFailedError);
        assert.equal(error.stage, "publishing");
        assert.equal(error.reason, "registry_push_failed");
        return true;
      },
    );

    const creating = templateDetails("creating");
    const creatingTemplates = new Templates({
      apispec: {
        templates: {
          apiV1TemplatesIdGet: async () => ({ data: creating }),
        },
      },
    } as any);
    await assert.rejects(
      creatingTemplates.waitUntilReady("tpl-derived", {
        timeoutMs: 0,
        pollIntervalMs: 1,
      }),
      (error: unknown) => {
        assert.ok(error instanceof TemplateWaitTimeoutError);
        assert.strictEqual(error.lastTemplate, creating);
        return true;
      },
    );
  });

  it("stops waiting locally when aborted", async () => {
    const creating = templateDetails("creating");
    const templates = new Templates({
      apispec: {
        templates: {
          apiV1TemplatesIdGet: async () => ({ data: creating }),
        },
      },
    } as any);
    const controller = new AbortController();
    const reason = new Error("caller stopped waiting");
    const wait = templates.waitUntilReady("tpl-derived", {
      timeoutMs: 1_000,
      pollIntervalMs: 1_000,
      signal: controller.signal,
    });
    controller.abort(reason);

    await assert.rejects(wait, (error: unknown) => error === reason);
  });
});

function templateDetails(
  state?: "creating" | "ready" | "failed",
): any {
  return {
    templateId: "tpl-derived",
    scope: "team",
    spec: {},
    status: state ? { creation: { state, stage: "capturing" } } : {},
    createdAt: new Date("2026-07-18T00:00:00Z"),
    updatedAt: new Date("2026-07-18T00:00:00Z"),
  };
}
