
# ObservabilityLogRecord


## Properties

Name | Type
------------ | -------------
`timestamp` | string
`traceId` | string
`spanId` | string
`severityText` | string
`severityNumber` | number
`body` | string
`resourceAttributes` | { [key: string]: string; }
`attributes` | { [key: string]: string; }

## Example

```typescript
import type { ObservabilityLogRecord } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "timestamp": null,
  "traceId": null,
  "spanId": null,
  "severityText": null,
  "severityNumber": null,
  "body": null,
  "resourceAttributes": null,
  "attributes": null,
} satisfies ObservabilityLogRecord

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ObservabilityLogRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


