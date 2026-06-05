
# SandboxFunctionSource

Function source code stored in sandbox service config.

## Properties

Name | Type
------------ | -------------
`type` | string
`code` | string

## Example

```typescript
import type { SandboxFunctionSource } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "code": null,
} satisfies SandboxFunctionSource

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxFunctionSource
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
