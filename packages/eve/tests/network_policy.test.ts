import assert from "node:assert";
import { describe, it } from "node:test";

import {
  UnsupportedNetworkPolicyError,
  toSandbox0NetworkPolicy,
} from "../src/network_policy.ts";

describe("network policy mapping", () => {
  it("maps allow-all and deny-all policies", () => {
    assert.deepStrictEqual(toSandbox0NetworkPolicy("allow-all"), {
      mode: "allow-all",
    });
    assert.deepStrictEqual(toSandbox0NetworkPolicy("deny-all"), {
      mode: "block-all",
    });
  });

  it("maps domain and subnet allowlists to Sandbox0 traffic rules", () => {
    assert.deepStrictEqual(
      toSandbox0NetworkPolicy({
        allow: ["github.com", "*.npmjs.org", "github.com"],
        subnets: {
          allow: ["10.0.0.0/8"],
          deny: ["10.1.0.0/16"],
        },
      }),
      {
        mode: "block-all",
        egress: {
          trafficRules: [
            {
              name: "eve-deny-subnets",
              action: "deny",
              cidrs: ["10.1.0.0/16"],
            },
            {
              name: "eve-allow-domains",
              action: "allow",
              domains: ["github.com", "*.npmjs.org"],
              appProtocols: ["http", "tls"],
            },
            {
              name: "eve-allow-subnets",
              action: "allow",
              cidrs: ["10.0.0.0/8"],
            },
          ],
        },
      },
    );
  });

  it("accepts record-form domains without request transforms", () => {
    assert.deepStrictEqual(
      toSandbox0NetworkPolicy({
        allow: {
          "api.example.com": [],
          "github.com": [{ match: { method: ["GET"] } }],
        },
      }),
      {
        mode: "block-all",
        egress: {
          trafficRules: [
            {
              name: "eve-allow-domains",
              action: "allow",
              domains: ["api.example.com", "github.com"],
              appProtocols: ["http", "tls"],
            },
          ],
        },
      },
    );
  });

  it("rejects Vercel transform and forwardURL rules", () => {
    assert.throws(
      () => toSandbox0NetworkPolicy({
        allow: {
          "api.example.com": [{ transform: [{ headers: { authorization: "Bearer token" } }] }],
        },
      }),
      UnsupportedNetworkPolicyError,
    );
    assert.throws(
      () => toSandbox0NetworkPolicy({
        allow: {
          "api.example.com": [{ forwardURL: "https://proxy.example.com" }],
        },
      }),
      UnsupportedNetworkPolicyError,
    );
  });
});
