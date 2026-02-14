
# CreateREPLContextRequest


## Properties

Name | Type
------------ | -------------
`language` | string
`input` | string
`replConfig` | [REPLConfig](REPLConfig.md)

## Example

```typescript
import type { CreateREPLContextRequest } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "language": null,
  "input": null,
  "replConfig": null,
} satisfies CreateREPLContextRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateREPLContextRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


