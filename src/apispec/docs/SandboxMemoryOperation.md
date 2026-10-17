
# SandboxMemoryOperation


## Properties

Name | Type
------------ | -------------
`sandboxId` | string
`operationId` | string
`checkpointId` | string
`action` | string
`fromRuntimeGeneration` | number
`lifecycleEpoch` | number
`resultRuntimeGeneration` | number
`state` | string
`reason` | string
`current` | boolean

## Example

```typescript
import type { SandboxMemoryOperation } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "sandboxId": null,
  "operationId": null,
  "checkpointId": null,
  "action": null,
  "fromRuntimeGeneration": null,
  "lifecycleEpoch": null,
  "resultRuntimeGeneration": null,
  "state": null,
  "reason": null,
  "current": null,
} satisfies SandboxMemoryOperation

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxMemoryOperation
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


