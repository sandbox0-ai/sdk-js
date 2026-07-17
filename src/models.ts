import type {
  ObservabilityEventSource,
  SandboxAuditActorKind,
  SandboxAuditExecutionScopeAttribution,
  SandboxAppServiceView,
  SandboxObservabilityEventType,
  SandboxObservabilityEventsResponse,
  SandboxObservabilityLogStream,
  SandboxObservabilityLogsResponse,
  SandboxObservabilityOutcome,
  SandboxObservabilityWatchLine,
  SandboxRuntimeMetricName,
  SandboxRuntimeMetricStatistic,
  SandboxRuntimeMetricsCatalogResponse,
  SandboxRuntimeMetricsResponse,
  ExecutionSessionEvent,
  ExecutionSessionWebSocketRequest,
  Sandbox,
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
> & {
  signal?: AbortSignal;
};

export interface SandboxObservabilityExecutionScopeFilter {
  executionScopeNamespace?: string;
  executionScopeKind?: string;
  executionScopeId?: string;
  executionScopeAttribution?: SandboxAuditExecutionScopeAttribution;
}

export interface SandboxObservabilityEventOptions
  extends SandboxObservabilityQueryOptions,
    SandboxObservabilityExecutionScopeFilter {
  /** Highest audit event schema version this client can decode. Defaults to 3. */
  maxSchemaVersion?: number;
  source?: ObservabilityEventSource;
  eventType?: SandboxObservabilityEventType;
  outcome?: SandboxObservabilityOutcome;
  actorKind?: SandboxAuditActorKind;
  actorId?: string;
  action?: string;
  resourceType?: string;
  operationId?: string;
  /** Exact event lookup. It cannot be combined with other event filters. */
  eventId?: string;
}

export interface SandboxObservabilityEventWatchOptions
  extends SandboxObservabilityWatchOptions,
    SandboxObservabilityExecutionScopeFilter {
  /** Highest audit event schema version this client can decode. Defaults to 3. */
  maxSchemaVersion?: number;
  source?: ObservabilityEventSource;
  eventType?: SandboxObservabilityEventType;
  outcome?: SandboxObservabilityOutcome;
  actorKind?: SandboxAuditActorKind;
  actorId?: string;
  action?: string;
  resourceType?: string;
  operationId?: string;
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

export interface SandboxMetricsOptions {
  /** Defaults to one hour before endTime. */
  startTime?: Date;
  /** Defaults to the current time. */
  endTime?: Date;
  /** Canonical sandbox-wide metrics to return. */
  metrics?: readonly SandboxRuntimeMetricName[];
  /** Requested bucket width. The server may increase it to honor maxPoints. */
  stepSeconds?: number;
  /** Defaults to average for gauges and rate for counters. */
  statistic?: SandboxRuntimeMetricStatistic;
  /** Maximum points per series. Defaults to 240 and cannot exceed 1000. */
  maxPoints?: number;
}

export interface SandboxObservabilityWatchStream
  extends AsyncIterable<SandboxObservabilityWatchLine> {
  body: ReadableStream<Uint8Array>;
  response: Response;
}

export interface SessionCreateOptions {
  /** Allows a create request to be retried without creating a duplicate session. */
  idempotencyKey?: string;
}

export interface SessionEventOptions {
  /** Return events whose sequence is greater than this cursor. */
  after?: number;
  limit?: number;
}

export interface SessionEventStreamOptions {
  /** Replay events whose sequence is greater than this cursor. */
  after?: number;
  /** Sent as Last-Event-ID and takes precedence over after on the server. */
  lastEventId?: string;
  signal?: AbortSignal;
}

export interface SessionWebSocketOptions {
  /** Replay events whose sequence is greater than this cursor before live events. */
  after?: number;
}

export interface SessionWebSocketMessage {
  type: "ack" | "error" | "event";
  requestId?: string;
  event?: ExecutionSessionEvent;
  error?: string;
}

export interface SessionEventStream extends AsyncIterable<ExecutionSessionEvent> {
  readonly response: Response;
  close(): Promise<void>;
}

export type SessionWebSocketInput = ExecutionSessionWebSocketRequest;

export type SandboxObservabilityEvents = SandboxObservabilityEventsResponse;
export type SandboxObservabilityLogs = SandboxObservabilityLogsResponse;
export type SandboxMetrics = SandboxRuntimeMetricsResponse;
export type SandboxMetricsCatalog = SandboxRuntimeMetricsCatalogResponse;

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

export interface SandboxLifecycleWaitOptions {
  /** Maximum polling duration. Defaults to 60 seconds. */
  timeoutMs?: number;
  /** Delay between observations. Defaults to 500 milliseconds. */
  pollIntervalMs?: number;
  /** Stops waiting locally. It does not roll back a lifecycle request already accepted by the server. */
  signal?: AbortSignal;
}

export type SandboxLifecyclePredicate = (
  sandbox: Sandbox,
) => boolean | Promise<boolean>;
