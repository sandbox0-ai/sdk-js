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
        protocolRules: [
          {
            name: "internal-mcp",
            protocol: models.ProtocolRuleProtocol.ProtocolRuleProtocolMcp,
            domains: ["api.internal.example.com"],
            ports: [{ port: 443, protocol: "tcp" }],
            tlsMode: models.EgressTLSMode.TerminateReoriginate,
            httpMatch: {
              methods: ["POST"],
              paths: ["/mcp"],
            },
            mcp: {
              tools: {
                allowed: ["read_file"],
                denied: ["run_command"],
              },
            },
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

  it("updates network policy with placeholder substitution credential binding", async () => {
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
            name: "allow-example-api",
            action: models.TrafficRuleAction.Allow,
            cidrs: ["203.0.113.10/32"],
            ports: [{ port: 8080, protocol: "tcp" }],
          },
        ],
        credentialRules: [
          {
            name: "api-token",
            credentialRef: "api-token",
            protocol: models.EgressAuthProtocol.EgressAuthProtocolHttp,
            ports: [{ port: 8080, protocol: "tcp" }],
            failurePolicy: models.EgressAuthFailurePolicy.FailClosed,
          },
        ],
      },
      credentialBindings: [
        {
          ref: "api-token",
          sourceRef: "api-token-source",
          projection: {
            type: models.CredentialProjectionType.PlaceholderSubstitution,
            placeholderSubstitution: {
              replacements: [
                {
                  placeholder: "s0env_api_token",
                  valueTemplate: "{{ .token }}",
                  locations: [
                    models.PlaceholderSubstitutionLocation.Query,
                    models.PlaceholderSubstitutionLocation.Header,
                    models.PlaceholderSubstitutionLocation.Body,
                  ],
                },
              ],
            },
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
