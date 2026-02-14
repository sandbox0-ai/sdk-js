
# REPLReadyConfig


## Properties

Name | Type
------------ | -------------
`mode` | [REPLReadyMode](REPLReadyMode.md)
`token` | string
`startupDelayMs` | number

## Example

```typescript
import type { REPLReadyConfig } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "mode": null,
  "token": null,
  "startupDelayMs": null,
} satisfies REPLReadyConfig

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as REPLReadyConfig
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


