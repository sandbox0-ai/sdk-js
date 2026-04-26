import type {
  CloneVolumeFileResult,
  CloneVolumeFilesRequest,
  CreateSandboxVolumeRequest,
  FileContentResponse,
  FileInfo,
  ForkVolumeRequest,
  CreateSnapshotRequest,
  MoveFileRequest,
  SandboxVolume,
  Snapshot,
  SuccessCreatedResponse,
  SuccessDeletedResponse,
  SuccessFileReadResponse,
  SuccessRestoreResponse,
  SuccessMovedResponse,
  SuccessWrittenResponse,
} from "../apispec/src/models/index";
import { models } from "../apispec_compat";
import { APIError } from "../errors";
import { ensureData, ensureModel } from "../response";
import { wrapApiCall } from "../errors";
import type { Client } from "../client";
import { VolumeSession } from "../sessions";
import { FileWatchStream } from "../sandbox";
import { WebSocketClient, type WebSocketRawData } from "../ws_client";

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

  async delete(
    volumeId: string,
    options?: { force?: boolean },
  ): Promise<SuccessDeletedResponse> {
    const response = await wrapApiCall(() =>
      this.client.apispec.sandboxVolumes.apiV1SandboxvolumesIdDelete({
        id: volumeId,
        force: options?.force,
      }),
    );
    return ensureModel(response, "delete volume returned empty response");
  }

  async fork(volumeId: string, request?: ForkVolumeRequest): Promise<SandboxVolume> {
    const response = await wrapApiCall(() =>
      this.client.apispec.sandboxVolumes.apiV1SandboxvolumesIdForkPost({
        id: volumeId,
        forkVolumeRequest: request,
      }),
    );
    return ensureData(response, "fork volume returned empty response");
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

  async readFile(volumeId: string, path: string): Promise<Uint8Array> {
    const response = await wrapApiCall(() =>
      this.client.apispec.files.apiV1SandboxvolumesIdFilesGetRaw({
        id: volumeId,
        path,
      }),
    );
    const contentType = response.raw.headers.get("content-type")?.toLowerCase() ?? "";
    if (contentType.includes("application/json")) {
      const payload = (await response.raw.json()) as SuccessFileReadResponse;
      const data = ensureData(payload, "read volume file returned empty response");
      const content = (data as FileContentResponse).content ?? "";
      const encoding = (data as FileContentResponse).encoding;
      if (encoding && encoding !== models.FileContentResponseEncodingEnum.Base64) {
        throw new APIError({
          statusCode: response.raw.status,
          code: "unsupported_encoding",
          message: `unsupported file encoding: ${encoding}`,
        });
      }
      return Buffer.from(content, "base64");
    }
    const blob = await response.value();
    const buffer = await blob.arrayBuffer();
    return new Uint8Array(buffer);
  }

  async statFile(volumeId: string, path: string): Promise<FileInfo> {
    const response = await wrapApiCall(() =>
      this.client.apispec.files.apiV1SandboxvolumesIdFilesStatGet({
        id: volumeId,
        path,
      }),
    );
    return ensureData(response, "stat volume file returned empty response");
  }

  async listFiles(volumeId: string, path: string): Promise<FileInfo[]> {
    const response = await wrapApiCall(() =>
      this.client.apispec.files.apiV1SandboxvolumesIdFilesListGet({
        id: volumeId,
        path,
      }),
    );
    const data = ensureData(response, "list volume files returned empty response");
    return data.entries ?? [];
  }

  async writeFile(
    volumeId: string,
    path: string,
    data: Uint8Array | string,
  ): Promise<SuccessWrittenResponse> {
    const payload = typeof data === "string" ? Buffer.from(data) : data;
    const response = await wrapApiCall(() =>
      this.client.apispec.files.apiV1SandboxvolumesIdFilesPost({
        id: volumeId,
        path,
        body: new Blob([payload as BlobPart]),
      }),
    );
    return ensureModel(response, "write volume file returned empty response");
  }

  async mkdir(
    volumeId: string,
    path: string,
    recursive = false,
  ): Promise<SuccessCreatedResponse> {
    const response = await wrapApiCall(() =>
      this.client.apispec.files.apiV1SandboxvolumesIdFilesPost({
        id: volumeId,
        path,
        mkdir: true,
        recursive: recursive || undefined,
        body: new Blob([]),
      }),
    );
    return ensureModel(response, "mkdir volume path returned empty response") as SuccessCreatedResponse;
  }

  async deleteFile(volumeId: string, path: string): Promise<SuccessDeletedResponse> {
    const response = await wrapApiCall(() =>
      this.client.apispec.files.apiV1SandboxvolumesIdFilesDelete({
        id: volumeId,
        path,
      }),
    );
    return ensureModel(response, "delete volume file returned empty response");
  }

  async moveFile(
    volumeId: string,
    source: string,
    destination: string,
  ): Promise<SuccessMovedResponse> {
    const response = await wrapApiCall(() =>
      this.client.apispec.files.apiV1SandboxvolumesIdFilesMovePost({
        id: volumeId,
        moveFileRequest: { source, destination } as MoveFileRequest,
      }),
    );
    return ensureModel(response, "move volume file returned empty response");
  }

  async cloneFiles(
    volumeId: string,
    request: CloneVolumeFilesRequest,
  ): Promise<CloneVolumeFileResult[]> {
    const response = await wrapApiCall(() =>
      this.client.apispec.files.apiV1SandboxvolumesIdFilesClonePost({
        id: volumeId,
        cloneVolumeFilesRequest: request,
      }),
    );
    const data = ensureData(response, "clone volume files returned empty response");
    return data.entries ?? [];
  }

  async watchFiles(
    volumeId: string,
    path: string,
    recursive = false,
  ): Promise<FileWatchStream> {
    const wsUrl = this.client.websocketUrl(`/api/v1/sandboxvolumes/${volumeId}/files/watch`);
    const headers = await this.client.wsHeaders();
    const socket = await WebSocketClient.connect(wsUrl, { headers });
    await socket.waitForOpen();
    socket.send(JSON.stringify({ action: "subscribe", path, recursive: !!recursive }));

    const firstRaw = await socket.waitForMessage();
    const first = firstRaw ? parseWsMessage(firstRaw) : null;
    if (!first) {
      socket.close();
      throw new APIError({
        statusCode: 0,
        code: "watch_failed",
        message: "watch subscribe failed: empty response",
      });
    }
    if (first.type === "error") {
      socket.close();
      throw new APIError({
        statusCode: 0,
        code: "watch_failed",
        message: `watch subscribe failed: ${first.error ?? ""}`,
      });
    }
    if (first.type !== "subscribed" || !first.watch_id) {
      socket.close();
      throw new APIError({
        statusCode: 0,
        code: "watch_failed",
        message: `unexpected watch response: ${first.type ?? ""}`,
      });
    }
    const stream = new FileWatchStream(socket);
    stream.watchId = String(first.watch_id);
    return stream;
  }
}

function parseWsMessage(data: WebSocketRawData): any | null {
  try {
    let text: string;
    if (typeof data === "string") {
      text = data;
    } else if (Buffer.isBuffer(data)) {
      text = data.toString("utf-8");
    } else if (Array.isArray(data)) {
      text = Buffer.concat(data).toString("utf-8");
    } else if (data instanceof ArrayBuffer) {
      text = Buffer.from(data).toString("utf-8");
    } else {
      text = Buffer.from(data as Uint8Array).toString("utf-8");
    }
    return JSON.parse(text);
  } catch {
    return null;
  }
}
