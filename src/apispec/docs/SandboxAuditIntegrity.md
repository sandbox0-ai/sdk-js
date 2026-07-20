
# SandboxAuditIntegrity


## Properties

Name | Type
------------ | -------------
`algorithm` | string
`payloadHash` | string
`signature` | string
`signingKeyId` | string
`signatureStatus` | string
`eventIdConflict` | boolean

## Example

```typescript
import type { SandboxAuditIntegrity } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "algorithm": null,
  "payloadHash": null,
  "signature": null,
  "signingKeyId": null,
  "signatureStatus": null,
  "eventIdConflict": null,
} satisfies SandboxAuditIntegrity

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxAuditIntegrity
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


