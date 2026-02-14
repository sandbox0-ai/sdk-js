
# VolumeAccessMode

Access mode for sandbox volumes. Enforcement is scoped to storage-proxy instances. RWO allows read-write mounts on a single instance; ROX allows read-only mounts across instances; RWX allows read-write mounts across instances.

## Properties

Name | Type
------------ | -------------

## Example

```typescript
import type { VolumeAccessMode } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
} satisfies VolumeAccessMode

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as VolumeAccessMode
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


