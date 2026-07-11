
# ExecutionSessionEventPage


## Properties

Name | Type
------------ | -------------
`events` | [Array&lt;ExecutionSessionEvent&gt;](ExecutionSessionEvent.md)
`cursor` | [ExecutionSessionEventCursor](ExecutionSessionEventCursor.md)

## Example

```typescript
import type { ExecutionSessionEventPage } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "events": null,
  "cursor": null,
} satisfies ExecutionSessionEventPage

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ExecutionSessionEventPage
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


