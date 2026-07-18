
# TemplateCreationStatus

Asynchronous creation status for templates built from a sandbox. Traditional image-based templates omit this object and are ready immediately after creation. Ready means the template is visible in at least one data-plane cluster and the claim API accepts it; when the pool is zero, it does not imply that a sandbox image has already been pulled. 

## Properties

Name | Type
------------ | -------------
`state` | string
`stage` | string
`startedAt` | Date
`capturedAt` | Date
`completedAt` | Date
`outputImage` | string
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
  "outputImage": null,
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


