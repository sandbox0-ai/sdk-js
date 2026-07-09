
# ProcessEvent


## Properties

Name | Type
------------ | -------------
`seq` | number
`eventId` | string
`processId` | string
`channel` | string
`type` | [ProcessEventType](ProcessEventType.md)
`timestamp` | Date
`payload` | { [key: string]: any; }

## Example

```typescript
import type { ProcessEvent } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "seq": null,
  "eventId": null,
  "processId": null,
  "channel": null,
  "type": null,
  "timestamp": null,
  "payload": null,
} satisfies ProcessEvent

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ProcessEvent
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


