# SnapshotsApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1SandboxvolumesIdSnapshotsGet**](SnapshotsApi.md#apiv1sandboxvolumesidsnapshotsget) | **GET** /api/v1/sandboxvolumes/{id}/snapshots | List snapshots |
| [**apiV1SandboxvolumesIdSnapshotsPost**](SnapshotsApi.md#apiv1sandboxvolumesidsnapshotspost) | **POST** /api/v1/sandboxvolumes/{id}/snapshots | Create snapshot |
| [**apiV1SandboxvolumesIdSnapshotsSnapshotIdDelete**](SnapshotsApi.md#apiv1sandboxvolumesidsnapshotssnapshotiddelete) | **DELETE** /api/v1/sandboxvolumes/{id}/snapshots/{snapshot_id} | Delete snapshot |
| [**apiV1SandboxvolumesIdSnapshotsSnapshotIdGet**](SnapshotsApi.md#apiv1sandboxvolumesidsnapshotssnapshotidget) | **GET** /api/v1/sandboxvolumes/{id}/snapshots/{snapshot_id} | Get snapshot |
| [**apiV1SandboxvolumesIdSnapshotsSnapshotIdRestorePost**](SnapshotsApi.md#apiv1sandboxvolumesidsnapshotssnapshotidrestorepost) | **POST** /api/v1/sandboxvolumes/{id}/snapshots/{snapshot_id}/restore | Restore snapshot |



## apiV1SandboxvolumesIdSnapshotsGet

> SuccessSnapshotListResponse apiV1SandboxvolumesIdSnapshotsGet(id)

List snapshots

### Example

```ts
import {
  Configuration,
  SnapshotsApi,
} from 'sandbox0';
import type { ApiV1SandboxvolumesIdSnapshotsGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SnapshotsApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiV1SandboxvolumesIdSnapshotsGetRequest;

  try {
    const data = await api.apiV1SandboxvolumesIdSnapshotsGet(body);
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

[**SuccessSnapshotListResponse**](SuccessSnapshotListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Snapshot list |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxvolumesIdSnapshotsPost

> SuccessSnapshotResponse apiV1SandboxvolumesIdSnapshotsPost(id, createSnapshotRequest)

Create snapshot

### Example

```ts
import {
  Configuration,
  SnapshotsApi,
} from 'sandbox0';
import type { ApiV1SandboxvolumesIdSnapshotsPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SnapshotsApi(config);

  const body = {
    // string
    id: id_example,
    // CreateSnapshotRequest
    createSnapshotRequest: ...,
  } satisfies ApiV1SandboxvolumesIdSnapshotsPostRequest;

  try {
    const data = await api.apiV1SandboxvolumesIdSnapshotsPost(body);
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
| **createSnapshotRequest** | [CreateSnapshotRequest](CreateSnapshotRequest.md) |  | |

### Return type

[**SuccessSnapshotResponse**](SuccessSnapshotResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Snapshot created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxvolumesIdSnapshotsSnapshotIdDelete

> SuccessDeletedResponse apiV1SandboxvolumesIdSnapshotsSnapshotIdDelete(id, snapshotId)

Delete snapshot

### Example

```ts
import {
  Configuration,
  SnapshotsApi,
} from 'sandbox0';
import type { ApiV1SandboxvolumesIdSnapshotsSnapshotIdDeleteRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SnapshotsApi(config);

  const body = {
    // string
    id: id_example,
    // string
    snapshotId: snapshotId_example,
  } satisfies ApiV1SandboxvolumesIdSnapshotsSnapshotIdDeleteRequest;

  try {
    const data = await api.apiV1SandboxvolumesIdSnapshotsSnapshotIdDelete(body);
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
| **snapshotId** | `string` |  | [Defaults to `undefined`] |

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

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxvolumesIdSnapshotsSnapshotIdGet

> SuccessSnapshotResponse apiV1SandboxvolumesIdSnapshotsSnapshotIdGet(id, snapshotId)

Get snapshot

### Example

```ts
import {
  Configuration,
  SnapshotsApi,
} from 'sandbox0';
import type { ApiV1SandboxvolumesIdSnapshotsSnapshotIdGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SnapshotsApi(config);

  const body = {
    // string
    id: id_example,
    // string
    snapshotId: snapshotId_example,
  } satisfies ApiV1SandboxvolumesIdSnapshotsSnapshotIdGetRequest;

  try {
    const data = await api.apiV1SandboxvolumesIdSnapshotsSnapshotIdGet(body);
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
| **snapshotId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SuccessSnapshotResponse**](SuccessSnapshotResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Snapshot |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxvolumesIdSnapshotsSnapshotIdRestorePost

> SuccessRestoreResponse apiV1SandboxvolumesIdSnapshotsSnapshotIdRestorePost(id, snapshotId)

Restore snapshot

### Example

```ts
import {
  Configuration,
  SnapshotsApi,
} from 'sandbox0';
import type { ApiV1SandboxvolumesIdSnapshotsSnapshotIdRestorePostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SnapshotsApi(config);

  const body = {
    // string
    id: id_example,
    // string
    snapshotId: snapshotId_example,
  } satisfies ApiV1SandboxvolumesIdSnapshotsSnapshotIdRestorePostRequest;

  try {
    const data = await api.apiV1SandboxvolumesIdSnapshotsSnapshotIdRestorePost(body);
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
| **snapshotId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SuccessRestoreResponse**](SuccessRestoreResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Restored |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

