
# TemplateFromSandboxCreateRequest

Creates a template by capturing the current root filesystem of an existing sandbox.

## Properties

Name | Type
------------ | -------------
`templateId` | string
`sandboxId` | string
`specOverrides` | [TemplateFromSandboxSpecOverrides](TemplateFromSandboxSpecOverrides.md)

## Example

```typescript
import type { TemplateFromSandboxCreateRequest } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "templateId": null,
  "sandboxId": null,
  "specOverrides": null,
} satisfies TemplateFromSandboxCreateRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TemplateFromSandboxCreateRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


