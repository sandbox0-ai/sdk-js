import type {
  MountRequest,
  MountStatus,
  SuccessUnmountedResponse,
} from "./apispec/src/models/index";
import type { Client } from "./client";
import { wrapApiCall } from "./errors";
import { ensureData, ensureModel } from "./response";
import { MountSession } from "./sessions";
import { Sandbox } from "./sandbox";

function getClient(sandbox: Sandbox): Client {
  return (sandbox as any).client as Client;
}

declare module "./sandbox" {
  interface Sandbox {
    mount(
      volumeId: string,
      mountPoint: string,
      config?: MountRequest["volumeConfig"],
    ): Promise<MountSession>;
    unmount(
      volumeId: string,
      mountSessionId: string,
    ): Promise<SuccessUnmountedResponse>;
    mountStatus(): Promise<MountStatus[]>;
  }
}

Sandbox.prototype.mount = async function (
  this: Sandbox,
  volumeId: string,
  mountPoint: string,
  config?: MountRequest["volumeConfig"],
): Promise<MountSession> {
  const client = getClient(this);
  const request: MountRequest = {
    sandboxvolumeId: volumeId,
    mountPoint,
    volumeConfig: config,
  };
  const response = await wrapApiCall(() =>
    client.apispec.sandboxVolumes.apiV1SandboxesIdSandboxvolumesMountPost({
      id: this.id,
      mountRequest: request,
    }),
  );
  const data = ensureData(response, "mount volume returned empty response");
  return new MountSession(volumeId, data.mountPoint, data.mountSessionId, async () => {
    await this.unmount(volumeId, data.mountSessionId);
  });
};

Sandbox.prototype.unmount = async function (
  this: Sandbox,
  volumeId: string,
  mountSessionId: string,
): Promise<SuccessUnmountedResponse> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.sandboxVolumes.apiV1SandboxesIdSandboxvolumesUnmountPost({
      id: this.id,
      unmountRequest: {
        sandboxvolumeId: volumeId,
        mountSessionId,
      },
    }),
  );
  return ensureModel(response, "unmount volume returned empty response");
};

Sandbox.prototype.mountStatus = async function (
  this: Sandbox,
): Promise<MountStatus[]> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.sandboxVolumes.apiV1SandboxesIdSandboxvolumesStatusGet({
      id: this.id,
    }),
  );
  const data = ensureData(response, "mount status returned empty response");
  return data.mounts ?? [];
};
