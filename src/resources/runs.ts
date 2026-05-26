import type {
  ActivateRunRevisionRequest,
  Run as SandboxRun,
  RunDeployRequest,
  RunRevision,
  RunRevisionMount,
  RunRevisionSpec,
  RunScalePolicy,
  RunUpdateRequest,
  SandboxAppService,
  SandboxAppServiceRoute,
  SuccessDeletedResponse,
} from "../apispec/src/models/index";
import { models } from "../apispec_compat";
import { ensureData, ensureModel } from "../response";
import { wrapApiCall } from "../errors";
import type { Client } from "../client";

export interface RunSnapshotMount {
  snapshotId: string;
  mountPath: string;
}

export interface RunServiceSpec {
  id?: string;
  displayName?: string;
  port: number;
  command?: string[];
  cwd?: string;
  envVars?: Record<string, string>;
  warmProcessName?: string;
  healthPath?: string;
  routes?: SandboxAppServiceRoute[];
}

export interface RunDeploySpec {
  name?: string;
  slug?: string;
  template: string;
  service: RunServiceSpec;
  mounts?: RunSnapshotMount[];
  envVars?: Record<string, string>;
  scale?: RunScalePolicy;
  activate?: boolean;
}

export interface RunDeployOptions {
  name?: string;
  slug?: string;
  scale?: RunScalePolicy;
  activate?: boolean;
}

export interface SandboxRunDeployResult {
  run: SandboxRun;
  revision: RunRevision;
}

export class Runs {
  constructor(private readonly client: Client) {}

  async deploy(spec: RunDeploySpec): Promise<SandboxRunDeployResult> {
    return this.deployRequest(runDeployRequestFromSpec(spec));
  }

  async deployRequest(request: RunDeployRequest): Promise<SandboxRunDeployResult> {
    const response = await wrapApiCall(() =>
      this.client.apispec.runs.apiV1RunsDeployPost({
        runDeployRequest: request,
      }),
    );
    return toRunDeployResult(response, "deploy run returned empty response");
  }

  async deployRevision(
    runId: string,
    spec: RunDeploySpec,
  ): Promise<SandboxRunDeployResult> {
    return this.deployRevisionRequest(runId, runDeployRequestFromSpec(spec));
  }

  async deployRevisionRequest(
    runId: string,
    request: RunDeployRequest,
  ): Promise<SandboxRunDeployResult> {
    const response = await wrapApiCall(() =>
      this.client.apispec.runs.apiV1RunsIdDeployPost({
        id: runId,
        runDeployRequest: request,
      }),
    );
    return toRunDeployResult(response, "deploy run revision returned empty response");
  }

  async deployFromSandboxService(
    sandboxId: string,
    serviceId: string,
    options?: RunDeployOptions,
  ): Promise<SandboxRunDeployResult> {
    const request: RunDeployRequest = {
      name: options?.name,
      slug: options?.slug,
      scale: options?.scale,
      activate: options?.activate,
      source: {
        type: models.RunSourceType.SandboxService,
        sandboxService: {
          sandboxId,
          serviceId,
        },
      },
    };
    return this.deployRequest(request);
  }

  async list(): Promise<SandboxRun[]> {
    const response = await wrapApiCall(() =>
      this.client.apispec.runs.apiV1RunsGet(),
    );
    const data = ensureData(response, "list runs returned empty response");
    return data.runs ?? [];
  }

  async get(runId: string): Promise<SandboxRun> {
    const response = await wrapApiCall(() =>
      this.client.apispec.runs.apiV1RunsIdGet({ id: runId }),
    );
    return ensureData(response, "get run returned empty response");
  }

  async update(
    runId: string,
    request: RunUpdateRequest,
  ): Promise<SandboxRun> {
    const response = await wrapApiCall(() =>
      this.client.apispec.runs.apiV1RunsIdPut({
        id: runId,
        runUpdateRequest: request,
      }),
    );
    return ensureData(response, "update run returned empty response");
  }

  async delete(runId: string): Promise<SuccessDeletedResponse> {
    const response = await wrapApiCall(() =>
      this.client.apispec.runs.apiV1RunsIdDelete({ id: runId }),
    );
    return ensureModel(response, "delete run returned empty response");
  }

  async revisions(runId: string): Promise<RunRevision[]> {
    const response = await wrapApiCall(() =>
      this.client.apispec.runs.apiV1RunsIdRevisionsGet({ id: runId }),
    );
    const data = ensureData(response, "list run revisions returned empty response");
    return data.revisions ?? [];
  }

  async activateRevision(
    runId: string,
    revisionId: string,
  ): Promise<SandboxRunDeployResult> {
    const request: ActivateRunRevisionRequest = { revisionId };
    const response = await wrapApiCall(() =>
      this.client.apispec.runs.apiV1RunsIdActiveRevisionPut({
        id: runId,
        activateRunRevisionRequest: request,
      }),
    );
    return toRunDeployResult(response, "activate run revision returned empty response");
  }
}

function toRunDeployResult(
  response: { data?: { run: SandboxRun; revision: RunRevision } },
  message: string,
): SandboxRunDeployResult {
  const data = ensureData(response, message);
  return {
    run: data.run,
    revision: data.revision,
  };
}

export function runDeployRequestFromSpec(spec: RunDeploySpec): RunDeployRequest {
  if (!spec.template) {
    throw new Error("run template is required");
  }
  const service = runServiceFromSpec(spec.service);
  const mounts: RunRevisionMount[] = (spec.mounts ?? []).map((mount) => {
    if (!mount.snapshotId || !mount.mountPath) {
      throw new Error("run mount requires snapshotId and mountPath");
    }
    return {
      snapshotId: mount.snapshotId,
      mountPath: mount.mountPath,
      readOnly: true,
    };
  });
  const revisionSpec: RunRevisionSpec = {
    template: spec.template,
    service,
    mounts,
    envVars: spec.envVars,
  };
  return {
    name: spec.name,
    slug: spec.slug,
    scale: spec.scale,
    activate: spec.activate,
    source: { type: models.RunSourceType.Snapshot },
    spec: revisionSpec,
  };
}

function runServiceFromSpec(spec: RunServiceSpec): SandboxAppService {
  if (!spec.port || spec.port <= 0) {
    throw new Error("run service port is required");
  }
  return {
    id: spec.id || "app",
    displayName: spec.displayName,
    port: spec.port,
    runtime: runRuntimeFromSpec(spec),
    ingress: {
      _public: true,
      routes: spec.routes,
    },
    healthCheck: spec.healthPath ? { path: spec.healthPath } : undefined,
  };
}

function runRuntimeFromSpec(spec: RunServiceSpec): SandboxAppService["runtime"] {
  if (spec.command?.length) {
    return {
      type: models.SandboxAppServiceRuntimeTypeEnum.Cmd,
      command: [...spec.command],
      cwd: spec.cwd,
      envVars: spec.envVars,
    };
  }
  if (spec.warmProcessName) {
    return {
      type: models.SandboxAppServiceRuntimeTypeEnum.WarmProcess,
      warmProcessName: spec.warmProcessName,
    };
  }
  throw new Error("run service command or warmProcessName is required");
}
