import type { ErrorEnvelope } from "./apispec/src/models/index";
import { ResponseError } from "./apispec/src/runtime";

export class APIError extends Error {
  statusCode: number;
  code?: string;
  details?: unknown;
  requestId?: string;
  body?: string;

  constructor(params: {
    statusCode: number;
    message: string;
    code?: string;
    details?: unknown;
    requestId?: string;
    body?: string;
  }) {
    super(params.message);
    this.name = "APIError";
    this.statusCode = params.statusCode;
    this.code = params.code;
    this.details = params.details;
    this.requestId = params.requestId;
    this.body = params.body;
  }
}

function getRequestId(response: Response): string | undefined {
  return (
    response.headers.get("x-request-id") ??
    response.headers.get("x-requestid") ??
    undefined
  );
}

export async function apiErrorFromResponse(response: Response): Promise<APIError> {
  const statusCode = response.status;
  const requestId = getRequestId(response);
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
  });
}

export async function wrapApiCall<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof ResponseError) {
      throw await apiErrorFromResponse(err.response);
    }
    throw err;
  }
}
