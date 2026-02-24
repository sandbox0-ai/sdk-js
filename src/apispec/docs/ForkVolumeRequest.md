
# ForkVolumeRequest


## Properties

Name | Type
------------ | -------------
`cacheSize` | string
`prefetch` | number
`bufferSize` | string
`writeback` | boolean
`accessMode` | [VolumeAccessMode](VolumeAccessMode.md)

## Example

```typescript
import type { ForkVolumeRequest } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "cacheSize": null,
  "prefetch": null,
  "bufferSize": null,
  "writeback": null,
  "accessMode": null,
} satisfies ForkVolumeRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ForkVolumeRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


