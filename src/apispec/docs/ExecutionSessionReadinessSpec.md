
# ExecutionSessionReadinessSpec


## Properties

Name | Type
------------ | -------------
`type` | [ExecutionSessionReadinessType](ExecutionSessionReadinessType.md)
`delayMs` | number
`output` | string
`timeoutMs` | number

## Example

```typescript
import type { ExecutionSessionReadinessSpec } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "delayMs": null,
  "output": null,
  "timeoutMs": null,
} satisfies ExecutionSessionReadinessSpec

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ExecutionSessionReadinessSpec
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


