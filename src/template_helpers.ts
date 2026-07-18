import type {
  ContainerSpec,
  EnvVar,
  PoolStrategy,
  ResourceQuota,
  SandboxNetworkPolicy,
  SandboxTemplateSpec,
  TemplateCreateRequest,
  TemplateFromSandboxCreateRequest,
  TemplateFromSandboxSpecOverrides,
  TemplateUpdateRequest,
} from "./apispec/src/models/index";

export interface TemplateSpecInit {
  description?: string;
  displayName?: string;
  tags?: string[];
  pod?: SandboxTemplateSpec["pod"];
  network?: SandboxNetworkPolicy;
  pool?: PoolStrategy;
  envVars?: Record<string, string>;
  clusterId?: string;
}

export interface ContainerInit {
  imagePullPolicy?: string;
  env?: EnvVar[];
  securityContext?: ContainerSpec["securityContext"];
}

export function resources(memory: string): ResourceQuota {
  return { memory };
}

export function container(
  image: string,
  containerResources: ResourceQuota,
  init: ContainerInit = {},
): ContainerSpec {
  return {
    image,
    resources: containerResources,
    ...(init.imagePullPolicy ? { imagePullPolicy: init.imagePullPolicy } : {}),
    ...(init.env ? { env: [...init.env] } : {}),
    ...(init.securityContext ? { securityContext: init.securityContext } : {}),
  };
}

export function templateSpec(
  mainContainer: ContainerSpec,
  init: TemplateSpecInit = {},
): SandboxTemplateSpec {
  return {
    mainContainer,
    ...(init.description ? { description: init.description } : {}),
    ...(init.displayName ? { displayName: init.displayName } : {}),
    ...(init.tags ? { tags: [...init.tags] } : {}),
    ...(init.pod ? { pod: init.pod } : {}),
    ...(init.network ? { network: init.network } : {}),
    ...(init.pool ? { pool: init.pool } : {}),
    ...(init.envVars ? { envVars: { ...init.envVars } } : {}),
    ...(init.clusterId ? { clusterId: init.clusterId } : {}),
  };
}

export function templateCreateRequest(
  templateId: string,
  spec: SandboxTemplateSpec,
): TemplateCreateRequest {
  return { templateId, spec };
}

export function templateFromSandboxCreateRequest(
  templateId: string,
  sandboxId: string,
  specOverrides?: TemplateFromSandboxSpecOverrides,
): TemplateFromSandboxCreateRequest {
  return {
    templateId,
    sandboxId,
    ...(specOverrides ? { specOverrides } : {}),
  };
}

export function templateUpdateRequest(spec: SandboxTemplateSpec): TemplateUpdateRequest {
  return { spec };
}
