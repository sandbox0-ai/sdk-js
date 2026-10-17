
# SandboxRestartFinalCapture


## Properties

Name | Type
------------ | -------------
`operationId` | string
`sandboxId` | string
`fromRuntimeGeneration` | number
`state` | string
`captureId` | string
`stoppedAt` | Date
`receiptId` | string

## Example

```typescript
import type { SandboxRestartFinalCapture } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "operationId": null,
  "sandboxId": null,
  "fromRuntimeGeneration": null,
  "state": null,
  "captureId": null,
  "stoppedAt": null,
  "receiptId": null,
} satisfies SandboxRestartFinalCapture

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxRestartFinalCapture
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


