
# FunctionRecord


## Properties

Name | Type
------------ | -------------
`id` | string
`teamId` | string
`name` | string
`slug` | string
`domainLabel` | string
`activeRevisionId` | string
`enabled` | boolean
`autoscaling` | [FunctionAutoscaling](FunctionAutoscaling.md)
`createdBy` | string
`createdAt` | Date
`updatedAt` | Date
`deletedAt` | Date
`host` | string
`url` | string

## Example

```typescript
import type { FunctionRecord } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "teamId": null,
  "name": null,
  "slug": null,
  "domainLabel": null,
  "activeRevisionId": null,
  "enabled": null,
  "autoscaling": null,
  "createdBy": null,
  "createdAt": null,
  "updatedAt": null,
  "deletedAt": null,
  "host": null,
  "url": null,
} satisfies FunctionRecord

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FunctionRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


