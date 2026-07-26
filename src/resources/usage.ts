import type { UsageWindowPage } from "../apispec/src/models/index";
import type { Client } from "../client";
import { wrapApiCall } from "../errors";
import { ensureData } from "../response";

export interface UsageWindowListOptions {
  cursor?: string;
  limit?: number;
  windowType?: string;
}

export class Usage {
  constructor(private readonly client: Client) {}

  async listWindows(
    options: UsageWindowListOptions = {},
  ): Promise<UsageWindowPage> {
    const response = await wrapApiCall(() =>
      this.client.apispec.usage.apiV1UsageWindowsGet(options),
    );
    return ensureData(response, "list usage windows returned empty response");
  }
}
