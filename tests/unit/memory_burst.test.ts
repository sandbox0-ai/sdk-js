import assert from "node:assert/strict";
import { it } from "node:test";
import { Client } from "../../src/index.ts";

for (const percent of [undefined, 0, 50]) {
  it(`sends only the selected memory burst allowance (${percent})`, async () => {
    let calls = 0;
    const client = new Client({ token: "test", fetch: async (_url, init) => {
      calls++;
      const expected = percent === undefined ? { memory: "4Gi" } : { memory: "4Gi", memory_burst_percent: percent };
      assert.deepEqual(JSON.parse(String(init?.body)).config.resources, expected);
      return Response.json({ success: true, data: { sandbox_id: "sb_burst", template: "default", status: "running", runtime_id: "allocation", cluster_id: "cluster" } }, { status: 201 });
    } });
    const config = { resources: { memory: "2Gi", memoryBurstPercent: percent } };
    await client.sandboxes.claim("default", { config, memory: "4Gi" });
    assert.equal(config.resources.memory, "2Gi");
    assert.equal(calls, 1);
  });
}
