
# UsageWindow


## Properties

Name | Type
------------ | -------------
`windowId` | string
`regionId` | string
`clusterId` | string
`windowType` | string
`subjectType` | string
`subjectId` | string
`sandboxId` | string
`windowStart` | Date
`windowEnd` | Date
`value` | number
`unit` | string
`recordedAt` | Date

## Example

```typescript
import type { UsageWindow } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "windowId": null,
  "regionId": null,
  "clusterId": null,
  "windowType": null,
  "subjectType": null,
  "subjectId": null,
  "sandboxId": null,
  "windowStart": null,
  "windowEnd": null,
  "value": null,
  "unit": null,
  "recordedAt": null,
} satisfies UsageWindow

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UsageWindow
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


