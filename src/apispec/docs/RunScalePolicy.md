
# RunScalePolicy

Scale-to-zero policy. Runs do not have a minimum idle instance count.

## Properties

Name | Type
------------ | -------------
`maxInstances` | number
`targetConcurrency` | number
`idleTimeoutSeconds` | number

## Example

```typescript
import type { RunScalePolicy } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "maxInstances": null,
  "targetConcurrency": null,
  "idleTimeoutSeconds": null,
} satisfies RunScalePolicy

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RunScalePolicy
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


