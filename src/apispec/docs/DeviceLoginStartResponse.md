
# DeviceLoginStartResponse


## Properties

Name | Type
------------ | -------------
`deviceLoginId` | string
`userCode` | string
`verificationUri` | string
`verificationUriComplete` | string
`expiresAt` | number
`intervalSeconds` | number

## Example

```typescript
import type { DeviceLoginStartResponse } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "deviceLoginId": null,
  "userCode": null,
  "verificationUri": null,
  "verificationUriComplete": null,
  "expiresAt": null,
  "intervalSeconds": null,
} satisfies DeviceLoginStartResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as DeviceLoginStartResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


