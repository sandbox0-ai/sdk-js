
# SandboxHealth


## Properties

Name | Type
------------ | -------------
`sandboxId` | string
`runtimeGeneration` | number
`lifecycleEpoch` | number
`desiredState` | string
`activeLifecycle` | boolean
`observedAt` | Date
`runtime` | [SandboxRuntimeHealth](SandboxRuntimeHealth.md)
`execution` | [SandboxHealthObservation](SandboxHealthObservation.md)
`terminal` | [SandboxHealthObservation](SandboxHealthObservation.md)
`storage` | [SandboxStorageHealth](SandboxStorageHealth.md)

## Example

```typescript
import type { SandboxHealth } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "sandboxId": null,
  "runtimeGeneration": null,
  "lifecycleEpoch": null,
  "desiredState": null,
  "activeLifecycle": null,
  "observedAt": null,
  "runtime": null,
  "execution": null,
  "terminal": null,
  "storage": null,
} satisfies SandboxHealth

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxHealth
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


