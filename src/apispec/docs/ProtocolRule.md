
# ProtocolRule

Protocol-aware egress controls applied after destination traffic is allowed.

## Properties

Name | Type
------------ | -------------
`name` | string
`protocol` | [ProtocolRuleProtocol](ProtocolRuleProtocol.md)
`domains` | Array&lt;string&gt;
`ports` | [Array&lt;PortSpec&gt;](PortSpec.md)
`tlsMode` | [EgressTLSMode](EgressTLSMode.md)
`httpMatch` | [HTTPMatch](HTTPMatch.md)
`mcp` | [MCPProtocolRule](MCPProtocolRule.md)

## Example

```typescript
import type { ProtocolRule } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "protocol": null,
  "domains": null,
  "ports": null,
  "tlsMode": null,
  "httpMatch": null,
  "mcp": null,
} satisfies ProtocolRule

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ProtocolRule
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


