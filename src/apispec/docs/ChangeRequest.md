
# ChangeRequest


## Properties

Name | Type
------------ | -------------
`eventType` | [SyncEventType](SyncEventType.md)
`path` | string
`oldPath` | string
`entryKind` | string
`contentBase64` | string
`mode` | number
`contentSha256` | string
`sizeBytes` | number
`metadata` | { [key: string]: any; }

## Example

```typescript
import type { ChangeRequest } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "eventType": null,
  "path": null,
  "oldPath": null,
  "entryKind": null,
  "contentBase64": null,
  "mode": null,
  "contentSha256": null,
  "sizeBytes": null,
  "metadata": null,
} satisfies ChangeRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ChangeRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


