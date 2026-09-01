
# SandboxUpdateConfig

Durable lifecycle and service fields that can be updated without replacing the current runtime allocation. Network policy uses the dedicated network endpoint. Environment, resource, and webhook changes require a new runtime. 

## Properties

Name | Type
------------ | -------------
`ttl` | number
`hardTtl` | number
`autoResume` | boolean
`services` | [Array&lt;SandboxAppService&gt;](SandboxAppService.md)

## Example

```typescript
import type { SandboxUpdateConfig } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "ttl": null,
  "hardTtl": null,
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


