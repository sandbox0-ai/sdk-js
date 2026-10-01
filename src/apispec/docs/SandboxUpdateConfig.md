
# SandboxUpdateConfig

Durable lifecycle and service fields, or a standalone resources.memory change. Resource changes preserve the sandbox ID and durable files but restart processes through filesystem pause and a fresh CPU/memory lease. Paused sandboxes stay paused with the new next-start configuration; retained memory is discarded. Submit resources separately from lifecycle and service fields. The operation survives request timeout and manager restart. Retry the same limit after 503; an already-applied limit is a no-op. Network policy uses its dedicated endpoint. Environment and webhook changes require a new runtime.

## Properties

Name | Type
------------ | -------------
`resources` | [SandboxResourceConfig](SandboxResourceConfig.md)
`ttl` | number
`hardTtl` | number
`autoResume` | boolean
`services` | [Array&lt;SandboxAppService&gt;](SandboxAppService.md)

## Example

```typescript
import type { SandboxUpdateConfig } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "resources": null,
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


