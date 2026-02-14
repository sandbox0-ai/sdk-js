
# PodAffinity


## Properties

Name | Type
------------ | -------------
`requiredDuringSchedulingIgnoredDuringExecution` | [Array&lt;PodAffinityTerm&gt;](PodAffinityTerm.md)
`preferredDuringSchedulingIgnoredDuringExecution` | [Array&lt;WeightedPodAffinityTerm&gt;](WeightedPodAffinityTerm.md)

## Example

```typescript
import type { PodAffinity } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "requiredDuringSchedulingIgnoredDuringExecution": null,
  "preferredDuringSchedulingIgnoredDuringExecution": null,
} satisfies PodAffinity

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PodAffinity
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


