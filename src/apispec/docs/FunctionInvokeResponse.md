
# FunctionInvokeResponse


## Properties

Name | Type
------------ | -------------
`status` | number
`headers` | { [key: string]: Array&lt;string&gt;; }
`bodyBase64` | string

## Example

```typescript
import type { FunctionInvokeResponse } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "status": null,
  "headers": null,
  "bodyBase64": null,
} satisfies FunctionInvokeResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FunctionInvokeResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


