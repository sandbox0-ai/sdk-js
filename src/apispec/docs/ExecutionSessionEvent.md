
# ExecutionSessionEvent


## Properties

Name | Type
------------ | -------------
`seq` | number
`sessionId` | string
`runtimeGeneration` | number
`attemptId` | string
`type` | string
`stream` | string
`dataBase64` | string
`exitCode` | number
`reason` | string
`occurredAt` | Date

## Example

```typescript
import type { ExecutionSessionEvent } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "seq": null,
  "sessionId": null,
  "runtimeGeneration": null,
  "attemptId": null,
  "type": null,
  "stream": null,
  "dataBase64": null,
  "exitCode": null,
  "reason": null,
  "occurredAt": null,
} satisfies ExecutionSessionEvent

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ExecutionSessionEvent
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


