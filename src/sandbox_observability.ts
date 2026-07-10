import type { Client } from "./client";
import type {
  SandboxObservabilityEventOptions,
  SandboxObservabilityEventWatchOptions,
  SandboxObservabilityEvents,
  SandboxObservabilityLogOptions,
  SandboxObservabilityLogWatchOptions,
  SandboxObservabilityLogs,
  SandboxObservabilityWatchStream,
  SandboxMetrics,
  SandboxMetricsCatalog,
  SandboxMetricsOptions,
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
    listLogs(options?: SandboxObservabilityLogOptions): Promise<SandboxObservabilityLogs>;
    watchLogs(
      options?: SandboxObservabilityLogWatchOptions,
    ): Promise<SandboxObservabilityWatchStream>;
    getMetrics(options?: SandboxMetricsOptions): Promise<SandboxMetrics>;
    getMetricsCatalog(): Promise<SandboxMetricsCatalog>;
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

Sandbox.prototype.getMetrics = async function (
  this: Sandbox,
  options?: SandboxMetricsOptions,
): Promise<SandboxMetrics> {
  return getClient(this).getSandboxMetrics(this.id, options);
};

Sandbox.prototype.getMetricsCatalog = async function (
  this: Sandbox,
): Promise<SandboxMetricsCatalog> {
  return getClient(this).getSandboxMetricsCatalog(this.id);
};
