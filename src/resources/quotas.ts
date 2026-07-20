import type {
  QuotaDimension,
  TeamQuota,
} from "../apispec/src/models/index";
import type { Client } from "../client";
import { wrapApiCall } from "../errors";
import { ensureData } from "../response";

export class Quotas {
  constructor(private readonly client: Client) {}

  async list(): Promise<TeamQuota[]> {
    const response = await wrapApiCall(() =>
      this.client.apispec.quotas.apiV1QuotasGet(),
    );
    return ensureData(response, "list team quotas returned empty response");
  }

  async get(dimension: QuotaDimension): Promise<TeamQuota> {
    const response = await wrapApiCall(() =>
      this.client.apispec.quotas.apiV1QuotasDimensionGet({ dimension }),
    );
    return ensureData(response, "get team quota returned empty response");
  }
}
