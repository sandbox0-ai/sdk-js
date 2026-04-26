
# CloneVolumeFileResult


## Properties

Name | Type
------------ | -------------
`sourceVolumeId` | string
`sourcePath` | string
`targetPath` | string
`mode` | string
`sizeBytes` | number

## Example

```typescript
import type { CloneVolumeFileResult } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "sourceVolumeId": null,
  "sourcePath": null,
  "targetPath": null,
  "mode": null,
  "sizeBytes": null,
} satisfies CloneVolumeFileResult

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CloneVolumeFileResult
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


