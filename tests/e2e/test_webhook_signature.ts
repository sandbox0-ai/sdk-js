import assert from "node:assert";
import { describe, it } from "node:test";
import { createHmac } from "node:crypto";

import { verifyWebhookSignature } from "../../src/index.ts";

function signLikeProcd(secret: string, payload: string): string {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

describe("Webhook Signature", () => {
  it("should verify valid and invalid signatures", () => {
    const secret = "sandbox0-webhook-secret";
    const payload = '{"event_id":"evt_1","event_type":"sandbox.ready","sandbox_id":"sb_1"}';
    const validSignature = signLikeProcd(secret, payload);

    assert.strictEqual(verifyWebhookSignature(secret, payload, validSignature), true);
    assert.strictEqual(verifyWebhookSignature(secret, payload, validSignature.toUpperCase()), true);
    assert.strictEqual(verifyWebhookSignature(secret, payload, signLikeProcd("wrong-secret", payload)), false);
    assert.strictEqual(
      verifyWebhookSignature(
        secret,
        '{"event_id":"evt_1","event_type":"sandbox.killed","sandbox_id":"sb_1"}',
        validSignature,
      ),
      false,
    );
    assert.strictEqual(verifyWebhookSignature(secret, payload, "not-hex"), false);
    assert.strictEqual(verifyWebhookSignature(secret, payload, ""), false);
  });
});
