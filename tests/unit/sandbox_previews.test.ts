import assert from "node:assert";
import { describe, it } from "node:test";

import { Sandbox } from "../../src/index.ts";

describe("sandbox previews", () => {
  it("creates, renews, and revokes a private preview", async () => {
    const calls: Array<{ operation: string; request: unknown }> = [];
    const grant = {
      id: "preview-1",
      sandboxId: "sb_123",
      port: 3000,
      protocol: "http" as const,
      url: "https://bootstrap.example.test",
      targetUrl: "https://target.example.test",
      expiresAt: new Date("2026-08-03T00:15:00Z"),
      runtimeGeneration: 4,
    };
    const sandbox = new Sandbox({
      id: "sb_123",
      client: {
        apispec: {
          sandboxes: {
            apiV1SandboxesIdPreviewsPost: async (request: unknown) => {
              calls.push({ operation: "create", request });
              return { data: grant };
            },
            apiV1SandboxesIdPreviewsPreviewIdPut: async (request: unknown) => {
              calls.push({ operation: "renew", request });
              return { data: { ...grant, url: grant.targetUrl } };
            },
            apiV1SandboxesIdPreviewsPreviewIdDelete: async (request: unknown) => {
              calls.push({ operation: "revoke", request });
              return { data: { message: "preview grant revoked" } };
            },
          },
        },
      } as any,
    });

    const created = await sandbox.createPreview({
      port: 3000,
      protocol: "http",
      path: "/dashboard",
      ttlSeconds: 900,
    });
    assert.strictEqual(created.url, grant.url);

    const renewed = await sandbox.renewPreview(created.id, { ttlSeconds: 600 });
    assert.strictEqual(renewed.url, grant.targetUrl);
    await sandbox.revokePreview(created.id);

    assert.deepStrictEqual(calls, [
      {
        operation: "create",
        request: {
          id: "sb_123",
          sandboxPreviewCreateRequest: {
            port: 3000,
            protocol: "http",
            path: "/dashboard",
            ttlSeconds: 900,
          },
        },
      },
      {
        operation: "renew",
        request: {
          id: "sb_123",
          previewId: "preview-1",
          sandboxPreviewRenewRequest: { ttlSeconds: 600 },
        },
      },
      {
        operation: "revoke",
        request: { id: "sb_123", previewId: "preview-1" },
      },
    ]);
  });
});
