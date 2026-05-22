
# FunctionRevisionSpec

Immutable execution contract used by Function Gateway to serve a revision.

## Properties

Name | Type
------------ | -------------
`templateId` | string
`runtimeService` | [SandboxAppService](SandboxAppService.md)
`mounts` | [Array&lt;FunctionRevisionMount&gt;](FunctionRevisionMount.md)
`staticAssets` | [Array&lt;FunctionStaticAsset&gt;](FunctionStaticAsset.md)
`envRefs` | [Array&lt;FunctionEnvRef&gt;](FunctionEnvRef.md)

## Example

```typescript
import type { FunctionRevisionSpec } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "templateId": null,
  "runtimeService": null,
  "mounts": null,
  "staticAssets": null,
  "envRefs": null,
} satisfies FunctionRevisionSpec

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FunctionRevisionSpec
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


