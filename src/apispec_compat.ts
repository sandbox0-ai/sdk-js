import * as apisImport from "./apispec/src/apis/index";
import * as modelsImport from "./apispec/src/models/index";
import * as runtimeImport from "./apispec/src/runtime";

function unwrapModule<T extends object>(mod: T): T {
  const moduleCandidate = mod as T & {
    default?: T;
    "module.exports"?: T;
  };
  return moduleCandidate.default ?? moduleCandidate["module.exports"] ?? mod;
}

export const runtime = unwrapModule(runtimeImport);
export const apis = unwrapModule(apisImport);
export const models = unwrapModule(modelsImport);
