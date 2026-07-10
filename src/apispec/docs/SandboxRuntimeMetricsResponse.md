
# SandboxRuntimeMetricsResponse


## Properties

Name | Type
------------ | -------------
`startTime` | Date
`endTime` | Date
`stepSeconds` | number
`series` | [Array&lt;SandboxRuntimeMetricSeries&gt;](SandboxRuntimeMetricSeries.md)
`freshness` | [SandboxRuntimeMetricFreshness](SandboxRuntimeMetricFreshness.md)
`gaps` | [Array&lt;SandboxRuntimeMetricGap&gt;](SandboxRuntimeMetricGap.md)
`partial` | boolean

## Example

```typescript
import type { SandboxRuntimeMetricsResponse } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "startTime": null,
  "endTime": null,
  "stepSeconds": null,
  "series": null,
  "freshness": null,
  "gaps": null,
  "partial": null,
} satisfies SandboxRuntimeMetricsResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxRuntimeMetricsResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


