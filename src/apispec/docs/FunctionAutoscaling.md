
# FunctionAutoscaling

Function runtime pool autoscaling settings. target_concurrency is a soft routing and scale-out signal; it is not a strong distributed per-instance concurrency semaphore.

## Properties

Name | Type
------------ | -------------
`minWarm` | number
`maxActive` | number
`targetConcurrency` | number
`scaleDownAfterSeconds` | number

## Example

```typescript
import type { FunctionAutoscaling } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "minWarm": null,
  "maxActive": null,
  "targetConcurrency": null,
  "scaleDownAfterSeconds": null,
} satisfies FunctionAutoscaling

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FunctionAutoscaling
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


