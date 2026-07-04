
# SandboxObservabilityMetricSample


## Properties

Name | Type
------------ | -------------
`teamId` | string
`sandboxId` | string
`regionId` | string
`clusterId` | string
`contextId` | string
`occurredAt` | Date
`ingestedAt` | Date
`name` | string
`unit` | string
`value` | number
`cursor` | string
`attributes` | { [key: string]: any; }

## Example

```typescript
import type { SandboxObservabilityMetricSample } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "teamId": null,
  "sandboxId": null,
  "regionId": null,
  "clusterId": null,
  "contextId": null,
  "occurredAt": null,
  "ingestedAt": null,
  "name": null,
  "unit": null,
  "value": null,
  "cursor": null,
  "attributes": null,
} satisfies SandboxObservabilityMetricSample

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxObservabilityMetricSample
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


