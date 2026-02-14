
# ResourceUsage


## Properties

Name | Type
------------ | -------------
`cpuPercent` | number
`memoryRss` | number
`memoryVms` | number
`openFiles` | number
`threadCount` | number
`containerMemoryUsage` | number
`containerMemoryLimit` | number
`containerMemoryWorkingSet` | number
`ioReadBytes` | number
`ioWriteBytes` | number
`memoryBytes` | number

## Example

```typescript
import type { ResourceUsage } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "cpuPercent": null,
  "memoryRss": null,
  "memoryVms": null,
  "openFiles": null,
  "threadCount": null,
  "containerMemoryUsage": null,
  "containerMemoryLimit": null,
  "containerMemoryWorkingSet": null,
  "ioReadBytes": null,
  "ioWriteBytes": null,
  "memoryBytes": null,
} satisfies ResourceUsage

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ResourceUsage
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


