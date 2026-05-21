
# FunctionRuntimeStatus


## Properties

Name | Type
------------ | -------------
`functionId` | string
`revisionId` | string
`revisionNumber` | number
`state` | [FunctionRuntimeState](FunctionRuntimeState.md)
`phase` | [FunctionRuntimePhase](FunctionRuntimePhase.md)
`autoscaling` | [FunctionAutoscaling](FunctionAutoscaling.md)
`readinessState` | [FunctionRuntimeReadinessState](FunctionRuntimeReadinessState.md)
`runtimeSandboxId` | string
`runtimeContextId` | string
`runtimeUpdatedAt` | Date
`startupDurationMs` | number
`lastError` | string
`lastErrorAt` | Date
`instances` | [Array&lt;FunctionRuntimeInstance&gt;](FunctionRuntimeInstance.md)
`recentEvents` | [Array&lt;FunctionRuntimeEvent&gt;](FunctionRuntimeEvent.md)

## Example

```typescript
import type { FunctionRuntimeStatus } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "functionId": null,
  "revisionId": null,
  "revisionNumber": null,
  "state": null,
  "phase": null,
  "autoscaling": null,
  "readinessState": null,
  "runtimeSandboxId": null,
  "runtimeContextId": null,
  "runtimeUpdatedAt": null,
  "startupDurationMs": null,
  "lastError": null,
  "lastErrorAt": null,
  "instances": null,
  "recentEvents": null,
} satisfies FunctionRuntimeStatus

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FunctionRuntimeStatus
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


