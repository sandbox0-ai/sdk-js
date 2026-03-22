
# CredentialSourceMetadata


## Properties

Name | Type
------------ | -------------
`name` | string
`resolverKind` | [CredentialSourceResolverKind](CredentialSourceResolverKind.md)
`currentVersion` | number
`status` | string
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { CredentialSourceMetadata } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "resolverKind": null,
  "currentVersion": null,
  "status": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies CredentialSourceMetadata

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CredentialSourceMetadata
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


