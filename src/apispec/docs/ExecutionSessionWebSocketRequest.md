
# ExecutionSessionWebSocketRequest


## Properties

Name | Type
------------ | -------------
`inputId` | string
`expectedAttemptId` | string
`dataBase64` | string
`eof` | boolean
`type` | string
`requestId` | string
`signal` | string
`rows` | number
`cols` | number

## Example

```typescript
import type { ExecutionSessionWebSocketRequest } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "inputId": null,
  "expectedAttemptId": null,
  "dataBase64": null,
  "eof": null,
  "type": null,
  "requestId": null,
  "signal": null,
  "rows": null,
  "cols": null,
} satisfies ExecutionSessionWebSocketRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ExecutionSessionWebSocketRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


