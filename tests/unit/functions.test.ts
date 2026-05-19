import assert from "node:assert";
import { describe, it } from "node:test";

import { Functions } from "../../src/resources/functions.ts";

describe("Functions resource", () => {
  it("creates a function from a sandbox service", async () => {
    let gotRequest: unknown;
    const client = {
      apispec: {
        functions: {
          apiV1FunctionsPost: async ({ functionCreateRequest }: { functionCreateRequest: unknown }) => {
            gotRequest = functionCreateRequest;
            return {
              data: {
                _function: functionRecord(),
                revision: functionRevision(1),
                alias: functionAlias(1),
              },
            };
          },
        },
      },
    } as any;

    const functions = new Functions(client);
    const result = await functions.createFromSandbox("sbx-1", "web", {
      name: "web-fn",
      autoscaling: functionAutoscaling(1, 3, 7, 60),
    });

    assert.deepStrictEqual(gotRequest, {
      name: "web-fn",
      autoscaling: {
        minWarm: 1,
        maxActive: 3,
        targetConcurrency: 7,
        scaleDownAfterSeconds: 60,
      },
      source: {
        sandboxId: "sbx-1",
        serviceId: "web",
      },
    });
    assert.strictEqual(result.function.id, "fn-1");
    assert.strictEqual(result.revision.revisionNumber, 1);
    assert.strictEqual(result.alias.alias, "production");
  });

  it("lists revisions and moves aliases", async () => {
    const calls: string[] = [];
    const client = {
      apispec: {
        functions: {
          apiV1FunctionsIdRevisionsGet: async ({ id }: { id: string }) => {
            calls.push(`list:${id}`);
            return {
              data: {
                revisions: [functionRevision(1)],
              },
            };
          },
          apiV1FunctionsIdRevisionsRevisionNumberGet: async ({
            id,
            revisionNumber,
          }: {
            id: string;
            revisionNumber: number;
          }) => {
            calls.push(`get-revision:${id}:${revisionNumber}`);
            return {
              data: {
                revision: functionRevision(revisionNumber),
              },
            };
          },
          apiV1FunctionsIdRevisionsPost: async ({
            id,
            functionRevisionCreateRequest,
          }: {
            id: string;
            functionRevisionCreateRequest: unknown;
          }) => {
            calls.push(`create:${id}:${JSON.stringify(functionRevisionCreateRequest)}`);
            return {
              data: {
                revision: functionRevision(2),
                promoted: false,
              },
            };
          },
          apiV1FunctionsIdAliasesGet: async ({ id }: { id: string }) => {
            calls.push(`aliases:${id}`);
            return {
              data: {
                aliases: [functionAlias(1)],
              },
            };
          },
          apiV1FunctionsIdAliasesAliasGet: async ({
            id,
            alias,
          }: {
            id: string;
            alias: string;
          }) => {
            calls.push(`get-alias:${id}:${alias}`);
            return {
              data: {
                alias: functionAlias(1),
              },
            };
          },
          apiV1FunctionsIdAliasesAliasPut: async ({
            id,
            alias,
            functionAliasUpdateRequest,
          }: {
            id: string;
            alias: string;
            functionAliasUpdateRequest: { revisionNumber: number };
          }) => {
            calls.push(`alias:${id}:${alias}:${functionAliasUpdateRequest.revisionNumber}`);
            return {
              data: {
                alias: functionAlias(functionAliasUpdateRequest.revisionNumber),
              },
            };
          },
        },
      },
    } as any;

    const functions = new Functions(client);
    const revisions = await functions.listRevisions("fn-1");
    const revision = await functions.getRevision("fn-1", 2);
    const created = await functions.createRevisionFromSandbox("fn-1", "sbx-1", "web-v2", {
      promote: false,
    });
    const aliases = await functions.listAliases("fn-1");
    const gotAlias = await functions.getAlias("fn-1", "production");
    const alias = await functions.setAlias("fn-1", "production", 2);

    assert.strictEqual(revisions.length, 1);
    assert.strictEqual(revision.revisionNumber, 2);
    assert.strictEqual(created.promoted, false);
    assert.strictEqual(aliases.length, 1);
    assert.strictEqual(gotAlias.alias, "production");
    assert.strictEqual(alias.revisionNumber, 2);
    assert.deepStrictEqual(calls, [
      "list:fn-1",
      "get-revision:fn-1:2",
      'create:fn-1:{"source":{"sandboxId":"sbx-1","serviceId":"web-v2"},"promote":false}',
      "aliases:fn-1",
      "get-alias:fn-1:production",
      "alias:fn-1:production:2",
    ]);
  });

  it("updates, deletes, and manages runtime", async () => {
    const calls: string[] = [];
    const client = {
      apispec: {
        functions: {
          apiV1FunctionsIdPut: async ({
            id,
            functionUpdateRequest,
          }: {
            id: string;
            functionUpdateRequest: unknown;
          }) => {
            calls.push(`update:${id}:${JSON.stringify(functionUpdateRequest)}`);
            return {
              data: {
                _function: {
                  ...functionRecord(),
                  enabled: false,
                },
              },
            };
          },
          apiV1FunctionsIdDelete: async ({ id }: { id: string }) => {
            calls.push(`delete:${id}`);
            return {
              data: {
                _function: {
                  ...functionRecord(),
                  deletedAt: new Date("2026-05-14T01:00:00Z"),
                },
              },
            };
          },
          apiV1FunctionsIdRuntimeGet: async ({ id }: { id: string }) => {
            calls.push(`runtime:${id}`);
            return { data: { runtime: functionRuntime("active") } };
          },
          apiV1FunctionsIdRuntimeRestartPost: async ({ id }: { id: string }) => {
            calls.push(`restart:${id}`);
            return { data: { runtime: functionRuntime("idle") } };
          },
          apiV1FunctionsIdRuntimeRecyclePost: async ({ id }: { id: string }) => {
            calls.push(`recycle:${id}`);
            return { data: { runtime: functionRuntime("idle") } };
          },
        },
      },
    } as any;

    const functions = new Functions(client);
    const updated = await functions.update("fn-1", {
      name: "new-name",
      enabled: false,
      autoscaling: functionAutoscaling(0, 5, 10, 120),
    });
    const deleted = await functions.delete("fn-1");
    const runtime = await functions.getRuntime("fn-1");
    const restarted = await functions.restartRuntime("fn-1");
    const recycled = await functions.recycleRuntime("fn-1");

    assert.strictEqual(updated.enabled, false);
    assert.ok(deleted.deletedAt);
    assert.strictEqual(runtime.state, "active");
    assert.strictEqual(restarted.state, "idle");
    assert.strictEqual(recycled.state, "idle");
    assert.deepStrictEqual(calls, [
      'update:fn-1:{"name":"new-name","enabled":false,"autoscaling":{"minWarm":0,"maxActive":5,"targetConcurrency":10,"scaleDownAfterSeconds":120}}',
      "delete:fn-1",
      "runtime:fn-1",
      "restart:fn-1",
      "recycle:fn-1",
    ]);
  });
});

function functionRecord() {
  return {
    id: "fn-1",
    teamId: "team-1",
    name: "web",
    slug: "web",
    domainLabel: "web",
    enabled: true,
    autoscaling: functionAutoscaling(),
    createdAt: new Date("2026-05-14T00:00:00Z"),
    updatedAt: new Date("2026-05-14T00:00:00Z"),
    host: "web.sandbox0.site",
    url: "https://web.sandbox0.site",
  };
}

function functionRuntime(state: "active" | "idle" | "disabled") {
  return {
    functionId: "fn-1",
    revisionId: "rev-1",
    revisionNumber: 1,
    state,
    autoscaling: functionAutoscaling(),
    runtimeSandboxId: state === "active" ? "sb-runtime" : undefined,
    runtimeContextId: state === "active" ? "ctx-runtime" : undefined,
    runtimeUpdatedAt: new Date("2026-05-14T00:00:00Z"),
    instances: [],
  };
}

function functionAutoscaling(
  minWarm = 0,
  maxActive = 20,
  targetConcurrency = 80,
  scaleDownAfterSeconds = 300,
) {
  return {
    minWarm,
    maxActive,
    targetConcurrency,
    scaleDownAfterSeconds,
  };
}

function functionRevision(revisionNumber: number) {
  return {
    id: `rev-${revisionNumber}`,
    functionId: "fn-1",
    teamId: "team-1",
    revisionNumber,
    sourceSandboxId: "sbx-1",
    sourceServiceId: "web",
    sourceTemplateId: "default",
    restoreMounts: [],
    serviceSnapshot: {
      id: "web",
      port: 8080,
      ingress: { public: true },
    },
    createdAt: new Date("2026-05-14T00:00:00Z"),
  };
}

function functionAlias(revisionNumber: number) {
  return {
    functionId: "fn-1",
    alias: "production",
    revisionId: `rev-${revisionNumber}`,
    revisionNumber,
    updatedAt: new Date("2026-05-14T00:00:00Z"),
  };
}
