
# Affinity


## Properties

Name | Type
------------ | -------------
`nodeAffinity` | [NodeAffinity](NodeAffinity.md)
`podAffinity` | [PodAffinity](PodAffinity.md)

## Example

```typescript
import type { Affinity } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "nodeAffinity": null,
  "podAffinity": null,
} satisfies Affinity

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Affinity
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


