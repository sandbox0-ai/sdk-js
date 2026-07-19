
# TeamQuotaStatus

Capacity rows expose durable committed and reserved usage. Concurrency rows expose live lease usage. Rate rows expose policy but not distributed Redis token balance, so committed, reserved, and used are zero and remaining is null.

## Properties

Name | Type
------------ | -------------
`teamId` | string
`key` | [TeamQuotaKey](TeamQuotaKey.md)
`kind` | [TeamQuotaKind](TeamQuotaKind.md)
`unit` | [TeamQuotaUnit](TeamQuotaUnit.md)
`source` | [TeamQuotaPolicySource](TeamQuotaPolicySource.md)
`policy` | [TeamQuotaPolicy](TeamQuotaPolicy.md)
`committed` | number
`reserved` | number
`used` | number
`remaining` | number

## Example

```typescript
import type { TeamQuotaStatus } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "teamId": null,
  "key": null,
  "kind": null,
  "unit": null,
  "source": null,
  "policy": null,
  "committed": null,
  "reserved": null,
  "used": null,
  "remaining": null,
} satisfies TeamQuotaStatus

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TeamQuotaStatus
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
