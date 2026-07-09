
# CreateSandboxRootFSSnapshotRequest

Optional snapshot metadata. The source sandbox may be running or paused; running sources are checkpointed before the snapshot record is created. 

## Properties

Name | Type
------------ | -------------
`name` | string
`description` | string
`expiresAt` | Date

## Example

```typescript
import type { CreateSandboxRootFSSnapshotRequest } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "description": null,
  "expiresAt": null,
} satisfies CreateSandboxRootFSSnapshotRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateSandboxRootFSSnapshotRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


