
# SandboxNetworkPolicy


## Properties

Name | Type
------------ | -------------
`mode` | string
`egress` | [NetworkEgressPolicy](NetworkEgressPolicy.md)
`credentialBindings` | [Array&lt;CredentialBinding&gt;](CredentialBinding.md)

## Example

```typescript
import type { SandboxNetworkPolicy } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "mode": null,
  "egress": null,
  "credentialBindings": null,
} satisfies SandboxNetworkPolicy

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxNetworkPolicy
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


