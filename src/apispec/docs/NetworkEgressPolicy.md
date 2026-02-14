
# NetworkEgressPolicy


## Properties

Name | Type
------------ | -------------
`allowedCidrs` | Array&lt;string&gt;
`allowedDomains` | Array&lt;string&gt;
`allowedPorts` | [Array&lt;PortSpec&gt;](PortSpec.md)
`deniedDomains` | Array&lt;string&gt;
`deniedCidrs` | Array&lt;string&gt;
`deniedPorts` | [Array&lt;PortSpec&gt;](PortSpec.md)

## Example

```typescript
import type { NetworkEgressPolicy } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "allowedCidrs": null,
  "allowedDomains": null,
  "allowedPorts": null,
  "deniedDomains": null,
  "deniedCidrs": null,
  "deniedPorts": null,
} satisfies NetworkEgressPolicy

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as NetworkEgressPolicy
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


