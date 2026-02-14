# SandboxVolumesApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1SandboxesIdSandboxvolumesMountPost**](SandboxVolumesApi.md#apiv1sandboxesidsandboxvolumesmountpost) | **POST** /api/v1/sandboxes/{id}/sandboxvolumes/mount | Mount sandbox volume in sandbox |
| [**apiV1SandboxesIdSandboxvolumesStatusGet**](SandboxVolumesApi.md#apiv1sandboxesidsandboxvolumesstatusget) | **GET** /api/v1/sandboxes/{id}/sandboxvolumes/status | Get sandbox volume mount status |
| [**apiV1SandboxesIdSandboxvolumesUnmountPost**](SandboxVolumesApi.md#apiv1sandboxesidsandboxvolumesunmountpost) | **POST** /api/v1/sandboxes/{id}/sandboxvolumes/unmount | Unmount sandbox volume |
| [**apiV1SandboxvolumesGet**](SandboxVolumesApi.md#apiv1sandboxvolumesget) | **GET** /api/v1/sandboxvolumes | List sandbox volumes |
| [**apiV1SandboxvolumesIdDelete**](SandboxVolumesApi.md#apiv1sandboxvolumesiddelete) | **DELETE** /api/v1/sandboxvolumes/{id} | Delete sandbox volume |
| [**apiV1SandboxvolumesIdGet**](SandboxVolumesApi.md#apiv1sandboxvolumesidget) | **GET** /api/v1/sandboxvolumes/{id} | Get sandbox volume |
| [**apiV1SandboxvolumesPost**](SandboxVolumesApi.md#apiv1sandboxvolumespost) | **POST** /api/v1/sandboxvolumes | Create sandbox volume |



## apiV1SandboxesIdSandboxvolumesMountPost

> SuccessMountResponse apiV1SandboxesIdSandboxvolumesMountPost(id, mountRequest)

Mount sandbox volume in sandbox

### Example

```ts
import {
  Configuration,
  SandboxVolumesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdSandboxvolumesMountPostRequest } from 'sandbox0';

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
    // MountRequest
    mountRequest: ...,
  } satisfies ApiV1SandboxesIdSandboxvolumesMountPostRequest;

  try {
    const data = await api.apiV1SandboxesIdSandboxvolumesMountPost(body);
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
| **mountRequest** | [MountRequest](MountRequest.md) |  | |

### Return type

[**SuccessMountResponse**](SuccessMountResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Volume mounted |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdSandboxvolumesStatusGet

> SuccessMountStatusResponse apiV1SandboxesIdSandboxvolumesStatusGet(id)

Get sandbox volume mount status

### Example

```ts
import {
  Configuration,
  SandboxVolumesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdSandboxvolumesStatusGetRequest } from 'sandbox0';

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
  } satisfies ApiV1SandboxesIdSandboxvolumesStatusGetRequest;

  try {
    const data = await api.apiV1SandboxesIdSandboxvolumesStatusGet(body);
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

[**SuccessMountStatusResponse**](SuccessMountStatusResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Mount status |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdSandboxvolumesUnmountPost

> SuccessUnmountedResponse apiV1SandboxesIdSandboxvolumesUnmountPost(id, unmountRequest)

Unmount sandbox volume

### Example

```ts
import {
  Configuration,
  SandboxVolumesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdSandboxvolumesUnmountPostRequest } from 'sandbox0';

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
    // UnmountRequest
    unmountRequest: ...,
  } satisfies ApiV1SandboxesIdSandboxvolumesUnmountPostRequest;

  try {
    const data = await api.apiV1SandboxesIdSandboxvolumesUnmountPost(body);
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
| **unmountRequest** | [UnmountRequest](UnmountRequest.md) |  | |

### Return type

[**SuccessUnmountedResponse**](SuccessUnmountedResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Volume unmounted |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


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

> SuccessDeletedResponse apiV1SandboxvolumesIdDelete(id)

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

