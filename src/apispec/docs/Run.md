
# Run


## Properties

Name | Type
------------ | -------------
`id` | string
`teamId` | string
`createdBy` | string
`name` | string
`slug` | string
`domainLabel` | string
`url` | string
`activeRevisionId` | string
`enabled` | boolean
`scale` | [RunScalePolicy](RunScalePolicy.md)
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { Run } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "teamId": null,
  "createdBy": null,
  "name": null,
  "slug": null,
  "domainLabel": null,
  "url": null,
  "activeRevisionId": null,
  "enabled": null,
  "scale": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies Run

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Run
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


