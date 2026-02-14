
# CreateAPIKeyResponse


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`type` | string
`roles` | Array&lt;string&gt;
`teamId` | string
`key` | string
`expiresAt` | Date
`createdAt` | Date

## Example

```typescript
import type { CreateAPIKeyResponse } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "type": null,
  "roles": null,
  "teamId": null,
  "key": null,
  "expiresAt": null,
  "createdAt": null,
} satisfies CreateAPIKeyResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateAPIKeyResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


