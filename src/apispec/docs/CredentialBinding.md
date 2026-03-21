
# CredentialBinding


## Properties

Name | Type
------------ | -------------
`ref` | string
`sourceRef` | string
`projection` | [ProjectionSpec](ProjectionSpec.md)
`cachePolicy` | [CachePolicySpec](CachePolicySpec.md)

## Example

```typescript
import type { CredentialBinding } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "ref": null,
  "sourceRef": null,
  "projection": null,
  "cachePolicy": null,
} satisfies CredentialBinding

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CredentialBinding
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


