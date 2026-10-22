
# ExternalMountBinding

Credential-free binding to a team-owned S3 source. Bucket, endpoint and credentials come from the source and are never supplied here or exposed to the guest. At attachment the mount target must be an empty directory without symlink aliases.

## Properties

Name | Type
------------ | -------------
`sourceRef` | string
`mountPath` | string
`prefix` | string
`access` | string

## Example

```typescript
import type { ExternalMountBinding } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "sourceRef": null,
  "mountPath": null,
  "prefix": null,
  "access": null,
} satisfies ExternalMountBinding

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ExternalMountBinding
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


