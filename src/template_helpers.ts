import type {
  ContainerSpec,
  EnvVar,
  LifecyclePolicy,
  PoolStrategy,
  ResourceQuota,
  SandboxNetworkPolicy,
  SandboxTemplateSpec,
  TemplateCreateRequest,
  TemplateUpdateRequest,
  WarmProcessSpec,
} from "./apispec/src/models/index";

export interface TemplateSpecInit {
  description?: string;
  displayName?: string;
  tags?: string[];
  warmProcesses?: WarmProcessSpec[];
  pod?: SandboxTemplateSpec["pod"];
  network?: SandboxNetworkPolicy;
  pool?: PoolStrategy;
  lifecycle?: LifecyclePolicy;
  envVars?: Record<string, string>;
  public?: boolean;
  allowedTeams?: string[];
  clusterId?: string;
}

export interface ContainerInit {
  imagePullPolicy?: string;
  env?: EnvVar[];
  securityContext?: ContainerSpec["securityContext"];
}

export interface WarmProcessInit {
  alias?: string;
  command?: string[];
  cwd?: string;
  envVars?: Record<string, string>;
}

export function resources(cpu: string, memory: string): ResourceQuota {
  return { cpu, memory };
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

export function warmProcess(
  type: WarmProcessSpec["type"],
  init: WarmProcessInit = {},
): WarmProcessSpec {
  return {
    type,
    ...(init.alias ? { alias: init.alias } : {}),
    ...(init.command ? { command: [...init.command] } : {}),
    ...(init.cwd ? { cwd: init.cwd } : {}),
    ...(init.envVars ? { envVars: { ...init.envVars } } : {}),
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
    ...(init.warmProcesses ? { warmProcesses: [...init.warmProcesses] } : {}),
    ...(init.pod ? { pod: init.pod } : {}),
    ...(init.network ? { network: init.network } : {}),
    ...(init.pool ? { pool: init.pool } : {}),
    ...(init.lifecycle ? { lifecycle: init.lifecycle } : {}),
    ...(init.envVars ? { envVars: { ...init.envVars } } : {}),
    ...(init.public !== undefined ? { _public: init.public } : {}),
    ...(init.allowedTeams ? { allowedTeams: [...init.allowedTeams] } : {}),
    ...(init.clusterId ? { clusterId: init.clusterId } : {}),
  };
}

export function templateCreateRequest(
  templateId: string,
  spec: SandboxTemplateSpec,
): TemplateCreateRequest {
  return { templateId, spec };
}

export function templateUpdateRequest(spec: SandboxTemplateSpec): TemplateUpdateRequest {
  return { spec };
}
