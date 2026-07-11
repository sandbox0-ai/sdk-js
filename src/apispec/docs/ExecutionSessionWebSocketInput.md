
# ExecutionSessionWebSocketInput


## Properties

Name | Type
------------ | -------------
`inputId` | string
`expectedAttemptId` | string
`dataBase64` | string
`eof` | boolean
`type` | string
`requestId` | string

## Example

```typescript
import type { ExecutionSessionWebSocketInput } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "inputId": null,
  "expectedAttemptId": null,
  "dataBase64": null,
  "eof": null,
  "type": null,
  "requestId": null,
} satisfies ExecutionSessionWebSocketInput

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ExecutionSessionWebSocketInput
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


