
# SyncJournalEntry


## Properties

Name | Type
------------ | -------------
`seq` | number
`volumeId` | string
`teamId` | string
`source` | string
`replicaId` | string
`eventType` | [SyncEventType](SyncEventType.md)
`path` | string
`normalizedPath` | string
`oldPath` | string
`normalizedOldPath` | string
`tombstone` | boolean
`entryKind` | string
`mode` | number
`contentRef` | string
`contentSha256` | string
`sizeBytes` | number
`metadata` | { [key: string]: any; }
`createdAt` | Date

## Example

```typescript
import type { SyncJournalEntry } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "seq": null,
  "volumeId": null,
  "teamId": null,
  "source": null,
  "replicaId": null,
  "eventType": null,
  "path": null,
  "normalizedPath": null,
  "oldPath": null,
  "normalizedOldPath": null,
  "tombstone": null,
  "entryKind": null,
  "mode": null,
  "contentRef": null,
  "contentSha256": null,
  "sizeBytes": null,
  "metadata": null,
  "createdAt": null,
} satisfies SyncJournalEntry

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SyncJournalEntry
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


