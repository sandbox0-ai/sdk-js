
# SandboxStatus


## Properties

Name | Type
------------ | -------------
`sandboxId` | string
`templateId` | string
`teamId` | string
`userId` | string
`podName` | string
`status` | string
`claimedAt` | string
`expiresAt` | string
`createdAt` | string

## Example

```typescript
import type { SandboxStatus } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "sandboxId": null,
  "templateId": null,
  "teamId": null,
  "userId": null,
  "podName": null,
  "status": null,
  "claimedAt": null,
  "expiresAt": null,
  "createdAt": null,
} satisfies SandboxStatus

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxStatus
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


