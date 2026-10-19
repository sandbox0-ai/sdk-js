
# StaticS3SourceSpec

Team-owned S3 connection for isolated external mounts. Stored as platform-side secret material; never returned in source metadata or injected into the user sandbox.

## Properties

Name | Type
------------ | -------------
`bucket` | string
`prefix` | string
`region` | string
`endpointUrl` | string
`allowWrite` | boolean
`accessKey` | string
`secretKey` | string
`sessionToken` | string

## Example

```typescript
import type { StaticS3SourceSpec } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "bucket": null,
  "prefix": null,
  "region": null,
  "endpointUrl": null,
  "allowWrite": null,
  "accessKey": null,
  "secretKey": null,
  "sessionToken": null,
} satisfies StaticS3SourceSpec

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as StaticS3SourceSpec
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


