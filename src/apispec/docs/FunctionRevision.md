
# FunctionRevision


## Properties

Name | Type
------------ | -------------
`id` | string
`functionId` | string
`teamId` | string
`number` | number
`source` | [FunctionSource](FunctionSource.md)
`spec` | [FunctionRevisionSpec](FunctionRevisionSpec.md)
`status` | [FunctionRevisionStatus](FunctionRevisionStatus.md)
`runtimeSandboxId` | string
`runtimeClusterId` | string
`runtimeContextId` | string
`createdAt` | Date
`activatedAt` | Date

## Example

```typescript
import type { FunctionRevision } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "functionId": null,
  "teamId": null,
  "number": null,
  "source": null,
  "spec": null,
  "status": null,
  "runtimeSandboxId": null,
  "runtimeClusterId": null,
  "runtimeContextId": null,
  "createdAt": null,
  "activatedAt": null,
} satisfies FunctionRevision

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FunctionRevision
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


