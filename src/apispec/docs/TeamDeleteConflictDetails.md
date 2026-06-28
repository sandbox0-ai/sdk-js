
# TeamDeleteConflictDetails


## Properties

Name | Type
------------ | -------------
`teamId` | string
`blockingResources` | [Array&lt;TeamDeleteResourceCount&gt;](TeamDeleteResourceCount.md)
`retainedResources` | [Array&lt;TeamDeleteResourceCount&gt;](TeamDeleteResourceCount.md)
`retentionPolicy` | string

## Example

```typescript
import type { TeamDeleteConflictDetails } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "teamId": null,
  "blockingResources": null,
  "retainedResources": null,
  "retentionPolicy": null,
} satisfies TeamDeleteConflictDetails

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TeamDeleteConflictDetails
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


