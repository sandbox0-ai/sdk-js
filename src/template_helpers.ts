import type {
  ContainerMountSpec,
  ContainerSpec,
  EnvVar,
  LifecyclePolicy,
  PoolStrategy,
  Probe,
  ResourceQuota,
  SandboxNetworkPolicy,
  SandboxTemplateSpec,
  SharedVolumeSpec,
  SidecarContainerSpec,
  TemplateCreateRequest,
  TemplateUpdateRequest,
} from "./apispec/src/models/index";

export interface TemplateSpecInit {
  description?: string;
  displayName?: string;
  tags?: string[];
  sidecars?: SidecarContainerSpec[];
  sharedVolumes?: SharedVolumeSpec[];
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

export interface SidecarInit {
  command?: string[];
  args?: string[];
  env?: EnvVar[];
  mounts?: ContainerMountSpec[];
  readinessProbe?: Probe;
  livenessProbe?: Probe;
  startupProbe?: Probe;
}

export interface SharedVolumeInit {
  sandboxVolumeId?: string;
  cacheSize?: string;
  prefetch?: number;
  bufferSize?: string;
  writeback?: boolean;
}

export function resources(cpu: string, memory: string): ResourceQuota {
  return { cpu, memory };
}

export function mount(name: string, mountPath: string): ContainerMountSpec {
  return { name, mountPath };
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

export function sidecar(
  name: string,
  image: string,
  sidecarResources: ResourceQuota,
  init: SidecarInit = {},
): SidecarContainerSpec {
  return {
    name,
    image,
    resources: sidecarResources,
    ...(init.command ? { command: [...init.command] } : {}),
    ...(init.args ? { args: [...init.args] } : {}),
    ...(init.env ? { env: [...init.env] } : {}),
    ...(init.mounts ? { mounts: [...init.mounts] } : {}),
    ...(init.readinessProbe ? { readinessProbe: init.readinessProbe } : {}),
    ...(init.livenessProbe ? { livenessProbe: init.livenessProbe } : {}),
    ...(init.startupProbe ? { startupProbe: init.startupProbe } : {}),
  };
}

export function sharedVolume(
  name: string,
  mountPath: string,
  init: SharedVolumeInit = {},
): SharedVolumeSpec {
  return {
    name,
    mountPath,
    ...(init.sandboxVolumeId ? { sandboxVolumeId: init.sandboxVolumeId } : {}),
    ...(init.cacheSize ? { cacheSize: init.cacheSize } : {}),
    ...(init.prefetch !== undefined ? { prefetch: init.prefetch } : {}),
    ...(init.bufferSize ? { bufferSize: init.bufferSize } : {}),
    ...(init.writeback !== undefined ? { writeback: init.writeback } : {}),
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
    ...(init.sidecars ? { sidecars: [...init.sidecars] } : {}),
    ...(init.sharedVolumes ? { sharedVolumes: [...init.sharedVolumes] } : {}),
    ...(init.pod ? { pod: init.pod } : {}),
    ...(init.network ? { network: init.network } : {}),
    ...(init.pool ? { pool: init.pool } : {}),
    ...(init.lifecycle ? { lifecycle: init.lifecycle } : {}),
    ...(init.envVars ? { envVars: { ...init.envVars } } : {}),
    ...(init.public !== undefined ? { public: init.public } : {}),
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
