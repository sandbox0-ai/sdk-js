
# SharedVolumeSpec


## Properties

Name | Type
------------ | -------------
`name` | string
`sandboxVolumeId` | string
`mountPath` | string
`cacheSize` | string
`prefetch` | number
`bufferSize` | string
`writeback` | boolean

## Example

```typescript
import type { SharedVolumeSpec } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "sandboxVolumeId": null,
  "mountPath": null,
  "cacheSize": null,
  "prefetch": null,
  "bufferSize": null,
  "writeback": null,
} satisfies SharedVolumeSpec

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SharedVolumeSpec
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


