
# ProjectionSpec


## Properties

Name | Type
------------ | -------------
`type` | [CredentialProjectionType](CredentialProjectionType.md)
`httpHeaders` | [HTTPHeadersProjection](HTTPHeadersProjection.md)
`tlsClientCertificate` | object
`usernamePassword` | object

## Example

```typescript
import type { ProjectionSpec } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "httpHeaders": null,
  "tlsClientCertificate": null,
  "usernamePassword": null,
} satisfies ProjectionSpec

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ProjectionSpec
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


