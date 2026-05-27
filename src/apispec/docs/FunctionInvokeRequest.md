
# FunctionInvokeRequest


## Properties

Name | Type
------------ | -------------
`method` | string
`path` | string
`query` | { [key: string]: Array&lt;string&gt;; }
`headers` | { [key: string]: Array&lt;string&gt;; }
`bodyBase64` | string
`handler` | string
`timeoutMs` | number

## Example

```typescript
import type { FunctionInvokeRequest } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "method": null,
  "path": null,
  "query": null,
  "headers": null,
  "bodyBase64": null,
  "handler": null,
  "timeoutMs": null,
} satisfies FunctionInvokeRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FunctionInvokeRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


