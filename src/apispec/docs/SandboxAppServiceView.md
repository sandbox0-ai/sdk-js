
# SandboxAppServiceView


## Properties

Name | Type
------------ | -------------
`id` | string
`displayName` | string
`port` | number
`runtime` | [SandboxAppServiceRuntime](SandboxAppServiceRuntime.md)
`ingress` | [SandboxAppServiceIngress](SandboxAppServiceIngress.md)
`healthCheck` | [SandboxAppServiceHealth](SandboxAppServiceHealth.md)
`publishable` | boolean
`publishBlockers` | Array&lt;string&gt;
`publicUrl` | string

## Example

```typescript
import type { SandboxAppServiceView } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "displayName": null,
  "port": null,
  "runtime": null,
  "ingress": null,
  "healthCheck": null,
  "publishable": null,
  "publishBlockers": null,
  "publicUrl": null,
} satisfies SandboxAppServiceView

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxAppServiceView
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


