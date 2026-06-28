# TeamsApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**teamsGet**](TeamsApi.md#teamsget) | **GET** /teams | List teams |
| [**teamsIdDelete**](TeamsApi.md#teamsiddelete) | **DELETE** /teams/{id} | Delete a team |
| [**teamsIdGet**](TeamsApi.md#teamsidget) | **GET** /teams/{id} | Get a team |
| [**teamsIdMembersGet**](TeamsApi.md#teamsidmembersget) | **GET** /teams/{id}/members | List team members |
| [**teamsIdMembersPost**](TeamsApi.md#teamsidmemberspost) | **POST** /teams/{id}/members | Add team member |
| [**teamsIdMembersUserIdDelete**](TeamsApi.md#teamsidmembersuseriddelete) | **DELETE** /teams/{id}/members/{userId} | Remove team member |
| [**teamsIdMembersUserIdPut**](TeamsApi.md#teamsidmembersuseridput) | **PUT** /teams/{id}/members/{userId} | Update team member role |
| [**teamsIdOwnerPut**](TeamsApi.md#teamsidownerput) | **PUT** /teams/{id}/owner | Transfer team ownership |
| [**teamsIdPut**](TeamsApi.md#teamsidput) | **PUT** /teams/{id} | Update a team |
| [**teamsPost**](TeamsApi.md#teamspost) | **POST** /teams | Create a team |



## teamsGet

> SuccessTeamListResponse teamsGet()

List teams

### Example

```ts
import {
  Configuration,
  TeamsApi,
} from 'sandbox0';
import type { TeamsGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TeamsApi(config);

  try {
    const data = await api.teamsGet();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**SuccessTeamListResponse**](SuccessTeamListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Team list |  -  |
| **401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## teamsIdDelete

> SuccessMessageResponse teamsIdDelete(id)

Delete a team

### Example

```ts
import {
  Configuration,
  TeamsApi,
} from 'sandbox0';
import type { TeamsIdDeleteRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TeamsApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies TeamsIdDeleteRequest;

  try {
    const data = await api.teamsIdDelete(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SuccessMessageResponse**](SuccessMessageResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Team deleted |  -  |
| **403** | Forbidden |  -  |
| **404** | Team not found |  -  |
| **409** | Team has resources that must be removed before deletion |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## teamsIdGet

> SuccessTeamResponse teamsIdGet(id)

Get a team

### Example

```ts
import {
  Configuration,
  TeamsApi,
} from 'sandbox0';
import type { TeamsIdGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TeamsApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies TeamsIdGetRequest;

  try {
    const data = await api.teamsIdGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SuccessTeamResponse**](SuccessTeamResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Team |  -  |
| **403** | Not a member |  -  |
| **404** | Team not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## teamsIdMembersGet

> SuccessTeamMemberListResponse teamsIdMembersGet(id, query)

List team members

### Example

```ts
import {
  Configuration,
  TeamsApi,
} from 'sandbox0';
import type { TeamsIdMembersGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TeamsApi(config);

  const body = {
    // string
    id: id_example,
    // string | Search by member email, display name, or user ID. (optional)
    query: query_example,
  } satisfies TeamsIdMembersGetRequest;

  try {
    const data = await api.teamsIdMembersGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |
| **query** | `string` | Search by member email, display name, or user ID. | [Optional] [Defaults to `undefined`] |

### Return type

[**SuccessTeamMemberListResponse**](SuccessTeamMemberListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Team members |  -  |
| **403** | Not a member |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## teamsIdMembersPost

> SuccessTeamMemberResponse teamsIdMembersPost(id, addTeamMemberRequest)

Add team member

### Example

```ts
import {
  Configuration,
  TeamsApi,
} from 'sandbox0';
import type { TeamsIdMembersPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TeamsApi(config);

  const body = {
    // string
    id: id_example,
    // AddTeamMemberRequest
    addTeamMemberRequest: ...,
  } satisfies TeamsIdMembersPostRequest;

  try {
    const data = await api.teamsIdMembersPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |
| **addTeamMemberRequest** | [AddTeamMemberRequest](AddTeamMemberRequest.md) |  | |

### Return type

[**SuccessTeamMemberResponse**](SuccessTeamMemberResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Member added |  -  |
| **403** | Forbidden |  -  |
| **404** | User not found |  -  |
| **409** | Already a member |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## teamsIdMembersUserIdDelete

> SuccessMessageResponse teamsIdMembersUserIdDelete(id, userId)

Remove team member

### Example

```ts
import {
  Configuration,
  TeamsApi,
} from 'sandbox0';
import type { TeamsIdMembersUserIdDeleteRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TeamsApi(config);

  const body = {
    // string
    id: id_example,
    // string
    userId: userId_example,
  } satisfies TeamsIdMembersUserIdDeleteRequest;

  try {
    const data = await api.teamsIdMembersUserIdDelete(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |
| **userId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SuccessMessageResponse**](SuccessMessageResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Member removed |  -  |
| **400** | Invalid member removal |  -  |
| **403** | Forbidden |  -  |
| **404** | Member not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## teamsIdMembersUserIdPut

> SuccessMessageResponse teamsIdMembersUserIdPut(id, userId, updateTeamMemberRequest)

Update team member role

### Example

```ts
import {
  Configuration,
  TeamsApi,
} from 'sandbox0';
import type { TeamsIdMembersUserIdPutRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TeamsApi(config);

  const body = {
    // string
    id: id_example,
    // string
    userId: userId_example,
    // UpdateTeamMemberRequest
    updateTeamMemberRequest: ...,
  } satisfies TeamsIdMembersUserIdPutRequest;

  try {
    const data = await api.teamsIdMembersUserIdPut(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |
| **userId** | `string` |  | [Defaults to `undefined`] |
| **updateTeamMemberRequest** | [UpdateTeamMemberRequest](UpdateTeamMemberRequest.md) |  | |

### Return type

[**SuccessMessageResponse**](SuccessMessageResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Member updated |  -  |
| **400** | Invalid member role change |  -  |
| **403** | Forbidden |  -  |
| **404** | Member not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## teamsIdOwnerPut

> SuccessTeamResponse teamsIdOwnerPut(id, transferTeamOwnerRequest)

Transfer team ownership

Transfers ownership to an existing team member and promotes the new owner to admin if needed.

### Example

```ts
import {
  Configuration,
  TeamsApi,
} from 'sandbox0';
import type { TeamsIdOwnerPutRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TeamsApi(config);

  const body = {
    // string
    id: id_example,
    // TransferTeamOwnerRequest
    transferTeamOwnerRequest: ...,
  } satisfies TeamsIdOwnerPutRequest;

  try {
    const data = await api.teamsIdOwnerPut(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |
| **transferTeamOwnerRequest** | [TransferTeamOwnerRequest](TransferTeamOwnerRequest.md) |  | |

### Return type

[**SuccessTeamResponse**](SuccessTeamResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Team owner transferred |  -  |
| **400** | Invalid request |  -  |
| **403** | Only the current owner can transfer ownership |  -  |
| **404** | Team or member not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## teamsIdPut

> SuccessTeamResponse teamsIdPut(id, updateTeamRequest)

Update a team

Team home region is immutable after creation and cannot be changed through this endpoint.

### Example

```ts
import {
  Configuration,
  TeamsApi,
} from 'sandbox0';
import type { TeamsIdPutRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TeamsApi(config);

  const body = {
    // string
    id: id_example,
    // UpdateTeamRequest
    updateTeamRequest: ...,
  } satisfies TeamsIdPutRequest;

  try {
    const data = await api.teamsIdPut(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |
| **updateTeamRequest** | [UpdateTeamRequest](UpdateTeamRequest.md) |  | |

### Return type

[**SuccessTeamResponse**](SuccessTeamResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Team updated |  -  |
| **400** | Invalid request |  -  |
| **403** | Forbidden |  -  |
| **404** | Team not found |  -  |
| **409** | Team update conflicts with an immutable field or existing slug |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## teamsPost

> SuccessTeamResponse teamsPost(createTeamRequest)

Create a team

### Example

```ts
import {
  Configuration,
  TeamsApi,
} from 'sandbox0';
import type { TeamsPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TeamsApi(config);

  const body = {
    // CreateTeamRequest
    createTeamRequest: ...,
  } satisfies TeamsPostRequest;

  try {
    const data = await api.teamsPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **createTeamRequest** | [CreateTeamRequest](CreateTeamRequest.md) |  | |

### Return type

[**SuccessTeamResponse**](SuccessTeamResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Team created |  -  |
| **400** | Invalid request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

