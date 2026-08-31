
# TemplateFromSandboxSpecOverrides

Safe template fields that may override values inherited from the source sandbox\'s originating template.

## Properties

Name | Type
------------ | -------------
`description` | string
`displayName` | string
`tags` | Array&lt;string&gt;

## Example

```typescript
import type { TemplateFromSandboxSpecOverrides } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "description": null,
  "displayName": null,
  "tags": null,
} satisfies TemplateFromSandboxSpecOverrides

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TemplateFromSandboxSpecOverrides
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


