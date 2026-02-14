
# SandboxTemplateStatus


## Properties

Name | Type
------------ | -------------
`idleCount` | number
`activeCount` | number
`conditions` | [Array&lt;SandboxTemplateCondition&gt;](SandboxTemplateCondition.md)
`lastUpdateTime` | Date

## Example

```typescript
import type { SandboxTemplateStatus } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "idleCount": null,
  "activeCount": null,
  "conditions": null,
  "lastUpdateTime": null,
} satisfies SandboxTemplateStatus

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxTemplateStatus
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


