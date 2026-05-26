
# RunRevision


## Properties

Name | Type
------------ | -------------
`id` | string
`runId` | string
`teamId` | string
`number` | number
`source` | [RunSource](RunSource.md)
`spec` | [RunRevisionSpec](RunRevisionSpec.md)
`status` | [RunRevisionStatus](RunRevisionStatus.md)
`runtimeSandboxId` | string
`runtimeClusterId` | string
`runtimeContextId` | string
`createdAt` | Date
`activatedAt` | Date

## Example

```typescript
import type { RunRevision } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "runId": null,
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
} satisfies RunRevision

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RunRevision
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


