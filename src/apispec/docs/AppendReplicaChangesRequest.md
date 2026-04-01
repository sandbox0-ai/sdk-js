
# AppendReplicaChangesRequest


## Properties

Name | Type
------------ | -------------
`requestId` | string
`baseSeq` | number
`changes` | [Array&lt;ChangeRequest&gt;](ChangeRequest.md)

## Example

```typescript
import type { AppendReplicaChangesRequest } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "requestId": null,
  "baseSeq": null,
  "changes": null,
} satisfies AppendReplicaChangesRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AppendReplicaChangesRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


