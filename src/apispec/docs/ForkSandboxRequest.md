
# ForkSandboxRequest

Optional fork overrides. Omit config to inherit the source sandbox configuration. The source sandbox may be running or paused; running sources are checkpointed before the paused child sandbox is created. 

## Properties

Name | Type
------------ | -------------
`config` | [ForkSandboxConfig](ForkSandboxConfig.md)

## Example

```typescript
import type { ForkSandboxRequest } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "config": null,
} satisfies ForkSandboxRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ForkSandboxRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


