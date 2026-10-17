
# ManagedFileReadResponse


## Properties

Name | Type
------------ | -------------
`runtimeGeneration` | number
`mutationSequence` | string
`sizeBytes` | number
`guestPath` | string
`content` | string

## Example

```typescript
import type { ManagedFileReadResponse } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "runtimeGeneration": null,
  "mutationSequence": null,
  "sizeBytes": null,
  "guestPath": null,
  "content": null,
} satisfies ManagedFileReadResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ManagedFileReadResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


