
# CreateContextRequest


## Properties

Name | Type
------------ | -------------
`type` | [ProcessType](ProcessType.md)
`repl` | [CreateREPLContextRequest](CreateREPLContextRequest.md)
`cmd` | [CreateCMDContextRequest](CreateCMDContextRequest.md)
`waitUntilDone` | boolean
`cwd` | string
`envVars` | { [key: string]: string; }
`ptySize` | [PTYSize](PTYSize.md)
`idleTimeoutSec` | number
`ttlSec` | number

## Example

```typescript
import type { CreateContextRequest } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "repl": null,
  "cmd": null,
  "waitUntilDone": null,
  "cwd": null,
  "envVars": null,
  "ptySize": null,
  "idleTimeoutSec": null,
  "ttlSec": null,
} satisfies CreateContextRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateContextRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


