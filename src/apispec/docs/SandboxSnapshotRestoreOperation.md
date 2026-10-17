
# SandboxSnapshotRestoreOperation


## Properties

Name | Type
------------ | -------------
`snapshotId` | string
`snapshotGenerationId` | string
`discardProcessState` | boolean
`restoredRootfsGenerationId` | string
`id` | string
`sandboxId` | string
`requestKey` | string
`fromRuntimeGeneration` | number
`state` | string
`resultRuntimeGeneration` | number
`reason` | string
`createdAt` | Date
`updatedAt` | Date
`finishedAt` | Date
`retry` | [SandboxRestartRetryObservation](SandboxRestartRetryObservation.md)

## Example

```typescript
import type { SandboxSnapshotRestoreOperation } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "snapshotId": null,
  "snapshotGenerationId": null,
  "discardProcessState": null,
  "restoredRootfsGenerationId": null,
  "id": null,
  "sandboxId": null,
  "requestKey": null,
  "fromRuntimeGeneration": null,
  "state": null,
  "resultRuntimeGeneration": null,
  "reason": null,
  "createdAt": null,
  "updatedAt": null,
  "finishedAt": null,
  "retry": null,
} satisfies SandboxSnapshotRestoreOperation

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxSnapshotRestoreOperation
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


