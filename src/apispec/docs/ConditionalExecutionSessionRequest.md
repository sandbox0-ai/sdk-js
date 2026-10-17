
# ConditionalExecutionSessionRequest


## Properties

Name | Type
------------ | -------------
`sandboxId` | string
`runtimeGeneration` | number
`spec` | [ExecutionSessionSpec](ExecutionSessionSpec.md)

## Example

```typescript
import type { ConditionalExecutionSessionRequest } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "sandboxId": null,
  "runtimeGeneration": null,
  "spec": null,
} satisfies ConditionalExecutionSessionRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ConditionalExecutionSessionRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


