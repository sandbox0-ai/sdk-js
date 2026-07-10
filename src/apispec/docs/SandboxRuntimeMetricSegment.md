
# SandboxRuntimeMetricSegment

A continuous series segment. Runtime restarts and collector counter resets start a new segment without exposing internal topology identifiers.

## Properties

Name | Type
------------ | -------------
`points` | [Array&lt;SandboxRuntimeMetricPoint&gt;](SandboxRuntimeMetricPoint.md)

## Example

```typescript
import type { SandboxRuntimeMetricSegment } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "points": null,
} satisfies SandboxRuntimeMetricSegment

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxRuntimeMetricSegment
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


