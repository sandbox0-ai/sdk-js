
# TeamQuotaPolicyWriteRequest

Capacity and concurrency policies require limit and prohibit rate fields. Rate policies require tokens, interval_ms, and burst and prohibit limit. Rate intervals are whole milliseconds in the inclusive range from 1ms to 1h. The runtime additionally requires burst to be at least tokens and kind to match the canonical kind of the path key because OpenAPI 3.0 cannot express those cross-field and path/body comparisons.

## Properties

Name | Type
------------ | -------------
`kind` | string
`limit` | number
`tokens` | number
`intervalMs` | number
`burst` | number

## Example

```typescript
import type { TeamQuotaPolicyWriteRequest } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "kind": null,
  "limit": null,
  "tokens": null,
  "intervalMs": null,
  "burst": null,
} satisfies TeamQuotaPolicyWriteRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TeamQuotaPolicyWriteRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
