import type {
  ContainerSpec,
  EphemeralMountSpec,
  EnvVar,
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
  ephemeralMounts?: EphemeralMountSpec[];
  network?: SandboxNetworkPolicy;
  envVars?: Record<string, string>;
}

export interface ContainerInit {
  env?: EnvVar[];
  securityClass?: ContainerSpec["securityClass"];
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
    ...(init.env ? { env: [...init.env] } : {}),
    ...(init.securityClass !== undefined ? { securityClass: init.securityClass } : {}),
  };
}

export function ephemeralMount(mountPath: string, sizeLimit: string): EphemeralMountSpec {
  return { mountPath, sizeLimit };
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
    ...(init.ephemeralMounts ? { ephemeralMounts: [...init.ephemeralMounts] } : {}),
    ...(init.network ? { network: init.network } : {}),
    ...(init.envVars ? { envVars: { ...init.envVars } } : {}),
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
