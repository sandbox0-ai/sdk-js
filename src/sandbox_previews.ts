import type {
  SandboxPreviewCreateRequest,
  SandboxPreviewGrant,
  SandboxPreviewRenewRequest,
} from "./apispec/src/models/index";
import type { Client } from "./client";
import { wrapApiCall } from "./errors";
import { ensureData } from "./response";
import { Sandbox } from "./sandbox";

function getClient(sandbox: Sandbox): Client {
  return (sandbox as any).client as Client;
}

declare module "./sandbox" {
  interface Sandbox {
    createPreview(request: SandboxPreviewCreateRequest): Promise<SandboxPreviewGrant>;
    renewPreview(previewId: string, request?: SandboxPreviewRenewRequest): Promise<SandboxPreviewGrant>;
    revokePreview(previewId: string): Promise<void>;
  }
}

Sandbox.prototype.createPreview = async function (
  this: Sandbox,
  request: SandboxPreviewCreateRequest,
): Promise<SandboxPreviewGrant> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.sandboxes.apiV1SandboxesIdPreviewsPost({
      id: this.id,
      sandboxPreviewCreateRequest: request,
    }),
  );
  return ensureData(response, "create sandbox preview returned empty response");
};

Sandbox.prototype.renewPreview = async function (
  this: Sandbox,
  previewId: string,
  request: SandboxPreviewRenewRequest = {},
): Promise<SandboxPreviewGrant> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.sandboxes.apiV1SandboxesIdPreviewsPreviewIdPut({
      id: this.id,
      previewId,
      sandboxPreviewRenewRequest: request,
    }),
  );
  return ensureData(response, "renew sandbox preview returned empty response");
};

Sandbox.prototype.revokePreview = async function (
  this: Sandbox,
  previewId: string,
): Promise<void> {
  const client = getClient(this);
  await wrapApiCall(() =>
    client.apispec.sandboxes.apiV1SandboxesIdPreviewsPreviewIdDelete({
      id: this.id,
      previewId,
    }),
  );
};
