import type { Client } from "./client";
import type {
  SandboxObservabilityEventOptions,
  SandboxObservabilityEventWatchOptions,
  SandboxObservabilityEvents,
  SandboxObservabilityLogOptions,
  SandboxObservabilityLogWatchOptions,
  SandboxObservabilityLogs,
  SandboxObservabilityMetricOptions,
  SandboxObservabilityMetricWatchOptions,
  SandboxObservabilityMetrics,
  SandboxObservabilityWatchStream,
} from "./models";
import { Sandbox } from "./sandbox";

function getClient(sandbox: Sandbox): Client {
  return (sandbox as any).client as Client;
}

declare module "./sandbox" {
  interface Sandbox {
    listObservabilityEvents(
      options?: SandboxObservabilityEventOptions,
    ): Promise<SandboxObservabilityEvents>;
    watchObservabilityEvents(
      options?: SandboxObservabilityEventWatchOptions,
    ): Promise<SandboxObservabilityWatchStream>;
    listAuditEvents(
      options?: SandboxObservabilityEventOptions,
    ): Promise<SandboxObservabilityEvents>;
    watchAuditEvents(
      options?: SandboxObservabilityEventWatchOptions,
    ): Promise<SandboxObservabilityWatchStream>;
    listLogs(options?: SandboxObservabilityLogOptions): Promise<SandboxObservabilityLogs>;
    watchLogs(
      options?: SandboxObservabilityLogWatchOptions,
    ): Promise<SandboxObservabilityWatchStream>;
    listMetrics(
      options?: SandboxObservabilityMetricOptions,
    ): Promise<SandboxObservabilityMetrics>;
    watchMetrics(
      options?: SandboxObservabilityMetricWatchOptions,
    ): Promise<SandboxObservabilityWatchStream>;
  }
}

Sandbox.prototype.listObservabilityEvents = async function (
  this: Sandbox,
  options?: SandboxObservabilityEventOptions,
): Promise<SandboxObservabilityEvents> {
  return getClient(this).listSandboxObservabilityEvents(this.id, options);
};

Sandbox.prototype.watchObservabilityEvents = async function (
  this: Sandbox,
  options?: SandboxObservabilityEventWatchOptions,
): Promise<SandboxObservabilityWatchStream> {
  return getClient(this).watchSandboxObservabilityEvents(this.id, options);
};

Sandbox.prototype.listAuditEvents = async function (
  this: Sandbox,
  options?: SandboxObservabilityEventOptions,
): Promise<SandboxObservabilityEvents> {
  return getClient(this).listSandboxAuditEvents(this.id, options);
};

Sandbox.prototype.watchAuditEvents = async function (
  this: Sandbox,
  options?: SandboxObservabilityEventWatchOptions,
): Promise<SandboxObservabilityWatchStream> {
  return getClient(this).watchSandboxAuditEvents(this.id, options);
};

Sandbox.prototype.listLogs = async function (
  this: Sandbox,
  options?: SandboxObservabilityLogOptions,
): Promise<SandboxObservabilityLogs> {
  return getClient(this).listSandboxObservabilityLogs(this.id, options);
};

Sandbox.prototype.watchLogs = async function (
  this: Sandbox,
  options?: SandboxObservabilityLogWatchOptions,
): Promise<SandboxObservabilityWatchStream> {
  return getClient(this).watchSandboxObservabilityLogs(this.id, options);
};

Sandbox.prototype.listMetrics = async function (
  this: Sandbox,
  options?: SandboxObservabilityMetricOptions,
): Promise<SandboxObservabilityMetrics> {
  return getClient(this).listSandboxObservabilityMetrics(this.id, options);
};

Sandbox.prototype.watchMetrics = async function (
  this: Sandbox,
  options?: SandboxObservabilityMetricWatchOptions,
): Promise<SandboxObservabilityWatchStream> {
  return getClient(this).watchSandboxObservabilityMetrics(this.id, options);
};
