
# WebhookConfig


## Properties

Name | Type
------------ | -------------
`url` | string
`secret` | string
`watchDir` | string

## Example

```typescript
import type { WebhookConfig } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "url": null,
  "secret": null,
  "watchDir": null,
} satisfies WebhookConfig

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as WebhookConfig
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


