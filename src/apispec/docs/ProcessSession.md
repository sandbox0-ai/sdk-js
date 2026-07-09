
# ProcessSession


## Properties

Name | Type
------------ | -------------
`id` | string
`alias` | string
`command` | Array&lt;string&gt;
`cwd` | string
`envVars` | { [key: string]: string; }
`state` | [ProcessSessionState](ProcessSessionState.md)
`pid` | number
`createdAt` | Date
`startedAt` | Date
`exitedAt` | Date
`exitCode` | number
`channels` | [Array&lt;ProcessChannelSpec&gt;](ProcessChannelSpec.md)
`eventLog` | [ProcessEventLogSnapshot](ProcessEventLogSnapshot.md)
`cleanup` | [ProcessCleanupSpec](ProcessCleanupSpec.md)
`restart` | [ProcessRestartSpec](ProcessRestartSpec.md)

## Example

```typescript
import type { ProcessSession } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "alias": null,
  "command": null,
  "cwd": null,
  "envVars": null,
  "state": null,
  "pid": null,
  "createdAt": null,
  "startedAt": null,
  "exitedAt": null,
  "exitCode": null,
  "channels": null,
  "eventLog": null,
  "cleanup": null,
  "restart": null,
} satisfies ProcessSession

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ProcessSession
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


