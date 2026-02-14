
# SandboxConfig


## Properties

Name | Type
------------ | -------------
`envVars` | { [key: string]: string; }
`ttl` | number
`hardTtl` | number
`network` | [TplSandboxNetworkPolicy](TplSandboxNetworkPolicy.md)
`webhook` | [WebhookConfig](WebhookConfig.md)
`autoResume` | boolean
`exposedPorts` | [Array&lt;ExposedPortConfig&gt;](ExposedPortConfig.md)

## Example

```typescript
import type { SandboxConfig } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "envVars": null,
  "ttl": null,
  "hardTtl": null,
  "network": null,
  "webhook": null,
  "autoResume": null,
  "exposedPorts": null,
} satisfies SandboxConfig

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxConfig
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


