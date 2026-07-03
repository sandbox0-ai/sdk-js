
# SandboxObservabilityEvent


## Properties

Name | Type
------------ | -------------
`teamId` | string
`sandboxId` | string
`regionId` | string
`clusterId` | string
`occurredAt` | Date
`ingestedAt` | Date
`source` | [ObservabilityEventSource](ObservabilityEventSource.md)
`eventType` | [SandboxObservabilityEventType](SandboxObservabilityEventType.md)
`outcome` | [SandboxObservabilityOutcome](SandboxObservabilityOutcome.md)
`cursor` | string
`watermark` | string
`attributes` | { [key: string]: any; }

## Example

```typescript
import type { SandboxObservabilityEvent } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "teamId": null,
  "sandboxId": null,
  "regionId": null,
  "clusterId": null,
  "occurredAt": null,
  "ingestedAt": null,
  "source": null,
  "eventType": null,
  "outcome": null,
  "cursor": null,
  "watermark": null,
  "attributes": null,
} satisfies SandboxObservabilityEvent

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SandboxObservabilityEvent
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


