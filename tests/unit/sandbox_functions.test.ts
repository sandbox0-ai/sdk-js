import assert from "node:assert";
import { describe, it } from "node:test";

import { Sandbox } from "../../src/index.ts";

describe("sandbox functions", () => {
  it("invokes a function through the generated API", async () => {
    let gotRequest: unknown;
    const sandbox = new Sandbox({
      id: "sb_123",
      client: {
        apispec: {
          functions: {
            apiV1SandboxesIdFunctionsNameInvokePost: async (request: unknown) => {
              gotRequest = request;
              return {
                data: {
                  status: 201,
                  headers: { "x-value": ["ok"] },
                  bodyBase64: "aGk=",
                },
              };
            },
          },
        },
      } as any,
    });

    const response = await sandbox.invokeFunction("main", {
      method: "POST",
      path: "/hello",
      bodyBase64: "e30=",
    });

    assert.deepStrictEqual(gotRequest, {
      id: "sb_123",
      name: "main",
      functionInvokeRequest: {
        method: "POST",
        path: "/hello",
        bodyBase64: "e30=",
      },
    });
    assert.strictEqual(response.status, 201);
    assert.deepStrictEqual(response.headers?.["x-value"], ["ok"]);
    assert.strictEqual(response.bodyBase64, "aGk=");
  });
});
