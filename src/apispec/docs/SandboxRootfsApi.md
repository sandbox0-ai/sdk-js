# SandboxRootfsApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1SandboxRootfsSnapshotsSnapshotIdDelete**](SandboxRootfsApi.md#apiv1sandboxrootfssnapshotssnapshotiddelete) | **DELETE** /api/v1/sandbox-rootfs-snapshots/{snapshot_id} | Delete sandbox rootfs snapshot |
| [**apiV1SandboxRootfsSnapshotsSnapshotIdGet**](SandboxRootfsApi.md#apiv1sandboxrootfssnapshotssnapshotidget) | **GET** /api/v1/sandbox-rootfs-snapshots/{snapshot_id} | Get sandbox rootfs snapshot |
| [**apiV1SandboxesIdForkPost**](SandboxRootfsApi.md#apiv1sandboxesidforkpost) | **POST** /api/v1/sandboxes/{id}/fork | Fork a sandbox |
| [**apiV1SandboxesIdRootfsRebasePut**](SandboxRootfsApi.md#apiv1sandboxesidrootfsrebaseput) | **PUT** /api/v1/sandboxes/{id}/rootfs/rebase | Rebase a paused sandbox rootfs |
| [**apiV1SandboxesIdRootfsRestorePost**](SandboxRootfsApi.md#apiv1sandboxesidrootfsrestorepost) | **POST** /api/v1/sandboxes/{id}/rootfs/restore | Restore sandbox rootfs from snapshot |
| [**apiV1SandboxesIdSnapshotsGet**](SandboxRootfsApi.md#apiv1sandboxesidsnapshotsget) | **GET** /api/v1/sandboxes/{id}/snapshots | List sandbox rootfs snapshots |
| [**apiV1SandboxesIdSnapshotsPost**](SandboxRootfsApi.md#apiv1sandboxesidsnapshotspost) | **POST** /api/v1/sandboxes/{id}/snapshots | Create sandbox rootfs snapshot |
| [**captureSandboxRootFSSnapshot**](SandboxRootfsApi.md#capturesandboxrootfssnapshotoperation) | **POST** /api/v1/sandboxes/{id}/snapshots/capture | Capture a generation-conditioned running RootFS snapshot |
| [**getCapturedSandboxRootFSSnapshot**](SandboxRootfsApi.md#getcapturedsandboxrootfssnapshot) | **GET** /api/v1/sandboxes/{id}/snapshots/capture | Read the original generation-conditioned snapshot receipt |
| [**getSandboxRootFSFork**](SandboxRootfsApi.md#getsandboxrootfsfork) | **GET** /api/v1/sandboxes/{id}/fork | Read original RootFS fork destination provenance |
| [**getSandboxRootFSForkLaunch**](SandboxRootfsApi.md#getsandboxrootfsforklaunch) | **GET** /api/v1/sandboxes/{id}/fork-launch | Read the original first fork launch result |
| [**getSandboxRootFSIdentity**](SandboxRootfsApi.md#getsandboxrootfsidentity) | **GET** /api/v1/sandboxes/{id}/rootfs/identity | Read external runtime and RootFS identity |
| [**launchSandboxRootFSFork**](SandboxRootfsApi.md#launchsandboxrootfsfork) | **POST** /api/v1/sandboxes/{id}/fork-launch | Launch the original never-run RootFS fork |



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
| **401** | Authentication is required or the bearer credentials are invalid |  -  |
| **200** | Deleted |  -  |
| **404** | Not found |  -  |

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
| **401** | Authentication is required or the bearer credentials are invalid |  -  |
| **200** | Sandbox rootfs snapshot |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdForkPost

> SuccessForkSandboxResponse apiV1SandboxesIdForkPost(id, idempotencyKey, forkSandboxRequest)

Fork a sandbox

Forks the source sandbox writable rootfs into a new paused sandbox. A paused source is forked from its current rootfs head. A running source is briefly barriered and checkpointed first; the source sandbox remains running after the fork operation completes. Set memory&#x3D;true to retain execution state as well. Memory forks and requests with expected_runtime_generation require a stable Idempotency-Key. While capture or parent restoration is pending, retry 503 responses with that same key and request. A successful response always contains a committed paused child.

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
    // string | Key for retrying the fork without creating a duplicate child sandbox. Required when memory=true or expected_runtime_generation is supplied; reuse it and the original generation across pending responses and transport failures. (optional)
    idempotencyKey: idempotencyKey_example,
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
| **idempotencyKey** | `string` | Key for retrying the fork without creating a duplicate child sandbox. Required when memory&#x3D;true or expected_runtime_generation is supplied; reuse it and the original generation across pending responses and transport failures. | [Optional] [Defaults to `undefined`] |
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
| **400** | Invalid request |  -  |
| **401** | Authentication is required or the bearer credentials are invalid |  -  |
| **201** | Sandbox forked |  -  |
| **409** | Source sandbox is not running or paused, another lifecycle operation is active, or rootfs state is unavailable |  -  |
| **503** | Running-source checkpoint authority or its authenticated node channel is temporarily unavailable |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdRootfsRebasePut

> SuccessRebaseSandboxRootFSResponse apiV1SandboxesIdRootfsRebasePut(id, rebaseSandboxRootFSRequest)

Rebase a paused sandbox rootfs

Applies the paused sandbox\&#39;s file-level changes to an already-attested immutable Base artifact. The operation keeps the sandbox paused, publishes one durable block-COW generation, and retains the previous generation for the requested bounded rollback window.

### Example

```ts
import {
  Configuration,
  SandboxRootfsApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdRootfsRebasePutRequest } from 'sandbox0';

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
    // RebaseSandboxRootFSRequest
    rebaseSandboxRootFSRequest: ...,
  } satisfies ApiV1SandboxesIdRootfsRebasePutRequest;

  try {
    const data = await api.apiV1SandboxesIdRootfsRebasePut(body);
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
| **rebaseSandboxRootFSRequest** | [RebaseSandboxRootFSRequest](RebaseSandboxRootFSRequest.md) |  | |

### Return type

[**SuccessRebaseSandboxRootFSResponse**](SuccessRebaseSandboxRootFSResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **401** | Authentication is required or the bearer credentials are invalid |  -  |
| **200** | Paused sandbox rootfs rebased |  -  |
| **400** | Invalid Base artifact digest or rollback window |  -  |
| **404** | Sandbox or target Base artifact not found |  -  |
| **409** | Sandbox is not paused, durable identity changed, or another lifecycle operation owns it |  -  |
| **503** | Exact authenticated worker or durable publication authority is temporarily unavailable |  -  |

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
| **401** | Authentication is required or the bearer credentials are invalid |  -  |
| **200** | Sandbox rootfs restored |  -  |
| **409** | Sandbox is not paused |  -  |
| **404** | Not found |  -  |

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
| **401** | Authentication is required or the bearer credentials are invalid |  -  |
| **200** | Sandbox rootfs snapshot list |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdSnapshotsPost

> SuccessSandboxRootFSSnapshotResponse apiV1SandboxesIdSnapshotsPost(id, createSandboxRootFSSnapshotRequest)

Create sandbox rootfs snapshot

Creates an immutable snapshot record from the source sandbox writable rootfs. A paused source is snapshotted from its current rootfs head. A running source is briefly barriered and checkpointed first; the source sandbox remains running after the snapshot operation completes. Each sandbox retains at most its team\&#39;s snapshots_per_sandbox quota (default 10). Creating a snapshot automatically removes the oldest excess public snapshots. Internal template-build snapshots are excluded.

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
| **401** | Authentication is required or the bearer credentials are invalid |  -  |
| **201** | Sandbox rootfs snapshot created |  -  |
| **409** | Source sandbox is not running or paused, another lifecycle operation is active, or rootfs state is unavailable |  -  |
| **503** | Running-source snapshot requires ctld checkpoint support |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## captureSandboxRootFSSnapshot

> SuccessSandboxRootFSSnapshotResponse captureSandboxRootFSSnapshot(id, idempotencyKey, captureSandboxRootFSSnapshotRequest)

Capture a generation-conditioned running RootFS snapshot

Captures one immutable RootFS snapshot from the expected running runtime generation without stopping its processes. Admission checks the generation while locking the external source and exact writer. Reuse the same key, generation and metadata after uncertainty: an accepted capture retains its original transaction and returns its original snapshot when completed, even if the source subsequently changes generation or pauses. A new capture of a paused or mismatched source is rejected. No guest execution, automatic resume, process restart or memory checkpoint fallback is performed. This distinct endpoint fails closed on servers without conditional capture.

### Example

```ts
import {
  Configuration,
  SandboxRootfsApi,
} from 'sandbox0';
import type { CaptureSandboxRootFSSnapshotOperationRequest } from 'sandbox0';

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
    // string
    idempotencyKey: idempotencyKey_example,
    // CaptureSandboxRootFSSnapshotRequest
    captureSandboxRootFSSnapshotRequest: ...,
  } satisfies CaptureSandboxRootFSSnapshotOperationRequest;

  try {
    const data = await api.captureSandboxRootFSSnapshot(body);
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
| **idempotencyKey** | `string` |  | [Defaults to `undefined`] |
| **captureSandboxRootFSSnapshotRequest** | [CaptureSandboxRootFSSnapshotRequest](CaptureSandboxRootFSSnapshotRequest.md) |  | |

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
| **201** | The original immutable snapshot is available |  -  |
| **400** | Invalid generation, key or snapshot metadata |  -  |
| **401** | Authentication is required or the bearer credentials are invalid |  -  |
| **404** | Owned sandbox not found |  -  |
| **409** | Source generation, writer, operation identity or retained capture conflicts |  -  |
| **503** | Capture outcome is unavailable; retain the original request for reconciliation |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getCapturedSandboxRootFSSnapshot

> SuccessSandboxRootFSSnapshotResponse getCapturedSandboxRootFSSnapshot(id, idempotencyKey, expectedRuntimeGeneration)

Read the original generation-conditioned snapshot receipt

Reads only the capture identified by the authenticated caller, original Idempotency-Key and expected runtime generation. Does not admit, dispatch, retry, cancel or repair work. Completed receipts can be read after the source changes generation or pauses. A 404 is not proof of cancellation and must not clear an outstanding operation fence. A missing, expired or deleted retained snapshot is never replaced with a new capture.

### Example

```ts
import {
  Configuration,
  SandboxRootfsApi,
} from 'sandbox0';
import type { GetCapturedSandboxRootFSSnapshotRequest } from 'sandbox0';

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
    // string
    idempotencyKey: idempotencyKey_example,
    // number
    expectedRuntimeGeneration: 789,
  } satisfies GetCapturedSandboxRootFSSnapshotRequest;

  try {
    const data = await api.getCapturedSandboxRootFSSnapshot(body);
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
| **idempotencyKey** | `string` |  | [Defaults to `undefined`] |
| **expectedRuntimeGeneration** | `number` |  | [Defaults to `undefined`] |

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
| **200** | The original immutable snapshot is available |  -  |
| **400** | Invalid generation or key |  -  |
| **401** | Authentication is required or the bearer credentials are invalid |  -  |
| **403** | Sandbox read permission is required |  -  |
| **404** | Owned sandbox or original capture not found; not proof of cancellation |  -  |
| **409** | Original coordinates conflict or retained snapshot is no longer available |  -  |
| **503** | Original capture pending or observation temporarily unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getSandboxRootFSFork

> SuccessSandboxRootFSForkObservationResponse getSandboxRootFSFork(id, idempotencyKey, expectedRuntimeGeneration)

Read original RootFS fork destination provenance

Reads one external database observation for the original authenticated caller, Idempotency-Key and source runtime generation, including zero. Does not submit, retry, cancel or repair work, contact the guest or resume a runtime. Requires sandbox:read. A 404 is not proof of cancellation. Only RootFS forks qualify: memory forks are rejected. The child must remain paused, never run, and retain its original claim and durable head. Configuration must match birth or the one externally committed credential-free network isolation preparation; other changes are rejected. Running-source forks must retain their checkpoint proof; paused-source forks must retain the source filesystem binding. Later source generations or a retained source tombstone do not create a new capture. This is not a credential-safety attestation or a state reservation; subsequent mutations require their own identity conditions.

### Example

```ts
import {
  Configuration,
  SandboxRootfsApi,
} from 'sandbox0';
import type { GetSandboxRootFSForkRequest } from 'sandbox0';

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
    // string
    idempotencyKey: idempotencyKey_example,
    // number
    expectedRuntimeGeneration: 789,
  } satisfies GetSandboxRootFSForkRequest;

  try {
    const data = await api.getSandboxRootFSFork(body);
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
| **idempotencyKey** | `string` |  | [Defaults to `undefined`] |
| **expectedRuntimeGeneration** | `number` |  | [Defaults to `undefined`] |

### Return type

[**SuccessSandboxRootFSForkObservationResponse**](SuccessSandboxRootFSForkObservationResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The original committed fork child is unchanged and never run |  -  |
| **400** | Invalid generation or key |  -  |
| **401** | Authentication is required or the bearer credentials are invalid |  -  |
| **403** | Sandbox read permission is required |  -  |
| **404** | Owned sandbox or original fork not found; not proof of cancellation |  -  |
| **409** | Coordinates conflict, memory fork, or retained child evidence no longer matches |  -  |
| **503** | Original fork pending or observation temporarily unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getSandboxRootFSForkLaunch

> SuccessSandboxRootFSForkLaunchResponse getSandboxRootFSForkLaunch(id, idempotencyKey, forkOperationId, filesystemId, headGenerationId, writerEpoch)

Read the original first fork launch result

Binds the original authenticated caller and Idempotency-Key to a first cold launch of the child at generation zero. Supply the original fork operation and the child\&#39;s observed filesystem, head and writer epoch. The child must retain its original birth configuration, or its one externally committed credential-free network isolation preparation; all other fields and automatic-wake disablement must remain unchanged. Memory forks and ordinary resumes are excluded. Retries must keep the same key and conditions; never refresh them after uncertainty. Requires sandbox:read. This is a read-only historical lookup and never admits, retries, wakes or contacts a guest. A 404 is not cancellation. Completed history survives later lifecycles. Current only compares the owner/lifecycle snapshot, not runtime health or a lease. Aborted does not prove physical absence. This is not credential admission.

### Example

```ts
import {
  Configuration,
  SandboxRootfsApi,
} from 'sandbox0';
import type { GetSandboxRootFSForkLaunchRequest } from 'sandbox0';

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
    // string
    idempotencyKey: idempotencyKey_example,
    // string
    forkOperationId: forkOperationId_example,
    // string
    filesystemId: filesystemId_example,
    // string
    headGenerationId: headGenerationId_example,
    // number
    writerEpoch: 789,
  } satisfies GetSandboxRootFSForkLaunchRequest;

  try {
    const data = await api.getSandboxRootFSForkLaunch(body);
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
| **idempotencyKey** | `string` |  | [Defaults to `undefined`] |
| **forkOperationId** | `string` |  | [Defaults to `undefined`] |
| **filesystemId** | `string` |  | [Defaults to `undefined`] |
| **headGenerationId** | `string` |  | [Defaults to `undefined`] |
| **writerEpoch** | `number` |  | [Defaults to `undefined`] |

### Return type

[**SuccessSandboxRootFSForkLaunchResponse**](SuccessSandboxRootFSForkLaunchResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Original launch observation; completed or logically aborted history may no longer be current |  -  |
| **400** | Malformed or missing original conditions |  -  |
| **401** | Authentication required |  -  |
| **403** | Required sandbox permission is missing |  -  |
| **404** | Owned child or original request not found; not cancellation |  -  |
| **409** | Original conditions or retained authority conflict |  -  |
| **429** | Active sandbox quota is exhausted |  -  |
| **503** | Control plane temporarily unavailable; preserve the original request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getSandboxRootFSIdentity

> SuccessSandboxRootFSIdentityResponse getSandboxRootFSIdentity(id)

Read external runtime and RootFS identity

Requires sandbox:read. Reads one owner-scoped control-plane database snapshot without guest execution, node probing or automatic resume. Binds runtime coordinates to the durable filesystem, committed head and immutable image digest. This is provenance, not current storage liveness, an uncommitted-write guarantee or credential-clean attestation. A later lifecycle can invalidate the observation; mutations must still condition on the expected runtime generation and their own admission evidence.

### Example

```ts
import {
  Configuration,
  SandboxRootfsApi,
} from 'sandbox0';
import type { GetSandboxRootFSIdentityRequest } from 'sandbox0';

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
  } satisfies GetSandboxRootFSIdentityRequest;

  try {
    const data = await api.getSandboxRootFSIdentity(body);
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

[**SuccessSandboxRootFSIdentityResponse**](SuccessSandboxRootFSIdentityResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | External identity observation; Cache-Control no-store |  -  |
| **400** | Unexpected query parameters |  -  |
| **401** | Authentication required |  -  |
| **403** | Required sandbox read permission missing |  -  |
| **404** | Sandbox not found in the authenticated team |  -  |
| **409** | Durable RootFS identity has not been initialized |  -  |
| **503** | External identity authority temporarily unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## launchSandboxRootFSFork

> SuccessSandboxRootFSForkLaunchResponse launchSandboxRootFSFork(id, idempotencyKey, sandboxRootFSForkLaunchRequest)

Launch the original never-run RootFS fork

Binds the original authenticated caller and Idempotency-Key to a first cold launch of the child at generation zero. Supply the original fork operation and the child\&#39;s observed filesystem, head and writer epoch. The child must retain its original birth configuration, or its one externally committed credential-free network isolation preparation; all other fields and automatic-wake disablement must remain unchanged. Memory forks and ordinary resumes are excluded. Retries must keep the same key and conditions; never refresh them after uncertainty. Requires sandbox:write. Admission is durable before node dispatch; manager recovery continues the exact lifecycle after a timeout or lost reply. No guest command or terminal is required. A 503 does not prove that admission failed; use GET with the original key and conditions. Completed history survives later lifecycles. Current only compares the owner/lifecycle snapshot, not runtime health or a lease. Aborted does not prove physical absence. This is not credential admission.

### Example

```ts
import {
  Configuration,
  SandboxRootfsApi,
} from 'sandbox0';
import type { LaunchSandboxRootFSForkRequest } from 'sandbox0';

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
    // string
    idempotencyKey: idempotencyKey_example,
    // SandboxRootFSForkLaunchRequest
    sandboxRootFSForkLaunchRequest: ...,
  } satisfies LaunchSandboxRootFSForkRequest;

  try {
    const data = await api.launchSandboxRootFSFork(body);
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
| **idempotencyKey** | `string` |  | [Defaults to `undefined`] |
| **sandboxRootFSForkLaunchRequest** | [SandboxRootFSForkLaunchRequest](SandboxRootFSForkLaunchRequest.md) |  | |

### Return type

[**SuccessSandboxRootFSForkLaunchResponse**](SuccessSandboxRootFSForkLaunchResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Original launch observation; completed or logically aborted history may no longer be current |  -  |
| **202** | Original first launch remains durably pending |  -  |
| **400** | Malformed or missing original conditions |  -  |
| **401** | Authentication required |  -  |
| **403** | Required sandbox permission is missing |  -  |
| **404** | Owned child or original request not found; not cancellation |  -  |
| **409** | Original conditions or retained authority conflict |  -  |
| **429** | Active sandbox quota is exhausted |  -  |
| **503** | Control plane temporarily unavailable; preserve the original request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

