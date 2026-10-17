
# SandboxRuntimeHealth


## Properties

Name | Type
------------ | -------------
`launchAuthority` | [SandboxHealthObservation](SandboxHealthObservation.md)
`liveness` | [SandboxHealthObservation](SandboxHealthObservation.md)

## Example

```typescript
import type { SandboxRuntimeHealth } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "launchAuthority": null,
  "liveness": null,
} satisfies SandboxRuntimeHealth

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxRuntimeHealth
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


