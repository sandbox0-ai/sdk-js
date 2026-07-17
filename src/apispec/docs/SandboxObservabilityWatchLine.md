
# SandboxObservabilityWatchLine


## Properties

Name | Type
------------ | -------------
`type` | string
`data` | [SandboxObservabilityWatchLineData](SandboxObservabilityWatchLineData.md)
`effectiveQuery` | [SandboxObservabilityEffectiveEventQuery](SandboxObservabilityEffectiveEventQuery.md)
`cursor` | string
`watermark` | string
`time` | Date
`error` | string

## Example

```typescript
import type { SandboxObservabilityWatchLine } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "data": null,
  "effectiveQuery": null,
  "cursor": null,
  "watermark": null,
  "time": null,
  "error": null,
} satisfies SandboxObservabilityWatchLine

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxObservabilityWatchLine
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


