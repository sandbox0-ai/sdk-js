
# TeamQuota


## Properties

Name | Type
------------ | -------------
`teamId` | string
`dimension` | [QuotaDimension](QuotaDimension.md)
`kind` | string
`limitValue` | number
`intervalMs` | number
`burstValue` | number
`current` | number
`remaining` | number
`unlimited` | boolean
`unit` | string
`source` | string

## Example

```typescript
import type { TeamQuota } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "teamId": null,
  "dimension": null,
  "kind": null,
  "limitValue": null,
  "intervalMs": null,
  "burstValue": null,
  "current": null,
  "remaining": null,
  "unlimited": null,
  "unit": null,
  "source": null,
} satisfies TeamQuota

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TeamQuota
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


