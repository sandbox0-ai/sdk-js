
# SandboxAuditActor


## Properties

Name | Type
------------ | -------------
`kind` | [SandboxAuditActorKind](SandboxAuditActorKind.md)
`id` | string
`userId` | string
`apiKeyId` | string
`authMethod` | string

## Example

```typescript
import type { SandboxAuditActor } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "kind": null,
  "id": null,
  "userId": null,
  "apiKeyId": null,
  "authMethod": null,
} satisfies SandboxAuditActor

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxAuditActor
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


