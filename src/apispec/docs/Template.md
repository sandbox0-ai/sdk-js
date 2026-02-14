
# Template


## Properties

Name | Type
------------ | -------------
`templateId` | string
`scope` | string
`teamId` | string
`userId` | string
`spec` | [SandboxTemplateSpec](SandboxTemplateSpec.md)
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { Template } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "templateId": null,
  "scope": null,
  "teamId": null,
  "userId": null,
  "spec": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies Template

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Template
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


