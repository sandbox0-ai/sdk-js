
# EgressProxyPolicy

Customer-managed transparent egress proxy for allowed TCP traffic.

## Properties

Name | Type
------------ | -------------
`type` | [EgressProxyType](EgressProxyType.md)
`address` | string
`credentialRef` | string

## Example

```typescript
import type { EgressProxyPolicy } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "address": proxy.example.com:1080,
  "credentialRef": null,
} satisfies EgressProxyPolicy

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EgressProxyPolicy
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


