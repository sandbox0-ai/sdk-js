
# SandboxLogs


## Properties

Name | Type
------------ | -------------
`sandboxId` | string
`podName` | string
`container` | string
`previous` | boolean
`logs` | string

## Example

```typescript
import type { SandboxLogs } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "sandboxId": null,
  "podName": null,
  "container": null,
  "previous": null,
  "logs": null,
} satisfies SandboxLogs

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxLogs
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


