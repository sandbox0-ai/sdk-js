
# RunSource


## Properties

Name | Type
------------ | -------------
`type` | [RunSourceType](RunSourceType.md)
`sandboxService` | [SandboxServiceRunSource](SandboxServiceRunSource.md)
`snapshot` | [SnapshotRunSource](SnapshotRunSource.md)

## Example

```typescript
import type { RunSource } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "sandboxService": null,
  "snapshot": null,
} satisfies RunSource

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RunSource
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


