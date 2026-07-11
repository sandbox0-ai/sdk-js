
# ExecutionSessionRestartSpec


## Properties

Name | Type
------------ | -------------
`policy` | [ExecutionSessionRestartPolicy](ExecutionSessionRestartPolicy.md)
`maxRestarts` | number
`windowSeconds` | number
`initialBackoffMs` | number
`maxBackoffMs` | number

## Example

```typescript
import type { ExecutionSessionRestartSpec } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "policy": null,
  "maxRestarts": null,
  "windowSeconds": null,
  "initialBackoffMs": null,
  "maxBackoffMs": null,
} satisfies ExecutionSessionRestartSpec

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ExecutionSessionRestartSpec
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


