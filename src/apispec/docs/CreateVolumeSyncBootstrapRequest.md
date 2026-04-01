
# CreateVolumeSyncBootstrapRequest


## Properties

Name | Type
------------ | -------------
`snapshotName` | string
`snapshotDescription` | string
`caseSensitive` | boolean
`capabilities` | [VolumeSyncFilesystemCapabilities](VolumeSyncFilesystemCapabilities.md)

## Example

```typescript
import type { CreateVolumeSyncBootstrapRequest } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "snapshotName": null,
  "snapshotDescription": null,
  "caseSensitive": null,
  "capabilities": null,
} satisfies CreateVolumeSyncBootstrapRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateVolumeSyncBootstrapRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


