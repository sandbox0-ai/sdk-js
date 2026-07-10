
# ExecutionSessionAttempt


## Properties

Name | Type
------------ | -------------
`id` | string
`number` | number
`runtimeGeneration` | number
`pid` | number
`startedAt` | Date
`finishedAt` | Date
`exitCode` | number
`reason` | string

## Example

```typescript
import type { ExecutionSessionAttempt } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "number": null,
  "runtimeGeneration": null,
  "pid": null,
  "startedAt": null,
  "finishedAt": null,
  "exitCode": null,
  "reason": null,
} satisfies ExecutionSessionAttempt

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ExecutionSessionAttempt
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


