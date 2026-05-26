# RunsApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1RunsDeployPost**](RunsApi.md#apiv1runsdeploypost) | **POST** /api/v1/runs/deploy | Deploy a run |
| [**apiV1RunsGet**](RunsApi.md#apiv1runsget) | **GET** /api/v1/runs | List runs |
| [**apiV1RunsIdActiveRevisionPut**](RunsApi.md#apiv1runsidactiverevisionput) | **PUT** /api/v1/runs/{id}/active-revision | Activate a run revision |
| [**apiV1RunsIdDelete**](RunsApi.md#apiv1runsiddelete) | **DELETE** /api/v1/runs/{id} | Delete a run |
| [**apiV1RunsIdDeployPost**](RunsApi.md#apiv1runsiddeploypost) | **POST** /api/v1/runs/{id}/deploy | Deploy a new run revision |
| [**apiV1RunsIdGet**](RunsApi.md#apiv1runsidget) | **GET** /api/v1/runs/{id} | Get a run |
| [**apiV1RunsIdPut**](RunsApi.md#apiv1runsidput) | **PUT** /api/v1/runs/{id} | Update a run |
| [**apiV1RunsIdRevisionsGet**](RunsApi.md#apiv1runsidrevisionsget) | **GET** /api/v1/runs/{id}/revisions | List run revisions |



## apiV1RunsDeployPost

> SuccessRunDeployResultResponse apiV1RunsDeployPost(runDeployRequest)

Deploy a run

Creates a run or deploys a new revision from a sandbox service or snapshot-backed specification.

### Example

```ts
import {
  Configuration,
  RunsApi,
} from 'sandbox0';
import type { ApiV1RunsDeployPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RunsApi(config);

  const body = {
    // RunDeployRequest
    runDeployRequest: ...,
  } satisfies ApiV1RunsDeployPostRequest;

  try {
    const data = await api.apiV1RunsDeployPost(body);
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
| **runDeployRequest** | [RunDeployRequest](RunDeployRequest.md) |  | |

### Return type

[**SuccessRunDeployResultResponse**](SuccessRunDeployResultResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Run revision deployed |  -  |
| **400** | Invalid request |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **404** | Source sandbox, service, or run not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1RunsGet

> SuccessRunListResponse apiV1RunsGet()

List runs

Lists production run identities for the authenticated team.

### Example

```ts
import {
  Configuration,
  RunsApi,
} from 'sandbox0';
import type { ApiV1RunsGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RunsApi(config);

  try {
    const data = await api.apiV1RunsGet();
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

[**SuccessRunListResponse**](SuccessRunListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Runs |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1RunsIdActiveRevisionPut

> SuccessRunDeployResultResponse apiV1RunsIdActiveRevisionPut(id, activateRunRevisionRequest)

Activate a run revision

### Example

```ts
import {
  Configuration,
  RunsApi,
} from 'sandbox0';
import type { ApiV1RunsIdActiveRevisionPutRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RunsApi(config);

  const body = {
    // string | Run ID or slug.
    id: id_example,
    // ActivateRunRevisionRequest
    activateRunRevisionRequest: ...,
  } satisfies ApiV1RunsIdActiveRevisionPutRequest;

  try {
    const data = await api.apiV1RunsIdActiveRevisionPut(body);
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
| **id** | `string` | Run ID or slug. | [Defaults to `undefined`] |
| **activateRunRevisionRequest** | [ActivateRunRevisionRequest](ActivateRunRevisionRequest.md) |  | |

### Return type

[**SuccessRunDeployResultResponse**](SuccessRunDeployResultResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Run revision activated |  -  |
| **400** | Invalid request |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1RunsIdDelete

> SuccessDeletedResponse apiV1RunsIdDelete(id)

Delete a run

### Example

```ts
import {
  Configuration,
  RunsApi,
} from 'sandbox0';
import type { ApiV1RunsIdDeleteRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RunsApi(config);

  const body = {
    // string | Run ID or slug.
    id: id_example,
  } satisfies ApiV1RunsIdDeleteRequest;

  try {
    const data = await api.apiV1RunsIdDelete(body);
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
| **id** | `string` | Run ID or slug. | [Defaults to `undefined`] |

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
| **200** | Run deleted |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1RunsIdDeployPost

> SuccessRunDeployResultResponse apiV1RunsIdDeployPost(id, runDeployRequest)

Deploy a new run revision

Adds an immutable revision to an existing run. The revision can be activated immediately or left inactive.

### Example

```ts
import {
  Configuration,
  RunsApi,
} from 'sandbox0';
import type { ApiV1RunsIdDeployPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RunsApi(config);

  const body = {
    // string | Run ID or slug.
    id: id_example,
    // RunDeployRequest
    runDeployRequest: ...,
  } satisfies ApiV1RunsIdDeployPostRequest;

  try {
    const data = await api.apiV1RunsIdDeployPost(body);
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
| **id** | `string` | Run ID or slug. | [Defaults to `undefined`] |
| **runDeployRequest** | [RunDeployRequest](RunDeployRequest.md) |  | |

### Return type

[**SuccessRunDeployResultResponse**](SuccessRunDeployResultResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Run revision deployed |  -  |
| **400** | Invalid request |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **404** | Source sandbox, service, or run not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1RunsIdGet

> SuccessRunResponse apiV1RunsIdGet(id)

Get a run

### Example

```ts
import {
  Configuration,
  RunsApi,
} from 'sandbox0';
import type { ApiV1RunsIdGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RunsApi(config);

  const body = {
    // string | Run ID or slug.
    id: id_example,
  } satisfies ApiV1RunsIdGetRequest;

  try {
    const data = await api.apiV1RunsIdGet(body);
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
| **id** | `string` | Run ID or slug. | [Defaults to `undefined`] |

### Return type

[**SuccessRunResponse**](SuccessRunResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Run |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1RunsIdPut

> SuccessRunResponse apiV1RunsIdPut(id, runUpdateRequest)

Update a run

Updates mutable run metadata such as name, enabled state, and scale-to-zero policy.

### Example

```ts
import {
  Configuration,
  RunsApi,
} from 'sandbox0';
import type { ApiV1RunsIdPutRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RunsApi(config);

  const body = {
    // string | Run ID or slug.
    id: id_example,
    // RunUpdateRequest
    runUpdateRequest: ...,
  } satisfies ApiV1RunsIdPutRequest;

  try {
    const data = await api.apiV1RunsIdPut(body);
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
| **id** | `string` | Run ID or slug. | [Defaults to `undefined`] |
| **runUpdateRequest** | [RunUpdateRequest](RunUpdateRequest.md) |  | |

### Return type

[**SuccessRunResponse**](SuccessRunResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Run updated |  -  |
| **400** | Invalid request |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1RunsIdRevisionsGet

> SuccessRunRevisionListResponse apiV1RunsIdRevisionsGet(id)

List run revisions

### Example

```ts
import {
  Configuration,
  RunsApi,
} from 'sandbox0';
import type { ApiV1RunsIdRevisionsGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RunsApi(config);

  const body = {
    // string | Run ID or slug.
    id: id_example,
  } satisfies ApiV1RunsIdRevisionsGetRequest;

  try {
    const data = await api.apiV1RunsIdRevisionsGet(body);
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
| **id** | `string` | Run ID or slug. | [Defaults to `undefined`] |

### Return type

[**SuccessRunRevisionListResponse**](SuccessRunRevisionListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Run revisions |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

