
# SandboxRuntimeMetricDescriptor


## Properties

Name | Type
------------ | -------------
`name` | [SandboxRuntimeMetricName](SandboxRuntimeMetricName.md)
`kind` | [SandboxRuntimeMetricKind](SandboxRuntimeMetricKind.md)
`unit` | [SandboxRuntimeMetricUnit](SandboxRuntimeMetricUnit.md)
`dimensions` | Array&lt;string&gt;
`description` | string

## Example

```typescript
import type { SandboxRuntimeMetricDescriptor } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "kind": null,
  "unit": null,
  "dimensions": null,
  "description": null,
} satisfies SandboxRuntimeMetricDescriptor

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxRuntimeMetricDescriptor
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


