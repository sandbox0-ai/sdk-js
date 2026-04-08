
# PauseSandboxResponse


## Properties

Name | Type
------------ | -------------
`sandboxId` | string
`paused` | boolean
`powerState` | [SandboxPowerState](SandboxPowerState.md)
`resourceUsage` | [SandboxResourceUsage](SandboxResourceUsage.md)
`updatedMemory` | string
`updatedCpu` | string

## Example

```typescript
import type { PauseSandboxResponse } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "sandboxId": null,
  "paused": null,
  "powerState": null,
  "resourceUsage": null,
  "updatedMemory": null,
  "updatedCpu": null,
} satisfies PauseSandboxResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PauseSandboxResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


