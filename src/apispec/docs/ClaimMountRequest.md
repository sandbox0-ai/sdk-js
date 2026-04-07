
# ClaimMountRequest


## Properties

Name | Type
------------ | -------------
`sandboxvolumeId` | string
`mountPoint` | string
`volumeConfig` | [VolumeConfig](VolumeConfig.md)

## Example

```typescript
import type { ClaimMountRequest } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "sandboxvolumeId": null,
  "mountPoint": null,
  "volumeConfig": null,
} satisfies ClaimMountRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ClaimMountRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


