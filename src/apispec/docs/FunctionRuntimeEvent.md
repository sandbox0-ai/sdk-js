
# FunctionRuntimeEvent


## Properties

Name | Type
------------ | -------------
`id` | string
`teamId` | string
`functionId` | string
`revisionId` | string
`runtimeInstanceId` | string
`runtimeSandboxId` | string
`runtimeContextId` | string
`phase` | [FunctionRuntimePhase](FunctionRuntimePhase.md)
`readinessState` | [FunctionRuntimeReadinessState](FunctionRuntimeReadinessState.md)
`reason` | string
`message` | string
`startupDurationMs` | number
`createdAt` | Date

## Example

```typescript
import type { FunctionRuntimeEvent } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "teamId": null,
  "functionId": null,
  "revisionId": null,
  "runtimeInstanceId": null,
  "runtimeSandboxId": null,
  "runtimeContextId": null,
  "phase": null,
  "readinessState": null,
  "reason": null,
  "message": null,
  "startupDurationMs": null,
  "createdAt": null,
} satisfies FunctionRuntimeEvent

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FunctionRuntimeEvent
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


