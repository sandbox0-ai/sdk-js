import type {
  ActivateFunctionRevisionRequest,
  Function as SandboxFunction,
  FunctionDeployRequest,
  FunctionRevision,
  FunctionRevisionMount,
  FunctionRevisionSpec,
  FunctionScalePolicy,
  FunctionUpdateRequest,
  SandboxAppService,
  SandboxAppServiceRoute,
  SuccessDeletedResponse,
} from "../apispec/src/models/index";
import { models } from "../apispec_compat";
import { ensureData, ensureModel } from "../response";
import { wrapApiCall } from "../errors";
import type { Client } from "../client";

export interface FunctionSnapshotMount {
  snapshotId: string;
  mountPath: string;
}

export interface FunctionServiceSpec {
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

export interface FunctionDeploySpec {
  name?: string;
  slug?: string;
  template: string;
  service: FunctionServiceSpec;
  mounts?: FunctionSnapshotMount[];
  envVars?: Record<string, string>;
  scale?: FunctionScalePolicy;
  activate?: boolean;
}

export interface FunctionDeployOptions {
  name?: string;
  slug?: string;
  scale?: FunctionScalePolicy;
  activate?: boolean;
}

export interface SandboxFunctionDeployResult {
  function: SandboxFunction;
  revision: FunctionRevision;
}

export class Functions {
  constructor(private readonly client: Client) {}

  async deploy(spec: FunctionDeploySpec): Promise<SandboxFunctionDeployResult> {
    return this.deployRequest(functionDeployRequestFromSpec(spec));
  }

  async deployRequest(request: FunctionDeployRequest): Promise<SandboxFunctionDeployResult> {
    const response = await wrapApiCall(() =>
      this.client.apispec.functions.apiV1FunctionsDeployPost({
        functionDeployRequest: request,
      }),
    );
    return toFunctionDeployResult(response, "deploy function returned empty response");
  }

  async deployRevision(
    functionId: string,
    spec: FunctionDeploySpec,
  ): Promise<SandboxFunctionDeployResult> {
    return this.deployRevisionRequest(functionId, functionDeployRequestFromSpec(spec));
  }

  async deployRevisionRequest(
    functionId: string,
    request: FunctionDeployRequest,
  ): Promise<SandboxFunctionDeployResult> {
    const response = await wrapApiCall(() =>
      this.client.apispec.functions.apiV1FunctionsIdDeployPost({
        id: functionId,
        functionDeployRequest: request,
      }),
    );
    return toFunctionDeployResult(response, "deploy function revision returned empty response");
  }

  async deployFromSandboxService(
    sandboxId: string,
    serviceId: string,
    options?: FunctionDeployOptions,
  ): Promise<SandboxFunctionDeployResult> {
    const request: FunctionDeployRequest = {
      name: options?.name,
      slug: options?.slug,
      scale: options?.scale,
      activate: options?.activate,
      source: {
        type: models.FunctionSourceType.SandboxService,
        sandboxService: {
          sandboxId,
          serviceId,
        },
      },
    };
    return this.deployRequest(request);
  }

  async list(): Promise<SandboxFunction[]> {
    const response = await wrapApiCall(() =>
      this.client.apispec.functions.apiV1FunctionsGet(),
    );
    const data = ensureData(response, "list functions returned empty response");
    return data.functions ?? [];
  }

  async get(functionId: string): Promise<SandboxFunction> {
    const response = await wrapApiCall(() =>
      this.client.apispec.functions.apiV1FunctionsIdGet({ id: functionId }),
    );
    return ensureData(response, "get function returned empty response");
  }

  async update(
    functionId: string,
    request: FunctionUpdateRequest,
  ): Promise<SandboxFunction> {
    const response = await wrapApiCall(() =>
      this.client.apispec.functions.apiV1FunctionsIdPut({
        id: functionId,
        functionUpdateRequest: request,
      }),
    );
    return ensureData(response, "update function returned empty response");
  }

  async delete(functionId: string): Promise<SuccessDeletedResponse> {
    const response = await wrapApiCall(() =>
      this.client.apispec.functions.apiV1FunctionsIdDelete({ id: functionId }),
    );
    return ensureModel(response, "delete function returned empty response");
  }

  async revisions(functionId: string): Promise<FunctionRevision[]> {
    const response = await wrapApiCall(() =>
      this.client.apispec.functions.apiV1FunctionsIdRevisionsGet({ id: functionId }),
    );
    const data = ensureData(response, "list function revisions returned empty response");
    return data.revisions ?? [];
  }

  async activateRevision(
    functionId: string,
    revisionId: string,
  ): Promise<SandboxFunctionDeployResult> {
    const request: ActivateFunctionRevisionRequest = { revisionId };
    const response = await wrapApiCall(() =>
      this.client.apispec.functions.apiV1FunctionsIdActiveRevisionPut({
        id: functionId,
        activateFunctionRevisionRequest: request,
      }),
    );
    return toFunctionDeployResult(response, "activate function revision returned empty response");
  }
}

function toFunctionDeployResult(
  response: { data?: { _function: SandboxFunction; revision: FunctionRevision } },
  message: string,
): SandboxFunctionDeployResult {
  const data = ensureData(response, message);
  return {
    function: data._function,
    revision: data.revision,
  };
}

export function functionDeployRequestFromSpec(spec: FunctionDeploySpec): FunctionDeployRequest {
  if (!spec.template) {
    throw new Error("function template is required");
  }
  const service = functionServiceFromSpec(spec.service);
  const mounts: FunctionRevisionMount[] = (spec.mounts ?? []).map((mount) => {
    if (!mount.snapshotId || !mount.mountPath) {
      throw new Error("function mount requires snapshotId and mountPath");
    }
    return {
      snapshotId: mount.snapshotId,
      mountPath: mount.mountPath,
      readOnly: true,
    };
  });
  const revisionSpec: FunctionRevisionSpec = {
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
    source: { type: models.FunctionSourceType.Snapshot },
    spec: revisionSpec,
  };
}

function functionServiceFromSpec(spec: FunctionServiceSpec): SandboxAppService {
  if (!spec.port || spec.port <= 0) {
    throw new Error("function service port is required");
  }
  return {
    id: spec.id || "app",
    displayName: spec.displayName,
    port: spec.port,
    runtime: functionRuntimeFromSpec(spec),
    ingress: {
      _public: true,
      routes: spec.routes,
    },
    healthCheck: spec.healthPath ? { path: spec.healthPath } : undefined,
  };
}

function functionRuntimeFromSpec(spec: FunctionServiceSpec): SandboxAppService["runtime"] {
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
  throw new Error("function service command or warmProcessName is required");
}
