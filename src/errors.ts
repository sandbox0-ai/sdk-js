import type { ErrorEnvelope, Sandbox, Template } from "./apispec/src/models/index";
import { runtime } from "./apispec_compat";

export const CLAIM_START_THROTTLED_CODE = "claim_start_throttled";

export class APIError extends Error {
  statusCode: number;
  code?: string;
  details?: unknown;
  requestId?: string;
  body?: string;
  retryAfter?: number;

  constructor(params: {
    statusCode: number;
    message: string;
    code?: string;
    details?: unknown;
    requestId?: string;
    body?: string;
    retryAfter?: number;
  }) {
    super(params.message);
    this.name = "APIError";
    this.statusCode = params.statusCode;
    this.code = params.code;
    this.details = params.details;
    this.requestId = params.requestId;
    this.body = params.body;
    this.retryAfter = params.retryAfter;
  }
}

export class SandboxWaitTimeoutError extends Error {
  readonly sandboxId: string;
  readonly timeoutMs: number;
  readonly lastSandbox?: Sandbox;

  constructor(params: {
    sandboxId: string;
    timeoutMs: number;
    lastSandbox?: Sandbox;
  }) {
    super(`timed out waiting for sandbox ${params.sandboxId} after ${params.timeoutMs}ms`);
    this.name = "SandboxWaitTimeoutError";
    this.sandboxId = params.sandboxId;
    this.timeoutMs = params.timeoutMs;
    this.lastSandbox = params.lastSandbox;
  }
}

export class TemplateWaitTimeoutError extends Error {
  readonly templateId: string;
  readonly timeoutMs: number;
  readonly lastTemplate?: Template;

  constructor(params: {
    templateId: string;
    timeoutMs: number;
    lastTemplate?: Template;
  }) {
    super(`timed out waiting for template ${params.templateId} after ${params.timeoutMs}ms`);
    this.name = "TemplateWaitTimeoutError";
    this.templateId = params.templateId;
    this.timeoutMs = params.timeoutMs;
    this.lastTemplate = params.lastTemplate;
  }
}

export class TemplateCreationFailedError extends Error {
  readonly templateId: string;
  readonly stage?: string;
  readonly reason?: string;
  readonly lastTemplate: Template;

  constructor(template: Template) {
    const creation = template.status?.creation;
    const detail = creation?.message ?? creation?.reason ?? "template creation failed";
    super(`template ${template.templateId} creation failed: ${detail}`);
    this.name = "TemplateCreationFailedError";
    this.templateId = template.templateId;
    this.stage = creation?.stage;
    this.reason = creation?.reason;
    this.lastTemplate = template;
  }
}

function getRequestId(response: Response): string | undefined {
  return (
    response.headers.get("x-request-id") ??
    response.headers.get("x-requestid") ??
    undefined
  );
}

function getRetryAfter(response: Response): number | undefined {
  const value = response.headers.get("retry-after");
  if (!value) {
    return undefined;
  }
  const trimmed = value.trim();
  if (!/^\d+$/.test(trimmed)) {
    return undefined;
  }
  const seconds = Number.parseInt(trimmed, 10);
  return Number.isFinite(seconds) && seconds >= 0 ? seconds : undefined;
}

export function isClaimStartThrottled(error: unknown): error is APIError {
  return error instanceof APIError
    && error.statusCode === 429
    && error.code === CLAIM_START_THROTTLED_CODE;
}

export async function apiErrorFromResponse(response: Response): Promise<APIError> {
  const statusCode = response.status;
  const requestId = getRequestId(response);
  const retryAfter = getRetryAfter(response);
  let bodyText = "";
  let code = "unexpected_response";
  let message = response.statusText || "request failed";
  let details: unknown;

  try {
    bodyText = await response.text();
    if (bodyText) {
      const payload = JSON.parse(bodyText) as ErrorEnvelope | any;
      if (payload?.error) {
        code = payload.error.code ?? code;
        message = payload.error.message ?? message;
        details = payload.error.details;
      }
    }
  } catch (err: unknown) {
    if (err instanceof Error && !message) {
      message = err.message;
    }
  }

  return new APIError({
    statusCode,
    code,
    message,
    details,
    requestId,
    body: bodyText || undefined,
    retryAfter,
  });
}

export async function wrapApiCall<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof runtime.ResponseError) {
      throw await apiErrorFromResponse(err.response);
    }
    throw err;
  }
}
