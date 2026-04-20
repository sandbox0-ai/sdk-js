export interface RunResult {
  sandboxId: string;
  contextId: string;
  outputRaw: string;
}

export interface CmdResult {
  sandboxId: string;
  contextId: string;
  outputRaw: string;
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

export interface ExposedPort {
  port: number;
  resume: boolean;
  publicUrl?: string;
}

export interface ExposedPortsResponse {
  ports: ExposedPort[];
  exposureDomain?: string;
}

export interface FileWatchResponse {
  type: string;
  watchId?: string;
  event?: string;
  path?: string;
  error?: string;
}

export interface SandboxLogsOptions {
  container?: string;
  tailLines?: number;
  limitBytes?: number;
  previous?: boolean;
  timestamps?: boolean;
  sinceSeconds?: number;
}

export interface SandboxLogs {
  sandboxId: string;
  podName: string;
  container: string;
  previous: boolean;
  logs: string;
}

export interface SandboxLogsStream {
  body: ReadableStream<Uint8Array>;
  response: Response;
  sandboxId?: string;
  podName?: string;
  container?: string;
}

import type { SandboxSummary } from "./apispec/src/models/index";

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
