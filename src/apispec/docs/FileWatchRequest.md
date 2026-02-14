
# FileWatchRequest


## Properties

Name | Type
------------ | -------------
`action` | string
`path` | string
`recursive` | boolean
`watchId` | string

## Example

```typescript
import type { FileWatchRequest } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "action": null,
  "path": null,
  "recursive": null,
  "watchId": null,
} satisfies FileWatchRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FileWatchRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


