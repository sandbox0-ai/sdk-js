import assert from "node:assert";
import { describe, it } from "node:test";

import {
  apiErrorFromResponse,
  CLAIM_START_THROTTLED_CODE,
  isClaimStartThrottled,
} from "../../src/errors.ts";

describe("APIError", () => {
  it("parses claim start throttling responses", async () => {
    const response = new Response(JSON.stringify({
      success: false,
      error: {
        code: CLAIM_START_THROTTLED_CODE,
        message: "claim start admission throttled",
      },
    }), {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": "3",
      },
    });

    const error = await apiErrorFromResponse(response);

    assert.strictEqual(error.statusCode, 429);
    assert.strictEqual(error.code, CLAIM_START_THROTTLED_CODE);
    assert.strictEqual(error.retryAfter, 3);
    assert.strictEqual(isClaimStartThrottled(error), true);
  });
});
