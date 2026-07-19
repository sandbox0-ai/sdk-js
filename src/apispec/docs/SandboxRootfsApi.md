# SandboxRootfsApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1SandboxRootfsSnapshotsSnapshotIdDelete**](SandboxRootfsApi.md#apiv1sandboxrootfssnapshotssnapshotiddelete) | **DELETE** /api/v1/sandbox-rootfs-snapshots/{snapshot_id} | Delete sandbox rootfs snapshot |
| [**apiV1SandboxRootfsSnapshotsSnapshotIdGet**](SandboxRootfsApi.md#apiv1sandboxrootfssnapshotssnapshotidget) | **GET** /api/v1/sandbox-rootfs-snapshots/{snapshot_id} | Get sandbox rootfs snapshot |
| [**apiV1SandboxesIdForkPost**](SandboxRootfsApi.md#apiv1sandboxesidforkpost) | **POST** /api/v1/sandboxes/{id}/fork | Fork sandbox rootfs |
| [**apiV1SandboxesIdRootfsRestorePost**](SandboxRootfsApi.md#apiv1sandboxesidrootfsrestorepost) | **POST** /api/v1/sandboxes/{id}/rootfs/restore | Restore sandbox rootfs from snapshot |
| [**apiV1SandboxesIdSnapshotsGet**](SandboxRootfsApi.md#apiv1sandboxesidsnapshotsget) | **GET** /api/v1/sandboxes/{id}/snapshots | List sandbox rootfs snapshots |
| [**apiV1SandboxesIdSnapshotsPost**](SandboxRootfsApi.md#apiv1sandboxesidsnapshotspost) | **POST** /api/v1/sandboxes/{id}/snapshots | Create sandbox rootfs snapshot |



## apiV1SandboxRootfsSnapshotsSnapshotIdDelete

> SuccessDeletedResponse apiV1SandboxRootfsSnapshotsSnapshotIdDelete(snapshotId)

Delete sandbox rootfs snapshot

### Example

```ts
import {
  Configuration,
  SandboxRootfsApi,
} from 'sandbox0';
import type { ApiV1SandboxRootfsSnapshotsSnapshotIdDeleteRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxRootfsApi(config);

  const body = {
    // string
    snapshotId: snapshotId_example,
  } satisfies ApiV1SandboxRootfsSnapshotsSnapshotIdDeleteRequest;

  try {
    const data = await api.apiV1SandboxRootfsSnapshotsSnapshotIdDelete(body);
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
| **404** | Not found |  -  |
| **429** | The mutation would exceed an effective Team Quota policy |  * Retry-After - Suggested retry delay in seconds when a rate policy was exceeded <br>  |
| **503** | Team Quota admission is temporarily unavailable |  * Retry-After - Suggested retry delay in seconds <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxRootfsSnapshotsSnapshotIdGet

> SuccessSandboxRootFSSnapshotResponse apiV1SandboxRootfsSnapshotsSnapshotIdGet(snapshotId)

Get sandbox rootfs snapshot

### Example

```ts
import {
  Configuration,
  SandboxRootfsApi,
} from 'sandbox0';
import type { ApiV1SandboxRootfsSnapshotsSnapshotIdGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxRootfsApi(config);

  const body = {
    // string
    snapshotId: snapshotId_example,
  } satisfies ApiV1SandboxRootfsSnapshotsSnapshotIdGetRequest;

  try {
    const data = await api.apiV1SandboxRootfsSnapshotsSnapshotIdGet(body);
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
| **snapshotId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SuccessSandboxRootFSSnapshotResponse**](SuccessSandboxRootFSSnapshotResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Sandbox rootfs snapshot |  -  |
| **404** | Not found |  -  |
| **429** | The admission control applicable to this route and deployment topology rejected the request. &#x60;error.code&#x60; is &#x60;quota_exceeded&#x60; for a team-attributed Team Quota such as &#x60;active_request_count&#x60;, &#x60;active_connection_count&#x60;, &#x60;api_requests&#x60;, or a traffic-byte rate, &#x60;identity_limit_exceeded&#x60; for an IdentityResourceGuard cardinality limit, or &#x60;rate_limited&#x60; for an aggregate overload guard. A given route does not necessarily use every control.  |  * Retry-After - Suggested delay in seconds when token-bucket or overload admission provides one; identity cardinality rejections may omit it <br>  |
| **503** | The fail-closed admission backend applicable to this route is unavailable. Depending on deployment topology, this is the region Team Quota policy or Redis path, or the public identity entrypoint\&#39;s shared overload-guard backend; a given route does not necessarily use both.  |  * Retry-After - Suggested retry delay in seconds <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdForkPost

> SuccessForkSandboxResponse apiV1SandboxesIdForkPost(id, forkSandboxRequest)

Fork sandbox rootfs

Forks the source sandbox writable rootfs into a new paused sandbox. A paused source is forked from its current rootfs head. A running source is briefly barriered and checkpointed first; the source sandbox remains running after the fork operation completes.

### Example

```ts
import {
  Configuration,
  SandboxRootfsApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdForkPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxRootfsApi(config);

  const body = {
    // string
    id: id_example,
    // ForkSandboxRequest (optional)
    forkSandboxRequest: ...,
  } satisfies ApiV1SandboxesIdForkPostRequest;

  try {
    const data = await api.apiV1SandboxesIdForkPost(body);
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
| **forkSandboxRequest** | [ForkSandboxRequest](ForkSandboxRequest.md) |  | [Optional] |

### Return type

[**SuccessForkSandboxResponse**](SuccessForkSandboxResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Sandbox forked |  -  |
| **409** | Source sandbox is not running or paused, another lifecycle operation is active, or rootfs state is unavailable |  -  |
| **429** | The mutation would exceed an effective Team Quota policy |  * Retry-After - Suggested retry delay in seconds when a rate policy was exceeded <br>  |
| **503** | Running-source fork requires ctld checkpoint support or Team Quota admission is temporarily unavailable |  * Retry-After - Suggested retry delay in seconds for Team Quota admission <br>  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdRootfsRestorePost

> SuccessRestoreSandboxRootFSResponse apiV1SandboxesIdRootfsRestorePost(id, restoreSandboxRootFSRequest)

Restore sandbox rootfs from snapshot

### Example

```ts
import {
  Configuration,
  SandboxRootfsApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdRootfsRestorePostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxRootfsApi(config);

  const body = {
    // string
    id: id_example,
    // RestoreSandboxRootFSRequest
    restoreSandboxRootFSRequest: ...,
  } satisfies ApiV1SandboxesIdRootfsRestorePostRequest;

  try {
    const data = await api.apiV1SandboxesIdRootfsRestorePost(body);
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
| **restoreSandboxRootFSRequest** | [RestoreSandboxRootFSRequest](RestoreSandboxRootFSRequest.md) |  | |

### Return type

[**SuccessRestoreSandboxRootFSResponse**](SuccessRestoreSandboxRootFSResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Sandbox rootfs restored |  -  |
| **409** | Sandbox is not paused |  -  |
| **404** | Not found |  -  |
| **429** | The mutation would exceed an effective Team Quota policy |  * Retry-After - Suggested retry delay in seconds when a rate policy was exceeded <br>  |
| **503** | Team Quota admission is temporarily unavailable |  * Retry-After - Suggested retry delay in seconds <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdSnapshotsGet

> SuccessSandboxRootFSSnapshotListResponse apiV1SandboxesIdSnapshotsGet(id)

List sandbox rootfs snapshots

### Example

```ts
import {
  Configuration,
  SandboxRootfsApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdSnapshotsGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxRootfsApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiV1SandboxesIdSnapshotsGetRequest;

  try {
    const data = await api.apiV1SandboxesIdSnapshotsGet(body);
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

[**SuccessSandboxRootFSSnapshotListResponse**](SuccessSandboxRootFSSnapshotListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Sandbox rootfs snapshot list |  -  |
| **404** | Not found |  -  |
| **429** | The admission control applicable to this route and deployment topology rejected the request. &#x60;error.code&#x60; is &#x60;quota_exceeded&#x60; for a team-attributed Team Quota such as &#x60;active_request_count&#x60;, &#x60;active_connection_count&#x60;, &#x60;api_requests&#x60;, or a traffic-byte rate, &#x60;identity_limit_exceeded&#x60; for an IdentityResourceGuard cardinality limit, or &#x60;rate_limited&#x60; for an aggregate overload guard. A given route does not necessarily use every control.  |  * Retry-After - Suggested delay in seconds when token-bucket or overload admission provides one; identity cardinality rejections may omit it <br>  |
| **503** | The fail-closed admission backend applicable to this route is unavailable. Depending on deployment topology, this is the region Team Quota policy or Redis path, or the public identity entrypoint\&#39;s shared overload-guard backend; a given route does not necessarily use both.  |  * Retry-After - Suggested retry delay in seconds <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdSnapshotsPost

> SuccessSandboxRootFSSnapshotResponse apiV1SandboxesIdSnapshotsPost(id, createSandboxRootFSSnapshotRequest)

Create sandbox rootfs snapshot

Creates an immutable snapshot record from the source sandbox writable rootfs. A paused source is snapshotted from its current rootfs head. A running source is briefly barriered and checkpointed first; the source sandbox remains running after the snapshot operation completes.

### Example

```ts
import {
  Configuration,
  SandboxRootfsApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdSnapshotsPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxRootfsApi(config);

  const body = {
    // string
    id: id_example,
    // CreateSandboxRootFSSnapshotRequest (optional)
    createSandboxRootFSSnapshotRequest: ...,
  } satisfies ApiV1SandboxesIdSnapshotsPostRequest;

  try {
    const data = await api.apiV1SandboxesIdSnapshotsPost(body);
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
| **createSandboxRootFSSnapshotRequest** | [CreateSandboxRootFSSnapshotRequest](CreateSandboxRootFSSnapshotRequest.md) |  | [Optional] |

### Return type

[**SuccessSandboxRootFSSnapshotResponse**](SuccessSandboxRootFSSnapshotResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Sandbox rootfs snapshot created |  -  |
| **409** | Source sandbox is not running or paused, another lifecycle operation is active, or rootfs state is unavailable |  -  |
| **429** | The mutation would exceed an effective Team Quota policy |  * Retry-After - Suggested retry delay in seconds when a rate policy was exceeded <br>  |
| **503** | Running-source snapshot requires ctld checkpoint support or Team Quota admission is temporarily unavailable |  * Retry-After - Suggested retry delay in seconds for Team Quota admission <br>  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
