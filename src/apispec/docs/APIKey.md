
# APIKey


## Properties

Name | Type
------------ | -------------
`id` | string
`keyValue` | string
`teamId` | string
`userId` | string
`createdBy` | string
`name` | string
`type` | string
`roles` | Array&lt;string&gt;
`isActive` | boolean
`expiresAt` | Date
`lastUsedAt` | Date
`usageCount` | number
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { APIKey } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "keyValue": null,
  "teamId": null,
  "userId": null,
  "createdBy": null,
  "name": null,
  "type": null,
  "roles": null,
  "isActive": null,
  "expiresAt": null,
  "lastUsedAt": null,
  "usageCount": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies APIKey

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as APIKey
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


