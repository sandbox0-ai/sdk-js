
# SandboxTemplateCondition


## Properties

Name | Type
------------ | -------------
`type` | string
`status` | string
`lastTransitionTime` | Date
`reason` | string
`message` | string

## Example

```typescript
import type { SandboxTemplateCondition } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "status": null,
  "lastTransitionTime": null,
  "reason": null,
  "message": null,
} satisfies SandboxTemplateCondition

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxTemplateCondition
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


