
# ExecutionSessionSpec

Generic process-backed session specification. The supervisor does not interpret application protocols.

## Properties

Name | Type
------------ | -------------
`name` | string
`command` | Array&lt;string&gt;
`cwd` | string
`env` | { [key: string]: string; }
`io` | [ExecutionSessionIOSpec](ExecutionSessionIOSpec.md)
`lifecycle` | [ExecutionSessionLifecycleSpec](ExecutionSessionLifecycleSpec.md)
`readiness` | [ExecutionSessionReadinessSpec](ExecutionSessionReadinessSpec.md)
`eventRetention` | [ExecutionSessionEventRetentionSpec](ExecutionSessionEventRetentionSpec.md)
`executionScope` | [ExecutionSessionScopeSpec](ExecutionSessionScopeSpec.md)

## Example

```typescript
import type { ExecutionSessionSpec } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "command": null,
  "cwd": null,
  "env": null,
  "io": null,
  "lifecycle": null,
  "readiness": null,
  "eventRetention": null,
  "executionScope": null,
} satisfies ExecutionSessionSpec

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ExecutionSessionSpec
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


