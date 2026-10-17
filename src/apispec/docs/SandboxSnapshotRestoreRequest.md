
# SandboxSnapshotRestoreRequest


## Properties

Name | Type
------------ | -------------
`expectedRuntimeGeneration` | number
`snapshotId` | string
`snapshotGenerationId` | string
`discardProcessState` | boolean

## Example

```typescript
import type { SandboxSnapshotRestoreRequest } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "expectedRuntimeGeneration": null,
  "snapshotId": null,
  "snapshotGenerationId": null,
  "discardProcessState": null,
} satisfies SandboxSnapshotRestoreRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxSnapshotRestoreRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


