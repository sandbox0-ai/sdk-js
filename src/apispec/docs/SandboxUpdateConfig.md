
# SandboxUpdateConfig

Subset of SandboxConfig fields that can be updated at runtime without restarting the sandbox. Note: env_vars only affect new processes. webhook is not included as it requires restart. 

## Properties

Name | Type
------------ | -------------
`envVars` | { [key: string]: string; }
`ttl` | number
`hardTtl` | number
`network` | [SandboxNetworkPolicy](SandboxNetworkPolicy.md)
`autoResume` | boolean
`services` | [Array&lt;SandboxAppService&gt;](SandboxAppService.md)

## Example

```typescript
import type { SandboxUpdateConfig } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "envVars": null,
  "ttl": null,
  "hardTtl": null,
  "network": null,
  "autoResume": null,
  "services": null,
} satisfies SandboxUpdateConfig

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxUpdateConfig
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


