
# ClaimResponse


## Properties

Name | Type
------------ | -------------
`sandboxId` | string
`status` | string
`podName` | string
`template` | string
`clusterId` | string

## Example

```typescript
import type { ClaimResponse } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "sandboxId": null,
  "status": null,
  "podName": null,
  "template": null,
  "clusterId": null,
} satisfies ClaimResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ClaimResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


