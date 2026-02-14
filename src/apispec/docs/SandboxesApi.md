# SandboxesApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1SandboxesIdDelete**](SandboxesApi.md#apiv1sandboxesiddelete) | **DELETE** /api/v1/sandboxes/{id} | Delete (terminate) a sandbox |
| [**apiV1SandboxesIdExposedPortsDelete**](SandboxesApi.md#apiv1sandboxesidexposedportsdelete) | **DELETE** /api/v1/sandboxes/{id}/exposed-ports | Clear all exposed ports |
| [**apiV1SandboxesIdExposedPortsGet**](SandboxesApi.md#apiv1sandboxesidexposedportsget) | **GET** /api/v1/sandboxes/{id}/exposed-ports | Get sandbox exposed ports |
| [**apiV1SandboxesIdExposedPortsPortDelete**](SandboxesApi.md#apiv1sandboxesidexposedportsportdelete) | **DELETE** /api/v1/sandboxes/{id}/exposed-ports/{port} | Remove a specific exposed port |
| [**apiV1SandboxesIdExposedPortsPut**](SandboxesApi.md#apiv1sandboxesidexposedportsput) | **PUT** /api/v1/sandboxes/{id}/exposed-ports | Update sandbox exposed ports |
| [**apiV1SandboxesIdGet**](SandboxesApi.md#apiv1sandboxesidget) | **GET** /api/v1/sandboxes/{id} | Get sandbox by ID |
| [**apiV1SandboxesIdNetworkGet**](SandboxesApi.md#apiv1sandboxesidnetworkget) | **GET** /api/v1/sandboxes/{id}/network | Get sandbox network policy |
| [**apiV1SandboxesIdNetworkPut**](SandboxesApi.md#apiv1sandboxesidnetworkput) | **PUT** /api/v1/sandboxes/{id}/network | Update sandbox network policy |
| [**apiV1SandboxesIdPausePost**](SandboxesApi.md#apiv1sandboxesidpausepost) | **POST** /api/v1/sandboxes/{id}/pause | Pause a sandbox |
| [**apiV1SandboxesIdPut**](SandboxesApi.md#apiv1sandboxesidput) | **PUT** /api/v1/sandboxes/{id} | Update sandbox configuration |
| [**apiV1SandboxesIdRefreshPost**](SandboxesApi.md#apiv1sandboxesidrefreshpost) | **POST** /api/v1/sandboxes/{id}/refresh | Refresh sandbox TTL |
| [**apiV1SandboxesIdResumePost**](SandboxesApi.md#apiv1sandboxesidresumepost) | **POST** /api/v1/sandboxes/{id}/resume | Resume a sandbox |
| [**apiV1SandboxesIdStatusGet**](SandboxesApi.md#apiv1sandboxesidstatusget) | **GET** /api/v1/sandboxes/{id}/status | Get sandbox status |
| [**apiV1SandboxesPost**](SandboxesApi.md#apiv1sandboxespost) | **POST** /api/v1/sandboxes | Create (claim) a sandbox |



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

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdExposedPortsDelete

> SuccessExposedPortsResponse apiV1SandboxesIdExposedPortsDelete(id)

Clear all exposed ports

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdExposedPortsDeleteRequest } from 'sandbox0';

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
  } satisfies ApiV1SandboxesIdExposedPortsDeleteRequest;

  try {
    const data = await api.apiV1SandboxesIdExposedPortsDelete(body);
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

[**SuccessExposedPortsResponse**](SuccessExposedPortsResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Exposed ports cleared |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdExposedPortsGet

> SuccessExposedPortsResponse apiV1SandboxesIdExposedPortsGet(id)

Get sandbox exposed ports

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdExposedPortsGetRequest } from 'sandbox0';

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
  } satisfies ApiV1SandboxesIdExposedPortsGetRequest;

  try {
    const data = await api.apiV1SandboxesIdExposedPortsGet(body);
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

[**SuccessExposedPortsResponse**](SuccessExposedPortsResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Exposed ports |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdExposedPortsPortDelete

> SuccessExposedPortsResponse apiV1SandboxesIdExposedPortsPortDelete(id, port)

Remove a specific exposed port

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdExposedPortsPortDeleteRequest } from 'sandbox0';

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
    // number
    port: 56,
  } satisfies ApiV1SandboxesIdExposedPortsPortDeleteRequest;

  try {
    const data = await api.apiV1SandboxesIdExposedPortsPortDelete(body);
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
| **port** | `number` |  | [Defaults to `undefined`] |

### Return type

[**SuccessExposedPortsResponse**](SuccessExposedPortsResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Exposed port removed |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdExposedPortsPut

> SuccessExposedPortsResponse apiV1SandboxesIdExposedPortsPut(id, updateExposedPortsRequest)

Update sandbox exposed ports

Replaces all exposed ports for the sandbox. Used to control which ports are publicly accessible via the exposure domain. 

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdExposedPortsPutRequest } from 'sandbox0';

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
    // UpdateExposedPortsRequest
    updateExposedPortsRequest: ...,
  } satisfies ApiV1SandboxesIdExposedPortsPutRequest;

  try {
    const data = await api.apiV1SandboxesIdExposedPortsPut(body);
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
| **updateExposedPortsRequest** | [UpdateExposedPortsRequest](UpdateExposedPortsRequest.md) |  | |

### Return type

[**SuccessExposedPortsResponse**](SuccessExposedPortsResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Exposed ports updated |  -  |
| **404** | Not found |  -  |

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

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdNetworkPut

> SuccessSandboxNetworkPolicyResponse apiV1SandboxesIdNetworkPut(id, tplSandboxNetworkPolicy)

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
    // TplSandboxNetworkPolicy
    tplSandboxNetworkPolicy: ...,
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
| **tplSandboxNetworkPolicy** | [TplSandboxNetworkPolicy](TplSandboxNetworkPolicy.md) |  | |

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

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdRefreshPost

> SuccessRefreshResponse apiV1SandboxesIdRefreshPost(id, refreshRequest)

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
    // RefreshRequest (optional)
    refreshRequest: ...,
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
| **refreshRequest** | [RefreshRequest](RefreshRequest.md) |  | [Optional] |

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
| **404** | Not found |  -  |

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

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

