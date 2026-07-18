
# SandboxVolume


## Properties

Name | Type
------------ | -------------
`id` | string
`teamId` | string
`userId` | string
`sourceVolumeId` | string
`defaultPosixUid` | number
`defaultPosixGid` | number
`accessMode` | [VolumeAccessMode](VolumeAccessMode.md)
`backend` | [VolumeBackend](VolumeBackend.md)
`s3` | [SandboxVolumeS3Config](SandboxVolumeS3Config.md)
`meteredStorageBytes` | number
`storageObservedAt` | Date
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { SandboxVolume } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "teamId": null,
  "userId": null,
  "sourceVolumeId": null,
  "defaultPosixUid": null,
  "defaultPosixGid": null,
  "accessMode": null,
  "backend": null,
  "s3": null,
  "meteredStorageBytes": null,
  "storageObservedAt": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies SandboxVolume

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxVolume
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


