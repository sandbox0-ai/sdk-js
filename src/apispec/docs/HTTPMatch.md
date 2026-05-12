
# HTTPMatch

Request-level matcher for HTTP-family egress credential rules.

## Properties

Name | Type
------------ | -------------
`methods` | Array&lt;string&gt;
`paths` | Array&lt;string&gt;
`pathPrefixes` | Array&lt;string&gt;
`query` | [Array&lt;HTTPValueMatch&gt;](HTTPValueMatch.md)
`headers` | [Array&lt;HTTPValueMatch&gt;](HTTPValueMatch.md)

## Example

```typescript
import type { HTTPMatch } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "methods": null,
  "paths": null,
  "pathPrefixes": null,
  "query": null,
  "headers": null,
} satisfies HTTPMatch

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as HTTPMatch
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


