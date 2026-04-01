
# SyncConflict


## Properties

Name | Type
------------ | -------------
`id` | string
`volumeId` | string
`teamId` | string
`replicaId` | string
`path` | string
`normalizedPath` | string
`artifactPath` | string
`incomingPath` | string
`incomingOldPath` | string
`existingSeq` | number
`reason` | string
`status` | string
`metadata` | { [key: string]: any; }
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { SyncConflict } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "volumeId": null,
  "teamId": null,
  "replicaId": null,
  "path": null,
  "normalizedPath": null,
  "artifactPath": null,
  "incomingPath": null,
  "incomingOldPath": null,
  "existingSeq": null,
  "reason": null,
  "status": null,
  "metadata": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies SyncConflict

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SyncConflict
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


