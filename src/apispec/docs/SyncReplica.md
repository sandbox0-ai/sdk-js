
# SyncReplica


## Properties

Name | Type
------------ | -------------
`id` | string
`volumeId` | string
`teamId` | string
`displayName` | string
`platform` | string
`rootPath` | string
`caseSensitive` | boolean
`capabilities` | [VolumeSyncFilesystemCapabilities](VolumeSyncFilesystemCapabilities.md)
`lastSeenAt` | Date
`lastAppliedSeq` | number
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { SyncReplica } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "volumeId": null,
  "teamId": null,
  "displayName": null,
  "platform": null,
  "rootPath": null,
  "caseSensitive": null,
  "capabilities": null,
  "lastSeenAt": null,
  "lastAppliedSeq": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies SyncReplica

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SyncReplica
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


