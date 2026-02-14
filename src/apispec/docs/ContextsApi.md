# ContextsApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1SandboxesIdContextsCtxIdDelete**](ContextsApi.md#apiv1sandboxesidcontextsctxiddelete) | **DELETE** /api/v1/sandboxes/{id}/contexts/{ctx_id} | Delete context |
| [**apiV1SandboxesIdContextsCtxIdExecPost**](ContextsApi.md#apiv1sandboxesidcontextsctxidexecpost) | **POST** /api/v1/sandboxes/{id}/contexts/{ctx_id}/exec | Execute context input (sync) |
| [**apiV1SandboxesIdContextsCtxIdGet**](ContextsApi.md#apiv1sandboxesidcontextsctxidget) | **GET** /api/v1/sandboxes/{id}/contexts/{ctx_id} | Get context |
| [**apiV1SandboxesIdContextsCtxIdInputPost**](ContextsApi.md#apiv1sandboxesidcontextsctxidinputpost) | **POST** /api/v1/sandboxes/{id}/contexts/{ctx_id}/input | Send input to context |
| [**apiV1SandboxesIdContextsCtxIdResizePost**](ContextsApi.md#apiv1sandboxesidcontextsctxidresizepost) | **POST** /api/v1/sandboxes/{id}/contexts/{ctx_id}/resize | Resize context PTY |
| [**apiV1SandboxesIdContextsCtxIdRestartPost**](ContextsApi.md#apiv1sandboxesidcontextsctxidrestartpost) | **POST** /api/v1/sandboxes/{id}/contexts/{ctx_id}/restart | Restart context |
| [**apiV1SandboxesIdContextsCtxIdSignalPost**](ContextsApi.md#apiv1sandboxesidcontextsctxidsignalpost) | **POST** /api/v1/sandboxes/{id}/contexts/{ctx_id}/signal | Send signal to context |
| [**apiV1SandboxesIdContextsCtxIdStatsGet**](ContextsApi.md#apiv1sandboxesidcontextsctxidstatsget) | **GET** /api/v1/sandboxes/{id}/contexts/{ctx_id}/stats | Get context stats |
| [**apiV1SandboxesIdContextsCtxIdWsGet**](ContextsApi.md#apiv1sandboxesidcontextsctxidwsget) | **GET** /api/v1/sandboxes/{id}/contexts/{ctx_id}/ws | Context WebSocket (I/O) |
| [**apiV1SandboxesIdContextsGet**](ContextsApi.md#apiv1sandboxesidcontextsget) | **GET** /api/v1/sandboxes/{id}/contexts | List contexts |
| [**apiV1SandboxesIdContextsPost**](ContextsApi.md#apiv1sandboxesidcontextspost) | **POST** /api/v1/sandboxes/{id}/contexts | Create a context |



## apiV1SandboxesIdContextsCtxIdDelete

> SuccessDeletedResponse apiV1SandboxesIdContextsCtxIdDelete(id, ctxId)

Delete context

### Example

```ts
import {
  Configuration,
  ContextsApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdContextsCtxIdDeleteRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ContextsApi(config);

  const body = {
    // string
    id: id_example,
    // string
    ctxId: ctxId_example,
  } satisfies ApiV1SandboxesIdContextsCtxIdDeleteRequest;

  try {
    const data = await api.apiV1SandboxesIdContextsCtxIdDelete(body);
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
| **ctxId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SuccessDeletedResponse**](SuccessDeletedResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Context deleted |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdContextsCtxIdExecPost

> SuccessContextExecResponse apiV1SandboxesIdContextsCtxIdExecPost(id, ctxId, contextInputRequest)

Execute context input (sync)

Sends input and blocks until the context completes or times out.

### Example

```ts
import {
  Configuration,
  ContextsApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdContextsCtxIdExecPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ContextsApi(config);

  const body = {
    // string
    id: id_example,
    // string
    ctxId: ctxId_example,
    // ContextInputRequest
    contextInputRequest: ...,
  } satisfies ApiV1SandboxesIdContextsCtxIdExecPostRequest;

  try {
    const data = await api.apiV1SandboxesIdContextsCtxIdExecPost(body);
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
| **ctxId** | `string` |  | [Defaults to `undefined`] |
| **contextInputRequest** | [ContextInputRequest](ContextInputRequest.md) |  | |

### Return type

[**SuccessContextExecResponse**](SuccessContextExecResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Execution completed |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdContextsCtxIdGet

> SuccessContextResponse apiV1SandboxesIdContextsCtxIdGet(id, ctxId)

Get context

### Example

```ts
import {
  Configuration,
  ContextsApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdContextsCtxIdGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ContextsApi(config);

  const body = {
    // string
    id: id_example,
    // string
    ctxId: ctxId_example,
  } satisfies ApiV1SandboxesIdContextsCtxIdGetRequest;

  try {
    const data = await api.apiV1SandboxesIdContextsCtxIdGet(body);
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
| **ctxId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SuccessContextResponse**](SuccessContextResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Context |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdContextsCtxIdInputPost

> SuccessWrittenResponse apiV1SandboxesIdContextsCtxIdInputPost(id, ctxId, contextInputRequest)

Send input to context

### Example

```ts
import {
  Configuration,
  ContextsApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdContextsCtxIdInputPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ContextsApi(config);

  const body = {
    // string
    id: id_example,
    // string
    ctxId: ctxId_example,
    // ContextInputRequest
    contextInputRequest: ...,
  } satisfies ApiV1SandboxesIdContextsCtxIdInputPostRequest;

  try {
    const data = await api.apiV1SandboxesIdContextsCtxIdInputPost(body);
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
| **ctxId** | `string` |  | [Defaults to `undefined`] |
| **contextInputRequest** | [ContextInputRequest](ContextInputRequest.md) |  | |

### Return type

[**SuccessWrittenResponse**](SuccessWrittenResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Input written |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdContextsCtxIdResizePost

> SuccessResizedResponse apiV1SandboxesIdContextsCtxIdResizePost(id, ctxId, resizeContextRequest)

Resize context PTY

### Example

```ts
import {
  Configuration,
  ContextsApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdContextsCtxIdResizePostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ContextsApi(config);

  const body = {
    // string
    id: id_example,
    // string
    ctxId: ctxId_example,
    // ResizeContextRequest
    resizeContextRequest: ...,
  } satisfies ApiV1SandboxesIdContextsCtxIdResizePostRequest;

  try {
    const data = await api.apiV1SandboxesIdContextsCtxIdResizePost(body);
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
| **ctxId** | `string` |  | [Defaults to `undefined`] |
| **resizeContextRequest** | [ResizeContextRequest](ResizeContextRequest.md) |  | |

### Return type

[**SuccessResizedResponse**](SuccessResizedResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Resized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdContextsCtxIdRestartPost

> SuccessContextResponse apiV1SandboxesIdContextsCtxIdRestartPost(id, ctxId)

Restart context

### Example

```ts
import {
  Configuration,
  ContextsApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdContextsCtxIdRestartPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ContextsApi(config);

  const body = {
    // string
    id: id_example,
    // string
    ctxId: ctxId_example,
  } satisfies ApiV1SandboxesIdContextsCtxIdRestartPostRequest;

  try {
    const data = await api.apiV1SandboxesIdContextsCtxIdRestartPost(body);
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
| **ctxId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SuccessContextResponse**](SuccessContextResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Context restarted |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdContextsCtxIdSignalPost

> SuccessSignaledResponse apiV1SandboxesIdContextsCtxIdSignalPost(id, ctxId, signalContextRequest)

Send signal to context

### Example

```ts
import {
  Configuration,
  ContextsApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdContextsCtxIdSignalPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ContextsApi(config);

  const body = {
    // string
    id: id_example,
    // string
    ctxId: ctxId_example,
    // SignalContextRequest
    signalContextRequest: ...,
  } satisfies ApiV1SandboxesIdContextsCtxIdSignalPostRequest;

  try {
    const data = await api.apiV1SandboxesIdContextsCtxIdSignalPost(body);
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
| **ctxId** | `string` |  | [Defaults to `undefined`] |
| **signalContextRequest** | [SignalContextRequest](SignalContextRequest.md) |  | |

### Return type

[**SuccessSignaledResponse**](SuccessSignaledResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Signal sent |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdContextsCtxIdStatsGet

> SuccessContextStatsResponse apiV1SandboxesIdContextsCtxIdStatsGet(id, ctxId)

Get context stats

### Example

```ts
import {
  Configuration,
  ContextsApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdContextsCtxIdStatsGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ContextsApi(config);

  const body = {
    // string
    id: id_example,
    // string
    ctxId: ctxId_example,
  } satisfies ApiV1SandboxesIdContextsCtxIdStatsGetRequest;

  try {
    const data = await api.apiV1SandboxesIdContextsCtxIdStatsGet(body);
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
| **ctxId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SuccessContextStatsResponse**](SuccessContextStatsResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Context stats |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdContextsCtxIdWsGet

> apiV1SandboxesIdContextsCtxIdWsGet(id, ctxId)

Context WebSocket (I/O)

Upgrades to WebSocket for streaming I/O. Client messages (JSON): - { \&quot;type\&quot;: \&quot;input\&quot;, \&quot;data\&quot;: \&quot;ls\\n\&quot;, \&quot;request_id\&quot;: \&quot;req-1\&quot; } - { \&quot;type\&quot;: \&quot;resize\&quot;, \&quot;rows\&quot;: 24, \&quot;cols\&quot;: 80 } - { \&quot;type\&quot;: \&quot;signal\&quot;, \&quot;signal\&quot;: \&quot;INT\&quot; } Server messages (JSON): - { \&quot;type\&quot;: \&quot;output\&quot;, \&quot;source\&quot;: \&quot;stdout\&quot;, \&quot;data\&quot;: \&quot;hello\\n\&quot; } 

### Example

```ts
import {
  Configuration,
  ContextsApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdContextsCtxIdWsGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ContextsApi(config);

  const body = {
    // string
    id: id_example,
    // string
    ctxId: ctxId_example,
  } satisfies ApiV1SandboxesIdContextsCtxIdWsGetRequest;

  try {
    const data = await api.apiV1SandboxesIdContextsCtxIdWsGet(body);
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
| **ctxId** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **101** | Switching Protocols |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdContextsGet

> SuccessContextListResponse apiV1SandboxesIdContextsGet(id)

List contexts

### Example

```ts
import {
  Configuration,
  ContextsApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdContextsGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ContextsApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiV1SandboxesIdContextsGetRequest;

  try {
    const data = await api.apiV1SandboxesIdContextsGet(body);
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

[**SuccessContextListResponse**](SuccessContextListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Context list |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdContextsPost

> SuccessContextResponse apiV1SandboxesIdContextsPost(id, createContextRequest)

Create a context

### Example

```ts
import {
  Configuration,
  ContextsApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdContextsPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ContextsApi(config);

  const body = {
    // string
    id: id_example,
    // CreateContextRequest
    createContextRequest: ...,
  } satisfies ApiV1SandboxesIdContextsPostRequest;

  try {
    const data = await api.apiV1SandboxesIdContextsPost(body);
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
| **createContextRequest** | [CreateContextRequest](CreateContextRequest.md) |  | |

### Return type

[**SuccessContextResponse**](SuccessContextResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Context created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

