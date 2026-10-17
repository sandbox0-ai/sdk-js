
# SandboxMemoryRestorationStep


## Properties

Name | Type
------------ | -------------
`operationId` | string
`captureOperationId` | string
`fromRuntimeGeneration` | number
`toRuntimeGeneration` | number
`restoreId` | string
`managedFilesSizeBytes` | number

## Example

```typescript
import type { SandboxMemoryRestorationStep } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "operationId": null,
  "captureOperationId": null,
  "fromRuntimeGeneration": null,
  "toRuntimeGeneration": null,
  "restoreId": null,
  "managedFilesSizeBytes": null,
} satisfies SandboxMemoryRestorationStep

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxMemoryRestorationStep
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


