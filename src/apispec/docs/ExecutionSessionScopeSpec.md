
# ExecutionSessionScopeSpec

Declares how descendants of this trusted supervisor process expose a logical execution scope. The runtime reads only the named environment variable and never exports the descendant process environment. 

## Properties

Name | Type
------------ | -------------
`namespace` | string
`kind` | string
`idEnvironmentVariable` | string

## Example

```typescript
import type { ExecutionSessionScopeSpec } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "namespace": null,
  "kind": null,
  "idEnvironmentVariable": null,
} satisfies ExecutionSessionScopeSpec

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ExecutionSessionScopeSpec
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


