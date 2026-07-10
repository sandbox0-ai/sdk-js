
# SandboxRuntimeMetricFreshness

Freshness is measured relative to the requested end_time, including for historical queries.

## Properties

Name | Type
------------ | -------------
`newestObservedAt` | Date
`ageSeconds` | number
`status` | [SandboxRuntimeMetricFreshnessStatus](SandboxRuntimeMetricFreshnessStatus.md)

## Example

```typescript
import type { SandboxRuntimeMetricFreshness } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "newestObservedAt": null,
  "ageSeconds": null,
  "status": null,
} satisfies SandboxRuntimeMetricFreshness

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxRuntimeMetricFreshness
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


