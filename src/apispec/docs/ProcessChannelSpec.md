
# ProcessChannelSpec


## Properties

Name | Type
------------ | -------------
`name` | string
`kind` | [ProcessChannelKind](ProcessChannelKind.md)
`framing` | [ProcessChannelFraming](ProcessChannelFraming.md)
`stdin` | boolean
`stdout` | boolean
`stderr` | boolean
`ptySize` | [PTYSize](PTYSize.md)
`http` | [HTTPChannelSpec](HTTPChannelSpec.md)
`websocket` | [WebSocketChannelSpec](WebSocketChannelSpec.md)

## Example

```typescript
import type { ProcessChannelSpec } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "kind": null,
  "framing": null,
  "stdin": null,
  "stdout": null,
  "stderr": null,
  "ptySize": null,
  "http": null,
  "websocket": null,
} satisfies ProcessChannelSpec

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ProcessChannelSpec
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


