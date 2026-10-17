
# SandboxRootFSIdentity


## Properties

Name | Type
------------ | -------------
`sandboxId` | string
`runtimeGeneration` | number
`lifecycleEpoch` | number
`desiredState` | string
`managedFilesSizeBytes` | number
`filesystemId` | string
`headGenerationId` | string
`writerEpoch` | number
`baseArtifactDigest` | string
`sourceOciDigest` | string
`runtimeCompatibilityDigest` | string
`retainedRuntimeCompatibilityDigest` | string
`hasImportedFilesystem` | boolean
`activeLifecycle` | boolean
`sandboxCreatedAt` | Date
`filesystemCreatedAt` | Date
`observedAt` | Date

## Example

```typescript
import type { SandboxRootFSIdentity } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "sandboxId": null,
  "runtimeGeneration": null,
  "lifecycleEpoch": null,
  "desiredState": null,
  "managedFilesSizeBytes": null,
  "filesystemId": null,
  "headGenerationId": null,
  "writerEpoch": null,
  "baseArtifactDigest": null,
  "sourceOciDigest": null,
  "runtimeCompatibilityDigest": null,
  "retainedRuntimeCompatibilityDigest": null,
  "hasImportedFilesystem": null,
  "activeLifecycle": null,
  "sandboxCreatedAt": null,
  "filesystemCreatedAt": null,
  "observedAt": null,
} satisfies SandboxRootFSIdentity

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxRootFSIdentity
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


