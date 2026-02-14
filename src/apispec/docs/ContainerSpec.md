
# ContainerSpec


## Properties

Name | Type
------------ | -------------
`image` | string
`imagePullPolicy` | string
`env` | [Array&lt;EnvVar&gt;](EnvVar.md)
`resources` | [ResourceQuota](ResourceQuota.md)
`securityContext` | [SecurityContext](SecurityContext.md)

## Example

```typescript
import type { ContainerSpec } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "image": null,
  "imagePullPolicy": null,
  "env": null,
  "resources": null,
  "securityContext": null,
} satisfies ContainerSpec

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ContainerSpec
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


