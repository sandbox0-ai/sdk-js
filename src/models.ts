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
