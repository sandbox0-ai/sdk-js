
# SandboxRuntimeMetricGap


## Properties

Name | Type
------------ | -------------
`metric` | [SandboxRuntimeMetricName](SandboxRuntimeMetricName.md)
`dimensions` | { [key: string]: string; }
`startTime` | Date
`endTime` | Date
`reason` | [SandboxRuntimeMetricGapReason](SandboxRuntimeMetricGapReason.md)

## Example

```typescript
import type { SandboxRuntimeMetricGap } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "metric": null,
  "dimensions": null,
  "startTime": null,
  "endTime": null,
  "reason": null,
} satisfies SandboxRuntimeMetricGap

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxRuntimeMetricGap
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


