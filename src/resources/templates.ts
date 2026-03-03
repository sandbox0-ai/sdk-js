import type {
  Template,
  TemplateCreateRequest,
  TemplateUpdateRequest,
  SuccessMessageResponse,
} from "../apispec/src/models/index";
import { ensureData, ensureModel } from "../response";
import { wrapApiCall } from "../errors";
import type { Client } from "../client";

export class Templates {
  constructor(private readonly client: Client) {}

  async list(): Promise<Template[]> {
    const response = await wrapApiCall(() =>
      this.client.apispec.templates.apiV1TemplatesGet(),
    );
    const data = ensureData(response, "list templates returned empty response");
    return data.templates ?? [];
  }

  // Backward-compatible alias.
  async listTemplate(): Promise<Template[]> {
    return this.list();
  }

  async get(templateId: string): Promise<Template> {
    const response = await wrapApiCall(() =>
      this.client.apispec.templates.apiV1TemplatesIdGet({ id: templateId }),
    );
    return ensureData(response, "get template returned empty response");
  }

  async create(request: TemplateCreateRequest): Promise<Template> {
    const response = await wrapApiCall(() =>
      this.client.apispec.templates.apiV1TemplatesPost({
        templateCreateRequest: request,
      }),
    );
    return ensureData(response, "create template returned empty response");
  }

  async update(templateId: string, request: TemplateUpdateRequest): Promise<Template> {
    const response = await wrapApiCall(() =>
      this.client.apispec.templates.apiV1TemplatesIdPut({
        id: templateId,
        templateUpdateRequest: request,
      }),
    );
    return ensureData(response, "update template returned empty response");
  }

  async delete(templateId: string): Promise<SuccessMessageResponse> {
    const response = await wrapApiCall(() =>
      this.client.apispec.templates.apiV1TemplatesIdDelete({ id: templateId }),
    );
    return ensureModel(response, "delete template returned empty response");
  }
}
