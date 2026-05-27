import type {
  FunctionInvokeRequest,
  FunctionInvokeResponse,
} from "./apispec/src/models/index";
import type { Client } from "./client";
import { APIError, wrapApiCall } from "./errors";
import { ensureData } from "./response";
import { Sandbox } from "./sandbox";

function getClient(sandbox: Sandbox): Client {
  return (sandbox as any).client as Client;
}

declare module "./sandbox" {
  interface Sandbox {
    invokeFunction(
      name: string,
      request?: FunctionInvokeRequest,
    ): Promise<FunctionInvokeResponse>;
  }
}

Sandbox.prototype.invokeFunction = async function (
  this: Sandbox,
  name: string,
  request: FunctionInvokeRequest = {},
): Promise<FunctionInvokeResponse> {
  if (!name.trim()) {
    throw new APIError({
      statusCode: 0,
      code: "invalid_argument",
      message: "function name is required",
    });
  }
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.functions.apiV1SandboxesIdFunctionsNameInvokePost({
      id: this.id,
      name,
      functionInvokeRequest: request,
    }),
  );
  return ensureData(response, "invoke function returned empty response");
};
