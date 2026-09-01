
# SandboxPreviewGrant


## Properties

Name | Type
------------ | -------------
`id` | string
`sandboxId` | string
`port` | number
`protocol` | string
`url` | string
`targetUrl` | string
`expiresAt` | Date
`runtimeGeneration` | number

## Example

```typescript
import type { SandboxPreviewGrant } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "sandboxId": null,
  "port": null,
  "protocol": null,
  "url": null,
  "targetUrl": null,
  "expiresAt": null,
  "runtimeGeneration": null,
} satisfies SandboxPreviewGrant

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxPreviewGrant
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


