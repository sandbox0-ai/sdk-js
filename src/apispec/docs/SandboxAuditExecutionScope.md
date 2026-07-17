
# SandboxAuditExecutionScope

Attributes sandbox workload activity to one native harness execution scope. The sandbox workload remains the audit actor. 

## Properties

Name | Type
------------ | -------------
`namespace` | string
`kind` | string
`id` | string
`attribution` | [SandboxAuditExecutionScopeAttribution](SandboxAuditExecutionScopeAttribution.md)

## Example

```typescript
import type { SandboxAuditExecutionScope } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "namespace": null,
  "kind": null,
  "id": null,
  "attribution": null,
} satisfies SandboxAuditExecutionScope

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxAuditExecutionScope
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


