
# SuccessExposedPortsResponseAllOfData


## Properties

Name | Type
------------ | -------------
`sandboxId` | string
`exposedPorts` | [Array&lt;ExposedPortConfig&gt;](ExposedPortConfig.md)
`exposureDomain` | string

## Example

```typescript
import type { SuccessExposedPortsResponseAllOfData } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "sandboxId": null,
  "exposedPorts": null,
  "exposureDomain": null,
} satisfies SuccessExposedPortsResponseAllOfData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SuccessExposedPortsResponseAllOfData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


