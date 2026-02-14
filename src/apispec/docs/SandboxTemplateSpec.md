
# SandboxTemplateSpec


## Properties

Name | Type
------------ | -------------
`description` | string
`displayName` | string
`tags` | Array&lt;string&gt;
`mainContainer` | [ContainerSpec](ContainerSpec.md)
`sidecars` | [Array&lt;ContainerSpec&gt;](ContainerSpec.md)
`pod` | [PodSpecOverride](PodSpecOverride.md)
`network` | [TplSandboxNetworkPolicy](TplSandboxNetworkPolicy.md)
`pool` | [PoolStrategy](PoolStrategy.md)
`lifecycle` | [LifecyclePolicy](LifecyclePolicy.md)
`envVars` | { [key: string]: string; }
`_public` | boolean
`allowedTeams` | Array&lt;string&gt;
`runtimeClassName` | string
`clusterId` | string

## Example

```typescript
import type { SandboxTemplateSpec } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "description": null,
  "displayName": null,
  "tags": null,
  "mainContainer": null,
  "sidecars": null,
  "pod": null,
  "network": null,
  "pool": null,
  "lifecycle": null,
  "envVars": null,
  "_public": null,
  "allowedTeams": null,
  "runtimeClassName": null,
  "clusterId": null,
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


