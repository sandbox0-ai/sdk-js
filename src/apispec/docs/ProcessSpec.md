
# ProcessSpec


## Properties

Name | Type
------------ | -------------
`alias` | string
`command` | Array&lt;string&gt;
`cwd` | string
`envVars` | { [key: string]: string; }
`channels` | [Array&lt;ProcessChannelSpec&gt;](ProcessChannelSpec.md)
`cleanup` | [ProcessCleanupSpec](ProcessCleanupSpec.md)
`restart` | [ProcessRestartSpec](ProcessRestartSpec.md)
`eventBufferSize` | number
`inputBufferSize` | number

## Example

```typescript
import type { ProcessSpec } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "alias": null,
  "command": null,
  "cwd": null,
  "envVars": null,
  "channels": null,
  "cleanup": null,
  "restart": null,
  "eventBufferSize": null,
  "inputBufferSize": null,
} satisfies ProcessSpec

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ProcessSpec
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


