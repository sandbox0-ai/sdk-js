
# SSHPublicKey


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`publicKey` | string
`keyType` | string
`fingerprintSha256` | string
`comment` | string
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { SSHPublicKey } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "publicKey": null,
  "keyType": null,
  "fingerprintSha256": null,
  "comment": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies SSHPublicKey

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SSHPublicKey
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


