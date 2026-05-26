# FunctionsApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1FunctionsDeployPost**](FunctionsApi.md#apiv1functionsdeploypost) | **POST** /api/v1/functions/deploy | Deploy a function |
| [**apiV1FunctionsGet**](FunctionsApi.md#apiv1functionsget) | **GET** /api/v1/functions | List functions |
| [**apiV1FunctionsIdActiveRevisionPut**](FunctionsApi.md#apiv1functionsidactiverevisionput) | **PUT** /api/v1/functions/{id}/active-revision | Activate a function revision |
| [**apiV1FunctionsIdDelete**](FunctionsApi.md#apiv1functionsiddelete) | **DELETE** /api/v1/functions/{id} | Delete a function |
| [**apiV1FunctionsIdDeployPost**](FunctionsApi.md#apiv1functionsiddeploypost) | **POST** /api/v1/functions/{id}/deploy | Deploy a new function revision |
| [**apiV1FunctionsIdGet**](FunctionsApi.md#apiv1functionsidget) | **GET** /api/v1/functions/{id} | Get a function |
| [**apiV1FunctionsIdPut**](FunctionsApi.md#apiv1functionsidput) | **PUT** /api/v1/functions/{id} | Update a function |
| [**apiV1FunctionsIdRevisionsGet**](FunctionsApi.md#apiv1functionsidrevisionsget) | **GET** /api/v1/functions/{id}/revisions | List function revisions |



## apiV1FunctionsDeployPost

> SuccessFunctionDeployResultResponse apiV1FunctionsDeployPost(functionDeployRequest)

Deploy a function

Creates a function or deploys a new revision from a sandbox service or snapshot-backed specification.

### Example

```ts
import {
  Configuration,
  FunctionsApi,
} from 'sandbox0';
import type { ApiV1FunctionsDeployPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FunctionsApi(config);

  const body = {
    // FunctionDeployRequest
    functionDeployRequest: ...,
  } satisfies ApiV1FunctionsDeployPostRequest;

  try {
    const data = await api.apiV1FunctionsDeployPost(body);
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
| **functionDeployRequest** | [FunctionDeployRequest](FunctionDeployRequest.md) |  | |

### Return type

[**SuccessFunctionDeployResultResponse**](SuccessFunctionDeployResultResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Function revision deployed |  -  |
| **400** | Invalid request |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **404** | Source sandbox, service, or function not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1FunctionsGet

> SuccessFunctionListResponse apiV1FunctionsGet()

List functions

Lists production function identities for the authenticated team.

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
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1FunctionsIdActiveRevisionPut

> SuccessFunctionDeployResultResponse apiV1FunctionsIdActiveRevisionPut(id, activateFunctionRevisionRequest)

Activate a function revision

### Example

```ts
import {
  Configuration,
  FunctionsApi,
} from 'sandbox0';
import type { ApiV1FunctionsIdActiveRevisionPutRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FunctionsApi(config);

  const body = {
    // string | Function ID or slug.
    id: id_example,
    // ActivateFunctionRevisionRequest
    activateFunctionRevisionRequest: ...,
  } satisfies ApiV1FunctionsIdActiveRevisionPutRequest;

  try {
    const data = await api.apiV1FunctionsIdActiveRevisionPut(body);
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
| **id** | `string` | Function ID or slug. | [Defaults to `undefined`] |
| **activateFunctionRevisionRequest** | [ActivateFunctionRevisionRequest](ActivateFunctionRevisionRequest.md) |  | |

### Return type

[**SuccessFunctionDeployResultResponse**](SuccessFunctionDeployResultResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Function revision activated |  -  |
| **400** | Invalid request |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1FunctionsIdDelete

> SuccessDeletedResponse apiV1FunctionsIdDelete(id)

Delete a function

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
    // string | Function ID or slug.
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
| **id** | `string` | Function ID or slug. | [Defaults to `undefined`] |

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
| **200** | Function deleted |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1FunctionsIdDeployPost

> SuccessFunctionDeployResultResponse apiV1FunctionsIdDeployPost(id, functionDeployRequest)

Deploy a new function revision

Adds an immutable revision to an existing function. The revision can be activated immediately or left inactive.

### Example

```ts
import {
  Configuration,
  FunctionsApi,
} from 'sandbox0';
import type { ApiV1FunctionsIdDeployPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FunctionsApi(config);

  const body = {
    // string | Function ID or slug.
    id: id_example,
    // FunctionDeployRequest
    functionDeployRequest: ...,
  } satisfies ApiV1FunctionsIdDeployPostRequest;

  try {
    const data = await api.apiV1FunctionsIdDeployPost(body);
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
| **id** | `string` | Function ID or slug. | [Defaults to `undefined`] |
| **functionDeployRequest** | [FunctionDeployRequest](FunctionDeployRequest.md) |  | |

### Return type

[**SuccessFunctionDeployResultResponse**](SuccessFunctionDeployResultResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Function revision deployed |  -  |
| **400** | Invalid request |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **404** | Source sandbox, service, or function not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1FunctionsIdGet

> SuccessFunctionResponse apiV1FunctionsIdGet(id)

Get a function

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
    // string | Function ID or slug.
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
| **id** | `string` | Function ID or slug. | [Defaults to `undefined`] |

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
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1FunctionsIdPut

> SuccessFunctionResponse apiV1FunctionsIdPut(id, functionUpdateRequest)

Update a function

Updates mutable function metadata such as name, enabled state, and scale-to-zero policy.

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
    // string | Function ID or slug.
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
| **id** | `string` | Function ID or slug. | [Defaults to `undefined`] |
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
| **400** | Invalid request |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
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
    // string | Function ID or slug.
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
| **id** | `string` | Function ID or slug. | [Defaults to `undefined`] |

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
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

