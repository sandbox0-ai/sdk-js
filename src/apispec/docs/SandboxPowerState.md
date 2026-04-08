
# SandboxPowerState


## Properties

Name | Type
------------ | -------------
`desired` | string
`desiredGeneration` | number
`observed` | string
`observedGeneration` | number
`phase` | string

## Example

```typescript
import type { SandboxPowerState } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "desired": null,
  "desiredGeneration": null,
  "observed": null,
  "observedGeneration": null,
  "phase": null,
} satisfies SandboxPowerState

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxPowerState
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


