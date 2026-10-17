
# SandboxRestartRetryObservation


## Properties

Name | Type
------------ | -------------
`attempts` | number
`observedAt` | Date
`observedStage` | string
`nextAttemptAt` | Date
`blockedReason` | string

## Example

```typescript
import type { SandboxRestartRetryObservation } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "attempts": null,
  "observedAt": null,
  "observedStage": null,
  "nextAttemptAt": null,
  "blockedReason": null,
} satisfies SandboxRestartRetryObservation

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxRestartRetryObservation
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


