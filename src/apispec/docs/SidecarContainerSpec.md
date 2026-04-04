
# SidecarContainerSpec


## Properties

Name | Type
------------ | -------------
`name` | string
`image` | string
`command` | Array&lt;string&gt;
`args` | Array&lt;string&gt;
`env` | [Array&lt;EnvVar&gt;](EnvVar.md)
`resources` | [ResourceQuota](ResourceQuota.md)
`securityContext` | [SecurityContext](SecurityContext.md)
`readinessProbe` | [Probe](Probe.md)
`livenessProbe` | [Probe](Probe.md)
`startupProbe` | [Probe](Probe.md)

## Example

```typescript
import type { SidecarContainerSpec } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "image": null,
  "command": null,
  "args": null,
  "env": null,
  "resources": null,
  "securityContext": null,
  "readinessProbe": null,
  "livenessProbe": null,
  "startupProbe": null,
} satisfies SidecarContainerSpec

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SidecarContainerSpec
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


