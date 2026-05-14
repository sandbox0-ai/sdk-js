
# SandboxAppServiceRoute


## Properties

Name | Type
------------ | -------------
`id` | string
`pathPrefix` | string
`methods` | Array&lt;string&gt;
`rewritePrefix` | string
`auth` | [PublicGatewayAuth](PublicGatewayAuth.md)
`cors` | [PublicGatewayCORS](PublicGatewayCORS.md)
`rateLimit` | [PublicGatewayRateLimit](PublicGatewayRateLimit.md)
`timeoutSeconds` | number
`resume` | boolean

## Example

```typescript
import type { SandboxAppServiceRoute } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "pathPrefix": null,
  "methods": null,
  "rewritePrefix": null,
  "auth": null,
  "cors": null,
  "rateLimit": null,
  "timeoutSeconds": null,
  "resume": null,
} satisfies SandboxAppServiceRoute

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxAppServiceRoute
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


