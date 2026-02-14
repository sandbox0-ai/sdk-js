
# ContextResponse


## Properties

Name | Type
------------ | -------------
`id` | string
`type` | [ProcessType](ProcessType.md)
`language` | string
`cwd` | string
`envVars` | { [key: string]: string; }
`running` | boolean
`paused` | boolean
`createdAt` | string
`outputRaw` | string

## Example

```typescript
import type { ContextResponse } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "type": null,
  "language": null,
  "cwd": null,
  "envVars": null,
  "running": null,
  "paused": null,
  "createdAt": null,
  "outputRaw": null,
} satisfies ContextResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ContextResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


