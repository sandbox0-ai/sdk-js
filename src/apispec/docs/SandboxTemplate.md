
# SandboxTemplate


## Properties

Name | Type
------------ | -------------
`apiVersion` | string
`kind` | string
`metadata` | [ObjectMeta](ObjectMeta.md)
`spec` | [SandboxTemplateSpec](SandboxTemplateSpec.md)
`status` | [SandboxTemplateStatus](SandboxTemplateStatus.md)

## Example

```typescript
import type { SandboxTemplate } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "apiVersion": null,
  "kind": null,
  "metadata": null,
  "spec": null,
  "status": null,
} satisfies SandboxTemplate

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxTemplate
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


