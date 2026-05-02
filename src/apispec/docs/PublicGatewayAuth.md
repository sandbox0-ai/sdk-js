
# PublicGatewayAuth


## Properties

Name | Type
------------ | -------------
`mode` | string
`bearerTokenSha256` | string
`headerName` | string
`headerValueSha256` | string

## Example

```typescript
import type { PublicGatewayAuth } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "mode": null,
  "bearerTokenSha256": null,
  "headerName": null,
  "headerValueSha256": null,
} satisfies PublicGatewayAuth

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PublicGatewayAuth
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


