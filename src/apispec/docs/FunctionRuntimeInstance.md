
# FunctionRuntimeInstance


## Properties

Name | Type
------------ | -------------
`id` | string
`teamId` | string
`functionId` | string
`revisionId` | string
`sandboxId` | string
`contextId` | string
`state` | [FunctionRuntimeInstanceState](FunctionRuntimeInstanceState.md)
`lastError` | string
`readyAt` | Date
`lastUsedAt` | Date
`drainingAt` | Date
`failedAt` | Date
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { FunctionRuntimeInstance } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "teamId": null,
  "functionId": null,
  "revisionId": null,
  "sandboxId": null,
  "contextId": null,
  "state": null,
  "lastError": null,
  "readyAt": null,
  "lastUsedAt": null,
  "drainingAt": null,
  "failedAt": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies FunctionRuntimeInstance

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FunctionRuntimeInstance
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


