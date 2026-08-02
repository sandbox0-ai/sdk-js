import assert from "node:assert";
import { describe, it } from "node:test";

import { apispec } from "../../src/index.ts";

describe("sandbox expiration decoding", () => {
  it("preserves disabled expirations without creating epoch dates", () => {
    const expirationFields = {
      expires_at: null,
      hard_expires_at: null,
    };

    const sandbox = apispec.models.SandboxFromJSON(expirationFields);
    const summary = apispec.models.SandboxSummaryFromJSON(expirationFields);
    const refresh = apispec.models.RefreshResponseFromJSON(expirationFields);

    for (const value of [sandbox, summary, refresh]) {
      assert.strictEqual(value.expiresAt, undefined);
      assert.strictEqual(value.hardExpiresAt, undefined);
    }
  });
});
