
# SecurityContext


## Properties

Name | Type
------------ | -------------
`capabilities` | [Capabilities](Capabilities.md)
`privileged` | boolean
`runAsUser` | number
`runAsGroup` | number
`runAsNonRoot` | boolean
`readOnlyRootFilesystem` | boolean
`allowPrivilegeEscalation` | boolean
`seccompProfile` | [SeccompProfile](SeccompProfile.md)
`appArmorProfile` | [AppArmorProfile](AppArmorProfile.md)

## Example

```typescript
import type { SecurityContext } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "capabilities": null,
  "privileged": null,
  "runAsUser": null,
  "runAsGroup": null,
  "runAsNonRoot": null,
  "readOnlyRootFilesystem": null,
  "allowPrivilegeEscalation": null,
  "seccompProfile": null,
  "appArmorProfile": null,
} satisfies SecurityContext

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SecurityContext
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


