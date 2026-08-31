
# RebaseSandboxRootFSResponse


## Properties

Name | Type
------------ | -------------
`sandboxId` | string
`generationId` | string
`baseArtifactDigest` | string
`rollbackExpiresAt` | Date
`status` | [SandboxLifecycleStatus](SandboxLifecycleStatus.md)

## Example

```typescript
import type { RebaseSandboxRootFSResponse } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "sandboxId": null,
  "generationId": null,
  "baseArtifactDigest": null,
  "rollbackExpiresAt": null,
  "status": null,
} satisfies RebaseSandboxRootFSResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RebaseSandboxRootFSResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


