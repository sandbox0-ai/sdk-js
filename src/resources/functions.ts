import type {
  FunctionAlias,
  FunctionAliasUpdateRequest,
  FunctionCreateRequest,
  FunctionRecord,
  FunctionRevision,
  FunctionRevisionCreateRequest,
  FunctionSourceRequest,
  SuccessFunctionCreateResponseAllOfData,
  SuccessFunctionRevisionCreateResponseAllOfData,
} from "../apispec/src/models/index";
import { ensureData } from "../response";
import { wrapApiCall } from "../errors";
import type { Client } from "../client";

export interface FunctionCreateResult {
  function: FunctionRecord;
  revision: FunctionRevision;
  alias: FunctionAlias;
}

export interface FunctionRevisionCreateResult {
  revision: FunctionRevision;
  promoted: boolean;
}

export interface CreateFunctionFromSandboxOptions {
  name?: string;
}

export interface CreateFunctionRevisionFromSandboxOptions {
  promote?: boolean;
}

export function functionSource(sandboxId: string, serviceId: string): FunctionSourceRequest {
  return {
    sandboxId,
    serviceId,
  };
}

export class Functions {
  constructor(private readonly client: Client) {}

  async list(): Promise<FunctionRecord[]> {
    const response = await wrapApiCall(() =>
      this.client.apispec.functions.apiV1FunctionsGet(),
    );
    const data = ensureData(response, "list functions returned empty response");
    return data.functions ?? [];
  }

  async get(functionId: string): Promise<FunctionRecord> {
    const response = await wrapApiCall(() =>
      this.client.apispec.functions.apiV1FunctionsIdGet({ id: functionId }),
    );
    const data = ensureData(response, "get function returned empty response");
    return data._function;
  }

  async create(request: FunctionCreateRequest): Promise<FunctionCreateResult> {
    const response = await wrapApiCall(() =>
      this.client.apispec.functions.apiV1FunctionsPost({
        functionCreateRequest: request,
      }),
    );
    return toFunctionCreateResult(
      ensureData(response, "create function returned empty response"),
    );
  }

  async createFromSandbox(
    sandboxId: string,
    serviceId: string,
    options: CreateFunctionFromSandboxOptions = {},
  ): Promise<FunctionCreateResult> {
    return this.create({
      name: options.name,
      source: functionSource(sandboxId, serviceId),
    });
  }

  async listRevisions(functionId: string): Promise<FunctionRevision[]> {
    const response = await wrapApiCall(() =>
      this.client.apispec.functions.apiV1FunctionsIdRevisionsGet({ id: functionId }),
    );
    const data = ensureData(response, "list function revisions returned empty response");
    return data.revisions ?? [];
  }

  async createRevision(
    functionId: string,
    request: FunctionRevisionCreateRequest,
  ): Promise<FunctionRevisionCreateResult> {
    const response = await wrapApiCall(() =>
      this.client.apispec.functions.apiV1FunctionsIdRevisionsPost({
        id: functionId,
        functionRevisionCreateRequest: request,
      }),
    );
    return toFunctionRevisionCreateResult(
      ensureData(response, "create function revision returned empty response"),
    );
  }

  async createRevisionFromSandbox(
    functionId: string,
    sandboxId: string,
    serviceId: string,
    options: CreateFunctionRevisionFromSandboxOptions = {},
  ): Promise<FunctionRevisionCreateResult> {
    return this.createRevision(functionId, {
      source: functionSource(sandboxId, serviceId),
      promote: options.promote,
    });
  }

  async setAlias(
    functionId: string,
    alias: string,
    revisionNumber: number,
  ): Promise<FunctionAlias> {
    const request: FunctionAliasUpdateRequest = {
      revisionNumber,
    };
    const response = await wrapApiCall(() =>
      this.client.apispec.functions.apiV1FunctionsIdAliasesAliasPut({
        id: functionId,
        alias,
        functionAliasUpdateRequest: request,
      }),
    );
    const data = ensureData(response, "set function alias returned empty response");
    return data.alias;
  }
}

function toFunctionCreateResult(data: SuccessFunctionCreateResponseAllOfData): FunctionCreateResult {
  return {
    function: data._function,
    revision: data.revision,
    alias: data.alias,
  };
}

function toFunctionRevisionCreateResult(
  data: SuccessFunctionRevisionCreateResponseAllOfData,
): FunctionRevisionCreateResult {
  return {
    revision: data.revision,
    promoted: data.promoted,
  };
}
