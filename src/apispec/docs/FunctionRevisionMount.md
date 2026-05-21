
# FunctionRevisionMount


## Properties

Name | Type
------------ | -------------
`name` | string
`mountPoint` | string
`mode` | string
`materialization` | string
`source` | [FunctionRevisionMountSource](FunctionRevisionMountSource.md)

## Example

```typescript
import type { FunctionRevisionMount } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "mountPoint": null,
  "mode": null,
  "materialization": null,
  "source": null,
} satisfies FunctionRevisionMount

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FunctionRevisionMount
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


