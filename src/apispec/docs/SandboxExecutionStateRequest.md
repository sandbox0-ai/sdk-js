
# SandboxExecutionStateRequest

Resume execution-state selection. Conditional memory resume requires all three body fields together with Idempotency-Key.

## Properties

Name | Type
------------ | -------------
`memory` | boolean
`expectedRuntimeGeneration` | number
`checkpointId` | string

## Example

```typescript
import type { SandboxExecutionStateRequest } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "memory": null,
  "expectedRuntimeGeneration": null,
  "checkpointId": null,
} satisfies SandboxExecutionStateRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxExecutionStateRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


