
# REPLConfig


## Properties

Name | Type
------------ | -------------
`name` | string
`displayName` | string
`description` | string
`candidates` | [Array&lt;ExecCandidate&gt;](ExecCandidate.md)
`env` | [Array&lt;REPLEnvVar&gt;](REPLEnvVar.md)
`defaultTerm` | string
`prompt` | [REPLPromptConfig](REPLPromptConfig.md)
`ready` | [REPLReadyConfig](REPLReadyConfig.md)

## Example

```typescript
import type { REPLConfig } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "displayName": null,
  "description": null,
  "candidates": null,
  "env": null,
  "defaultTerm": null,
  "prompt": null,
  "ready": null,
} satisfies REPLConfig

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as REPLConfig
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


