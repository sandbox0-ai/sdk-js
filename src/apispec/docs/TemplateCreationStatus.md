
# TemplateCreationStatus

Asynchronous creation status for templates built from a sandbox. Traditional image-based templates omit this object and are ready immediately after creation. Ready means the regional template source has been committed and the claim API may consume it. 

## Properties

Name | Type
------------ | -------------
`state` | string
`stage` | string
`startedAt` | Date
`capturedAt` | Date
`completedAt` | Date
`reason` | string
`message` | string

## Example

```typescript
import type { TemplateCreationStatus } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "state": null,
  "stage": null,
  "startedAt": null,
  "capturedAt": null,
  "completedAt": null,
  "reason": null,
  "message": null,
} satisfies TemplateCreationStatus

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TemplateCreationStatus
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


