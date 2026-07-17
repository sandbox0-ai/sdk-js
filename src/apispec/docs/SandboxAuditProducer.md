
# SandboxAuditProducer


## Properties

Name | Type
------------ | -------------
`service` | string
`instance` | string
`sequence` | number

## Example

```typescript
import type { SandboxAuditProducer } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "service": null,
  "instance": null,
  "sequence": null,
} satisfies SandboxAuditProducer

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxAuditProducer
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


