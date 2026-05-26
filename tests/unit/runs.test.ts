import assert from "node:assert";
import { describe, it } from "node:test";

import { Runs } from "../../src/resources/runs.ts";

const runPayload = {
    id: "run_123",
    teamId: "team_123",
    name: "API",
    slug: "api",
    domainLabel: "api-abcd1234",
    url: "https://api-abcd1234.us.sandbox0.run",
    activeRevisionId: "rev_123",
    enabled: true,
    scale: { idleTimeoutSeconds: 300 },
    createdAt: new Date("2026-01-01T00:00:00Z"),
    updatedAt: new Date("2026-01-01T00:00:00Z"),
};

const deployResult = {
  run: runPayload,
  revision: {
    id: "rev_123",
    runId: "run_123",
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

describe("Runs resource", () => {
  it("builds snapshot deploy requests from a compact spec", async () => {
    let gotRequest: unknown;
    const client = {
      apispec: {
        runs: {
          apiV1RunsDeployPost: async ({ runDeployRequest }: { runDeployRequest: unknown }) => {
            gotRequest = runDeployRequest;
            return { data: deployResult };
          },
        },
      },
    } as any;

    const runs = new Runs(client);
    const result = await runs.deploy({
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

    assert.strictEqual(result.run.id, "run_123");
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
        runs: {
          apiV1RunsDeployPost: async ({ runDeployRequest }: { runDeployRequest: unknown }) => {
            gotRequest = runDeployRequest;
            return { data: deployResult };
          },
        },
      },
    } as any;

    const runs = new Runs(client);
    await runs.deployFromSandboxService("sb_123", "api", {
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
        runs: {
          apiV1RunsGet: async () => {
            calls.push("list");
            return { data: { runs: [runPayload] } };
          },
          apiV1RunsIdRevisionsGet: async ({ id }: { id: string }) => {
            calls.push(`revisions:${id}`);
            return { data: { revisions: [deployResult.revision] } };
          },
          apiV1RunsIdActiveRevisionPut: async (request: any) => {
            calls.push(`activate:${request.id}:${request.activateRunRevisionRequest.revisionId}`);
            return { data: deployResult };
          },
        },
      },
    } as any;

    const runs = new Runs(client);
    const items = await runs.list();
    const revisions = await runs.revisions("api");
    await runs.activateRevision("api", "rev_123");

    assert.strictEqual(items[0]?.id, "run_123");
    assert.strictEqual(revisions[0]?.id, "rev_123");
    assert.deepStrictEqual(calls, ["list", "revisions:api", "activate:api:rev_123"]);
  });
});
