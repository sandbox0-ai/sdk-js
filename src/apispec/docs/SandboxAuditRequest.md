
# SandboxAuditRequest


## Properties

Name | Type
------------ | -------------
`requestId` | string
`traceId` | string
`sourceIp` | string
`userAgent` | string
`httpMethod` | string
`route` | string
`statusCode` | number

## Example

```typescript
import type { SandboxAuditRequest } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "requestId": null,
  "traceId": null,
  "sourceIp": null,
  "userAgent": null,
  "httpMethod": null,
  "route": null,
  "statusCode": null,
} satisfies SandboxAuditRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxAuditRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
