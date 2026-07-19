
# SandboxResourceLimits


## Properties

Name | Type
------------ | -------------
`memory` | string
`ephemeralStorage` | string

## Example

```typescript
import type { SandboxResourceLimits } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "memory": null,
  "ephemeralStorage": null,
} satisfies SandboxResourceLimits

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxResourceLimits
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
