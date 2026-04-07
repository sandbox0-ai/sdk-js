import assert from "node:assert";
import { describe, it } from "node:test";

import { normalizeNullMapMiddleware } from "../../src/response_normalize.ts";
import { Templates } from "../../src/resources/templates.ts";
import {
  container,
  mount,
  resources,
  sharedVolume,
  sidecar,
  templateCreateRequest,
  templateSpec,
  templateUpdateRequest,
} from "../../src/template_helpers.ts";

describe("Template models", () => {
  it("passes sharedVolumes and sidecar mounts through template create", async () => {
    let gotRequest: unknown;
    const client = {
      apispec: {
        templates: {
          apiV1TemplatesPost: async ({ templateCreateRequest }: { templateCreateRequest: unknown }) => {
            gotRequest = templateCreateRequest;
            return {
              data: {
                templateId: "tpl-shared-volume",
                spec: templateCreateRequest,
              },
            };
          },
        },
      },
    } as any;

    const templates = new Templates(client);
    await templates.create({
      templateId: "tpl-shared-volume",
      spec: {
        mainContainer: {
          image: "nginx:1.27-alpine",
          resources: { cpu: "500m", memory: "2Gi" },
        },
        runtimeClassName: "kata-dev",
        sharedVolumes: [
          {
            name: "workspace",
            mountPath: "/workspace/shared",
          },
        ],
        sidecars: [
          {
            name: "helper",
            image: "busybox:latest",
            resources: { cpu: "250m", memory: "1Gi" },
            mounts: [{ name: "workspace", mountPath: "/shared" }],
          },
        ],
      },
    });

    assert.deepStrictEqual(gotRequest, {
      templateId: "tpl-shared-volume",
      spec: {
        mainContainer: {
          image: "nginx:1.27-alpine",
          resources: { cpu: "500m", memory: "2Gi" },
        },
        runtimeClassName: "kata-dev",
        sharedVolumes: [
          {
            name: "workspace",
            mountPath: "/workspace/shared",
          },
        ],
        sidecars: [
          {
            name: "helper",
            image: "busybox:latest",
            resources: { cpu: "250m", memory: "1Gi" },
            mounts: [{ name: "workspace", mountPath: "/shared" }],
          },
        ],
      },
    });
  });

  it("normalizes null sharedVolumes arrays in template responses", async () => {
    const middleware = normalizeNullMapMiddleware();
    const response = new Response(
      JSON.stringify({
        data: {
          templateId: "tpl_123",
          spec: {
            sharedVolumes: null,
            sidecars: null,
          },
        },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      },
    );

    const normalized = await middleware.post!({ response } as any);
    const body = await normalized.json();

    assert.deepStrictEqual(body.data.spec.sharedVolumes, []);
    assert.deepStrictEqual(body.data.spec.sidecars, []);
  });

  it("builds template requests with helper functions", () => {
    const spec = templateSpec(container("ubuntu:24.04", resources("1", "4Gi")), {
      displayName: "Helper Template",
      sharedVolumes: [sharedVolume("workspace", "/workspace/shared", { sandboxVolumeId: "vol_123", writeback: true })],
      sidecars: [
        sidecar("helper", "busybox:latest", resources("250m", "1Gi"), {
          command: ["sh", "-lc", "tail -f /dev/null"],
          mounts: [mount("workspace", "/shared")],
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
        sharedVolumes: [
          {
            name: "workspace",
            mountPath: "/workspace/shared",
            writeback: true,
            sandboxVolumeId: "vol_123",
          },
        ],
        sidecars: [
          {
            name: "helper",
            image: "busybox:latest",
            resources: { cpu: "250m", memory: "1Gi" },
            command: ["sh", "-lc", "tail -f /dev/null"],
            mounts: [{ name: "workspace", mountPath: "/shared" }],
          },
        ],
      },
    });
    assert.deepStrictEqual(updateRequest, { spec: createRequest.spec });
  });

  it("builds claim-bound shared volumes without sandboxVolumeId", () => {
    assert.deepStrictEqual(sharedVolume("workspace", "/workspace/shared"), {
      name: "workspace",
      mountPath: "/workspace/shared",
    });
  });
});
