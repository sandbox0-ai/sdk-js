
# PodSpecOverride


## Properties

Name | Type
------------ | -------------
`nodeSelector` | { [key: string]: string; }
`affinity` | [Affinity](Affinity.md)
`tolerations` | [Array&lt;Toleration&gt;](Toleration.md)
`serviceAccountName` | string

## Example

```typescript
import type { PodSpecOverride } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "nodeSelector": null,
  "affinity": null,
  "tolerations": null,
  "serviceAccountName": null,
} satisfies PodSpecOverride

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PodSpecOverride
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


