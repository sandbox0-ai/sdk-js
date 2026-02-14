
# LabelSelector


## Properties

Name | Type
------------ | -------------
`matchLabels` | { [key: string]: string; }
`matchExpressions` | [Array&lt;LabelSelectorRequirement&gt;](LabelSelectorRequirement.md)

## Example

```typescript
import type { LabelSelector } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "matchLabels": null,
  "matchExpressions": null,
} satisfies LabelSelector

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as LabelSelector
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


