
# FunctionRevision


## Properties

Name | Type
------------ | -------------
`id` | string
`functionId` | string
`teamId` | string
`revisionNumber` | number
`sourceSandboxId` | string
`sourceServiceId` | string
`sourceTemplateId` | string
`restoreMounts` | [Array&lt;FunctionRestoreMount&gt;](FunctionRestoreMount.md)
`serviceSnapshot` | [SandboxAppService](SandboxAppService.md)
`runtimeSandboxId` | string
`runtimeContextId` | string
`runtimeUpdatedAt` | Date
`createdBy` | string
`createdAt` | Date

## Example

```typescript
import type { FunctionRevision } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "functionId": null,
  "teamId": null,
  "revisionNumber": null,
  "sourceSandboxId": null,
  "sourceServiceId": null,
  "sourceTemplateId": null,
  "restoreMounts": null,
  "serviceSnapshot": null,
  "runtimeSandboxId": null,
  "runtimeContextId": null,
  "runtimeUpdatedAt": null,
  "createdBy": null,
  "createdAt": null,
} satisfies FunctionRevision

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FunctionRevision
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


