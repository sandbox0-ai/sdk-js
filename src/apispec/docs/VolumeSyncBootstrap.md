
# VolumeSyncBootstrap


## Properties

Name | Type
------------ | -------------
`snapshot` | [Snapshot](Snapshot.md)
`replayAfterSeq` | number
`archiveDownloadPath` | string

## Example

```typescript
import type { VolumeSyncBootstrap } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "snapshot": null,
  "replayAfterSeq": null,
  "archiveDownloadPath": null,
} satisfies VolumeSyncBootstrap

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as VolumeSyncBootstrap
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


