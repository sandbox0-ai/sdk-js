
# CreateAPIKeyRequest


## Properties

Name | Type
------------ | -------------
`name` | string
`type` | string
`roles` | Array&lt;string&gt;
`expiresIn` | string

## Example

```typescript
import type { CreateAPIKeyRequest } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "type": null,
  "roles": null,
  "expiresIn": null,
} satisfies CreateAPIKeyRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateAPIKeyRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


