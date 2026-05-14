# FunctionsApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1FunctionsGet**](FunctionsApi.md#apiv1functionsget) | **GET** /api/v1/functions | List functions |
| [**apiV1FunctionsIdAliasesAliasPut**](FunctionsApi.md#apiv1functionsidaliasesaliasput) | **PUT** /api/v1/functions/{id}/aliases/{alias} | Point a function alias at a revision |
| [**apiV1FunctionsIdGet**](FunctionsApi.md#apiv1functionsidget) | **GET** /api/v1/functions/{id} | Get function |
| [**apiV1FunctionsIdRevisionsGet**](FunctionsApi.md#apiv1functionsidrevisionsget) | **GET** /api/v1/functions/{id}/revisions | List function revisions |
| [**apiV1FunctionsIdRevisionsPost**](FunctionsApi.md#apiv1functionsidrevisionspost) | **POST** /api/v1/functions/{id}/revisions | Create function revision from a sandbox service |
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

