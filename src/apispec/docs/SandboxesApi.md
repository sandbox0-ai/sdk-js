# SandboxesApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1SandboxesGet**](SandboxesApi.md#apiv1sandboxesget) | **GET** /api/v1/sandboxes | List sandboxes |
| [**apiV1SandboxesIdDelete**](SandboxesApi.md#apiv1sandboxesiddelete) | **DELETE** /api/v1/sandboxes/{id} | Delete (terminate) a sandbox |
| [**apiV1SandboxesIdGet**](SandboxesApi.md#apiv1sandboxesidget) | **GET** /api/v1/sandboxes/{id} | Get sandbox by ID |
| [**apiV1SandboxesIdNetworkGet**](SandboxesApi.md#apiv1sandboxesidnetworkget) | **GET** /api/v1/sandboxes/{id}/network | Get sandbox network policy |
| [**apiV1SandboxesIdNetworkPut**](SandboxesApi.md#apiv1sandboxesidnetworkput) | **PUT** /api/v1/sandboxes/{id}/network | Update sandbox network policy |
| [**apiV1SandboxesIdPausePost**](SandboxesApi.md#apiv1sandboxesidpausepost) | **POST** /api/v1/sandboxes/{id}/pause | Pause a sandbox |
| [**apiV1SandboxesIdPut**](SandboxesApi.md#apiv1sandboxesidput) | **PUT** /api/v1/sandboxes/{id} | Update sandbox configuration |
| [**apiV1SandboxesIdRefreshPost**](SandboxesApi.md#apiv1sandboxesidrefreshpost) | **POST** /api/v1/sandboxes/{id}/refresh | Refresh sandbox TTL |
| [**apiV1SandboxesIdResumePost**](SandboxesApi.md#apiv1sandboxesidresumepost) | **POST** /api/v1/sandboxes/{id}/resume | Resume a sandbox |
| [**apiV1SandboxesIdServicesGet**](SandboxesApi.md#apiv1sandboxesidservicesget) | **GET** /api/v1/sandboxes/{id}/services | List sandbox services |
| [**apiV1SandboxesIdServicesPut**](SandboxesApi.md#apiv1sandboxesidservicesput) | **PUT** /api/v1/sandboxes/{id}/services | Replace sandbox services |
| [**apiV1SandboxesIdStatusGet**](SandboxesApi.md#apiv1sandboxesidstatusget) | **GET** /api/v1/sandboxes/{id}/status | Get sandbox status |
| [**apiV1SandboxesPost**](SandboxesApi.md#apiv1sandboxespost) | **POST** /api/v1/sandboxes | Create (claim) a sandbox |



## apiV1SandboxesGet

> SuccessSandboxListResponse apiV1SandboxesGet(status, templateId, paused, limit, offset)

List sandboxes

List all sandboxes for the authenticated team. In multi-cluster mode, this endpoint aggregates results from all enabled clusters.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // SandboxLifecycleStatus | Filter by sandbox status (optional)
    status: ...,
    // string | Filter by template ID (optional)
    templateId: templateId_example,
    // boolean | Filter by paused state (optional)
    paused: true,
    // number | Maximum number of results per page (optional)
    limit: 56,
    // number | Pagination offset (optional)
    offset: 56,
  } satisfies ApiV1SandboxesGetRequest;

  try {
    const data = await api.apiV1SandboxesGet(body);
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
| **status** | `SandboxLifecycleStatus` | Filter by sandbox status | [Optional] [Defaults to `undefined`] [Enum: starting, running, paused, terminating, failed] |
| **templateId** | `string` | Filter by template ID | [Optional] [Defaults to `undefined`] |
| **paused** | `boolean` | Filter by paused state | [Optional] [Defaults to `undefined`] |
| **limit** | `number` | Maximum number of results per page | [Optional] [Defaults to `50`] |
| **offset** | `number` | Pagination offset | [Optional] [Defaults to `0`] |

### Return type

[**SuccessSandboxListResponse**](SuccessSandboxListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of sandboxes |  -  |
| **400** | Invalid request |  -  |
| **429** | The admission control applicable to this route and deployment topology rejected the request. &#x60;error.code&#x60; is &#x60;quota_exceeded&#x60; for a team-attributed Team Quota such as &#x60;active_request_count&#x60;, &#x60;active_connection_count&#x60;, &#x60;api_requests&#x60;, or a traffic-byte rate, &#x60;identity_limit_exceeded&#x60; for an IdentityResourceGuard cardinality limit, or &#x60;rate_limited&#x60; for an aggregate overload guard. A given route does not necessarily use every control.  |  * Retry-After - Suggested delay in seconds when token-bucket or overload admission provides one; identity cardinality rejections may omit it <br>  |
| **503** | The fail-closed admission backend applicable to this route is unavailable. Depending on deployment topology, this is the region Team Quota policy or Redis path, or the public identity entrypoint\&#39;s shared overload-guard backend; a given route does not necessarily use both.  |  * Retry-After - Suggested retry delay in seconds <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdDelete

> SuccessMessageResponse apiV1SandboxesIdDelete(id)

Delete (terminate) a sandbox

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdDeleteRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiV1SandboxesIdDeleteRequest;

  try {
    const data = await api.apiV1SandboxesIdDelete(body);
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
| **200** | Sandbox terminated |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | The mutation would exceed an effective Team Quota policy |  * Retry-After - Suggested retry delay in seconds when a rate policy was exceeded <br>  |
| **503** | Team Quota admission is temporarily unavailable |  * Retry-After - Suggested retry delay in seconds <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdGet

> SuccessSandboxResponse apiV1SandboxesIdGet(id)

Get sandbox by ID

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiV1SandboxesIdGetRequest;

  try {
    const data = await api.apiV1SandboxesIdGet(body);
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

[**SuccessSandboxResponse**](SuccessSandboxResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Sandbox |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | The admission control applicable to this route and deployment topology rejected the request. &#x60;error.code&#x60; is &#x60;quota_exceeded&#x60; for a team-attributed Team Quota such as &#x60;active_request_count&#x60;, &#x60;active_connection_count&#x60;, &#x60;api_requests&#x60;, or a traffic-byte rate, &#x60;identity_limit_exceeded&#x60; for an IdentityResourceGuard cardinality limit, or &#x60;rate_limited&#x60; for an aggregate overload guard. A given route does not necessarily use every control.  |  * Retry-After - Suggested delay in seconds when token-bucket or overload admission provides one; identity cardinality rejections may omit it <br>  |
| **503** | The fail-closed admission backend applicable to this route is unavailable. Depending on deployment topology, this is the region Team Quota policy or Redis path, or the public identity entrypoint\&#39;s shared overload-guard backend; a given route does not necessarily use both.  |  * Retry-After - Suggested retry delay in seconds <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdNetworkGet

> SuccessSandboxNetworkPolicyResponse apiV1SandboxesIdNetworkGet(id)

Get sandbox network policy

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdNetworkGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiV1SandboxesIdNetworkGetRequest;

  try {
    const data = await api.apiV1SandboxesIdNetworkGet(body);
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

[**SuccessSandboxNetworkPolicyResponse**](SuccessSandboxNetworkPolicyResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Network policy |  -  |
| **404** | Not found |  -  |
| **429** | The admission control applicable to this route and deployment topology rejected the request. &#x60;error.code&#x60; is &#x60;quota_exceeded&#x60; for a team-attributed Team Quota such as &#x60;active_request_count&#x60;, &#x60;active_connection_count&#x60;, &#x60;api_requests&#x60;, or a traffic-byte rate, &#x60;identity_limit_exceeded&#x60; for an IdentityResourceGuard cardinality limit, or &#x60;rate_limited&#x60; for an aggregate overload guard. A given route does not necessarily use every control.  |  * Retry-After - Suggested delay in seconds when token-bucket or overload admission provides one; identity cardinality rejections may omit it <br>  |
| **503** | The fail-closed admission backend applicable to this route is unavailable. Depending on deployment topology, this is the region Team Quota policy or Redis path, or the public identity entrypoint\&#39;s shared overload-guard backend; a given route does not necessarily use both.  |  * Retry-After - Suggested retry delay in seconds <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdNetworkPut

> SuccessSandboxNetworkPolicyResponse apiV1SandboxesIdNetworkPut(id, sandboxNetworkPolicy)

Update sandbox network policy

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdNetworkPutRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // SandboxNetworkPolicy
    sandboxNetworkPolicy: ...,
  } satisfies ApiV1SandboxesIdNetworkPutRequest;

  try {
    const data = await api.apiV1SandboxesIdNetworkPut(body);
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
| **sandboxNetworkPolicy** | [SandboxNetworkPolicy](SandboxNetworkPolicy.md) |  | |

### Return type

[**SuccessSandboxNetworkPolicyResponse**](SuccessSandboxNetworkPolicyResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Network policy updated |  -  |
| **429** | The admission control applicable to this route and deployment topology rejected the request. &#x60;error.code&#x60; is &#x60;quota_exceeded&#x60; for a team-attributed Team Quota such as &#x60;active_request_count&#x60;, &#x60;active_connection_count&#x60;, &#x60;api_requests&#x60;, or a traffic-byte rate, &#x60;identity_limit_exceeded&#x60; for an IdentityResourceGuard cardinality limit, or &#x60;rate_limited&#x60; for an aggregate overload guard. A given route does not necessarily use every control.  |  * Retry-After - Suggested delay in seconds when token-bucket or overload admission provides one; identity cardinality rejections may omit it <br>  |
| **503** | The fail-closed admission backend applicable to this route is unavailable. Depending on deployment topology, this is the region Team Quota policy or Redis path, or the public identity entrypoint\&#39;s shared overload-guard backend; a given route does not necessarily use both.  |  * Retry-After - Suggested retry delay in seconds <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdPausePost

> SuccessPauseSandboxResponse apiV1SandboxesIdPausePost(id)

Pause a sandbox

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdPausePostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiV1SandboxesIdPausePostRequest;

  try {
    const data = await api.apiV1SandboxesIdPausePost(body);
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

[**SuccessPauseSandboxResponse**](SuccessPauseSandboxResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Sandbox paused |  -  |
| **409** | Sandbox lifecycle state conflicts with this operation |  -  |
| **429** | The mutation would exceed an effective Team Quota policy |  * Retry-After - Suggested retry delay in seconds when a rate policy was exceeded <br>  |
| **504** | Timed out waiting for the sandbox to pause |  -  |
| **503** | Sandbox pause requires ctld or Team Quota admission is temporarily unavailable |  * Retry-After - Suggested retry delay in seconds for Team Quota admission <br>  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdPut

> SuccessSandboxResponse apiV1SandboxesIdPut(id, sandboxUpdateRequest)

Update sandbox configuration

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdPutRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // SandboxUpdateRequest
    sandboxUpdateRequest: ...,
  } satisfies ApiV1SandboxesIdPutRequest;

  try {
    const data = await api.apiV1SandboxesIdPut(body);
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
| **sandboxUpdateRequest** | [SandboxUpdateRequest](SandboxUpdateRequest.md) |  | |

### Return type

[**SuccessSandboxResponse**](SuccessSandboxResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Sandbox updated |  -  |
| **400** | Invalid request |  -  |
| **404** | Not found |  -  |
| **429** | The mutation would exceed an effective Team Quota policy |  * Retry-After - Suggested retry delay in seconds when a rate policy was exceeded <br>  |
| **503** | Team Quota admission is temporarily unavailable |  * Retry-After - Suggested retry delay in seconds <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdRefreshPost

> SuccessRefreshResponse apiV1SandboxesIdRefreshPost(id, sandboxRefreshRequest)

Refresh sandbox TTL

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdRefreshPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // SandboxRefreshRequest (optional)
    sandboxRefreshRequest: ...,
  } satisfies ApiV1SandboxesIdRefreshPostRequest;

  try {
    const data = await api.apiV1SandboxesIdRefreshPost(body);
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
| **sandboxRefreshRequest** | [SandboxRefreshRequest](SandboxRefreshRequest.md) |  | [Optional] |

### Return type

[**SuccessRefreshResponse**](SuccessRefreshResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | TTL refreshed |  -  |
| **404** | Not found |  -  |
| **429** | The admission control applicable to this route and deployment topology rejected the request. &#x60;error.code&#x60; is &#x60;quota_exceeded&#x60; for a team-attributed Team Quota such as &#x60;active_request_count&#x60;, &#x60;active_connection_count&#x60;, &#x60;api_requests&#x60;, or a traffic-byte rate, &#x60;identity_limit_exceeded&#x60; for an IdentityResourceGuard cardinality limit, or &#x60;rate_limited&#x60; for an aggregate overload guard. A given route does not necessarily use every control.  |  * Retry-After - Suggested delay in seconds when token-bucket or overload admission provides one; identity cardinality rejections may omit it <br>  |
| **503** | The fail-closed admission backend applicable to this route is unavailable. Depending on deployment topology, this is the region Team Quota policy or Redis path, or the public identity entrypoint\&#39;s shared overload-guard backend; a given route does not necessarily use both.  |  * Retry-After - Suggested retry delay in seconds <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdResumePost

> SuccessResumeSandboxResponse apiV1SandboxesIdResumePost(id)

Resume a sandbox

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdResumePostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiV1SandboxesIdResumePostRequest;

  try {
    const data = await api.apiV1SandboxesIdResumePost(body);
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

[**SuccessResumeSandboxResponse**](SuccessResumeSandboxResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Sandbox resumed |  -  |
| **409** | Sandbox lifecycle state conflicts with this operation |  -  |
| **429** | The mutation would exceed an effective Team Quota policy |  * Retry-After - Suggested retry delay in seconds when a rate policy was exceeded <br>  |
| **504** | Timed out waiting for the sandbox to resume |  -  |
| **503** | Sandbox resume or Team Quota admission is temporarily unavailable |  * Retry-After - Suggested retry delay in seconds <br>  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdServicesGet

> SuccessSandboxServicesResponse apiV1SandboxesIdServicesGet(id)

List sandbox services

Lists sandbox services configured on the sandbox.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdServicesGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiV1SandboxesIdServicesGetRequest;

  try {
    const data = await api.apiV1SandboxesIdServicesGet(body);
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

[**SuccessSandboxServicesResponse**](SuccessSandboxServicesResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Sandbox services |  -  |
| **404** | Not found |  -  |
| **429** | The admission control applicable to this route and deployment topology rejected the request. &#x60;error.code&#x60; is &#x60;quota_exceeded&#x60; for a team-attributed Team Quota such as &#x60;active_request_count&#x60;, &#x60;active_connection_count&#x60;, &#x60;api_requests&#x60;, or a traffic-byte rate, &#x60;identity_limit_exceeded&#x60; for an IdentityResourceGuard cardinality limit, or &#x60;rate_limited&#x60; for an aggregate overload guard. A given route does not necessarily use every control.  |  * Retry-After - Suggested delay in seconds when token-bucket or overload admission provides one; identity cardinality rejections may omit it <br>  |
| **503** | The fail-closed admission backend applicable to this route is unavailable. Depending on deployment topology, this is the region Team Quota policy or Redis path, or the public identity entrypoint\&#39;s shared overload-guard backend; a given route does not necessarily use both.  |  * Retry-After - Suggested retry delay in seconds <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdServicesPut

> SuccessSandboxServicesResponse apiV1SandboxesIdServicesPut(id, sandboxServicesUpdateRequest)

Replace sandbox services

Replaces the sandbox services used for public exposure.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdServicesPutRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // SandboxServicesUpdateRequest
    sandboxServicesUpdateRequest: ...,
  } satisfies ApiV1SandboxesIdServicesPutRequest;

  try {
    const data = await api.apiV1SandboxesIdServicesPut(body);
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
| **sandboxServicesUpdateRequest** | [SandboxServicesUpdateRequest](SandboxServicesUpdateRequest.md) |  | |

### Return type

[**SuccessSandboxServicesResponse**](SuccessSandboxServicesResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Sandbox services updated |  -  |
| **400** | Invalid sandbox services |  -  |
| **429** | The admission control applicable to this route and deployment topology rejected the request. &#x60;error.code&#x60; is &#x60;quota_exceeded&#x60; for a team-attributed Team Quota such as &#x60;active_request_count&#x60;, &#x60;active_connection_count&#x60;, &#x60;api_requests&#x60;, or a traffic-byte rate, &#x60;identity_limit_exceeded&#x60; for an IdentityResourceGuard cardinality limit, or &#x60;rate_limited&#x60; for an aggregate overload guard. A given route does not necessarily use every control.  |  * Retry-After - Suggested delay in seconds when token-bucket or overload admission provides one; identity cardinality rejections may omit it <br>  |
| **503** | The fail-closed admission backend applicable to this route is unavailable. Depending on deployment topology, this is the region Team Quota policy or Redis path, or the public identity entrypoint\&#39;s shared overload-guard backend; a given route does not necessarily use both.  |  * Retry-After - Suggested retry delay in seconds <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdStatusGet

> SuccessSandboxStatusResponse apiV1SandboxesIdStatusGet(id)

Get sandbox status

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdStatusGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiV1SandboxesIdStatusGetRequest;

  try {
    const data = await api.apiV1SandboxesIdStatusGet(body);
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

[**SuccessSandboxStatusResponse**](SuccessSandboxStatusResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Sandbox status |  -  |
| **404** | Not found |  -  |
| **429** | The admission control applicable to this route and deployment topology rejected the request. &#x60;error.code&#x60; is &#x60;quota_exceeded&#x60; for a team-attributed Team Quota such as &#x60;active_request_count&#x60;, &#x60;active_connection_count&#x60;, &#x60;api_requests&#x60;, or a traffic-byte rate, &#x60;identity_limit_exceeded&#x60; for an IdentityResourceGuard cardinality limit, or &#x60;rate_limited&#x60; for an aggregate overload guard. A given route does not necessarily use every control.  |  * Retry-After - Suggested delay in seconds when token-bucket or overload admission provides one; identity cardinality rejections may omit it <br>  |
| **503** | The fail-closed admission backend applicable to this route is unavailable. Depending on deployment topology, this is the region Team Quota policy or Redis path, or the public identity entrypoint\&#39;s shared overload-guard backend; a given route does not necessarily use both.  |  * Retry-After - Suggested retry delay in seconds <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesPost

> SuccessClaimResponse apiV1SandboxesPost(claimRequest)

Create (claim) a sandbox

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // ClaimRequest
    claimRequest: ...,
  } satisfies ApiV1SandboxesPostRequest;

  try {
    const data = await api.apiV1SandboxesPost(body);
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
| **claimRequest** | [ClaimRequest](ClaimRequest.md) |  | |

### Return type

[**SuccessClaimResponse**](SuccessClaimResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Sandbox claimed |  -  |
| **400** | Invalid request |  -  |
| **409** | The selected template is still creating or its creation failed |  * Retry-After - Suggested retry delay in seconds when template creation is still in progress <br>  |
| **429** | Team quota exceeded or claim/start admission throttled |  * Retry-After - Suggested retry delay in seconds when claim/start admission is throttled <br>  |
| **503** | Data plane temporarily unavailable |  * Retry-After - Suggested retry delay in seconds <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
