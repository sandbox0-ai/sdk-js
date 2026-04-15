import type { SandboxLogs } from "./apispec/src/models/index";
import type { Client } from "./client";
import type { SandboxLogsOptions, SandboxLogsStream } from "./models";
import { Sandbox } from "./sandbox";

function getClient(sandbox: Sandbox): Client {
  return (sandbox as any).client as Client;
}

declare module "./sandbox" {
  interface Sandbox {
    getLogs(options?: SandboxLogsOptions): Promise<SandboxLogs>;
    streamLogs(options?: SandboxLogsOptions): Promise<SandboxLogsStream>;
  }
}

Sandbox.prototype.getLogs = async function (
  this: Sandbox,
  options?: SandboxLogsOptions,
): Promise<SandboxLogs> {
  return getClient(this).getSandboxLogs(this.id, options);
};

Sandbox.prototype.streamLogs = async function (
  this: Sandbox,
  options?: SandboxLogsOptions,
): Promise<SandboxLogsStream> {
  return getClient(this).streamSandboxLogs(this.id, options);
};
