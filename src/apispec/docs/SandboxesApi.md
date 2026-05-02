# SandboxesApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1SandboxesGet**](SandboxesApi.md#apiv1sandboxesget) | **GET** /api/v1/sandboxes | List sandboxes |
| [**apiV1SandboxesIdDelete**](SandboxesApi.md#apiv1sandboxesiddelete) | **DELETE** /api/v1/sandboxes/{id} | Delete (terminate) a sandbox |
| [**apiV1SandboxesIdExposedPortsDelete**](SandboxesApi.md#apiv1sandboxesidexposedportsdelete) | **DELETE** /api/v1/sandboxes/{id}/exposed-ports | Clear all exposed ports |
| [**apiV1SandboxesIdExposedPortsGet**](SandboxesApi.md#apiv1sandboxesidexposedportsget) | **GET** /api/v1/sandboxes/{id}/exposed-ports | Get sandbox exposed ports |
| [**apiV1SandboxesIdExposedPortsPortDelete**](SandboxesApi.md#apiv1sandboxesidexposedportsportdelete) | **DELETE** /api/v1/sandboxes/{id}/exposed-ports/{port} | Remove a specific exposed port |
| [**apiV1SandboxesIdExposedPortsPut**](SandboxesApi.md#apiv1sandboxesidexposedportsput) | **PUT** /api/v1/sandboxes/{id}/exposed-ports | Update sandbox exposed ports |
| [**apiV1SandboxesIdGet**](SandboxesApi.md#apiv1sandboxesidget) | **GET** /api/v1/sandboxes/{id} | Get sandbox by ID |
| [**apiV1SandboxesIdLogsGet**](SandboxesApi.md#apiv1sandboxesidlogsget) | **GET** /api/v1/sandboxes/{id}/logs | Get sandbox process logs |
| [**apiV1SandboxesIdNetworkGet**](SandboxesApi.md#apiv1sandboxesidnetworkget) | **GET** /api/v1/sandboxes/{id}/network | Get sandbox network policy |
| [**apiV1SandboxesIdNetworkPut**](SandboxesApi.md#apiv1sandboxesidnetworkput) | **PUT** /api/v1/sandboxes/{id}/network | Update sandbox network policy |
| [**apiV1SandboxesIdPausePost**](SandboxesApi.md#apiv1sandboxesidpausepost) | **POST** /api/v1/sandboxes/{id}/pause | Pause a sandbox |
| [**apiV1SandboxesIdPublicGatewayGet**](SandboxesApi.md#apiv1sandboxesidpublicgatewayget) | **GET** /api/v1/sandboxes/{id}/public-gateway | Get sandbox public gateway policy |
| [**apiV1SandboxesIdPublicGatewayPut**](SandboxesApi.md#apiv1sandboxesidpublicgatewayput) | **PUT** /api/v1/sandboxes/{id}/public-gateway | Update sandbox public gateway policy |
| [**apiV1SandboxesIdPut**](SandboxesApi.md#apiv1sandboxesidput) | **PUT** /api/v1/sandboxes/{id} | Update sandbox configuration |
| [**apiV1SandboxesIdRefreshPost**](SandboxesApi.md#apiv1sandboxesidrefreshpost) | **POST** /api/v1/sandboxes/{id}/refresh | Refresh sandbox TTL |
| [**apiV1SandboxesIdResumePost**](SandboxesApi.md#apiv1sandboxesidresumepost) | **POST** /api/v1/sandboxes/{id}/resume | Resume a sandbox |
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
    // 'starting' | 'running' | 'failed' | 'completed' | Filter by sandbox status (optional)
    status: status_example,
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
| **status** | `starting`, `running`, `failed`, `completed` | Filter by sandbox status | [Optional] [Defaults to `undefined`] [Enum: starting, running, failed, completed] |
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


## apiV1SandboxesIdLogsGet

> string apiV1SandboxesIdLogsGet(id, container, tailLines, limitBytes, follow, previous, timestamps, sinceSeconds)

Get sandbox process logs

Returns sandbox process output mirrored through the sandbox main container. Procd service logs are filtered out and remain available through Kubernetes pod logs. When &#x60;follow&#x3D;false&#x60;, the response is a bounded text/plain snapshot. When &#x60;follow&#x3D;true&#x60;, the response is a text/plain stream until the client disconnects. Kubernetes log selection parameters such as &#x60;tail_lines&#x60; and &#x60;limit_bytes&#x60; are applied before procd service log filtering.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdLogsGetRequest } from 'sandbox0';

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
    // string | Pod container name. Defaults to the sandbox main container. (optional)
    container: container_example,
    // number | Maximum number of Kubernetes log lines read from the end of the log before procd service log filtering. (optional)
    tailLines: 789,
    // number | Maximum response log payload bytes read from Kubernetes. Defaults only apply when follow is false. (optional)
    limitBytes: 789,
    // boolean | Stream logs as text/plain until the client disconnects. When false, return a text/plain snapshot. (optional)
    follow: true,
    // boolean | Return logs for the previously terminated container instance. (optional)
    previous: true,
    // boolean | Include Kubernetes log timestamps when available. (optional)
    timestamps: true,
    // number | Only return logs newer than this many seconds. (optional)
    sinceSeconds: 789,
  } satisfies ApiV1SandboxesIdLogsGetRequest;

  try {
    const data = await api.apiV1SandboxesIdLogsGet(body);
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
| **container** | `string` | Pod container name. Defaults to the sandbox main container. | [Optional] [Defaults to `&#39;procd&#39;`] |
| **tailLines** | `number` | Maximum number of Kubernetes log lines read from the end of the log before procd service log filtering. | [Optional] [Defaults to `200`] |
| **limitBytes** | `number` | Maximum response log payload bytes read from Kubernetes. Defaults only apply when follow is false. | [Optional] [Defaults to `1048576`] |
| **follow** | `boolean` | Stream logs as text/plain until the client disconnects. When false, return a text/plain snapshot. | [Optional] [Defaults to `false`] |
| **previous** | `boolean` | Return logs for the previously terminated container instance. | [Optional] [Defaults to `false`] |
| **timestamps** | `boolean` | Include Kubernetes log timestamps when available. | [Optional] [Defaults to `false`] |
| **sinceSeconds** | `number` | Only return logs newer than this many seconds. | [Optional] [Defaults to `undefined`] |

### Return type

**string**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/plain`, `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Sandbox process logs |  * X-Sandbox-ID - Sandbox ID for the returned log payload. <br>  * X-Sandbox-Pod-Name - Kubernetes pod name that produced the returned log payload. <br>  * X-Sandbox-Log-Container - Kubernetes container name that produced the returned log payload. <br>  * X-Sandbox-Log-Previous - Whether the returned payload came from a previously terminated container instance. <br>  |
| **400** | Invalid log query parameters |  -  |
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
| **409** | Pause was superseded by a newer power transition |  -  |
| **504** | Timed out waiting for the sandbox to pause |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdPublicGatewayGet

> SuccessPublicGatewayResponse apiV1SandboxesIdPublicGatewayGet(id)

Get sandbox public gateway policy

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdPublicGatewayGetRequest } from 'sandbox0';

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
  } satisfies ApiV1SandboxesIdPublicGatewayGetRequest;

  try {
    const data = await api.apiV1SandboxesIdPublicGatewayGet(body);
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

[**SuccessPublicGatewayResponse**](SuccessPublicGatewayResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Public gateway policy |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdPublicGatewayPut

> SuccessPublicGatewayResponse apiV1SandboxesIdPublicGatewayPut(id, publicGatewayConfig)

Update sandbox public gateway policy

Replaces the request-level public gateway policy for sandbox public traffic. When enabled, matching routes control method, path, authentication, CORS, per-route rate limits, timeout, rewrite, and paused sandbox auto-resume.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdPublicGatewayPutRequest } from 'sandbox0';

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
    // PublicGatewayConfig
    publicGatewayConfig: ...,
  } satisfies ApiV1SandboxesIdPublicGatewayPutRequest;

  try {
    const data = await api.apiV1SandboxesIdPublicGatewayPut(body);
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
| **publicGatewayConfig** | [PublicGatewayConfig](PublicGatewayConfig.md) |  | |

### Return type

[**SuccessPublicGatewayResponse**](SuccessPublicGatewayResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Public gateway policy updated |  -  |
| **400** | Invalid public gateway policy |  -  |
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
| **409** | Resume was superseded by a newer power transition |  -  |
| **504** | Timed out waiting for the sandbox to resume |  -  |
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

