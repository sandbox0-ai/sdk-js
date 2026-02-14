
# Sandbox


## Properties

Name | Type
------------ | -------------
`id` | string
`templateId` | string
`teamId` | string
`userId` | string
`status` | string
`paused` | boolean
`autoResume` | boolean
`exposedPorts` | [Array&lt;ExposedPortConfig&gt;](ExposedPortConfig.md)
`podName` | string
`expiresAt` | Date
`claimedAt` | Date
`createdAt` | Date

## Example

```typescript
import type { Sandbox } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "templateId": null,
  "teamId": null,
  "userId": null,
  "status": null,
  "paused": null,
  "autoResume": null,
  "exposedPorts": null,
  "podName": null,
  "expiresAt": null,
  "claimedAt": null,
  "createdAt": null,
} satisfies Sandbox

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Sandbox
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


