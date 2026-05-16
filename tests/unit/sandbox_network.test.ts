import assert from "node:assert";
import { describe, it } from "node:test";

import { Sandbox, models } from "../../src/index.ts";

describe("sandbox network", () => {
  it("updates network policy with SOCKS5 proxy credential binding", async () => {
    let gotRequest: unknown;
    const sandbox = new Sandbox({
      id: "sb_123",
      client: {
        apispec: {
          sandboxes: {
            apiV1SandboxesIdNetworkPut: async (request: unknown) => {
              gotRequest = request;
              return {
                data: (request as any).sandboxNetworkPolicy,
              };
            },
          },
        },
      } as any,
    });

    const policy = {
      mode: models.SandboxNetworkPolicyModeEnum.BlockAll,
      egress: {
        trafficRules: [
          {
            name: "internal-api",
            action: models.TrafficRuleAction.Allow,
            domains: ["api.internal.example.com"],
            appProtocols: [models.TrafficRuleAppProtocol.TrafficRuleAppProtocolTls],
          },
        ],
        proxy: {
          type: models.EgressProxyType.EgressProxyTypeSocks5,
          address: "proxy.example.com:1080",
          credentialRef: "corp-proxy",
        },
      },
      credentialBindings: [
        {
          ref: "corp-proxy",
          sourceRef: "corp-proxy-source",
          projection: {
            type: models.CredentialProjectionType.UsernamePassword,
            usernamePassword: {},
          },
        },
      ],
    };

    const updated = await sandbox.updateNetworkPolicy(policy);

    assert.deepStrictEqual(updated, policy);
    assert.deepStrictEqual(gotRequest, {
      id: "sb_123",
      sandboxNetworkPolicy: policy,
    });
  });
});
