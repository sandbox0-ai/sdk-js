
# FunctionDeployRequest


## Properties

Name | Type
------------ | -------------
`name` | string
`slug` | string
`scale` | [FunctionScalePolicy](FunctionScalePolicy.md)
`source` | [FunctionSource](FunctionSource.md)
`spec` | [FunctionRevisionSpec](FunctionRevisionSpec.md)
`activate` | boolean

## Example

```typescript
import type { FunctionDeployRequest } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "slug": null,
  "scale": null,
  "source": null,
  "spec": null,
  "activate": null,
} satisfies FunctionDeployRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FunctionDeployRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


