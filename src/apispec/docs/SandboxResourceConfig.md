
# SandboxResourceConfig

Instance-level sandbox resource override. Sandbox0 exposes memory only and derives CPU from the platform memory-per-CPU ratio.

## Properties

Name | Type
------------ | -------------
`memory` | string

## Example

```typescript
import type { SandboxResourceConfig } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "memory": null,
} satisfies SandboxResourceConfig

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxResourceConfig
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


