
# TeamQuotaList


## Properties

Name | Type
------------ | -------------
`teamId` | string
`quotas` | [Array&lt;TeamQuotaStatus&gt;](TeamQuotaStatus.md)

## Example

```typescript
import type { TeamQuotaList } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "teamId": null,
  "quotas": null,
} satisfies TeamQuotaList

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TeamQuotaList
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
