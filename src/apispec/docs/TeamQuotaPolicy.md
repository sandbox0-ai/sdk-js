
# TeamQuotaPolicy

Capacity and concurrency policies use limit. Rate policies use tokens, interval_ms, and burst.

## Properties

Name | Type
------------ | -------------
`teamId` | string
`key` | [TeamQuotaKey](TeamQuotaKey.md)
`kind` | [TeamQuotaKind](TeamQuotaKind.md)
`unit` | [TeamQuotaUnit](TeamQuotaUnit.md)
`revision` | number
`limit` | number
`tokens` | number
`intervalMs` | number
`burst` | number

## Example

```typescript
import type { TeamQuotaPolicy } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "teamId": null,
  "key": null,
  "kind": null,
  "unit": null,
  "revision": null,
  "limit": null,
  "tokens": null,
  "intervalMs": null,
  "burst": null,
} satisfies TeamQuotaPolicy

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TeamQuotaPolicy
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
