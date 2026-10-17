
# SandboxRootFSForkLaunch


## Properties

Name | Type
------------ | -------------
`operationId` | string
`sandboxId` | string
`forkOperationId` | string
`filesystemId` | string
`headGenerationId` | string
`writerEpoch` | number
`lifecycleEpoch` | number
`runtimeGeneration` | number
`state` | string
`current` | boolean
`launchDigest` | string
`completedAt` | Date

## Example

```typescript
import type { SandboxRootFSForkLaunch } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "operationId": null,
  "sandboxId": null,
  "forkOperationId": null,
  "filesystemId": null,
  "headGenerationId": null,
  "writerEpoch": null,
  "lifecycleEpoch": null,
  "runtimeGeneration": null,
  "state": null,
  "current": null,
  "launchDigest": null,
  "completedAt": null,
} satisfies SandboxRootFSForkLaunch

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxRootFSForkLaunch
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


