
# VolumeFileArchiveImportResponse


## Properties

Name | Type
------------ | -------------
`files` | number
`directories` | number
`symlinks` | number
`bytes` | number

## Example

```typescript
import type { VolumeFileArchiveImportResponse } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "files": null,
  "directories": null,
  "symlinks": null,
  "bytes": null,
} satisfies VolumeFileArchiveImportResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as VolumeFileArchiveImportResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


