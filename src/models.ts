import type {
  ObservabilityEventSource,
  SandboxAppServiceView,
  SandboxObservabilityEventType,
  SandboxObservabilityEventsResponse,
  SandboxObservabilityLogStream,
  SandboxObservabilityLogsResponse,
  SandboxObservabilityMetricsResponse,
  SandboxObservabilityOutcome,
  SandboxObservabilityWatchLine,
  SandboxSummary,
} from "./apispec/src/models/index";

export interface RunResult {
  sandboxId: string;
  contextId: string;
  outputRaw: string;
}

export interface CmdResult {
  sandboxId: string;
  contextId: string;
  outputRaw: string;
  stdout: string;
  stderr: string;
  exitCode?: number;
  state?: string;
}

export type StreamInputType = "input" | "resize" | "signal";

export interface StreamInput {
  type?: StreamInputType;
  data?: string;
  rows?: number;
  cols?: number;
  signal?: string;
  requestId?: string;
}

export interface StreamOutput {
  sandboxId: string;
  contextId: string;
  source: string;
  data: string;
}

export interface StreamDone {
  sandboxId: string;
  contextId: string;
  requestId?: string;
  exitCode?: number;
  state?: string;
}

export interface SandboxServicesResponse {
  sandboxId: string;
  services: SandboxAppServiceView[];
}

export interface FileWatchResponse {
  type: string;
  watchId?: string;
  event?: string;
  path?: string;
  error?: string;
}

export interface SandboxObservabilityQueryOptions {
  startTime?: Date;
  endTime?: Date;
  limit?: number;
  cursor?: string;
}

export type SandboxObservabilityWatchOptions = Omit<
  SandboxObservabilityQueryOptions,
  "endTime"
>;

export interface SandboxObservabilityEventOptions extends SandboxObservabilityQueryOptions {
  source?: ObservabilityEventSource;
  eventType?: SandboxObservabilityEventType;
  outcome?: SandboxObservabilityOutcome;
}

export interface SandboxObservabilityEventWatchOptions
  extends SandboxObservabilityWatchOptions {
  source?: ObservabilityEventSource;
  eventType?: SandboxObservabilityEventType;
  outcome?: SandboxObservabilityOutcome;
}

export interface SandboxObservabilityLogOptions extends SandboxObservabilityQueryOptions {
  contextId?: string;
  stream?: SandboxObservabilityLogStream;
}

export interface SandboxObservabilityLogWatchOptions
  extends SandboxObservabilityWatchOptions {
  contextId?: string;
  stream?: SandboxObservabilityLogStream;
}

export interface SandboxObservabilityMetricOptions extends SandboxObservabilityQueryOptions {
  contextId?: string;
  name?: string[];
  names?: string;
}

export interface SandboxObservabilityMetricWatchOptions
  extends SandboxObservabilityWatchOptions {
  contextId?: string;
  name?: string[];
  names?: string;
}

export interface SandboxObservabilityWatchStream
  extends AsyncIterable<SandboxObservabilityWatchLine> {
  body: ReadableStream<Uint8Array>;
  response: Response;
}

export type SandboxObservabilityEvents = SandboxObservabilityEventsResponse;
export type SandboxObservabilityLogs = SandboxObservabilityLogsResponse;
export type SandboxObservabilityMetrics = SandboxObservabilityMetricsResponse;

export type SandboxStatusFilter = SandboxSummary["status"];

export interface SandboxListOptions {
  status?: SandboxStatusFilter;
  templateId?: string;
  paused?: boolean;
  limit?: number;
  offset?: number;
}

export interface SandboxListResult {
  sandboxes: SandboxSummary[];
  count: number;
  hasMore: boolean;
}
