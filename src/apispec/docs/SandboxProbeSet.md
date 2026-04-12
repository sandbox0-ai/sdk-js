
# SandboxProbeSet


## Properties

Name | Type
------------ | -------------
`startup` | [SandboxProbeSpec](SandboxProbeSpec.md)
`readiness` | [SandboxProbeSpec](SandboxProbeSpec.md)
`liveness` | [SandboxProbeSpec](SandboxProbeSpec.md)

## Example

```typescript
import type { SandboxProbeSet } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "startup": null,
  "readiness": null,
  "liveness": null,
} satisfies SandboxProbeSet

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxProbeSet
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


