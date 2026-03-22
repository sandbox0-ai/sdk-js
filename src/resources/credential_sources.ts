import type {
  CredentialSourceMetadata,
  CredentialSourceWriteRequest,
  SuccessMessageResponse,
} from "../apispec/src/models/index";
import { ensureData, ensureModel } from "../response";
import { wrapApiCall } from "../errors";
import type { Client } from "../client";

export class CredentialSources {
  constructor(private readonly client: Client) {}

  async list(): Promise<CredentialSourceMetadata[]> {
    const response = await wrapApiCall(() =>
      this.client.apispec.credentialSources.apiV1CredentialSourcesGet(),
    );
    const data = ensureData(
      response,
      "list credential sources returned empty response",
    );
    return data;
  }

  async get(name: string): Promise<CredentialSourceMetadata> {
    const response = await wrapApiCall(() =>
      this.client.apispec.credentialSources.apiV1CredentialSourcesNameGet({
        name,
      }),
    );
    return ensureData(response, "get credential source returned empty response");
  }

  async create(
    request: CredentialSourceWriteRequest,
  ): Promise<CredentialSourceMetadata> {
    const response = await wrapApiCall(() =>
      this.client.apispec.credentialSources.apiV1CredentialSourcesPost({
        credentialSourceWriteRequest: request,
      }),
    );
    return ensureData(
      response,
      "create credential source returned empty response",
    );
  }

  async update(
    name: string,
    request: CredentialSourceWriteRequest,
  ): Promise<CredentialSourceMetadata> {
    const response = await wrapApiCall(() =>
      this.client.apispec.credentialSources.apiV1CredentialSourcesNamePut({
        name,
        credentialSourceWriteRequest: {
          ...request,
          name,
        },
      }),
    );
    return ensureData(
      response,
      "update credential source returned empty response",
    );
  }

  async delete(name: string): Promise<SuccessMessageResponse> {
    const response = await wrapApiCall(() =>
      this.client.apispec.credentialSources.apiV1CredentialSourcesNameDelete({
        name,
      }),
    );
    return ensureModel(response, "delete credential source returned empty response");
  }
}
