
# UnmountRequest


## Properties

Name | Type
------------ | -------------
`sandboxvolumeId` | string
`mountSessionId` | string

## Example

```typescript
import type { UnmountRequest } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "sandboxvolumeId": null,
  "mountSessionId": null,
} satisfies UnmountRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UnmountRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


