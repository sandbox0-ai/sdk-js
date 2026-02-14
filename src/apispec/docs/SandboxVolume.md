
# SandboxVolume


## Properties

Name | Type
------------ | -------------
`id` | string
`teamId` | string
`userId` | string
`cacheSize` | string
`prefetch` | number
`bufferSize` | string
`writeback` | boolean
`accessMode` | [VolumeAccessMode](VolumeAccessMode.md)
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
  "cacheSize": null,
  "prefetch": null,
  "bufferSize": null,
  "writeback": null,
  "accessMode": null,
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


