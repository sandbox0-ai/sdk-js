import { createHmac, timingSafeEqual } from "node:crypto";

function toPayloadBytes(payload: string | Uint8Array): Uint8Array {
  if (typeof payload === "string") {
    return new TextEncoder().encode(payload);
  }
  return payload;
}

function decodeHexStrict(input: string): Uint8Array | null {
  if (input.length === 0 || input.length % 2 !== 0) {
    return null;
  }

  const normalized = input.toLowerCase();
  const decoded = Buffer.from(normalized, "hex");
  // Strict check: Buffer.from(hex) is permissive for invalid input.
  if (decoded.toString("hex") !== normalized) {
    return null;
  }

  return new Uint8Array(decoded);
}

// Verify X-Sandbox0-Signature with HMAC-SHA256 over raw payload bytes.
export function verifyWebhookSignature(
  secret: string,
  payload: string | Uint8Array,
  signature: string,
): boolean {
  const normalizedSignature = signature.trim();
  if (!normalizedSignature) {
    return false;
  }

  const provided = decodeHexStrict(normalizedSignature);
  if (!provided) {
    return false;
  }

  const expected = createHmac("sha256", secret).update(toPayloadBytes(payload)).digest();
  if (expected.length !== provided.length) {
    return false;
  }

  return timingSafeEqual(expected, Buffer.from(provided));
}
