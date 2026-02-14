
# SuccessFileReadResponseAllOfData


## Properties

Name | Type
------------ | -------------
`name` | string
`path` | string
`type` | string
`size` | number
`mode` | string
`modTime` | Date
`isLink` | boolean
`linkTarget` | string
`entries` | [Array&lt;FileInfo&gt;](FileInfo.md)
`content` | string
`encoding` | string

## Example

```typescript
import type { SuccessFileReadResponseAllOfData } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "path": null,
  "type": null,
  "size": null,
  "mode": null,
  "modTime": null,
  "isLink": null,
  "linkTarget": null,
  "entries": null,
  "content": null,
  "encoding": null,
} satisfies SuccessFileReadResponseAllOfData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SuccessFileReadResponseAllOfData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


