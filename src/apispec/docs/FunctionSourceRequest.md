
# FunctionSourceRequest

Source used to create a function revision. Omitting type with sandbox_id and service_id keeps the sandbox-service shortcut shape; internally it is compiled into an immutable FunctionRevisionSpec.

## Properties

Name | Type
------------ | -------------
`type` | [FunctionRevisionInputSourceType](FunctionRevisionInputSourceType.md)
`sandboxId` | string
`serviceId` | string
`sandboxService` | [FunctionSandboxServiceSource](FunctionSandboxServiceSource.md)
`revisionSpec` | [FunctionRevisionSpec](FunctionRevisionSpec.md)
`provenance` | { [key: string]: any; }

## Example

```typescript
import type { FunctionSourceRequest } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "sandboxId": null,
  "serviceId": null,
  "sandboxService": null,
  "revisionSpec": null,
  "provenance": null,
} satisfies FunctionSourceRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FunctionSourceRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


