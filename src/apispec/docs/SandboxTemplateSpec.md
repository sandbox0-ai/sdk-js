
# SandboxTemplateSpec


## Properties

Name | Type
------------ | -------------
`description` | string
`displayName` | string
`tags` | Array&lt;string&gt;
`mainContainer` | [ContainerSpec](ContainerSpec.md)
`ephemeralMounts` | [Array&lt;EphemeralMountSpec&gt;](EphemeralMountSpec.md)
`network` | [SandboxNetworkPolicy](SandboxNetworkPolicy.md)
`envVars` | { [key: string]: string; }

## Example

```typescript
import type { SandboxTemplateSpec } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "description": null,
  "displayName": null,
  "tags": null,
  "mainContainer": null,
  "ephemeralMounts": null,
  "network": null,
  "envVars": null,
} satisfies SandboxTemplateSpec

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxTemplateSpec
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


