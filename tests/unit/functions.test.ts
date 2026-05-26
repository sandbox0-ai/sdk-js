import assert from "node:assert";
import { describe, it } from "node:test";

import { Functions } from "../../src/resources/functions.ts";

const functionPayload = {
    id: "fn_123",
    teamId: "team_123",
    name: "API",
    slug: "api",
    domainLabel: "api-abcd1234",
    url: "https://api-abcd1234.fn.us.sandbox0.app",
    activeRevisionId: "fr_123",
    enabled: true,
    scale: { idleTimeoutSeconds: 300 },
    createdAt: new Date("2026-01-01T00:00:00Z"),
    updatedAt: new Date("2026-01-01T00:00:00Z"),
};

const deployResult = {
  _function: functionPayload,
  revision: {
    id: "fr_123",
    functionId: "fn_123",
    teamId: "team_123",
    number: 1,
    source: { type: "snapshot" },
    spec: {
      template: "node",
      service: {
        id: "api",
        port: 8080,
        ingress: { _public: true, routes: [{ id: "api", resume: true }] },
      },
      mounts: [],
    },
    status: "active",
    createdAt: new Date("2026-01-01T00:00:00Z"),
  },
};

describe("Functions resource", () => {
  it("builds snapshot deploy requests from a compact spec", async () => {
    let gotRequest: unknown;
    const client = {
      apispec: {
        functions: {
          apiV1FunctionsDeployPost: async ({ functionDeployRequest }: { functionDeployRequest: unknown }) => {
            gotRequest = functionDeployRequest;
            return { data: deployResult };
          },
        },
      },
    } as any;

    const functions = new Functions(client);
    const result = await functions.deploy({
      name: "API",
      slug: "api",
      template: "node",
      service: {
        id: "api",
        port: 8080,
        command: ["node", "server.js"],
        cwd: "/app",
        envVars: { NODE_ENV: "production" },
        healthPath: "/healthz",
      },
      mounts: [{ snapshotId: "snap_123", mountPath: "/app" }],
      scale: { idleTimeoutSeconds: 120 },
      activate: false,
    });

    assert.strictEqual(result.function.id, "fn_123");
    assert.deepStrictEqual(gotRequest, {
      name: "API",
      slug: "api",
      scale: { idleTimeoutSeconds: 120 },
      activate: false,
      source: { type: "snapshot" },
      spec: {
        template: "node",
        service: {
          id: "api",
          displayName: undefined,
          port: 8080,
          runtime: {
            type: "cmd",
            command: ["node", "server.js"],
            cwd: "/app",
            envVars: { NODE_ENV: "production" },
          },
          ingress: { _public: true, routes: undefined },
          healthCheck: { path: "/healthz" },
        },
        mounts: [{ snapshotId: "snap_123", mountPath: "/app", readOnly: true }],
        envVars: undefined,
      },
    });
  });

  it("builds sandbox-service deploy requests", async () => {
    let gotRequest: unknown;
    const client = {
      apispec: {
        functions: {
          apiV1FunctionsDeployPost: async ({ functionDeployRequest }: { functionDeployRequest: unknown }) => {
            gotRequest = functionDeployRequest;
            return { data: deployResult };
          },
        },
      },
    } as any;

    const functions = new Functions(client);
    await functions.deployFromSandboxService("sb_123", "api", {
      name: "API",
      slug: "api",
    });

    assert.deepStrictEqual(gotRequest, {
      name: "API",
      slug: "api",
      scale: undefined,
      activate: undefined,
      source: {
        type: "sandbox_service",
        sandboxService: {
          sandboxId: "sb_123",
          serviceId: "api",
        },
      },
    });
  });

  it("wraps list and revision endpoints", async () => {
    const calls: string[] = [];
    const client = {
      apispec: {
        functions: {
          apiV1FunctionsGet: async () => {
            calls.push("list");
            return { data: { functions: [functionPayload] } };
          },
          apiV1FunctionsIdRevisionsGet: async ({ id }: { id: string }) => {
            calls.push(`revisions:${id}`);
            return { data: { revisions: [deployResult.revision] } };
          },
          apiV1FunctionsIdActiveRevisionPut: async (request: any) => {
            calls.push(`activate:${request.id}:${request.activateFunctionRevisionRequest.revisionId}`);
            return { data: deployResult };
          },
        },
      },
    } as any;

    const functions = new Functions(client);
    const items = await functions.list();
    const revisions = await functions.revisions("api");
    await functions.activateRevision("api", "fr_123");

    assert.strictEqual(items[0]?.id, "fn_123");
    assert.strictEqual(revisions[0]?.id, "fr_123");
    assert.deepStrictEqual(calls, ["list", "revisions:api", "activate:api:fr_123"]);
  });
});
