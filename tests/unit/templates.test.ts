import assert from "node:assert";
import { describe, it } from "node:test";

import { normalizeNullMapMiddleware } from "../../src/response_normalize.ts";
import { Templates } from "../../src/resources/templates.ts";
import { models } from "../../src/index.ts";
import {
  container,
  resources,
  templateCreateRequest,
  templateSpec,
  templateUpdateRequest,
  warmProcess,
} from "../../src/template_helpers.ts";

describe("Template models", () => {
  it("passes warmProcesses through template create", async () => {
    let gotRequest: unknown;
    const client = {
      apispec: {
        templates: {
          apiV1TemplatesPost: async ({ templateCreateRequest }: { templateCreateRequest: unknown }) => {
            gotRequest = templateCreateRequest;
            return {
              data: {
                templateId: "tpl-warm-process",
                spec: templateCreateRequest,
              },
            };
          },
        },
      },
    } as any;

    const templates = new Templates(client);
    await templates.create({
      templateId: "tpl-warm-process",
      spec: {
        mainContainer: {
          image: "nginx:1.27-alpine",
          resources: { cpu: "500m", memory: "2Gi" },
        },
        warmProcesses: [
          {
            type: models.WarmProcessSpecTypeEnum.Cmd,
            alias: "helper",
            command: ["sh", "-lc", "tail -f /dev/null"],
            cwd: "/workspace",
            envVars: { MODE: "warm" },
          },
        ],
      },
    });

    assert.deepStrictEqual(gotRequest, {
      templateId: "tpl-warm-process",
      spec: {
        mainContainer: {
          image: "nginx:1.27-alpine",
          resources: { cpu: "500m", memory: "2Gi" },
        },
        warmProcesses: [
          {
            type: models.WarmProcessSpecTypeEnum.Cmd,
            alias: "helper",
            command: ["sh", "-lc", "tail -f /dev/null"],
            cwd: "/workspace",
            envVars: { MODE: "warm" },
          },
        ],
      },
    });
  });

  it("normalizes null warmProcesses arrays in template responses", async () => {
    const middleware = normalizeNullMapMiddleware();
    const response = new Response(
      JSON.stringify({
        data: {
          templateId: "tpl_123",
          spec: {
            warmProcesses: null,
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

    assert.deepStrictEqual(body.data.spec.warmProcesses, []);
  });

  it("builds template requests with helper functions", () => {
    const spec = templateSpec(container("ubuntu:24.04", resources("1", "4Gi")), {
      displayName: "Helper Template",
      warmProcesses: [
        warmProcess(models.WarmProcessSpecTypeEnum.Cmd, {
          alias: "helper",
          command: ["sh", "-lc", "tail -f /dev/null"],
          cwd: "/workspace",
          envVars: { MODE: "warm" },
        }),
      ],
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
        warmProcesses: [
          {
            type: models.WarmProcessSpecTypeEnum.Cmd,
            alias: "helper",
            command: ["sh", "-lc", "tail -f /dev/null"],
            cwd: "/workspace",
            envVars: { MODE: "warm" },
          },
        ],
      },
    });
    assert.deepStrictEqual(updateRequest, { spec: createRequest.spec });
  });
});
