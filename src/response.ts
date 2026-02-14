import { APIError } from "./errors";

export function ensureData<T extends { data?: unknown }>(
  response: T,
  message: string,
): NonNullable<T["data"]> {
  if (response?.data === undefined) {
    throw new APIError({
      statusCode: 0,
      code: "unexpected_response",
      message,
    });
  }
  return response.data as NonNullable<T["data"]>;
}

export function ensureModel<T>(response: T, message: string): T {
  if (response === undefined || response === null) {
    throw new APIError({
      statusCode: 0,
      code: "unexpected_response",
      message,
    });
  }
  return response;
}
