# FunctionsApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1FunctionsGet**](FunctionsApi.md#apiv1functionsget) | **GET** /api/v1/functions | List functions |
| [**apiV1FunctionsIdAliasesAliasGet**](FunctionsApi.md#apiv1functionsidaliasesaliasget) | **GET** /api/v1/functions/{id}/aliases/{alias} | Get function alias |
| [**apiV1FunctionsIdAliasesAliasPut**](FunctionsApi.md#apiv1functionsidaliasesaliasput) | **PUT** /api/v1/functions/{id}/aliases/{alias} | Point a function alias at a revision |
| [**apiV1FunctionsIdAliasesGet**](FunctionsApi.md#apiv1functionsidaliasesget) | **GET** /api/v1/functions/{id}/aliases | List function aliases |
| [**apiV1FunctionsIdDelete**](FunctionsApi.md#apiv1functionsiddelete) | **DELETE** /api/v1/functions/{id} | Delete function |
| [**apiV1FunctionsIdGet**](FunctionsApi.md#apiv1functionsidget) | **GET** /api/v1/functions/{id} | Get function |
| [**apiV1FunctionsIdPut**](FunctionsApi.md#apiv1functionsidput) | **PUT** /api/v1/functions/{id} | Update function lifecycle state |
| [**apiV1FunctionsIdRevisionsGet**](FunctionsApi.md#apiv1functionsidrevisionsget) | **GET** /api/v1/functions/{id}/revisions | List function revisions |
| [**apiV1FunctionsIdRevisionsPost**](FunctionsApi.md#apiv1functionsidrevisionspost) | **POST** /api/v1/functions/{id}/revisions | Create function revision from a sandbox service |
| [**apiV1FunctionsIdRevisionsRevisionNumberGet**](FunctionsApi.md#apiv1functionsidrevisionsrevisionnumberget) | **GET** /api/v1/functions/{id}/revisions/{revision_number} | Get function revision |
| [**apiV1FunctionsIdRuntimeGet**](FunctionsApi.md#apiv1functionsidruntimeget) | **GET** /api/v1/functions/{id}/runtime | Get active function runtime |
| [**apiV1FunctionsIdRuntimeRecyclePost**](FunctionsApi.md#apiv1functionsidruntimerecyclepost) | **POST** /api/v1/functions/{id}/runtime/recycle | Recycle active function runtime |
| [**apiV1FunctionsIdRuntimeRestartPost**](FunctionsApi.md#apiv1functionsidruntimerestartpost) | **POST** /api/v1/functions/{id}/runtime/restart | Restart active function runtime |
| [**apiV1FunctionsPost**](FunctionsApi.md#apiv1functionspost) | **POST** /api/v1/functions | Create a function from a sandbox service |



## apiV1FunctionsGet

> SuccessFunctionListResponse apiV1FunctionsGet()

List functions

### Example

```ts
import {
  Configuration,
  FunctionsApi,
} from 'sandbox0';
import type { ApiV1FunctionsGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FunctionsApi(config);

  try {
    const data = await api.apiV1FunctionsGet();
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

[**SuccessFunctionListResponse**](SuccessFunctionListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Functions |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1FunctionsIdAliasesAliasGet

> SuccessFunctionAliasResponse apiV1FunctionsIdAliasesAliasGet(id, alias)

Get function alias

### Example

```ts
import {
  Configuration,
  FunctionsApi,
} from 'sandbox0';
import type { ApiV1FunctionsIdAliasesAliasGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FunctionsApi(config);

  const body = {
    // string
    id: id_example,
    // string
    alias: alias_example,
  } satisfies ApiV1FunctionsIdAliasesAliasGetRequest;

  try {
    const data = await api.apiV1FunctionsIdAliasesAliasGet(body);
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
| **alias** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SuccessFunctionAliasResponse**](SuccessFunctionAliasResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Function alias |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1FunctionsIdAliasesAliasPut

> SuccessFunctionAliasResponse apiV1FunctionsIdAliasesAliasPut(id, alias, functionAliasUpdateRequest)

Point a function alias at a revision

### Example

```ts
import {
  Configuration,
  FunctionsApi,
} from 'sandbox0';
import type { ApiV1FunctionsIdAliasesAliasPutRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FunctionsApi(config);

  const body = {
    // string
    id: id_example,
    // string
    alias: alias_example,
    // FunctionAliasUpdateRequest
    functionAliasUpdateRequest: ...,
  } satisfies ApiV1FunctionsIdAliasesAliasPutRequest;

  try {
    const data = await api.apiV1FunctionsIdAliasesAliasPut(body);
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
| **alias** | `string` |  | [Defaults to `undefined`] |
| **functionAliasUpdateRequest** | [FunctionAliasUpdateRequest](FunctionAliasUpdateRequest.md) |  | |

### Return type

[**SuccessFunctionAliasResponse**](SuccessFunctionAliasResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Alias updated |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1FunctionsIdAliasesGet

> SuccessFunctionAliasListResponse apiV1FunctionsIdAliasesGet(id)

List function aliases

### Example

```ts
import {
  Configuration,
  FunctionsApi,
} from 'sandbox0';
import type { ApiV1FunctionsIdAliasesGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FunctionsApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiV1FunctionsIdAliasesGetRequest;

  try {
    const data = await api.apiV1FunctionsIdAliasesGet(body);
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

[**SuccessFunctionAliasListResponse**](SuccessFunctionAliasListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Function aliases |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1FunctionsIdDelete

> SuccessFunctionResponse apiV1FunctionsIdDelete(id)

Delete function

Soft-deletes the function, disables its host, and schedules best-effort runtime and revision volume cleanup. The function slug and domain label remain reserved.

### Example

```ts
import {
  Configuration,
  FunctionsApi,
} from 'sandbox0';
import type { ApiV1FunctionsIdDeleteRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FunctionsApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiV1FunctionsIdDeleteRequest;

  try {
    const data = await api.apiV1FunctionsIdDelete(body);
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

[**SuccessFunctionResponse**](SuccessFunctionResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Function deleted |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1FunctionsIdGet

> SuccessFunctionResponse apiV1FunctionsIdGet(id)

Get function

### Example

```ts
import {
  Configuration,
  FunctionsApi,
} from 'sandbox0';
import type { ApiV1FunctionsIdGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FunctionsApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiV1FunctionsIdGetRequest;

  try {
    const data = await api.apiV1FunctionsIdGet(body);
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

[**SuccessFunctionResponse**](SuccessFunctionResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Function |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1FunctionsIdPut

> SuccessFunctionResponse apiV1FunctionsIdPut(id, functionUpdateRequest)

Update function lifecycle state

### Example

```ts
import {
  Configuration,
  FunctionsApi,
} from 'sandbox0';
import type { ApiV1FunctionsIdPutRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FunctionsApi(config);

  const body = {
    // string
    id: id_example,
    // FunctionUpdateRequest
    functionUpdateRequest: ...,
  } satisfies ApiV1FunctionsIdPutRequest;

  try {
    const data = await api.apiV1FunctionsIdPut(body);
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
| **functionUpdateRequest** | [FunctionUpdateRequest](FunctionUpdateRequest.md) |  | |

### Return type

[**SuccessFunctionResponse**](SuccessFunctionResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Function updated |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1FunctionsIdRevisionsGet

> SuccessFunctionRevisionListResponse apiV1FunctionsIdRevisionsGet(id)

List function revisions

### Example

```ts
import {
  Configuration,
  FunctionsApi,
} from 'sandbox0';
import type { ApiV1FunctionsIdRevisionsGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FunctionsApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiV1FunctionsIdRevisionsGetRequest;

  try {
    const data = await api.apiV1FunctionsIdRevisionsGet(body);
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

[**SuccessFunctionRevisionListResponse**](SuccessFunctionRevisionListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Function revisions |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1FunctionsIdRevisionsPost

> SuccessFunctionRevisionCreateResponse apiV1FunctionsIdRevisionsPost(id, functionRevisionCreateRequest)

Create function revision from a sandbox service

### Example

```ts
import {
  Configuration,
  FunctionsApi,
} from 'sandbox0';
import type { ApiV1FunctionsIdRevisionsPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FunctionsApi(config);

  const body = {
    // string
    id: id_example,
    // FunctionRevisionCreateRequest
    functionRevisionCreateRequest: ...,
  } satisfies ApiV1FunctionsIdRevisionsPostRequest;

  try {
    const data = await api.apiV1FunctionsIdRevisionsPost(body);
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
| **functionRevisionCreateRequest** | [FunctionRevisionCreateRequest](FunctionRevisionCreateRequest.md) |  | |

### Return type

[**SuccessFunctionRevisionCreateResponse**](SuccessFunctionRevisionCreateResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Revision created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1FunctionsIdRevisionsRevisionNumberGet

> SuccessFunctionRevisionResponse apiV1FunctionsIdRevisionsRevisionNumberGet(id, revisionNumber)

Get function revision

### Example

```ts
import {
  Configuration,
  FunctionsApi,
} from 'sandbox0';
import type { ApiV1FunctionsIdRevisionsRevisionNumberGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FunctionsApi(config);

  const body = {
    // string
    id: id_example,
    // number
    revisionNumber: 56,
  } satisfies ApiV1FunctionsIdRevisionsRevisionNumberGetRequest;

  try {
    const data = await api.apiV1FunctionsIdRevisionsRevisionNumberGet(body);
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
| **revisionNumber** | `number` |  | [Defaults to `undefined`] |

### Return type

[**SuccessFunctionRevisionResponse**](SuccessFunctionRevisionResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Function revision |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1FunctionsIdRuntimeGet

> SuccessFunctionRuntimeResponse apiV1FunctionsIdRuntimeGet(id)

Get active function runtime

### Example

```ts
import {
  Configuration,
  FunctionsApi,
} from 'sandbox0';
import type { ApiV1FunctionsIdRuntimeGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FunctionsApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiV1FunctionsIdRuntimeGetRequest;

  try {
    const data = await api.apiV1FunctionsIdRuntimeGet(body);
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

[**SuccessFunctionRuntimeResponse**](SuccessFunctionRuntimeResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Function runtime status |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1FunctionsIdRuntimeRecyclePost

> SuccessFunctionRuntimeResponse apiV1FunctionsIdRuntimeRecyclePost(id)

Recycle active function runtime

Deletes the current restored runtime pool when one exists and clears the runtime mapping; the next function request starts fresh runtime instances.

### Example

```ts
import {
  Configuration,
  FunctionsApi,
} from 'sandbox0';
import type { ApiV1FunctionsIdRuntimeRecyclePostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FunctionsApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiV1FunctionsIdRuntimeRecyclePostRequest;

  try {
    const data = await api.apiV1FunctionsIdRuntimeRecyclePost(body);
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

[**SuccessFunctionRuntimeResponse**](SuccessFunctionRuntimeResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Function runtime recycled |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1FunctionsIdRuntimeRestartPost

> SuccessFunctionRuntimeResponse apiV1FunctionsIdRuntimeRestartPost(id)

Restart active function runtime

Deletes the current restored runtime pool when one exists and clears the runtime mapping; the next function request starts fresh runtime instances.

### Example

```ts
import {
  Configuration,
  FunctionsApi,
} from 'sandbox0';
import type { ApiV1FunctionsIdRuntimeRestartPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FunctionsApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiV1FunctionsIdRuntimeRestartPostRequest;

  try {
    const data = await api.apiV1FunctionsIdRuntimeRestartPost(body);
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

[**SuccessFunctionRuntimeResponse**](SuccessFunctionRuntimeResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Function runtime restarted |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1FunctionsPost

> SuccessFunctionCreateResponse apiV1FunctionsPost(functionCreateRequest)

Create a function from a sandbox service

Creates a function, revision 1, and the production alias from an existing sandbox service.

### Example

```ts
import {
  Configuration,
  FunctionsApi,
} from 'sandbox0';
import type { ApiV1FunctionsPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FunctionsApi(config);

  const body = {
    // FunctionCreateRequest
    functionCreateRequest: ...,
  } satisfies ApiV1FunctionsPostRequest;

  try {
    const data = await api.apiV1FunctionsPost(body);
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
| **functionCreateRequest** | [FunctionCreateRequest](FunctionCreateRequest.md) |  | |

### Return type

[**SuccessFunctionCreateResponse**](SuccessFunctionCreateResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Function created |  -  |
| **400** | Source service is invalid or not publishable |  -  |
| **409** | Function name already exists |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

