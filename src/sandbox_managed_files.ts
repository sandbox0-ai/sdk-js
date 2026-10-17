import type { ManagedFileReadResponse, ManagedFilesState } from "./apispec/src/models/index";
import type { Client } from "./client";
import { wrapApiCall } from "./errors";
import { ensureData } from "./response";
import { Sandbox } from "./sandbox";

export interface ManagedFilesOptions {
  runtimeGeneration: number;
  /** Omit to use the projection root. */
  namespace?: string;
}

export type ManagedFileRead = Omit<ManagedFileReadResponse, "content"> & { content: Uint8Array };

function validateName(name: string): void {
  if (!/^[A-Za-z0-9._-]{1,128}$/.test(name) || name === "." || name === ".." || name.startsWith(".s0-write-")) {
    throw new Error("invalid managed file name or namespace");
  }
}
function validateSequence(value: string): void {
  if (typeof value !== "string" || !/^(0|[1-9][0-9]{0,19})$/.test(value) || BigInt(value) > 18446744073709551615n) {
    throw new Error("invalid managed file mutation sequence");
  }
}
function encode(content: Uint8Array): string {
  if (!(content instanceof Uint8Array) || content.byteLength > 4 * 1024 * 1024) throw new Error("invalid managed file content size or type");
  let binary = "";
  for (let i = 0; i < content.length; i += 8192) binary += String.fromCharCode(...content.subarray(i, i + 8192));
  return btoa(binary);
}
function decode(content: string): Uint8Array {
  try {
    if (typeof content !== "string" || content.length > 4 * Math.ceil((4 * 1024 * 1024) / 3)) throw new Error();
    const binary = atob(content);
    if (binary.length > 4 * 1024 * 1024 || btoa(binary) !== content) throw new Error();
    return Uint8Array.from(binary, c => c.charCodeAt(0));
  } catch { throw new Error("invalid managed file response content"); }
}

/** Fixed-generation access to node-owned files, independent of guest execution.
 * No automatic resume, generation discovery, fallback or write retry is performed.
 * Sequences are shared across namespaces and do not track native guest refreshes.
 */
export class ManagedFiles {
  private readonly generation: number;
  private readonly namespace?: string;

  constructor(private readonly client: Client, private readonly id: string, options: ManagedFilesOptions) {
    if (!Number.isSafeInteger(options.runtimeGeneration) || options.runtimeGeneration <= 0) throw new Error("invalid managed file runtime generation");
    if (options.namespace !== undefined) validateName(options.namespace);
    this.generation = options.runtimeGeneration;
    this.namespace = options.namespace;
  }

  private state<T extends ManagedFilesState>(value: T): T {
    if (value.runtimeGeneration !== this.generation) throw new Error("managed file response generation changed");
    validateSequence(value.mutationSequence);
    return value;
  }

  /** Describes projection state; does not attest historical RootFS credential safety. */
  async inspect(): Promise<ManagedFilesState> {
    const response = await wrapApiCall(() => this.client.apispec.sandboxes.inspectSandboxManagedFiles({ id: this.id, runtimeGeneration: this.generation }));
    return this.state(ensureData(response, "managed file response missing"));
  }

  async read(name: string): Promise<ManagedFileRead> {
    validateName(name);
    const params = { id: this.id, runtimeGeneration: this.generation, name };
    const response = await wrapApiCall(() => this.namespace === undefined
      ? this.client.apispec.sandboxes.readSandboxManagedFile(params)
      : this.client.apispec.sandboxes.readSandboxNamespacedManagedFile({ ...params, namespace: this.namespace }));
    const value = this.state(ensureData(response, "managed file response missing"));
    return { ...value, content: decode(value.content) };
  }

  /** On an ambiguous error, inspect/read to reconcile; never blindly fetch a new sequence and repeat. */
  async write(name: string, content: Uint8Array, expectedMutationSequence: string): Promise<ManagedFilesState> {
    validateName(name);
    validateSequence(expectedMutationSequence);
    const params = { id: this.id, runtimeGeneration: this.generation, name, managedFileWriteRequest: { content: encode(content), expectedMutationSequence } };
    const response = await wrapApiCall(() => this.namespace === undefined
      ? this.client.apispec.sandboxes.writeSandboxManagedFile(params)
      : this.client.apispec.sandboxes.writeSandboxNamespacedManagedFile({ ...params, namespace: this.namespace }));
    return this.state(ensureData(response, "managed file response missing"));
  }

  async delete(name: string, expectedMutationSequence: string): Promise<ManagedFilesState> {
    validateName(name);
    validateSequence(expectedMutationSequence);
    const params = { id: this.id, runtimeGeneration: this.generation, name, expectedMutationSequence };
    const response = await wrapApiCall(() => this.namespace === undefined
      ? this.client.apispec.sandboxes.deleteSandboxManagedFile(params)
      : this.client.apispec.sandboxes.deleteSandboxNamespacedManagedFile({ ...params, namespace: this.namespace }));
    return this.state(ensureData(response, "managed file response missing"));
  }
}

declare module "./sandbox" { interface Sandbox { managedFiles(options: ManagedFilesOptions): ManagedFiles; } }
Sandbox.prototype.managedFiles = function(this: Sandbox, options: ManagedFilesOptions): ManagedFiles {
  return new ManagedFiles((this as any).client as Client, this.id, options);
};
