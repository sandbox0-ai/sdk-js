import type {
  Template,
  TemplateCreateRequest,
  TemplateFromSandboxCreateRequest,
  TemplateUpdateRequest,
  SuccessMessageResponse,
} from "../apispec/src/models/index";
import type {
  CreateTemplateFromSandboxOptions,
  TemplateWaitOptions,
} from "../models";
import { ensureData, ensureModel } from "../response";
import {
  TemplateCreationFailedError,
  TemplateWaitTimeoutError,
  wrapApiCall,
} from "../errors";
import type { Client } from "../client";
import {
  sleepWithSignal,
  throwIfAborted,
  validateWaitDuration,
} from "../wait";

const DEFAULT_TEMPLATE_TIMEOUT_MS = 10 * 60_000;
const DEFAULT_TEMPLATE_POLL_INTERVAL_MS = 500;
const TEMPLATE_WAIT_ABORT_MESSAGE = "template readiness wait was aborted";

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
    return this.getWithSignal(templateId);
  }

  async create(request: TemplateCreateRequest): Promise<Template> {
    const response = await wrapApiCall(() =>
      this.client.apispec.templates.apiV1TemplatesPost({
        templateCreateRequest: request,
      }),
    );
    return ensureData(response, "create template returned empty response");
  }

  async createFromSandbox(
    request: TemplateFromSandboxCreateRequest,
    options: CreateTemplateFromSandboxOptions = {},
  ): Promise<Template> {
    throwIfAborted(options.signal, TEMPLATE_WAIT_ABORT_MESSAGE);
    const response = await wrapApiCall(() =>
      this.client.apispec.templates.apiV1TemplatesFromSandboxPost(
        {
          templateFromSandboxCreateRequest: request,
          idempotencyKey: options.idempotencyKey,
        },
        options.signal ? { signal: options.signal } : undefined,
      ),
    );
    const template = ensureData(
      response,
      "create template from sandbox returned empty response",
    );
    if (!options.wait) {
      return template;
    }
    return this.waitUntilReady(template.templateId, options);
  }

  async waitUntilReady(
    templateId: string,
    options: TemplateWaitOptions = {},
  ): Promise<Template> {
    const timeoutMs = options.timeoutMs ?? DEFAULT_TEMPLATE_TIMEOUT_MS;
    const pollIntervalMs = options.pollIntervalMs ?? DEFAULT_TEMPLATE_POLL_INTERVAL_MS;
    validateWaitDuration("timeoutMs", timeoutMs, true);
    validateWaitDuration("pollIntervalMs", pollIntervalMs, false);

    const startedAt = Date.now();
    let lastTemplate: Template | undefined;
    while (true) {
      throwIfAborted(options.signal, TEMPLATE_WAIT_ABORT_MESSAGE);
      lastTemplate = await this.getWithSignal(templateId, options.signal);
      throwIfAborted(options.signal, TEMPLATE_WAIT_ABORT_MESSAGE);

      const creation = lastTemplate.status?.creation;
      if (!creation || creation.state === "ready") {
        return lastTemplate;
      }
      if (creation.state === "failed") {
        throw new TemplateCreationFailedError(lastTemplate);
      }
      if (creation.state !== "creating") {
        throw new Error(
          `template ${templateId} has unknown creation state ${String(creation.state)}`,
        );
      }

      const remainingMs = timeoutMs - (Date.now() - startedAt);
      if (remainingMs <= 0) {
        throw new TemplateWaitTimeoutError({ templateId, timeoutMs, lastTemplate });
      }
      await sleepWithSignal(
        Math.min(pollIntervalMs, remainingMs),
        options.signal,
        TEMPLATE_WAIT_ABORT_MESSAGE,
      );
    }
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

  private async getWithSignal(
    templateId: string,
    signal?: AbortSignal,
  ): Promise<Template> {
    const response = await wrapApiCall(() =>
      this.client.apispec.templates.apiV1TemplatesIdGet(
        { id: templateId },
        signal ? { signal } : undefined,
      ),
    );
    return ensureData(response, "get template returned empty response");
  }
}
