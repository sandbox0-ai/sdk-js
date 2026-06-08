
# SandboxSummary


## Properties

Name | Type
------------ | -------------
`id` | string
`templateId` | string
`status` | [SandboxLifecycleStatus](SandboxLifecycleStatus.md)
`paused` | boolean
`runtimeGeneration` | number
`clusterId` | string
`createdAt` | Date
`expiresAt` | Date
`hardExpiresAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { SandboxSummary } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "templateId": null,
  "status": null,
  "paused": null,
  "runtimeGeneration": null,
  "clusterId": null,
  "createdAt": null,
  "expiresAt": null,
  "hardExpiresAt": null,
  "updatedAt": null,
} satisfies SandboxSummary

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxSummary
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


