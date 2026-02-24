import { createClient } from "../_shared.ts";
import { models } from "../../src/apispec_compat.ts";

async function main() {
  const client = createClient();
  const sandbox = await client.sandboxes.claim("default", { hardTtl: 300 });

  try {
    const volume = await client.volumes.create({
      accessMode: models.VolumeAccessMode.Rwx,
    });
    const volumeId = volume.id;
    console.log(`volume created: ${volumeId}`);

    const mountSession = await sandbox.mount(volumeId, "/mnt/data");
    console.log(`volume mounted: ${volumeId}`);

    await sandbox.writeFile("/mnt/data/hello.txt", "hello volume\n");
    console.log("file written: /mnt/data/hello.txt");

    const snapshotName = `snap-${Date.now()}`;
    const snapshot = await client.volumes.createSnapshot(volumeId, {
      name: snapshotName,
    });
    console.log(`snapshot created: ${snapshot.id}`);

    await sandbox.writeFile("/mnt/data/hello.txt", "hello volume\nsecond line\n");
    console.log("file updated: /mnt/data/hello.txt");

    let content = await sandbox.readFile("/mnt/data/hello.txt");
    console.log(`file content:\n${Buffer.from(content).toString("utf-8")}`);

    await client.volumes.restoreSnapshot(volumeId, snapshot.id);
    console.log(`snapshot restored: ${snapshot.id}`);

    content = await sandbox.readFile("/mnt/data/hello.txt");
    console.log(`file content:\n${Buffer.from(content).toString("utf-8")}`);

    const forkedVolume = await client.volumes.fork(volumeId, {});
    const forkedVolumeId = forkedVolume.id;
    console.log(`volume forked: ${forkedVolumeId} (source: ${volumeId})`);

    const sandbox2 = await client.sandboxes.claim("default");
    console.log(`new sandbox created: ${sandbox2.id}`);

    const mountSession2 = await sandbox2.mount(volumeId, "/mnt/data");
    const forkMountSession = await sandbox2.mount(forkedVolumeId, "/mnt/fork");
    content = await sandbox2.readFile("/mnt/data/hello.txt");
    console.log(`sandbox2 source volume content:\n${Buffer.from(content).toString("utf-8")}`);

    await sandbox2.writeFile("/mnt/fork/hello.txt", "hello from fork\n");
    content = await sandbox2.readFile("/mnt/fork/hello.txt");
    console.log(`forked volume file content:\n${Buffer.from(content).toString("utf-8")}`);

    content = await sandbox2.readFile("/mnt/data/hello.txt");
    console.log(`source volume file content after fork write:\n${Buffer.from(content).toString("utf-8")}`);

    await sandbox2.unmount(forkedVolumeId, forkMountSession.mountSessionId);
    await sandbox2.unmount(volumeId, mountSession2.mountSessionId);
    await client.sandboxes.delete(sandbox2.id);
    await client.volumes.delete(forkedVolumeId);

    await sandbox.unmount(volumeId, mountSession.mountSessionId);
    await client.volumes.delete(volumeId);
  } finally {
    await client.sandboxes.delete(sandbox.id);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
