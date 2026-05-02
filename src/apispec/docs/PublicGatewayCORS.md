
# PublicGatewayCORS


## Properties

Name | Type
------------ | -------------
`allowedOrigins` | Array&lt;string&gt;
`allowedMethods` | Array&lt;string&gt;
`allowedHeaders` | Array&lt;string&gt;
`exposeHeaders` | Array&lt;string&gt;
`allowCredentials` | boolean
`maxAgeSeconds` | number

## Example

```typescript
import type { PublicGatewayCORS } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "allowedOrigins": null,
  "allowedMethods": null,
  "allowedHeaders": null,
  "exposeHeaders": null,
  "allowCredentials": null,
  "maxAgeSeconds": null,
} satisfies PublicGatewayCORS

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PublicGatewayCORS
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


