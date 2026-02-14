
# FileWatchResponse


## Properties

Name | Type
------------ | -------------
`type` | string
`watchId` | string
`path` | string
`event` | string
`error` | string

## Example

```typescript
import type { FileWatchResponse } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "watchId": null,
  "path": null,
  "event": null,
  "error": null,
} satisfies FileWatchResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FileWatchResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


