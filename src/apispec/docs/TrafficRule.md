
# TrafficRule


## Properties

Name | Type
------------ | -------------
`name` | string
`action` | [TrafficRuleAction](TrafficRuleAction.md)
`cidrs` | Array&lt;string&gt;
`domains` | Array&lt;string&gt;
`ports` | [Array&lt;PortSpec&gt;](PortSpec.md)
`appProtocols` | [Array&lt;TrafficRuleAppProtocol&gt;](TrafficRuleAppProtocol.md)

## Example

```typescript
import type { TrafficRule } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "action": null,
  "cidrs": null,
  "domains": null,
  "ports": null,
  "appProtocols": null,
} satisfies TrafficRule

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TrafficRule
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


