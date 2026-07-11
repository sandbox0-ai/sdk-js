
# ExecutionSessionLifecycleSpec


## Properties

Name | Type
------------ | -------------
`desiredState` | [ExecutionSessionDesiredState](ExecutionSessionDesiredState.md)
`restart` | [ExecutionSessionRestartSpec](ExecutionSessionRestartSpec.md)
`runtimeRecovery` | [ExecutionSessionRuntimeRecoveryPolicy](ExecutionSessionRuntimeRecoveryPolicy.md)
`idleTimeoutSeconds` | number
`maxLifetimeSeconds` | number
`stopGracePeriodSeconds` | number

## Example

```typescript
import type { ExecutionSessionLifecycleSpec } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "desiredState": null,
  "restart": null,
  "runtimeRecovery": null,
  "idleTimeoutSeconds": null,
  "maxLifetimeSeconds": null,
  "stopGracePeriodSeconds": null,
} satisfies ExecutionSessionLifecycleSpec

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ExecutionSessionLifecycleSpec
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


