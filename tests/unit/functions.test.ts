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
    const result = await functions.createFromSandbox("sbx-1", "web", { name: "web-fn" });

    assert.deepStrictEqual(gotRequest, {
      name: "web-fn",
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
    const created = await functions.createRevisionFromSandbox("fn-1", "sbx-1", "web-v2", {
      promote: false,
    });
    const alias = await functions.setAlias("fn-1", "production", 2);

    assert.strictEqual(revisions.length, 1);
    assert.strictEqual(created.promoted, false);
    assert.strictEqual(alias.revisionNumber, 2);
    assert.deepStrictEqual(calls, [
      "list:fn-1",
      'create:fn-1:{"source":{"sandboxId":"sbx-1","serviceId":"web-v2"},"promote":false}',
      "alias:fn-1:production:2",
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
    createdAt: new Date("2026-05-14T00:00:00Z"),
    updatedAt: new Date("2026-05-14T00:00:00Z"),
    host: "web.sandbox0.site",
    url: "https://web.sandbox0.site",
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
