
# FunctionRevisionMountSource


## Properties

Name | Type
------------ | -------------
`type` | string
`sandboxvolumeId` | string
`sourceSandboxvolumeId` | string
`snapshotId` | string
`artifactId` | string
`digest` | string

## Example

```typescript
import type { FunctionRevisionMountSource } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "sandboxvolumeId": null,
  "sourceSandboxvolumeId": null,
  "snapshotId": null,
  "artifactId": null,
  "digest": null,
} satisfies FunctionRevisionMountSource

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FunctionRevisionMountSource
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


