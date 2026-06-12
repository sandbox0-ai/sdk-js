
# HTTPProtocolRule

HTTP request operation policy.

## Properties

Name | Type
------------ | -------------
`methods` | [HTTPMethodPolicy](HTTPMethodPolicy.md)
`paths` | [HTTPPathPolicy](HTTPPathPolicy.md)

## Example

```typescript
import type { HTTPProtocolRule } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "methods": null,
  "paths": null,
} satisfies HTTPProtocolRule

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as HTTPProtocolRule
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


