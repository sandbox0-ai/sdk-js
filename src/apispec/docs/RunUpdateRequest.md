
# RunUpdateRequest


## Properties

Name | Type
------------ | -------------
`name` | string
`enabled` | boolean
`scale` | [RunScalePolicy](RunScalePolicy.md)

## Example

```typescript
import type { RunUpdateRequest } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "enabled": null,
  "scale": null,
} satisfies RunUpdateRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RunUpdateRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


