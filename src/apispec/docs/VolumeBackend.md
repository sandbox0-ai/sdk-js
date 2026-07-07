
# VolumeBackend

Storage backend for a SandboxVolume. s0fs is the default durable Sandbox0 volume backend. s3 mounts an existing S3-compatible prefix through the volume portal and supports mount-s3-like object projection.

## Properties

Name | Type
------------ | -------------

## Example

```typescript
import type { VolumeBackend } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
} satisfies VolumeBackend

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as VolumeBackend
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


