
# QuotaDimension

snapshots_per_sandbox limits retained public snapshots independently on each sandbox (default 10). Excess snapshots are automatically removed, oldest first. Its capacity current value is the highest snapshot count on any sandbox in the team, rather than the team\'s total snapshot count.

## Properties

Name | Type
------------ | -------------

## Example

```typescript
import type { QuotaDimension } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
} satisfies QuotaDimension

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as QuotaDimension
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


