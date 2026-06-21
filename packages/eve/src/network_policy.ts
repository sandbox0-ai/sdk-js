import type {
  EveNetworkPolicyRule,
  EveSandboxNetworkPolicy,
  Sandbox0NetworkPolicy,
  Sandbox0TrafficRule,
} from "./types";

export class UnsupportedNetworkPolicyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnsupportedNetworkPolicyError";
  }
}

export function toSandbox0NetworkPolicy(
  policy: EveSandboxNetworkPolicy,
): Sandbox0NetworkPolicy {
  if (policy === "allow-all") {
    return { mode: "allow-all" };
  }
  if (policy === "deny-all") {
    return { mode: "block-all" };
  }
  if (!policy || typeof policy !== "object") {
    throw new UnsupportedNetworkPolicyError("network policy must be allow-all, deny-all, or an object");
  }

  const rules: Sandbox0TrafficRule[] = [];
  const deniedCidrs = uniqueStrings(policy.subnets?.deny);
  const allowedCidrs = uniqueStrings(policy.subnets?.allow);
  const allowedDomains = collectAllowedDomains(policy.allow);

  if (deniedCidrs.length > 0) {
    rules.push({
      name: "eve-deny-subnets",
      action: "deny",
      cidrs: deniedCidrs,
    });
  }
  if (allowedDomains.length > 0) {
    rules.push({
      name: "eve-allow-domains",
      action: "allow",
      domains: allowedDomains,
      appProtocols: ["http", "tls"],
    });
  }
  if (allowedCidrs.length > 0) {
    rules.push({
      name: "eve-allow-subnets",
      action: "allow",
      cidrs: allowedCidrs,
    });
  }

  return {
    mode: "block-all",
    egress: rules.length > 0 ? { trafficRules: rules } : undefined,
  };
}

function collectAllowedDomains(
  allow: string[] | Record<string, EveNetworkPolicyRule[]> | undefined,
): string[] {
  if (allow === undefined) {
    return [];
  }
  if (Array.isArray(allow)) {
    return uniqueStrings(allow);
  }

  const domains: string[] = [];
  for (const [domain, rules] of Object.entries(allow)) {
    if (!domain.trim()) {
      continue;
    }
    if (!Array.isArray(rules)) {
      throw new UnsupportedNetworkPolicyError(
        `network policy rules for "${domain}" must be an array`,
      );
    }
    validateDomainRules(domain, rules);
    domains.push(domain);
  }
  return uniqueStrings(domains);
}

function validateDomainRules(domain: string, rules: EveNetworkPolicyRule[]): void {
  for (const rule of rules) {
    if (rule.forwardURL) {
      throw new UnsupportedNetworkPolicyError(
        `Sandbox0 Eve adapter does not support Vercel forwardURL network policies for "${domain}"`,
      );
    }
    if (rule.transform && rule.transform.length > 0) {
      throw new UnsupportedNetworkPolicyError(
        `Sandbox0 Eve adapter does not support Vercel transform network policies for "${domain}"`,
      );
    }
  }
}

function uniqueStrings(values: readonly string[] | undefined): string[] {
  if (!values) {
    return [];
  }
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}
