
# ProcessInputEvent


## Properties

Name | Type
------------ | -------------
`eventId` | string
`channel` | string
`type` | [ProcessEventType](ProcessEventType.md)
`payload` | { [key: string]: any; }

## Example

```typescript
import type { ProcessInputEvent } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "eventId": null,
  "channel": null,
  "type": null,
  "payload": null,
} satisfies ProcessInputEvent

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ProcessInputEvent
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


