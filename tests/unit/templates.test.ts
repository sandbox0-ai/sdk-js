import assert from "node:assert";
import { describe, it } from "node:test";

import { normalizeNullMapMiddleware } from "../../src/response_normalize.ts";
import { Templates } from "../../src/resources/templates.ts";
import {
  container,
  resources,
  templateCreateRequest,
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
          resources: { cpu: "500m", memory: "2Gi" },
        },
        envVars: { MODE: "template" },
      },
    });

    assert.deepStrictEqual(gotRequest, {
      templateId: "tpl-env-vars",
      spec: {
        mainContainer: {
          image: "nginx:1.27-alpine",
          resources: { cpu: "500m", memory: "2Gi" },
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
    const spec = templateSpec(container("ubuntu:24.04", resources("1", "4Gi")), {
      displayName: "Helper Template",
      envVars: { MODE: "template" },
    });

    const createRequest = templateCreateRequest("tpl-helper", spec);
    const updateRequest = templateUpdateRequest(spec);

    assert.deepStrictEqual(createRequest, {
      templateId: "tpl-helper",
      spec: {
        mainContainer: {
          image: "ubuntu:24.04",
          resources: { cpu: "1", memory: "4Gi" },
        },
        displayName: "Helper Template",
        envVars: { MODE: "template" },
      },
    });
    assert.deepStrictEqual(updateRequest, { spec: createRequest.spec });
  });
});
