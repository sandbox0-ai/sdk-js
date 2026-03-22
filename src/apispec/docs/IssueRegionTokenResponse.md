
# IssueRegionTokenResponse


## Properties

Name | Type
------------ | -------------
`regionId` | string
`regionalGatewayUrl` | string
`token` | string
`expiresAt` | number

## Example

```typescript
import type { IssueRegionTokenResponse } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "regionId": null,
  "regionalGatewayUrl": null,
  "token": null,
  "expiresAt": null,
} satisfies IssueRegionTokenResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as IssueRegionTokenResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


