
# SuccessSandboxListResponseAllOfData


## Properties

Name | Type
------------ | -------------
`sandboxes` | [Array&lt;SandboxSummary&gt;](SandboxSummary.md)
`count` | number
`hasMore` | boolean

## Example

```typescript
import type { SuccessSandboxListResponseAllOfData } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "sandboxes": null,
  "count": null,
  "hasMore": null,
} satisfies SuccessSandboxListResponseAllOfData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SuccessSandboxListResponseAllOfData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


