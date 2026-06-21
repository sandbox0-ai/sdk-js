import "./proxy";

import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { defineAgent } from "eve";

const apiKey = process.env.S0_EVE_E2E_MODEL_API_KEY;
const baseURL = process.env.S0_EVE_E2E_MODEL_BASE_URL;
const modelId = process.env.S0_EVE_E2E_MODEL_ID;

if (!apiKey || !baseURL || !modelId) {
  throw new Error("missing S0_EVE_E2E_MODEL_API_KEY, S0_EVE_E2E_MODEL_BASE_URL, or S0_EVE_E2E_MODEL_ID");
}

const modelProvider = createOpenAICompatible({
  name: "sandbox0-eve-e2e",
  apiKey,
  baseURL,
});
const contextWindowTokens = Number.parseInt(
  process.env.S0_EVE_E2E_MODEL_CONTEXT_WINDOW_TOKENS ?? "131072",
  10,
);

export default defineAgent({
  model: modelProvider(modelId),
  modelContextWindowTokens: Number.isFinite(contextWindowTokens)
    ? contextWindowTokens
    : 131_072,
});
