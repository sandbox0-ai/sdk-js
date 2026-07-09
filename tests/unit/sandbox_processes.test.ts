import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { Client, Sandbox } from "../../src/index.ts";
import type { Client as SDKClient } from "../../src/client.ts";

describe("Sandbox processes", () => {
  it("creates a process and sends idempotent input events", async () => {
    let createRequest: unknown;
    let eventRequest: unknown;
    const client = {
      apispec: {
        processes: {
          apiV1SandboxesIdProcessesPost: async (request: unknown) => {
            createRequest = request;
            return {
              data: {
                process: {
                  id: "proc_1",
                  command: ["python", "-u"],
                  state: "running",
                  createdAt: new Date("2026-07-09T00:00:00Z"),
                  channels: [{ name: "stdio", kind: "stdio" }],
                  eventLog: { nextSeq: 1, oldestSeq: 1, capacity: 1024 },
                },
              },
            };
          },
          apiV1SandboxesIdProcessesProcessIdEventsPost: async (request: unknown) => {
            eventRequest = request;
            return {
              data: {
                event: {
                  seq: 2,
                  eventId: "evt_1",
                  processId: "proc_1",
                  channel: "stdio",
                  type: "stdin.write",
                  timestamp: new Date("2026-07-09T00:00:01Z"),
                  payload: { data: "hello\n" },
                },
              },
            };
          },
        },
      },
    } as unknown as SDKClient;

    const sandbox = new Sandbox({ id: "sb_123", client });
    const process = await sandbox.createProcess({
      command: ["python", "-u"],
      channels: [{ name: "stdio", kind: "stdio", framing: "line", stdin: true, stdout: true }],
    });
    const event = await sandbox.sendProcessInput("proc_1", "stdio", "hello\n", "evt_1");

    assert.equal(process.id, "proc_1");
    assert.deepStrictEqual(createRequest, {
      id: "sb_123",
      processSpec: {
        command: ["python", "-u"],
        channels: [{ name: "stdio", kind: "stdio", framing: "line", stdin: true, stdout: true }],
      },
    });
    assert.equal(event.seq, 2);
    assert.deepStrictEqual(eventRequest, {
      id: "sb_123",
      processId: "proc_1",
      processInputEvent: {
        eventId: "evt_1",
        channel: "stdio",
        type: "stdin.write",
        payload: { data: "hello\n" },
      },
    });
  });

  it("streams process events and resumes from cursor", async () => {
    const requestedUrls: string[] = [];
    const client = new Client({
      token: "test-token",
      baseUrl: "http://example.test/base",
      fetch: async (input) => {
        requestedUrls.push(String(input));
        const url = new URL(String(input));
        const seq = url.searchParams.get("cursor") === "1" ? 2 : 1;
        const body = new ReadableStream<Uint8Array>({
          start(controller) {
            controller.enqueue(
              new TextEncoder().encode(
                `data: {"seq":${seq},"process_id":"proc_1","channel":"stdio","type":"stdout.line","timestamp":"2026-07-09T00:00:0${seq}Z","payload":{"data":"line-${seq}"}}\n\n`,
              ),
            );
            controller.close();
          },
        });
        return new Response(body, {
          status: 200,
          headers: { "content-type": "text/event-stream" },
        });
      },
    });

    const firstStream = await client.sandbox("sb_123").watchProcessEvents("proc_1");
    const firstEvents = [];
    for await (const event of firstStream) {
      firstEvents.push(event);
    }
    const secondStream = await client.sandbox("sb_123").watchProcessEvents("proc_1", {
      cursor: firstEvents[0]?.seq,
    });
    const secondEvents = [];
    for await (const event of secondStream) {
      secondEvents.push(event);
    }

    assert.equal(firstEvents[0]?.seq, 1);
    assert.equal(firstEvents[0]?.payload?.data, "line-1");
    assert.equal(secondEvents[0]?.seq, 2);
    assert.equal(new URL(requestedUrls[1]).searchParams.get("cursor"), "1");
  });
});
