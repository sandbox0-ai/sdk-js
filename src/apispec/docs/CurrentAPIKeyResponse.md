
# CurrentAPIKeyResponse


## Properties

Name | Type
------------ | -------------
`id` | string
`teamId` | string
`createdBy` | string
`roles` | Array&lt;string&gt;
`permissions` | Array&lt;string&gt;
`isActive` | boolean
`expiresAt` | Date

## Example

```typescript
import type { CurrentAPIKeyResponse } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "teamId": null,
  "createdBy": null,
  "roles": null,
  "permissions": null,
  "isActive": null,
  "expiresAt": null,
} satisfies CurrentAPIKeyResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CurrentAPIKeyResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


