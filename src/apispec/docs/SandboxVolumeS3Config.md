
# SandboxVolumeS3Config


## Properties

Name | Type
------------ | -------------
`provider` | string
`bucket` | string
`prefix` | string
`region` | string
`endpointUrl` | string

## Example

```typescript
import type { SandboxVolumeS3Config } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "provider": null,
  "bucket": null,
  "prefix": null,
  "region": null,
  "endpointUrl": null,
} satisfies SandboxVolumeS3Config

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxVolumeS3Config
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


