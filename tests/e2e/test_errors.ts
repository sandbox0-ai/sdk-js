import { describe, it } from "node:test";
import assert from "node:assert";
import { APIError } from "../../src/index.ts";

describe("Errors", () => {
  it("should format api error string", () => {
    const err = new APIError({
      statusCode: 400,
      code: "bad_request",
      message: "invalid input",
    });
    assert.strictEqual(err.message, "invalid input");
    assert.strictEqual(err.name, "APIError");
    assert.strictEqual(err.statusCode, 400);
    assert.strictEqual(err.code, "bad_request");
  });

  it("should include all error properties", () => {
    const err = new APIError({
      statusCode: 500,
      code: "internal_error",
      message: "something went wrong",
      requestId: "req-123",
      details: { foo: "bar" },
    });
    assert.strictEqual(err.statusCode, 500);
    assert.strictEqual(err.code, "internal_error");
    assert.strictEqual(err.requestId, "req-123");
    assert.deepStrictEqual(err.details, { foo: "bar" });
  });
});
