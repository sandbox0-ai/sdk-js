
# ActiveTeam


## Properties

Name | Type
------------ | -------------
`userId` | string
`teamId` | string
`teamRole` | string
`homeRegionId` | string
`defaultTeam` | boolean
`regionalGatewayUrl` | string

## Example

```typescript
import type { ActiveTeam } from 'sandbox0'

// TODO: Update the object below with actual values
const example = {
  "userId": null,
  "teamId": null,
  "teamRole": null,
  "homeRegionId": null,
  "defaultTeam": null,
  "regionalGatewayUrl": null,
} satisfies ActiveTeam

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ActiveTeam
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


