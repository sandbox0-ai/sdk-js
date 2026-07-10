
# SandboxRuntimeMetricSeries


## Properties

Name | Type
------------ | -------------
`metric` | [SandboxRuntimeMetricName](SandboxRuntimeMetricName.md)
`kind` | [SandboxRuntimeMetricKind](SandboxRuntimeMetricKind.md)
`unit` | [SandboxRuntimeMetricUnit](SandboxRuntimeMetricUnit.md)
`statistic` | [SandboxRuntimeMetricStatistic](SandboxRuntimeMetricStatistic.md)
`dimensions` | { [key: string]: string; }
`segments` | [Array&lt;SandboxRuntimeMetricSegment&gt;](SandboxRuntimeMetricSegment.md)

## Example

```typescript
import type { SandboxRuntimeMetricSeries } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "metric": null,
  "kind": null,
  "unit": null,
  "statistic": null,
  "dimensions": null,
  "segments": null,
} satisfies SandboxRuntimeMetricSeries

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxRuntimeMetricSeries
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


