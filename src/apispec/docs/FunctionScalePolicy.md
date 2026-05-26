
# FunctionScalePolicy

Scale-to-zero policy. Functions do not have a minimum idle instance count.

## Properties

Name | Type
------------ | -------------
`maxInstances` | number
`targetConcurrency` | number
`idleTimeoutSeconds` | number
`startupTimeoutSeconds` | number

## Example

```typescript
import type { FunctionScalePolicy } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "maxInstances": null,
  "targetConcurrency": null,
  "idleTimeoutSeconds": null,
  "startupTimeoutSeconds": null,
} satisfies FunctionScalePolicy

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FunctionScalePolicy
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


