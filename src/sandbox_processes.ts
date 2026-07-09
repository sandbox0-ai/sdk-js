import type {
  ProcessEvent,
  ProcessInputEvent,
  ProcessSession,
  ProcessSpec,
  ResizeContextRequest,
  SignalContextRequest,
  SuccessDeletedResponse,
  SuccessResizedResponse,
  SuccessSignaledResponse,
} from "./apispec/src/models/index";
import type { Client } from "./client";
import { APIError, wrapApiCall } from "./errors";
import type { ProcessEventStream, ProcessEventWatchOptions } from "./models";
import { ensureData, ensureModel } from "./response";
import { Sandbox } from "./sandbox";

function getClient(sandbox: Sandbox): Client {
  return (sandbox as any).client as Client;
}

declare module "./sandbox" {
  interface Sandbox {
    createProcess(spec: ProcessSpec): Promise<ProcessSession>;
    listProcesses(): Promise<ProcessSession[]>;
    getProcess(processId: string): Promise<ProcessSession>;
    deleteProcess(processId: string): Promise<SuccessDeletedResponse>;
    sendProcessEvent(processId: string, event: ProcessInputEvent): Promise<ProcessEvent>;
    sendProcessInput(processId: string, channel: string, data: string, eventId?: string): Promise<ProcessEvent>;
    watchProcessEvents(processId: string, options?: ProcessEventWatchOptions): Promise<ProcessEventStream>;
    signalProcess(processId: string, signal: string): Promise<SuccessSignaledResponse>;
    resizeProcessPty(
      processId: string,
      channel: string,
      rows: number,
      cols: number,
    ): Promise<SuccessResizedResponse>;
  }
}

Sandbox.prototype.createProcess = async function (
  this: Sandbox,
  spec: ProcessSpec,
): Promise<ProcessSession> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.processes.apiV1SandboxesIdProcessesPost({
      id: this.id,
      processSpec: spec,
    }),
  );
  const data = ensureData(response, "create process returned empty response");
  if (!data.process) {
    throw new APIError({
      statusCode: 0,
      code: "unexpected_response",
      message: "create process returned empty process",
    });
  }
  return data.process;
};

Sandbox.prototype.listProcesses = async function (
  this: Sandbox,
): Promise<ProcessSession[]> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.processes.apiV1SandboxesIdProcessesGet({ id: this.id }),
  );
  const data = ensureData(response, "list processes returned empty response");
  return data.processes ?? [];
};

Sandbox.prototype.getProcess = async function (
  this: Sandbox,
  processId: string,
): Promise<ProcessSession> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.processes.apiV1SandboxesIdProcessesProcessIdGet({
      id: this.id,
      processId,
    }),
  );
  const data = ensureData(response, "get process returned empty response");
  if (!data.process) {
    throw new APIError({
      statusCode: 0,
      code: "unexpected_response",
      message: "get process returned empty process",
    });
  }
  return data.process;
};

Sandbox.prototype.deleteProcess = async function (
  this: Sandbox,
  processId: string,
): Promise<SuccessDeletedResponse> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.processes.apiV1SandboxesIdProcessesProcessIdDelete({
      id: this.id,
      processId,
    }),
  );
  return ensureModel(response, "delete process returned empty response");
};

Sandbox.prototype.sendProcessEvent = async function (
  this: Sandbox,
  processId: string,
  event: ProcessInputEvent,
): Promise<ProcessEvent> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.processes.apiV1SandboxesIdProcessesProcessIdEventsPost({
      id: this.id,
      processId,
      processInputEvent: event,
    }),
  );
  const data = ensureData(response, "send process event returned empty response");
  if (!data.event) {
    throw new APIError({
      statusCode: 0,
      code: "unexpected_response",
      message: "send process event returned empty event",
    });
  }
  return data.event;
};

Sandbox.prototype.sendProcessInput = async function (
  this: Sandbox,
  processId: string,
  channel: string,
  data: string,
  eventId?: string,
): Promise<ProcessEvent> {
  return this.sendProcessEvent(processId, {
    eventId: eventId ?? crypto.randomUUID(),
    channel,
    type: "stdin.write",
    payload: { data },
  });
};

Sandbox.prototype.watchProcessEvents = async function (
  this: Sandbox,
  processId: string,
  options?: ProcessEventWatchOptions,
): Promise<ProcessEventStream> {
  return getClient(this).watchSandboxProcessEvents(this.id, processId, options);
};

Sandbox.prototype.signalProcess = async function (
  this: Sandbox,
  processId: string,
  signal: string,
): Promise<SuccessSignaledResponse> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.processes.apiV1SandboxesIdProcessesProcessIdSignalPost({
      id: this.id,
      processId,
      signalContextRequest: { signal } as SignalContextRequest,
    }),
  );
  return ensureModel(response, "signal process returned empty response");
};

Sandbox.prototype.resizeProcessPty = async function (
  this: Sandbox,
  processId: string,
  channel: string,
  rows: number,
  cols: number,
): Promise<SuccessResizedResponse> {
  if (rows <= 0 || cols <= 0) {
    throw new APIError({
      statusCode: 0,
      code: "invalid_argument",
      message: "rows and cols must be > 0",
    });
  }
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.processes.apiV1SandboxesIdProcessesProcessIdChannelsChannelPtySizePut({
      id: this.id,
      processId,
      channel,
      resizeContextRequest: { rows, cols } as ResizeContextRequest,
    }),
  );
  return ensureModel(response, "resize process pty returned empty response");
};
