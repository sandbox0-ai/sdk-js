
# StaticSSHPrivateKeySourceSpec


## Properties

Name | Type
------------ | -------------
`privateKeyPem` | string
`passphrase` | string

## Example

```typescript
import type { StaticSSHPrivateKeySourceSpec } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "privateKeyPem": null,
  "passphrase": null,
} satisfies StaticSSHPrivateKeySourceSpec

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as StaticSSHPrivateKeySourceSpec
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


