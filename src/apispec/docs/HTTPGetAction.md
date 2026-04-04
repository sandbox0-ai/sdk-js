
# HTTPGetAction


## Properties

Name | Type
------------ | -------------
`path` | string
`port` | [ProbePort](ProbePort.md)
`host` | string
`scheme` | string
`httpHeaders` | [Array&lt;HTTPHeader&gt;](HTTPHeader.md)

## Example

```typescript
import type { HTTPGetAction } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "path": null,
  "port": null,
  "host": null,
  "scheme": null,
  "httpHeaders": null,
} satisfies HTTPGetAction

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as HTTPGetAction
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


