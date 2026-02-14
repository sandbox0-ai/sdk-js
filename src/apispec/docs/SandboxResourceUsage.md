
# SandboxResourceUsage


## Properties

Name | Type
------------ | -------------
`containerMemoryUsage` | number
`containerMemoryLimit` | number
`containerMemoryWorkingSet` | number
`totalMemoryRss` | number
`totalMemoryVms` | number
`totalOpenFiles` | number
`totalThreadCount` | number
`totalIoReadBytes` | number
`totalIoWriteBytes` | number
`contextCount` | number
`runningContextCount` | number
`pausedContextCount` | number
`contexts` | [Array&lt;ContextResourceUsage&gt;](ContextResourceUsage.md)

## Example

```typescript
import type { SandboxResourceUsage } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "containerMemoryUsage": null,
  "containerMemoryLimit": null,
  "containerMemoryWorkingSet": null,
  "totalMemoryRss": null,
  "totalMemoryVms": null,
  "totalOpenFiles": null,
  "totalThreadCount": null,
  "totalIoReadBytes": null,
  "totalIoWriteBytes": null,
  "contextCount": null,
  "runningContextCount": null,
  "pausedContextCount": null,
  "contexts": null,
} satisfies SandboxResourceUsage

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxResourceUsage
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


