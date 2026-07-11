
# ExecutionSessionInputRequest


## Properties

Name | Type
------------ | -------------
`inputId` | string
`expectedAttemptId` | string
`dataBase64` | string
`eof` | boolean

## Example

```typescript
import type { ExecutionSessionInputRequest } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "inputId": null,
  "expectedAttemptId": null,
  "dataBase64": null,
  "eof": null,
} satisfies ExecutionSessionInputRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ExecutionSessionInputRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


