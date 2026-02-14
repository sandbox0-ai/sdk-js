import type {
  ContextExecResponse,
  ContextResponse,
  ContextStatsResponse,
  CreateContextRequest,
  ResizeContextRequest,
  SignalContextRequest,
  SuccessDeletedResponse,
  SuccessResizedResponse,
  SuccessSignaledResponse,
  SuccessWrittenResponse,
} from "./apispec/src/models/index";
import type { Client } from "./client";
import { APIError, wrapApiCall } from "./errors";
import { ensureData, ensureModel } from "./response";
import { Sandbox } from "./sandbox";

function getClient(sandbox: Sandbox): Client {
  return (sandbox as any).client as Client;
}

declare module "./sandbox" {
  interface Sandbox {
    listContexts(): Promise<ContextResponse[]>;
    createContext(request: CreateContextRequest): Promise<ContextResponse>;
    getContext(contextId: string): Promise<ContextResponse>;
    deleteContext(contextId: string): Promise<SuccessDeletedResponse>;
    restartContext(contextId: string): Promise<ContextResponse>;
    contextInput(contextId: string, input: string): Promise<SuccessWrittenResponse>;
    contextExec(contextId: string, input: string): Promise<ContextExecResponse>;
    contextResize(
      contextId: string,
      rows: number,
      cols: number,
    ): Promise<SuccessResizedResponse>;
    contextSignal(contextId: string, signal: string): Promise<SuccessSignaledResponse>;
    contextStats(contextId: string): Promise<ContextStatsResponse>;
  }
}

Sandbox.prototype.listContexts = async function (
  this: Sandbox,
): Promise<ContextResponse[]> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.contexts.apiV1SandboxesIdContextsGet({ id: this.id }),
  );
  const data = ensureData(response, "list contexts returned empty response");
  return data.contexts ?? [];
};

Sandbox.prototype.createContext = async function (
  this: Sandbox,
  request: CreateContextRequest,
): Promise<ContextResponse> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.contexts.apiV1SandboxesIdContextsPost({
      id: this.id,
      createContextRequest: request,
    }),
  );
  return ensureData(response, "create context returned empty response");
};

Sandbox.prototype.getContext = async function (
  this: Sandbox,
  contextId: string,
): Promise<ContextResponse> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.contexts.apiV1SandboxesIdContextsCtxIdGet({
      id: this.id,
      ctxId: contextId,
    }),
  );
  return ensureData(response, "get context returned empty response");
};

Sandbox.prototype.deleteContext = async function (
  this: Sandbox,
  contextId: string,
): Promise<SuccessDeletedResponse> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.contexts.apiV1SandboxesIdContextsCtxIdDelete({
      id: this.id,
      ctxId: contextId,
    }),
  );
  return ensureModel(response, "delete context returned empty response");
};

Sandbox.prototype.restartContext = async function (
  this: Sandbox,
  contextId: string,
): Promise<ContextResponse> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.contexts.apiV1SandboxesIdContextsCtxIdRestartPost({
      id: this.id,
      ctxId: contextId,
    }),
  );
  return ensureData(response, "restart context returned empty response");
};

Sandbox.prototype.contextInput = async function (
  this: Sandbox,
  contextId: string,
  input: string,
): Promise<SuccessWrittenResponse> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.contexts.apiV1SandboxesIdContextsCtxIdInputPost({
      id: this.id,
      ctxId: contextId,
      contextInputRequest: { data: input },
    }),
  );
  return ensureModel(response, "context input returned empty response");
};

Sandbox.prototype.contextExec = async function (
  this: Sandbox,
  contextId: string,
  input: string,
): Promise<ContextExecResponse> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.contexts.apiV1SandboxesIdContextsCtxIdExecPost({
      id: this.id,
      ctxId: contextId,
      contextInputRequest: { data: input },
    }),
  );
  return ensureData(response, "context exec returned empty response");
};

Sandbox.prototype.contextResize = async function (
  this: Sandbox,
  contextId: string,
  rows: number,
  cols: number,
): Promise<SuccessResizedResponse> {
  if (rows <= 0 || cols <= 0) {
    throw new APIError({
      statusCode: 0,
      code: "invalid_argument",
      message: "rows and cols must be > 0",
    });
  }
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.contexts.apiV1SandboxesIdContextsCtxIdResizePost({
      id: this.id,
      ctxId: contextId,
      resizeContextRequest: { rows, cols } as ResizeContextRequest,
    }),
  );
  return ensureModel(response, "context resize returned empty response");
};

Sandbox.prototype.contextSignal = async function (
  this: Sandbox,
  contextId: string,
  signal: string,
): Promise<SuccessSignaledResponse> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.contexts.apiV1SandboxesIdContextsCtxIdSignalPost({
      id: this.id,
      ctxId: contextId,
      signalContextRequest: { signal } as SignalContextRequest,
    }),
  );
  return ensureModel(response, "context signal returned empty response");
};

Sandbox.prototype.contextStats = async function (
  this: Sandbox,
  contextId: string,
): Promise<ContextStatsResponse> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.contexts.apiV1SandboxesIdContextsCtxIdStatsGet({
      id: this.id,
      ctxId: contextId,
    }),
  );
  return ensureData(response, "context stats returned empty response");
};
