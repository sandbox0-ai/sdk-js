
# ResumeSandboxResponse


## Properties

Name | Type
------------ | -------------
`sandboxId` | string
`resumed` | boolean
`restoredMemory` | string

## Example

```typescript
import type { ResumeSandboxResponse } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "sandboxId": null,
  "resumed": null,
  "restoredMemory": null,
} satisfies ResumeSandboxResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ResumeSandboxResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


