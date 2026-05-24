import assert from "node:assert";
import { describe, it } from "node:test";

import { Volumes } from "../../src/resources/volumes.ts";

describe("Volumes resource", () => {
  it("imports a volume archive", async () => {
    let gotRequest: unknown;
    const client = {
      apispec: {
        files: {
          apiV1SandboxvolumesIdFilesArchivePut: async (request: unknown) => {
            gotRequest = request;
            return {
              data: {
                files: 2,
                directories: 1,
                symlinks: 0,
                bytes: 12,
              },
            };
          },
        },
      },
    } as any;

    const volumes = new Volumes(client);
    const summary = await volumes.importArchive("vol_1", "/apps/current", new Uint8Array([1, 2, 3]));

    assert.strictEqual(summary.files, 2);
    assert.strictEqual(summary.directories, 1);
    assert.deepStrictEqual(
      {
        ...(gotRequest as any),
        body: (gotRequest as any).body instanceof Blob,
      },
      {
        id: "vol_1",
        path: "/apps/current",
        body: true,
      },
    );
  });
});
