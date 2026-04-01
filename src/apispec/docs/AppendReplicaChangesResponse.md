
# AppendReplicaChangesResponse


## Properties

Name | Type
------------ | -------------
`headSeq` | number
`accepted` | [Array&lt;SyncJournalEntry&gt;](SyncJournalEntry.md)
`conflicts` | [Array&lt;SyncConflict&gt;](SyncConflict.md)

## Example

```typescript
import type { AppendReplicaChangesResponse } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "headSeq": null,
  "accepted": null,
  "conflicts": null,
} satisfies AppendReplicaChangesResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AppendReplicaChangesResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


