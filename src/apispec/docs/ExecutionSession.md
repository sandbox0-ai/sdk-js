
# ExecutionSession


## Properties

Name | Type
------------ | -------------
`id` | string
`spec` | [ExecutionSessionSpec](ExecutionSessionSpec.md)
`specVersion` | number
`phase` | [ExecutionSessionPhase](ExecutionSessionPhase.md)
`runtimeGeneration` | number
`attempt` | [ExecutionSessionAttempt](ExecutionSessionAttempt.md)
`restartCount` | number
`cursor` | [ExecutionSessionEventCursor](ExecutionSessionEventCursor.md)
`createdAt` | Date
`updatedAt` | Date
`lastActivityAt` | Date

## Example

```typescript
import type { ExecutionSession } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "spec": null,
  "specVersion": null,
  "phase": null,
  "runtimeGeneration": null,
  "attempt": null,
  "restartCount": null,
  "cursor": null,
  "createdAt": null,
  "updatedAt": null,
  "lastActivityAt": null,
} satisfies ExecutionSession

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ExecutionSession
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


