import WebSocket from "ws";
import type {
  FileContentResponse,
  FileInfo,
  MoveFileRequest,
  SuccessCreatedResponse,
  SuccessDeletedResponse,
  SuccessFileReadResponse,
  SuccessMovedResponse,
  SuccessWrittenResponse,
} from "./apispec/src/models/index";
import { FileContentResponseEncodingEnum } from "./apispec/src/models/index";
import type { Client } from "./client";
import { APIError, wrapApiCall } from "./errors";
import { ensureData, ensureModel } from "./response";
import { FileWatchStream, Sandbox } from "./sandbox";

function getClient(sandbox: Sandbox): Client {
  return (sandbox as any).client as Client;
}

declare module "./sandbox" {
  interface Sandbox {
    readFile(path: string): Promise<Uint8Array>;
    statFile(path: string): Promise<FileInfo>;
    listFiles(path: string): Promise<FileInfo[]>;
    writeFile(path: string, data: Uint8Array | string): Promise<SuccessWrittenResponse>;
    mkdir(path: string, recursive?: boolean): Promise<SuccessCreatedResponse>;
    deleteFile(path: string): Promise<SuccessDeletedResponse>;
    moveFile(source: string, destination: string): Promise<SuccessMovedResponse>;
    watchFiles(path: string, recursive?: boolean): Promise<FileWatchStream>;
  }
}

Sandbox.prototype.readFile = async function (
  this: Sandbox,
  path: string,
): Promise<Uint8Array> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.files.apiV1SandboxesIdFilesGetRaw({
      id: this.id,
      path,
    }),
  );
  const contentType = response.raw.headers.get("content-type")?.toLowerCase() ?? "";
  if (contentType.includes("application/json")) {
    const payload = (await response.raw.json()) as SuccessFileReadResponse;
    const data = ensureData(payload, "read file returned empty response");
    const content = (data as FileContentResponse).content ?? "";
    const encoding = (data as FileContentResponse).encoding;
    if (encoding && encoding !== FileContentResponseEncodingEnum.Base64) {
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
};

Sandbox.prototype.statFile = async function (
  this: Sandbox,
  path: string,
): Promise<FileInfo> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.files.apiV1SandboxesIdFilesStatGet({
      id: this.id,
      path,
    }),
  );
  return ensureData(response, "stat file returned empty response");
};

Sandbox.prototype.listFiles = async function (
  this: Sandbox,
  path: string,
): Promise<FileInfo[]> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.files.apiV1SandboxesIdFilesListGet({
      id: this.id,
      path,
    }),
  );
  const data = ensureData(response, "list files returned empty response");
  return data.entries ?? [];
};

Sandbox.prototype.writeFile = async function (
  this: Sandbox,
  path: string,
  data: Uint8Array | string,
): Promise<SuccessWrittenResponse> {
  const client = getClient(this);
  const payload = typeof data === "string" ? Buffer.from(data) : data;
  const response = await wrapApiCall(() =>
    client.apispec.files.apiV1SandboxesIdFilesPost({
      id: this.id,
      path,
      body: new Blob([payload as BlobPart]),
    }),
  );
  return ensureModel(response, "write file returned empty response");
};

Sandbox.prototype.mkdir = async function (
  this: Sandbox,
  path: string,
  recursive = false,
): Promise<SuccessCreatedResponse> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.files.apiV1SandboxesIdFilesPost({
      id: this.id,
      path,
      mkdir: true,
      recursive: recursive || undefined,
      body: new Blob([]),
    }),
  );
  return ensureModel(response, "mkdir returned empty response") as SuccessCreatedResponse;
};

Sandbox.prototype.deleteFile = async function (
  this: Sandbox,
  path: string,
): Promise<SuccessDeletedResponse> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.files.apiV1SandboxesIdFilesDelete({
      id: this.id,
      path,
    }),
  );
  return ensureModel(response, "delete file returned empty response");
};

Sandbox.prototype.moveFile = async function (
  this: Sandbox,
  source: string,
  destination: string,
): Promise<SuccessMovedResponse> {
  const client = getClient(this);
  const response = await wrapApiCall(() =>
    client.apispec.files.apiV1SandboxesIdFilesMovePost({
      id: this.id,
      moveFileRequest: { source, destination } as MoveFileRequest,
    }),
  );
  return ensureModel(response, "move file returned empty response");
};

Sandbox.prototype.watchFiles = async function (
  this: Sandbox,
  path: string,
  recursive = false,
): Promise<FileWatchStream> {
  const client = getClient(this);
  const wsUrl = client.websocketUrl(`/api/v1/sandboxes/${this.id}/files/watch`);
  const headers = await client.wsHeaders();
  const socket = new WebSocket(wsUrl, { headers });
  const stream = new FileWatchStream(socket);
  socket.send(
    JSON.stringify({ action: "subscribe", path, recursive: !!recursive }),
  );
  const first = await waitForWsMessage(socket);
  if (!first) {
    stream.close();
    throw new APIError({
      statusCode: 0,
      code: "watch_failed",
      message: "watch subscribe failed: empty response",
    });
  }
  if (first.type === "error") {
    stream.close();
    throw new APIError({
      statusCode: 0,
      code: "watch_failed",
      message: `watch subscribe failed: ${first.error ?? ""}`,
    });
  }
  if (first.type !== "subscribed" || !first.watch_id) {
    stream.close();
    throw new APIError({
      statusCode: 0,
      code: "watch_failed",
      message: `unexpected watch response: ${first.type ?? ""}`,
    });
  }
  stream.watchId = String(first.watch_id);
  return stream;
};

function parseWsMessage(data: WebSocket.RawData): any | null {
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

async function waitForWsMessage(socket: WebSocket): Promise<any | null> {
  return new Promise((resolve) => {
    const handler = (data: WebSocket.RawData) => {
      socket.off("message", handler);
      resolve(parseWsMessage(data));
    };
    socket.once("message", handler);
  });
}
