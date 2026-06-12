
# HTTPMethodPolicy

HTTP method allow and deny lists.

## Properties

Name | Type
------------ | -------------
`allowed` | Array&lt;string&gt;
`denied` | Array&lt;string&gt;

## Example

```typescript
import type { HTTPMethodPolicy } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "allowed": null,
  "denied": null,
} satisfies HTTPMethodPolicy

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as HTTPMethodPolicy
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


