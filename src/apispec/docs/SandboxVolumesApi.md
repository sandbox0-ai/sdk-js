# SandboxVolumesApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1SandboxvolumesGet**](SandboxVolumesApi.md#apiv1sandboxvolumesget) | **GET** /api/v1/sandboxvolumes | List sandbox volumes |
| [**apiV1SandboxvolumesIdDelete**](SandboxVolumesApi.md#apiv1sandboxvolumesiddelete) | **DELETE** /api/v1/sandboxvolumes/{id} | Delete sandbox volume |
| [**apiV1SandboxvolumesIdForkPost**](SandboxVolumesApi.md#apiv1sandboxvolumesidforkpost) | **POST** /api/v1/sandboxvolumes/{id}/fork | Fork sandbox volume |
| [**apiV1SandboxvolumesIdGet**](SandboxVolumesApi.md#apiv1sandboxvolumesidget) | **GET** /api/v1/sandboxvolumes/{id} | Get sandbox volume |
| [**apiV1SandboxvolumesPost**](SandboxVolumesApi.md#apiv1sandboxvolumespost) | **POST** /api/v1/sandboxvolumes | Create sandbox volume |



## apiV1SandboxvolumesGet

> SuccessSandboxVolumeListResponse apiV1SandboxvolumesGet()

List sandbox volumes

### Example

```ts
import {
  Configuration,
  SandboxVolumesApi,
} from 'sandbox0';
import type { ApiV1SandboxvolumesGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxVolumesApi(config);

  try {
    const data = await api.apiV1SandboxvolumesGet();
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

[**SuccessSandboxVolumeListResponse**](SuccessSandboxVolumeListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Volume list |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxvolumesIdDelete

> SuccessDeletedResponse apiV1SandboxvolumesIdDelete(id, force)

Delete sandbox volume

### Example

```ts
import {
  Configuration,
  SandboxVolumesApi,
} from 'sandbox0';
import type { ApiV1SandboxvolumesIdDeleteRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxVolumesApi(config);

  const body = {
    // string
    id: id_example,
    // boolean | Force delete even if volume has active mounts (optional)
    force: true,
  } satisfies ApiV1SandboxvolumesIdDeleteRequest;

  try {
    const data = await api.apiV1SandboxvolumesIdDelete(body);
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
| **force** | `boolean` | Force delete even if volume has active mounts | [Optional] [Defaults to `false`] |

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
| **200** | Deleted |  -  |
| **409** | Volume has active mounts |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxvolumesIdForkPost

> SuccessSandboxVolumeResponse apiV1SandboxvolumesIdForkPost(id, forkVolumeRequest)

Fork sandbox volume

### Example

```ts
import {
  Configuration,
  SandboxVolumesApi,
} from 'sandbox0';
import type { ApiV1SandboxvolumesIdForkPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxVolumesApi(config);

  const body = {
    // string
    id: id_example,
    // ForkVolumeRequest (optional)
    forkVolumeRequest: ...,
  } satisfies ApiV1SandboxvolumesIdForkPostRequest;

  try {
    const data = await api.apiV1SandboxvolumesIdForkPost(body);
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
| **forkVolumeRequest** | [ForkVolumeRequest](ForkVolumeRequest.md) |  | [Optional] |

### Return type

[**SuccessSandboxVolumeResponse**](SuccessSandboxVolumeResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Volume forked |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxvolumesIdGet

> SuccessSandboxVolumeResponse apiV1SandboxvolumesIdGet(id)

Get sandbox volume

### Example

```ts
import {
  Configuration,
  SandboxVolumesApi,
} from 'sandbox0';
import type { ApiV1SandboxvolumesIdGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxVolumesApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiV1SandboxvolumesIdGetRequest;

  try {
    const data = await api.apiV1SandboxvolumesIdGet(body);
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

[**SuccessSandboxVolumeResponse**](SuccessSandboxVolumeResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Volume |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxvolumesPost

> SuccessSandboxVolumeResponse apiV1SandboxvolumesPost(createSandboxVolumeRequest)

Create sandbox volume

### Example

```ts
import {
  Configuration,
  SandboxVolumesApi,
} from 'sandbox0';
import type { ApiV1SandboxvolumesPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxVolumesApi(config);

  const body = {
    // CreateSandboxVolumeRequest
    createSandboxVolumeRequest: ...,
  } satisfies ApiV1SandboxvolumesPostRequest;

  try {
    const data = await api.apiV1SandboxvolumesPost(body);
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
| **createSandboxVolumeRequest** | [CreateSandboxVolumeRequest](CreateSandboxVolumeRequest.md) |  | |

### Return type

[**SuccessSandboxVolumeResponse**](SuccessSandboxVolumeResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Volume created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

