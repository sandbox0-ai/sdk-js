import type {
  CreateSandboxVolumeRequest,
  CreateSnapshotRequest,
  SandboxVolume,
  Snapshot,
  SuccessDeletedResponse,
  SuccessRestoreResponse,
} from "../apispec/src/models/index";
import { ensureData, ensureModel } from "../response";
import { wrapApiCall } from "../errors";
import type { Client } from "../client";
import { VolumeSession } from "../sessions";

export class Volumes {
  constructor(private readonly client: Client) {}

  async create(request: CreateSandboxVolumeRequest): Promise<SandboxVolume> {
    const response = await wrapApiCall(() =>
      this.client.apispec.sandboxVolumes.apiV1SandboxvolumesPost({
        createSandboxVolumeRequest: request,
      }),
    );
    return ensureData(response, "create volume returned empty response");
  }

  async open(request: CreateSandboxVolumeRequest): Promise<VolumeSession> {
    const volume = await this.create(request);
    return new VolumeSession(volume, async () => {
      await this.delete(volume.id);
    });
  }

  async list(): Promise<SandboxVolume[]> {
    const response = await wrapApiCall(() =>
      this.client.apispec.sandboxVolumes.apiV1SandboxvolumesGet(),
    );
    const data = ensureData(response, "list volumes returned empty response");
    return data;
  }

  async get(volumeId: string): Promise<SandboxVolume> {
    const response = await wrapApiCall(() =>
      this.client.apispec.sandboxVolumes.apiV1SandboxvolumesIdGet({ id: volumeId }),
    );
    return ensureData(response, "get volume returned empty response");
  }

  async delete(volumeId: string): Promise<SuccessDeletedResponse> {
    const response = await wrapApiCall(() =>
      this.client.apispec.sandboxVolumes.apiV1SandboxvolumesIdDelete({ id: volumeId }),
    );
    return ensureModel(response, "delete volume returned empty response");
  }

  async createSnapshot(
    volumeId: string,
    request: CreateSnapshotRequest,
  ): Promise<Snapshot> {
    const response = await wrapApiCall(() =>
      this.client.apispec.snapshots.apiV1SandboxvolumesIdSnapshotsPost({
        id: volumeId,
        createSnapshotRequest: request,
      }),
    );
    return ensureData(response, "create snapshot returned empty response");
  }

  async listSnapshots(volumeId: string): Promise<Snapshot[]> {
    const response = await wrapApiCall(() =>
      this.client.apispec.snapshots.apiV1SandboxvolumesIdSnapshotsGet({ id: volumeId }),
    );
    const data = ensureData(response, "list snapshots returned empty response");
    return data;
  }

  async getSnapshot(volumeId: string, snapshotId: string): Promise<Snapshot> {
    const response = await wrapApiCall(() =>
      this.client.apispec.snapshots.apiV1SandboxvolumesIdSnapshotsSnapshotIdGet({
        id: volumeId,
        snapshotId,
      }),
    );
    return ensureData(response, "get snapshot returned empty response");
  }

  async deleteSnapshot(
    volumeId: string,
    snapshotId: string,
  ): Promise<SuccessDeletedResponse> {
    const response = await wrapApiCall(() =>
      this.client.apispec.snapshots.apiV1SandboxvolumesIdSnapshotsSnapshotIdDelete({
        id: volumeId,
        snapshotId,
      }),
    );
    return ensureModel(response, "delete snapshot returned empty response");
  }

  async restoreSnapshot(
    volumeId: string,
    snapshotId: string,
  ): Promise<SuccessRestoreResponse> {
    const response = await wrapApiCall(() =>
      this.client.apispec.snapshots.apiV1SandboxvolumesIdSnapshotsSnapshotIdRestorePost({
        id: volumeId,
        snapshotId,
      }),
    );
    return ensureModel(response, "restore snapshot returned empty response");
  }
}
