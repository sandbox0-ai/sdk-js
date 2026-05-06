
# ObservabilityTraceSpan


## Properties

Name | Type
------------ | -------------
`timestamp` | string
`traceId` | string
`spanId` | string
`parentSpanId` | string
`serviceName` | string
`name` | string
`kind` | string
`durationNano` | number
`statusCode` | string
`statusMessage` | string
`resourceAttributes` | { [key: string]: string; }
`attributes` | { [key: string]: string; }

## Example

```typescript
import type { ObservabilityTraceSpan } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "timestamp": null,
  "traceId": null,
  "spanId": null,
  "parentSpanId": null,
  "serviceName": null,
  "name": null,
  "kind": null,
  "durationNano": null,
  "statusCode": null,
  "statusMessage": null,
  "resourceAttributes": null,
  "attributes": null,
} satisfies ObservabilityTraceSpan

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ObservabilityTraceSpan
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


