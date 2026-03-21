
# CredentialSourceWriteSpec


## Properties

Name | Type
------------ | -------------
`staticHeaders` | [StaticHeadersSourceSpec](StaticHeadersSourceSpec.md)
`staticTLSClientCertificate` | [StaticTLSClientCertificateSourceSpec](StaticTLSClientCertificateSourceSpec.md)
`staticUsernamePassword` | [StaticUsernamePasswordSourceSpec](StaticUsernamePasswordSourceSpec.md)

## Example

```typescript
import type { CredentialSourceWriteSpec } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "staticHeaders": null,
  "staticTLSClientCertificate": null,
  "staticUsernamePassword": null,
} satisfies CredentialSourceWriteSpec

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CredentialSourceWriteSpec
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


