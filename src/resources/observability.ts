import type {
  ObservabilityLogRecord,
  ObservabilityTraceSpan,
} from "../apispec/src/models/index";
import { ensureData } from "../response";
import { wrapApiCall } from "../errors";
import type { Client } from "../client";

export interface ObservabilityQueryOptions {
  sandboxId?: string;
  traceId?: string;
  startTime?: Date;
  endTime?: Date;
  limit?: number;
}

export class Observability {
  constructor(private readonly client: Client) {}

  async listTraceSpans(options?: ObservabilityQueryOptions): Promise<ObservabilityTraceSpan[]> {
    const response = await wrapApiCall(() =>
      this.client.apispec.observability.apiV1ObservabilityTracesGet({
        sandboxId: options?.sandboxId,
        traceId: options?.traceId,
        startTime: options?.startTime,
        endTime: options?.endTime,
        limit: options?.limit,
      }),
    );
    const data = ensureData(response, "list observability trace spans returned empty response");
    return data.spans ?? [];
  }

  async listLogs(options?: ObservabilityQueryOptions): Promise<ObservabilityLogRecord[]> {
    const response = await wrapApiCall(() =>
      this.client.apispec.observability.apiV1ObservabilityLogsGet({
        sandboxId: options?.sandboxId,
        traceId: options?.traceId,
        startTime: options?.startTime,
        endTime: options?.endTime,
        limit: options?.limit,
      }),
    );
    const data = ensureData(response, "list observability logs returned empty response");
    return data.logs ?? [];
  }
}
