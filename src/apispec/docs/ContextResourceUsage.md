
# ContextResourceUsage


## Properties

Name | Type
------------ | -------------
`contextId` | string
`type` | string
`language` | string
`running` | boolean
`paused` | boolean
`usage` | [ResourceUsage](ResourceUsage.md)

## Example

```typescript
import type { ContextResourceUsage } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "contextId": null,
  "type": null,
  "language": null,
  "running": null,
  "paused": null,
  "usage": null,
} satisfies ContextResourceUsage

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ContextResourceUsage
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


