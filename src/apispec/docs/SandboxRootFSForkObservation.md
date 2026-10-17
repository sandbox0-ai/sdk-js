
# SandboxRootFSForkObservation


## Properties

Name | Type
------------ | -------------
`operationId` | string
`sourceSandboxId` | string
`targetSandboxId` | string
`sourceRuntimeGeneration` | number
`sourceFilesystemId` | string
`sourceHeadGenerationId` | string
`targetFilesystemId` | string
`targetHeadGenerationId` | string
`baseArtifactDigest` | string
`sourceOciDigest` | string
`writerEpoch` | number
`managedFilesSizeBytes` | number
`autoResume` | boolean
`automaticRoutes` | boolean
`sandboxCreatedAt` | Date
`filesystemCreatedAt` | Date
`observedAt` | Date

## Example

```typescript
import type { SandboxRootFSForkObservation } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "operationId": null,
  "sourceSandboxId": null,
  "targetSandboxId": null,
  "sourceRuntimeGeneration": null,
  "sourceFilesystemId": null,
  "sourceHeadGenerationId": null,
  "targetFilesystemId": null,
  "targetHeadGenerationId": null,
  "baseArtifactDigest": null,
  "sourceOciDigest": null,
  "writerEpoch": null,
  "managedFilesSizeBytes": null,
  "autoResume": null,
  "automaticRoutes": null,
  "sandboxCreatedAt": null,
  "filesystemCreatedAt": null,
  "observedAt": null,
} satisfies SandboxRootFSForkObservation

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxRootFSForkObservation
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


