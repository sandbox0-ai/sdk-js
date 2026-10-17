# SandboxesApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**acknowledgeSandboxRestartFinalCapture**](SandboxesApi.md#acknowledgesandboxrestartfinalcapture) | **POST** /api/v1/sandboxes/{id}/restart-operations/{operation_id}/final-capture/acknowledgement | Commit the owner receipt for final restart credentials |
| [**acknowledgeSandboxSnapshotRestoreFinalCapture**](SandboxesApi.md#acknowledgesandboxsnapshotrestorefinalcapture) | **POST** /api/v1/sandboxes/{id}/snapshot-restore-operations/{operation_id}/final-capture/acknowledgement | Commit the owner receipt for final restart credentials |
| [**apiV1SandboxesGet**](SandboxesApi.md#apiv1sandboxesget) | **GET** /api/v1/sandboxes | List sandboxes |
| [**apiV1SandboxesIdDelete**](SandboxesApi.md#apiv1sandboxesiddelete) | **DELETE** /api/v1/sandboxes/{id} | Delete (terminate) a sandbox |
| [**apiV1SandboxesIdGet**](SandboxesApi.md#apiv1sandboxesidget) | **GET** /api/v1/sandboxes/{id} | Get sandbox by ID |
| [**apiV1SandboxesIdNetworkGet**](SandboxesApi.md#apiv1sandboxesidnetworkget) | **GET** /api/v1/sandboxes/{id}/network | Get sandbox network policy |
| [**apiV1SandboxesIdNetworkPut**](SandboxesApi.md#apiv1sandboxesidnetworkput) | **PUT** /api/v1/sandboxes/{id}/network | Update sandbox network policy |
| [**apiV1SandboxesIdPausePost**](SandboxesApi.md#apiv1sandboxesidpausepost) | **POST** /api/v1/sandboxes/{id}/pause | Pause a sandbox |
| [**apiV1SandboxesIdPreviewsPost**](SandboxesApi.md#apiv1sandboxesidpreviewspost) | **POST** /api/v1/sandboxes/{id}/previews | Create a private sandbox preview grant |
| [**apiV1SandboxesIdPreviewsPreviewIdDelete**](SandboxesApi.md#apiv1sandboxesidpreviewspreviewiddelete) | **DELETE** /api/v1/sandboxes/{id}/previews/{preview_id} | Revoke a private sandbox preview grant |
| [**apiV1SandboxesIdPreviewsPreviewIdPut**](SandboxesApi.md#apiv1sandboxesidpreviewspreviewidput) | **PUT** /api/v1/sandboxes/{id}/previews/{preview_id} | Renew a private sandbox preview grant |
| [**apiV1SandboxesIdPut**](SandboxesApi.md#apiv1sandboxesidput) | **PUT** /api/v1/sandboxes/{id} | Update sandbox configuration |
| [**apiV1SandboxesIdRefreshPost**](SandboxesApi.md#apiv1sandboxesidrefreshpost) | **POST** /api/v1/sandboxes/{id}/refresh | Refresh sandbox TTL |
| [**apiV1SandboxesIdResumePost**](SandboxesApi.md#apiv1sandboxesidresumepost) | **POST** /api/v1/sandboxes/{id}/resume | Resume a sandbox |
| [**apiV1SandboxesIdServicesGet**](SandboxesApi.md#apiv1sandboxesidservicesget) | **GET** /api/v1/sandboxes/{id}/services | List sandbox services |
| [**apiV1SandboxesIdServicesPut**](SandboxesApi.md#apiv1sandboxesidservicesput) | **PUT** /api/v1/sandboxes/{id}/services | Replace sandbox services |
| [**apiV1SandboxesIdStatusGet**](SandboxesApi.md#apiv1sandboxesidstatusget) | **GET** /api/v1/sandboxes/{id}/status | Get sandbox status |
| [**apiV1SandboxesPost**](SandboxesApi.md#apiv1sandboxespost) | **POST** /api/v1/sandboxes | Create (claim) a sandbox |
| [**deleteSandboxManagedFile**](SandboxesApi.md#deletesandboxmanagedfile) | **DELETE** /api/v1/sandboxes/{id}/managed-files/{name} | Delete a managed runtime file conditionally |
| [**deleteSandboxNamespacedManagedFile**](SandboxesApi.md#deletesandboxnamespacedmanagedfile) | **DELETE** /api/v1/sandboxes/{id}/managed-file-namespaces/{namespace}/{name} | Delete a namespaced managed runtime file conditionally |
| [**findSandboxRestartOperation**](SandboxesApi.md#findsandboxrestartoperation) | **GET** /api/v1/sandboxes/{id}/restart-operations | Find a restart by its original request key |
| [**findSandboxSnapshotRestoreOperation**](SandboxesApi.md#findsandboxsnapshotrestoreoperation) | **GET** /api/v1/sandboxes/{id}/snapshot-restore-operations | Find a snapshot restore by its original request key |
| [**getSandboxHealth**](SandboxesApi.md#getsandboxhealth) | **GET** /api/v1/sandboxes/{id}/health | Observe independent runtime, execution, terminal and storage health |
| [**getSandboxMemoryRestoration**](SandboxesApi.md#getsandboxmemoryrestoration) | **GET** /api/v1/sandboxes/{id}/memory-restoration | Read committed same-sandbox memory restoration lineage |
| [**getSandboxRestartFinalCapture**](SandboxesApi.md#getsandboxrestartfinalcapture) | **GET** /api/v1/sandboxes/{id}/restart-operations/{operation_id}/final-capture | Get retained cold-restart credential custody |
| [**getSandboxRestartOperation**](SandboxesApi.md#getsandboxrestartoperation) | **GET** /api/v1/sandboxes/{id}/restart-operations/{operation_id} | Get durable restart state and bounded retry diagnostics |
| [**getSandboxSnapshotRestoreFinalCapture**](SandboxesApi.md#getsandboxsnapshotrestorefinalcapture) | **GET** /api/v1/sandboxes/{id}/snapshot-restore-operations/{operation_id}/final-capture | Get retained cold-restart credential custody |
| [**getSandboxSnapshotRestoreOperation**](SandboxesApi.md#getsandboxsnapshotrestoreoperation) | **GET** /api/v1/sandboxes/{id}/snapshot-restore-operations/{operation_id} | Get durable restart state and bounded retry diagnostics |
| [**inspectSandboxManagedFiles**](SandboxesApi.md#inspectsandboxmanagedfiles) | **GET** /api/v1/sandboxes/{id}/managed-files | Inspect the current runtime-only managed file projection |
| [**lookupSandboxMemoryOperation**](SandboxesApi.md#lookupsandboxmemoryoperation) | **GET** /api/v1/sandboxes/{id}/memory-operations/lookup | Read the exact conditional memory lifecycle result |
| [**readSandboxManagedFile**](SandboxesApi.md#readsandboxmanagedfile) | **GET** /api/v1/sandboxes/{id}/managed-files/{name} | Read a managed runtime file |
| [**readSandboxNamespacedManagedFile**](SandboxesApi.md#readsandboxnamespacedmanagedfile) | **GET** /api/v1/sandboxes/{id}/managed-file-namespaces/{namespace}/{name} | Read a namespaced managed runtime file |
| [**readSandboxRestartFinalCaptureFile**](SandboxesApi.md#readsandboxrestartfinalcapturefile) | **GET** /api/v1/sandboxes/{id}/restart-operations/{operation_id}/final-capture/namespaces/{namespace}/{name} | Read a file from the exact stopped restart source |
| [**readSandboxSnapshotRestoreFinalCaptureFile**](SandboxesApi.md#readsandboxsnapshotrestorefinalcapturefile) | **GET** /api/v1/sandboxes/{id}/snapshot-restore-operations/{operation_id}/final-capture/namespaces/{namespace}/{name} | Read a file from the exact stopped restart source |
| [**restartSandbox**](SandboxesApi.md#restartsandbox) | **POST** /api/v1/sandboxes/{id}/restart | Explicitly replace a sandbox runtime and discard process state |
| [**restoreSandboxSnapshot**](SandboxesApi.md#restoresandboxsnapshot) | **POST** /api/v1/sandboxes/{id}/snapshot-restore | Restore a selected snapshot and start a fresh runtime |
| [**writeSandboxManagedFile**](SandboxesApi.md#writesandboxmanagedfile) | **PUT** /api/v1/sandboxes/{id}/managed-files/{name} | Replace a managed runtime file conditionally |
| [**writeSandboxNamespacedManagedFile**](SandboxesApi.md#writesandboxnamespacedmanagedfile) | **PUT** /api/v1/sandboxes/{id}/managed-file-namespaces/{namespace}/{name} | Replace a namespaced managed runtime file conditionally |



## acknowledgeSandboxRestartFinalCapture

> SuccessSandboxRestartFinalCaptureResponse acknowledgeSandboxRestartFinalCapture(id, operationId, sandboxRestartFinalCaptureAcknowledgement)

Commit the owner receipt for final restart credentials

Requires sandbox:write. Submit only after final credential or authenticated logout custody is durably committed by the owner. This permits irreversible cleanup of the old projection. Retry the same capture_id and receipt_id after a lost reply; another receipt conflicts. This schedules retirement, not immediate replacement success.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { AcknowledgeSandboxRestartFinalCaptureRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // string
    operationId: operationId_example,
    // SandboxRestartFinalCaptureAcknowledgement
    sandboxRestartFinalCaptureAcknowledgement: ...,
  } satisfies AcknowledgeSandboxRestartFinalCaptureRequest;

  try {
    const data = await api.acknowledgeSandboxRestartFinalCapture(body);
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
| **operationId** | `string` |  | [Defaults to `undefined`] |
| **sandboxRestartFinalCaptureAcknowledgement** | [SandboxRestartFinalCaptureAcknowledgement](SandboxRestartFinalCaptureAcknowledgement.md) |  | |

### Return type

[**SuccessSandboxRestartFinalCaptureResponse**](SuccessSandboxRestartFinalCaptureResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Retained metadata or transient file result. Cache-Control: no-store. |  -  |
| **400** | Invalid request |  -  |
| **401** | Authentication required |  -  |
| **403** | Required sandbox permission missing |  -  |
| **404** | Restart capture not found; never an absent-file or logout result |  -  |
| **409** | Capture is not stopped, is acknowledged, or differs from its source or receipt |  -  |
| **503** | Restart control plane temporarily unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## acknowledgeSandboxSnapshotRestoreFinalCapture

> SuccessSandboxRestartFinalCaptureResponse acknowledgeSandboxSnapshotRestoreFinalCapture(id, operationId, sandboxRestartFinalCaptureAcknowledgement)

Commit the owner receipt for final restart credentials

Requires sandbox:write. Submit only after final credential or authenticated logout custody is durably committed by the owner. This permits irreversible cleanup of the old projection. Retry the same capture_id and receipt_id after a lost reply; another receipt conflicts. This schedules retirement, not immediate replacement success.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { AcknowledgeSandboxSnapshotRestoreFinalCaptureRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // string
    operationId: operationId_example,
    // SandboxRestartFinalCaptureAcknowledgement
    sandboxRestartFinalCaptureAcknowledgement: ...,
  } satisfies AcknowledgeSandboxSnapshotRestoreFinalCaptureRequest;

  try {
    const data = await api.acknowledgeSandboxSnapshotRestoreFinalCapture(body);
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
| **operationId** | `string` |  | [Defaults to `undefined`] |
| **sandboxRestartFinalCaptureAcknowledgement** | [SandboxRestartFinalCaptureAcknowledgement](SandboxRestartFinalCaptureAcknowledgement.md) |  | |

### Return type

[**SuccessSandboxRestartFinalCaptureResponse**](SuccessSandboxRestartFinalCaptureResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Retained metadata or transient file result. Cache-Control: no-store. |  -  |
| **400** | Invalid request |  -  |
| **401** | Authentication required |  -  |
| **403** | Required sandbox permission missing |  -  |
| **404** | Restart capture not found; never an absent-file or logout result |  -  |
| **409** | Capture is not stopped, is acknowledged, or differs from its source or receipt |  -  |
| **503** | Snapshot restore control plane temporarily unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesGet

> SuccessSandboxListResponse apiV1SandboxesGet(status, templateId, paused, limit, offset)

List sandboxes

List all sandboxes for the authenticated team. In multi-cluster mode, this endpoint aggregates results from all enabled clusters.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // SandboxLifecycleStatus | Filter by sandbox status (optional)
    status: ...,
    // string | Filter by template ID (optional)
    templateId: templateId_example,
    // boolean | Filter by paused state (optional)
    paused: true,
    // number | Maximum number of results per page (optional)
    limit: 56,
    // number | Pagination offset (optional)
    offset: 56,
  } satisfies ApiV1SandboxesGetRequest;

  try {
    const data = await api.apiV1SandboxesGet(body);
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
| **status** | `SandboxLifecycleStatus` | Filter by sandbox status | [Optional] [Defaults to `undefined`] [Enum: starting, running, paused, terminating, failed] |
| **templateId** | `string` | Filter by template ID | [Optional] [Defaults to `undefined`] |
| **paused** | `boolean` | Filter by paused state | [Optional] [Defaults to `undefined`] |
| **limit** | `number` | Maximum number of results per page | [Optional] [Defaults to `50`] |
| **offset** | `number` | Pagination offset | [Optional] [Defaults to `0`] |

### Return type

[**SuccessSandboxListResponse**](SuccessSandboxListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **401** | Authentication is required or the bearer credentials are invalid |  -  |
| **200** | List of sandboxes |  -  |
| **400** | Invalid request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdDelete

> SuccessMessageResponse apiV1SandboxesIdDelete(id)

Delete (terminate) a sandbox

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdDeleteRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiV1SandboxesIdDeleteRequest;

  try {
    const data = await api.apiV1SandboxesIdDelete(body);
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

[**SuccessMessageResponse**](SuccessMessageResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **401** | Authentication is required or the bearer credentials are invalid |  -  |
| **202** | Sandbox termination accepted for asynchronous cleanup |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdGet

> SuccessSandboxResponse apiV1SandboxesIdGet(id)

Get sandbox by ID

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiV1SandboxesIdGetRequest;

  try {
    const data = await api.apiV1SandboxesIdGet(body);
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

[**SuccessSandboxResponse**](SuccessSandboxResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **401** | Authentication is required or the bearer credentials are invalid |  -  |
| **200** | Sandbox |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdNetworkGet

> SuccessSandboxNetworkPolicyResponse apiV1SandboxesIdNetworkGet(id)

Get sandbox network policy

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdNetworkGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiV1SandboxesIdNetworkGetRequest;

  try {
    const data = await api.apiV1SandboxesIdNetworkGet(body);
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

[**SuccessSandboxNetworkPolicyResponse**](SuccessSandboxNetworkPolicyResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **401** | Authentication is required or the bearer credentials are invalid |  -  |
| **200** | Network policy |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdNetworkPut

> SuccessSandboxNetworkPolicyResponse apiV1SandboxesIdNetworkPut(id, sandboxNetworkPolicy)

Update sandbox network policy

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdNetworkPutRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // SandboxNetworkPolicy
    sandboxNetworkPolicy: ...,
  } satisfies ApiV1SandboxesIdNetworkPutRequest;

  try {
    const data = await api.apiV1SandboxesIdNetworkPut(body);
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
| **sandboxNetworkPolicy** | [SandboxNetworkPolicy](SandboxNetworkPolicy.md) |  | |

### Return type

[**SuccessSandboxNetworkPolicyResponse**](SuccessSandboxNetworkPolicyResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **401** | Authentication is required or the bearer credentials are invalid |  -  |
| **200** | Network policy updated |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdPausePost

> SuccessPauseSandboxResponse apiV1SandboxesIdPausePost(id, idempotencyKey, sandboxPauseRequest)

Pause a sandbox

The default checkpoints only the writable RootFS. Set memory&#x3D;true to also retain process execution state before releasing the runtime. A 202 response means checkpoint publication and cleanup are still pending. For conditional memory pause, send expected_runtime_generation and Idempotency-Key together with memory&#x3D;true. Retries bind the same source generation and checkpoint operation; mismatched or aborted operations conflict.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdPausePostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // string | Required with expected_runtime_generation for conditional memory pause. Reuse the same key for retries; a new attempt after a safe cancellation requires a new key. (optional)
    idempotencyKey: idempotencyKey_example,
    // SandboxPauseRequest (optional)
    sandboxPauseRequest: ...,
  } satisfies ApiV1SandboxesIdPausePostRequest;

  try {
    const data = await api.apiV1SandboxesIdPausePost(body);
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
| **idempotencyKey** | `string` | Required with expected_runtime_generation for conditional memory pause. Reuse the same key for retries; a new attempt after a safe cancellation requires a new key. | [Optional] [Defaults to `undefined`] |
| **sandboxPauseRequest** | [SandboxPauseRequest](SandboxPauseRequest.md) |  | [Optional] |

### Return type

[**SuccessPauseSandboxResponse**](SuccessPauseSandboxResponse.md)

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
| **200** | Sandbox paused |  -  |
| **202** | Sandbox pause accepted and checkpoint cleanup is still in progress |  -  |
| **409** | Sandbox lifecycle state conflicts with this operation |  -  |
| **504** | Timed out waiting for the sandbox to pause |  -  |
| **503** | Sandbox pause requires ctld |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdPreviewsPost

> SuccessSandboxPreviewResponse apiV1SandboxesIdPreviewsPost(id, sandboxPreviewCreateRequest)

Create a private sandbox preview grant

Creates a short-lived, sandbox-runtime-bound authorization for previewing a loopback HTTP server through the region public exposure domain. The returned URL performs a one-time browser bootstrap and then redirects to a clean same-origin URL. This does not publish or modify sandbox services.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdPreviewsPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // SandboxPreviewCreateRequest
    sandboxPreviewCreateRequest: ...,
  } satisfies ApiV1SandboxesIdPreviewsPostRequest;

  try {
    const data = await api.apiV1SandboxesIdPreviewsPost(body);
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
| **sandboxPreviewCreateRequest** | [SandboxPreviewCreateRequest](SandboxPreviewCreateRequest.md) |  | |

### Return type

[**SuccessSandboxPreviewResponse**](SuccessSandboxPreviewResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **401** | Authentication is required or the bearer credentials are invalid |  -  |
| **201** | Preview grant created |  -  |
| **400** | Invalid preview request |  -  |
| **403** | Forbidden or reserved port |  -  |
| **404** | Sandbox not found |  -  |
| **503** | Sandbox runtime, public exposure, or authorization store unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdPreviewsPreviewIdDelete

> SuccessMessageResponse apiV1SandboxesIdPreviewsPreviewIdDelete(id, previewId)

Revoke a private sandbox preview grant

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdPreviewsPreviewIdDeleteRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // string
    previewId: previewId_example,
  } satisfies ApiV1SandboxesIdPreviewsPreviewIdDeleteRequest;

  try {
    const data = await api.apiV1SandboxesIdPreviewsPreviewIdDelete(body);
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
| **previewId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SuccessMessageResponse**](SuccessMessageResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **401** | Authentication is required or the bearer credentials are invalid |  -  |
| **200** | Preview grant revoked |  -  |
| **404** | Preview grant not found |  -  |
| **503** | Preview authorization store unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdPreviewsPreviewIdPut

> SuccessSandboxPreviewResponse apiV1SandboxesIdPreviewsPreviewIdPut(id, previewId, sandboxPreviewRenewRequest)

Renew a private sandbox preview grant

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdPreviewsPreviewIdPutRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // string
    previewId: previewId_example,
    // SandboxPreviewRenewRequest
    sandboxPreviewRenewRequest: ...,
  } satisfies ApiV1SandboxesIdPreviewsPreviewIdPutRequest;

  try {
    const data = await api.apiV1SandboxesIdPreviewsPreviewIdPut(body);
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
| **previewId** | `string` |  | [Defaults to `undefined`] |
| **sandboxPreviewRenewRequest** | [SandboxPreviewRenewRequest](SandboxPreviewRenewRequest.md) |  | |

### Return type

[**SuccessSandboxPreviewResponse**](SuccessSandboxPreviewResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **401** | Authentication is required or the bearer credentials are invalid |  -  |
| **200** | Preview grant renewed |  -  |
| **400** | Invalid preview renewal request |  -  |
| **404** | Preview grant or sandbox not found |  -  |
| **409** | Preview grant belongs to a previous sandbox runtime |  -  |
| **503** | Sandbox runtime or authorization store unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdPut

> SuccessSandboxResponse apiV1SandboxesIdPut(id, sandboxUpdateRequest)

Update sandbox configuration

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdPutRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // SandboxUpdateRequest
    sandboxUpdateRequest: ...,
  } satisfies ApiV1SandboxesIdPutRequest;

  try {
    const data = await api.apiV1SandboxesIdPut(body);
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
| **sandboxUpdateRequest** | [SandboxUpdateRequest](SandboxUpdateRequest.md) |  | |

### Return type

[**SuccessSandboxResponse**](SuccessSandboxResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **401** | Authentication is required or the bearer credentials are invalid |  -  |
| **200** | Sandbox updated |  -  |
| **400** | Invalid request |  -  |
| **404** | Not found |  -  |
| **409** | Another lifecycle or a different resource resize owns the sandbox |  -  |
| **503** | Resource resize is durably pending; retry the same memory limit |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdRefreshPost

> SuccessRefreshResponse apiV1SandboxesIdRefreshPost(id, sandboxRefreshRequest)

Refresh sandbox TTL

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdRefreshPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // SandboxRefreshRequest (optional)
    sandboxRefreshRequest: ...,
  } satisfies ApiV1SandboxesIdRefreshPostRequest;

  try {
    const data = await api.apiV1SandboxesIdRefreshPost(body);
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
| **sandboxRefreshRequest** | [SandboxRefreshRequest](SandboxRefreshRequest.md) |  | [Optional] |

### Return type

[**SuccessRefreshResponse**](SuccessRefreshResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **401** | Authentication is required or the bearer credentials are invalid |  -  |
| **200** | TTL refreshed |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdResumePost

> SuccessResumeSandboxResponse apiV1SandboxesIdResumePost(id, idempotencyKey, sandboxExecutionStateRequest)

Resume a sandbox

The default starts a new process runtime from the committed RootFS. Set memory&#x3D;true to require a retained execution image. Missing, incompatible, or failed memory restoration returns an error and never authorizes a filesystem-only replacement. Accepted memory operations may continue through background recovery after a disconnected request. For conditional memory resume, send memory&#x3D;true, expected_runtime_generation, checkpoint_id and Idempotency-Key together. Keep the same authenticated identity, key, checkpoint and source generation on retries. A successful conditional response proves this request committed its exact restore; unrelated running state or a later lifecycle conflicts. An aborted request cannot create a new restore attempt.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdResumePostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // string | Required with expected_runtime_generation and checkpoint_id for conditional memory resume. Reuse the same key on retries. A new attempt after safe terminal cleanup requires a new explicit key and the exact then-current paused generation. (optional)
    idempotencyKey: idempotencyKey_example,
    // SandboxExecutionStateRequest (optional)
    sandboxExecutionStateRequest: ...,
  } satisfies ApiV1SandboxesIdResumePostRequest;

  try {
    const data = await api.apiV1SandboxesIdResumePost(body);
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
| **idempotencyKey** | `string` | Required with expected_runtime_generation and checkpoint_id for conditional memory resume. Reuse the same key on retries. A new attempt after safe terminal cleanup requires a new explicit key and the exact then-current paused generation. | [Optional] [Defaults to `undefined`] |
| **sandboxExecutionStateRequest** | [SandboxExecutionStateRequest](SandboxExecutionStateRequest.md) |  | [Optional] |

### Return type

[**SuccessResumeSandboxResponse**](SuccessResumeSandboxResponse.md)

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
| **200** | Sandbox resumed |  -  |
| **409** | Sandbox lifecycle state conflicts with this operation |  -  |
| **429** | Resume would exceed active runtime quota |  -  |
| **504** | Timed out waiting for the sandbox to resume |  -  |
| **503** | Sandbox resume is temporarily unavailable |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdServicesGet

> SuccessSandboxServicesResponse apiV1SandboxesIdServicesGet(id)

List sandbox services

Lists sandbox services configured on the sandbox.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdServicesGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiV1SandboxesIdServicesGetRequest;

  try {
    const data = await api.apiV1SandboxesIdServicesGet(body);
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

[**SuccessSandboxServicesResponse**](SuccessSandboxServicesResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **401** | Authentication is required or the bearer credentials are invalid |  -  |
| **200** | Sandbox services |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdServicesPut

> SuccessSandboxServicesResponse apiV1SandboxesIdServicesPut(id, sandboxServicesUpdateRequest)

Replace sandbox services

Replaces the sandbox services used for public exposure.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdServicesPutRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // SandboxServicesUpdateRequest
    sandboxServicesUpdateRequest: ...,
  } satisfies ApiV1SandboxesIdServicesPutRequest;

  try {
    const data = await api.apiV1SandboxesIdServicesPut(body);
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
| **sandboxServicesUpdateRequest** | [SandboxServicesUpdateRequest](SandboxServicesUpdateRequest.md) |  | |

### Return type

[**SuccessSandboxServicesResponse**](SuccessSandboxServicesResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **401** | Authentication is required or the bearer credentials are invalid |  -  |
| **200** | Sandbox services updated |  -  |
| **400** | Invalid sandbox services |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdStatusGet

> SuccessSandboxStatusResponse apiV1SandboxesIdStatusGet(id)

Get sandbox status

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdStatusGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiV1SandboxesIdStatusGetRequest;

  try {
    const data = await api.apiV1SandboxesIdStatusGet(body);
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

[**SuccessSandboxStatusResponse**](SuccessSandboxStatusResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **401** | Authentication is required or the bearer credentials are invalid |  -  |
| **200** | Sandbox status |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesPost

> SuccessClaimResponse apiV1SandboxesPost(claimRequest)

Create (claim) a sandbox

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ApiV1SandboxesPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // ClaimRequest
    claimRequest: ...,
  } satisfies ApiV1SandboxesPostRequest;

  try {
    const data = await api.apiV1SandboxesPost(body);
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
| **claimRequest** | [ClaimRequest](ClaimRequest.md) |  | |

### Return type

[**SuccessClaimResponse**](SuccessClaimResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **401** | Authentication is required or the bearer credentials are invalid |  -  |
| **201** | Sandbox claimed |  -  |
| **400** | Invalid request |  -  |
| **409** | The selected template is still creating or its creation failed |  * Retry-After - Suggested retry delay in seconds when template creation is still in progress <br>  |
| **429** | Team quota exceeded or claim/start admission throttled |  * Retry-After - Suggested retry delay in seconds when claim/start admission is throttled <br>  |
| **503** | Data plane temporarily unavailable |  * Retry-After - Suggested retry delay in seconds <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteSandboxManagedFile

> SuccessManagedFilesStateResponse deleteSandboxManagedFile(id, runtimeGeneration, name, expectedMutationSequence)

Delete a managed runtime file conditionally

Deletion consumes the expected sequence before I/O, including when the reply is lost. Inspect/read to reconcile ambiguous results before issuing a new mutation.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { DeleteSandboxManagedFileRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // number | Exact current runtime generation to access; never auto-resumes a sandbox.
    runtimeGeneration: 789,
    // string | One ASCII file name; dot, dot-dot and the reserved .s0-write- prefix are rejected. No guest or host paths are accepted.
    name: name_example,
    // string
    expectedMutationSequence: expectedMutationSequence_example,
  } satisfies DeleteSandboxManagedFileRequest;

  try {
    const data = await api.deleteSandboxManagedFile(body);
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
| **runtimeGeneration** | `number` | Exact current runtime generation to access; never auto-resumes a sandbox. | [Defaults to `undefined`] |
| **name** | `string` | One ASCII file name; dot, dot-dot and the reserved .s0-write- prefix are rejected. No guest or host paths are accepted. | [Defaults to `undefined`] |
| **expectedMutationSequence** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SuccessManagedFilesStateResponse**](SuccessManagedFilesStateResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Exact runtime projection operation completed |  -  |
| **400** | Invalid name, generation, sequence or content |  -  |
| **401** | Authentication is required or the bearer credentials are invalid |  -  |
| **403** | Sandbox read or write permission is required for this operation |  -  |
| **404** | Sandbox or managed file not found. Only error.code managed_file_not_found identifies an absent file after verified backing and runtime custody; a generic 404 can mean an unsupported route and must not be treated as an empty credential. |  -  |
| **409** | Generation or mutation sequence changed, lifecycle is in progress, or the runtime has no managed projection. error.code managed_files_unsupported identifies the legacy layout requiring explicit migration; conflict identifies authority or sequence changes. Reconcile before another mutation. |  -  |
| **503** | Exact external runtime authority is unavailable. A mutation may have consumed its sequence; inspect and read before retrying. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteSandboxNamespacedManagedFile

> SuccessManagedFilesStateResponse deleteSandboxNamespacedManagedFile(id, runtimeGeneration, name, namespace, expectedMutationSequence)

Delete a namespaced managed runtime file conditionally

Deletion consumes the expected sequence before I/O, including when the reply is lost. Inspect/read to reconcile ambiguous results before issuing a new mutation.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { DeleteSandboxNamespacedManagedFileRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // number | Exact current runtime generation to access; never auto-resumes a sandbox.
    runtimeGeneration: 789,
    // string | One ASCII file name; dot, dot-dot and the reserved .s0-write- prefix are rejected. No guest or host paths are accepted.
    name: name_example,
    // string | Single directory within the runtime projection. Writes create a missing directory on the same tmpfs; reads never create it. Names must be ASCII, excluding dot, dot-dot and the reserved .s0-write- prefix. Symlinks, submounts and directory replacement during access fail closed. Requires a namespace-capable node; never falls back to the root directory. The mutation sequence is shared across all directories.
    namespace: namespace_example,
    // string
    expectedMutationSequence: expectedMutationSequence_example,
  } satisfies DeleteSandboxNamespacedManagedFileRequest;

  try {
    const data = await api.deleteSandboxNamespacedManagedFile(body);
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
| **runtimeGeneration** | `number` | Exact current runtime generation to access; never auto-resumes a sandbox. | [Defaults to `undefined`] |
| **name** | `string` | One ASCII file name; dot, dot-dot and the reserved .s0-write- prefix are rejected. No guest or host paths are accepted. | [Defaults to `undefined`] |
| **namespace** | `string` | Single directory within the runtime projection. Writes create a missing directory on the same tmpfs; reads never create it. Names must be ASCII, excluding dot, dot-dot and the reserved .s0-write- prefix. Symlinks, submounts and directory replacement during access fail closed. Requires a namespace-capable node; never falls back to the root directory. The mutation sequence is shared across all directories. | [Defaults to `undefined`] |
| **expectedMutationSequence** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SuccessManagedFilesStateResponse**](SuccessManagedFilesStateResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Exact runtime projection operation completed |  -  |
| **400** | Invalid name, generation, sequence or content |  -  |
| **401** | Authentication is required or the bearer credentials are invalid |  -  |
| **403** | Sandbox read or write permission is required for this operation |  -  |
| **404** | Sandbox or managed file not found. Only error.code managed_file_not_found identifies an absent file after verified backing and runtime custody; a generic 404 can mean an unsupported route and must not be treated as an empty credential. |  -  |
| **409** | Generation or mutation sequence changed, lifecycle is in progress, or the runtime has no managed projection. error.code managed_files_unsupported identifies the legacy layout requiring explicit migration; conflict identifies authority or sequence changes. Reconcile before another mutation. |  -  |
| **503** | Exact external runtime authority is unavailable. A mutation may have consumed its sequence; inspect and read before retrying. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## findSandboxRestartOperation

> SuccessSandboxRestartOperationResponse findSandboxRestartOperation(id, requestKey)

Find a restart by its original request key

Read-only acknowledgement recovery. Requires sandbox:read. Does not execute in the guest or submit a new restart.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { FindSandboxRestartOperationRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // string
    requestKey: requestKey_example,
  } satisfies FindSandboxRestartOperationRequest;

  try {
    const data = await api.findSandboxRestartOperation(body);
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
| **requestKey** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SuccessSandboxRestartOperationResponse**](SuccessSandboxRestartOperationResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Recorded restart operation; no guest call or automatic resume |  -  |
| **400** | Invalid request |  -  |
| **401** | Authentication required |  -  |
| **403** | Required sandbox permission missing |  -  |
| **404** | Sandbox or restart operation not found |  -  |
| **409** | Request key or source generation conflicts with durable authority |  -  |
| **503** | Restart control plane temporarily unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## findSandboxSnapshotRestoreOperation

> SuccessSandboxSnapshotRestoreOperationResponse findSandboxSnapshotRestoreOperation(id, requestKey)

Find a snapshot restore by its original request key

Read-only acknowledgement recovery. Requires sandbox:read. Does not execute in the guest or submit a new snapshot restore.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { FindSandboxSnapshotRestoreOperationRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // string
    requestKey: requestKey_example,
  } satisfies FindSandboxSnapshotRestoreOperationRequest;

  try {
    const data = await api.findSandboxSnapshotRestoreOperation(body);
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
| **requestKey** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SuccessSandboxSnapshotRestoreOperationResponse**](SuccessSandboxSnapshotRestoreOperationResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Recorded snapshot restore operation; no guest call or automatic resume |  -  |
| **400** | Invalid request |  -  |
| **401** | Authentication required |  -  |
| **403** | Required sandbox permission missing |  -  |
| **404** | Sandbox or snapshot restore operation not found |  -  |
| **409** | Request key or source generation conflicts with durable authority |  -  |
| **503** | Snapshot restore control plane temporarily unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getSandboxHealth

> SuccessSandboxHealthResponse getSandboxHealth(id)

Observe independent runtime, execution, terminal and storage health

Requires sandbox:read. Reads owner-scoped regional authority and bounded independent node and guest diagnostics without automatic resume, restart or credential preparation. Guest diagnostics may execute a fixed short shell command and allocate a temporary PTY; they create no platform session. No probe runs for a paused runtime or a pending lifecycle. Each observation has its own source and time. Guest results are advisory and cannot establish runtime or storage authority. Unknown means insufficient evidence, not success. A valid launch receipt is not current process liveness; RootFS identity and writer lease are not successful storage IO or a guarantee of uncommitted-write durability. Storage IO currently remains unknown. Authority is rechecked after probes so a changed generation or lifecycle cannot inherit a successful old-runtime observation.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { GetSandboxHealthRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies GetSandboxHealthRequest;

  try {
    const data = await api.getSandboxHealth(body);
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

[**SuccessSandboxHealthResponse**](SuccessSandboxHealthResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Independent observations, including degraded or unknown health; Cache-Control no-store |  -  |
| **400** | Unexpected query parameters or request body |  -  |
| **401** | Authentication required |  -  |
| **403** | Required sandbox read permission missing |  -  |
| **404** | Sandbox not found in the authenticated team |  -  |
| **503** | Regional health authority temporarily unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getSandboxMemoryRestoration

> SuccessSandboxMemoryRestorationResponse getSandboxMemoryRestoration(id, runtimeGeneration)

Read committed same-sandbox memory restoration lineage

Requires sandbox:read. Returns external checkpoint/migration restore lineage for the exact current runtime generation after physical retirement commits. No guest execution or lifecycle mutation. This is not a session-health or credential-clean attestation. Missing, pending or incompatible authority is an error; never authorizes cold launch or key re-publication.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { GetSandboxMemoryRestorationRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // number
    runtimeGeneration: 789,
  } satisfies GetSandboxMemoryRestorationRequest;

  try {
    const data = await api.getSandboxMemoryRestoration(body);
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
| **runtimeGeneration** | `number` |  | [Defaults to `undefined`] |

### Return type

[**SuccessSandboxMemoryRestorationResponse**](SuccessSandboxMemoryRestorationResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Committed restoration lineage. Cache-Control: no-store. |  -  |
| **400** | Invalid generation or query |  -  |
| **401** | Authentication required |  -  |
| **403** | sandbox:read permission required |  -  |
| **404** | Sandbox not found |  -  |
| **409** | Current memory restoration authority is missing, incomplete or changed |  -  |
| **503** | External authority temporarily unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getSandboxRestartFinalCapture

> SuccessSandboxRestartFinalCaptureResponse getSandboxRestartFinalCapture(id, operationId)

Get retained cold-restart credential custody

Requires sandbox:read. Reads durable metadata independently of procd. Pending has no capture ID. Stopped identifies one immutable externally stopped source. Acknowledged means the owner receipt is durable; released permits ordinary retirement. This is not a completed restart or a credential-content digest.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { GetSandboxRestartFinalCaptureRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // string
    operationId: operationId_example,
  } satisfies GetSandboxRestartFinalCaptureRequest;

  try {
    const data = await api.getSandboxRestartFinalCapture(body);
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
| **operationId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SuccessSandboxRestartFinalCaptureResponse**](SuccessSandboxRestartFinalCaptureResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Retained metadata or transient file result. Cache-Control: no-store. |  -  |
| **400** | Invalid request |  -  |
| **401** | Authentication required |  -  |
| **403** | Required sandbox permission missing |  -  |
| **404** | Restart capture not found; never an absent-file or logout result |  -  |
| **409** | Capture is not stopped, is acknowledged, or differs from its source or receipt |  -  |
| **503** | Restart control plane temporarily unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getSandboxRestartOperation

> SuccessSandboxRestartOperationResponse getSandboxRestartOperation(id, operationId)

Get durable restart state and bounded retry diagnostics

Requires sandbox:read. Available independently of procd. A succeeded operation reports its historical replacement generation; later lifecycle activity does not cause another restart or make this an application-health report.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { GetSandboxRestartOperationRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // string
    operationId: operationId_example,
  } satisfies GetSandboxRestartOperationRequest;

  try {
    const data = await api.getSandboxRestartOperation(body);
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
| **operationId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SuccessSandboxRestartOperationResponse**](SuccessSandboxRestartOperationResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Recorded restart operation; no guest call or automatic resume |  -  |
| **400** | Invalid request |  -  |
| **401** | Authentication required |  -  |
| **403** | Required sandbox permission missing |  -  |
| **404** | Sandbox or restart operation not found |  -  |
| **409** | Request key or source generation conflicts with durable authority |  -  |
| **503** | Restart control plane temporarily unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getSandboxSnapshotRestoreFinalCapture

> SuccessSandboxRestartFinalCaptureResponse getSandboxSnapshotRestoreFinalCapture(id, operationId)

Get retained cold-restart credential custody

Requires sandbox:read. Reads durable metadata independently of procd. Pending has no capture ID. Stopped identifies one immutable externally stopped source. Acknowledged means the owner receipt is durable; released permits ordinary retirement. This is not a completed restart or a credential-content digest.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { GetSandboxSnapshotRestoreFinalCaptureRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // string
    operationId: operationId_example,
  } satisfies GetSandboxSnapshotRestoreFinalCaptureRequest;

  try {
    const data = await api.getSandboxSnapshotRestoreFinalCapture(body);
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
| **operationId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SuccessSandboxRestartFinalCaptureResponse**](SuccessSandboxRestartFinalCaptureResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Retained metadata or transient file result. Cache-Control: no-store. |  -  |
| **400** | Invalid request |  -  |
| **401** | Authentication required |  -  |
| **403** | Required sandbox permission missing |  -  |
| **404** | Restart capture not found; never an absent-file or logout result |  -  |
| **409** | Capture is not stopped, is acknowledged, or differs from its source or receipt |  -  |
| **503** | Snapshot restore control plane temporarily unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getSandboxSnapshotRestoreOperation

> SuccessSandboxSnapshotRestoreOperationResponse getSandboxSnapshotRestoreOperation(id, operationId)

Get durable restart state and bounded retry diagnostics

Requires sandbox:read. Available independently of procd. A succeeded operation reports its historical replacement generation; later lifecycle activity does not cause another restart or make this an application-health report.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { GetSandboxSnapshotRestoreOperationRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // string
    operationId: operationId_example,
  } satisfies GetSandboxSnapshotRestoreOperationRequest;

  try {
    const data = await api.getSandboxSnapshotRestoreOperation(body);
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
| **operationId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SuccessSandboxSnapshotRestoreOperationResponse**](SuccessSandboxSnapshotRestoreOperationResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Recorded snapshot restore operation; no guest call or automatic resume |  -  |
| **400** | Invalid request |  -  |
| **401** | Authentication required |  -  |
| **403** | Required sandbox permission missing |  -  |
| **404** | Sandbox or snapshot restore operation not found |  -  |
| **409** | Request key or source generation conflicts with durable authority |  -  |
| **503** | Snapshot restore control plane temporarily unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## inspectSandboxManagedFiles

> SuccessManagedFilesStateResponse inspectSandboxManagedFiles(id, runtimeGeneration)

Inspect the current runtime-only managed file projection

Uses node-owned storage outside persistent RootFS without executing in the guest. This describes only managed files and does not attest that historical or user-created RootFS files contain no credentials.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { InspectSandboxManagedFilesRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // number | Exact current runtime generation to access; never auto-resumes a sandbox.
    runtimeGeneration: 789,
  } satisfies InspectSandboxManagedFilesRequest;

  try {
    const data = await api.inspectSandboxManagedFiles(body);
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
| **runtimeGeneration** | `number` | Exact current runtime generation to access; never auto-resumes a sandbox. | [Defaults to `undefined`] |

### Return type

[**SuccessManagedFilesStateResponse**](SuccessManagedFilesStateResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Exact runtime projection operation completed |  -  |
| **400** | Invalid name, generation, sequence or content |  -  |
| **401** | Authentication is required or the bearer credentials are invalid |  -  |
| **403** | Sandbox read or write permission is required for this operation |  -  |
| **404** | Sandbox or managed file not found. Only error.code managed_file_not_found identifies an absent file after verified backing and runtime custody; a generic 404 can mean an unsupported route and must not be treated as an empty credential. |  -  |
| **409** | Generation or mutation sequence changed, lifecycle is in progress, or the runtime has no managed projection. error.code managed_files_unsupported identifies the legacy layout requiring explicit migration; conflict identifies authority or sequence changes. Reconcile before another mutation. |  -  |
| **503** | Exact external runtime authority is unavailable. A mutation may have consumed its sequence; inspect and read before retrying. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## lookupSandboxMemoryOperation

> SuccessSandboxMemoryOperationResponse lookupSandboxMemoryOperation(id, idempotencyKey, action, expectedRuntimeGeneration, checkpointId)

Read the exact conditional memory lifecycle result

Requires sandbox:read and the original caller\&#39;s Idempotency-Key. The authenticated team, user, sandbox and action derive the same request identity as conditional pause or resume. Performs no lifecycle mutation, guest access, quota admission or retry. A missing request returns 404 and never proves cancellation. Historical terminal results remain readable while their evidence is retained, including after later lifecycles; current only compares the owner snapshot and is not a lease or permission to mutate it. Source process health is not implied. A physically resolved failed restore consumes result_runtime_generation while retaining the checkpoint; it must never be retried as a new intent implicitly.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { LookupSandboxMemoryOperationRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // string
    idempotencyKey: idempotencyKey_example,
    // 'pause' | 'resume'
    action: action_example,
    // number | Original source generation. Pause requires at least 1; resume accepts 0 for a never-run fork and must be below the maximum.
    expectedRuntimeGeneration: 789,
    // string | Required for resume and forbidden for pause. Must equal the original retained checkpoint. (optional)
    checkpointId: checkpointId_example,
  } satisfies LookupSandboxMemoryOperationRequest;

  try {
    const data = await api.lookupSandboxMemoryOperation(body);
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
| **action** | `pause`, `resume` |  | [Defaults to `undefined`] [Enum: pause, resume] |
| **expectedRuntimeGeneration** | `number` | Original source generation. Pause requires at least 1; resume accepts 0 for a never-run fork and must be below the maximum. | [Defaults to `undefined`] |
| **checkpointId** | `string` | Required for resume and forbidden for pause. Must equal the original retained checkpoint. | [Optional] [Defaults to `undefined`] |

### Return type

[**SuccessSandboxMemoryOperationResponse**](SuccessSandboxMemoryOperationResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Exact request observation. Cache-Control no-store. No mutation authority. |  -  |
| **400** | Invalid or ambiguous query or key |  -  |
| **401** | Authentication required |  -  |
| **403** | sandbox:read permission required |  -  |
| **404** | Sandbox or exact original request not found |  -  |
| **409** | Request coordinates or retained evidence do not match |  -  |
| **503** | Observation authority unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## readSandboxManagedFile

> SuccessManagedFileReadResponse readSandboxManagedFile(id, runtimeGeneration, name)

Read a managed runtime file

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ReadSandboxManagedFileRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // number | Exact current runtime generation to access; never auto-resumes a sandbox.
    runtimeGeneration: 789,
    // string | One ASCII file name; dot, dot-dot and the reserved .s0-write- prefix are rejected. No guest or host paths are accepted.
    name: name_example,
  } satisfies ReadSandboxManagedFileRequest;

  try {
    const data = await api.readSandboxManagedFile(body);
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
| **runtimeGeneration** | `number` | Exact current runtime generation to access; never auto-resumes a sandbox. | [Defaults to `undefined`] |
| **name** | `string` | One ASCII file name; dot, dot-dot and the reserved .s0-write- prefix are rejected. No guest or host paths are accepted. | [Defaults to `undefined`] |

### Return type

[**SuccessManagedFileReadResponse**](SuccessManagedFileReadResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Exact runtime projection operation completed |  -  |
| **400** | Invalid name, generation, sequence or content |  -  |
| **401** | Authentication is required or the bearer credentials are invalid |  -  |
| **403** | Sandbox read or write permission is required for this operation |  -  |
| **404** | Sandbox or managed file not found. Only error.code managed_file_not_found identifies an absent file after verified backing and runtime custody; a generic 404 can mean an unsupported route and must not be treated as an empty credential. |  -  |
| **409** | Generation or mutation sequence changed, lifecycle is in progress, or the runtime has no managed projection. error.code managed_files_unsupported identifies the legacy layout requiring explicit migration; conflict identifies authority or sequence changes. Reconcile before another mutation. |  -  |
| **503** | Exact external runtime authority is unavailable. A mutation may have consumed its sequence; inspect and read before retrying. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## readSandboxNamespacedManagedFile

> SuccessManagedFileReadResponse readSandboxNamespacedManagedFile(id, runtimeGeneration, name, namespace)

Read a namespaced managed runtime file

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ReadSandboxNamespacedManagedFileRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // number | Exact current runtime generation to access; never auto-resumes a sandbox.
    runtimeGeneration: 789,
    // string | One ASCII file name; dot, dot-dot and the reserved .s0-write- prefix are rejected. No guest or host paths are accepted.
    name: name_example,
    // string | Single directory within the runtime projection. Writes create a missing directory on the same tmpfs; reads never create it. Names must be ASCII, excluding dot, dot-dot and the reserved .s0-write- prefix. Symlinks, submounts and directory replacement during access fail closed. Requires a namespace-capable node; never falls back to the root directory. The mutation sequence is shared across all directories.
    namespace: namespace_example,
  } satisfies ReadSandboxNamespacedManagedFileRequest;

  try {
    const data = await api.readSandboxNamespacedManagedFile(body);
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
| **runtimeGeneration** | `number` | Exact current runtime generation to access; never auto-resumes a sandbox. | [Defaults to `undefined`] |
| **name** | `string` | One ASCII file name; dot, dot-dot and the reserved .s0-write- prefix are rejected. No guest or host paths are accepted. | [Defaults to `undefined`] |
| **namespace** | `string` | Single directory within the runtime projection. Writes create a missing directory on the same tmpfs; reads never create it. Names must be ASCII, excluding dot, dot-dot and the reserved .s0-write- prefix. Symlinks, submounts and directory replacement during access fail closed. Requires a namespace-capable node; never falls back to the root directory. The mutation sequence is shared across all directories. | [Defaults to `undefined`] |

### Return type

[**SuccessManagedFileReadResponse**](SuccessManagedFileReadResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Exact runtime projection operation completed |  -  |
| **400** | Invalid name, generation, sequence or content |  -  |
| **401** | Authentication is required or the bearer credentials are invalid |  -  |
| **403** | Sandbox read or write permission is required for this operation |  -  |
| **404** | Sandbox or managed file not found. Only error.code managed_file_not_found identifies an absent file after verified backing and runtime custody; a generic 404 can mean an unsupported route and must not be treated as an empty credential. |  -  |
| **409** | Generation or mutation sequence changed, lifecycle is in progress, or the runtime has no managed projection. error.code managed_files_unsupported identifies the legacy layout requiring explicit migration; conflict identifies authority or sequence changes. Reconcile before another mutation. |  -  |
| **503** | Exact external runtime authority is unavailable. A mutation may have consumed its sequence; inspect and read before retrying. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## readSandboxRestartFinalCaptureFile

> SuccessSandboxRestartFinalCaptureFileResponse readSandboxRestartFinalCaptureFile(id, operationId, namespace, name, captureId)

Read a file from the exact stopped restart source

Requires sandbox:read and the exact capture_id from status. Never reads live or guest storage, creates files, or resumes execution. found&#x3D;false attests an absent file only after retained backing and external absence are verified. Missing journals, mounts, authority and routes are errors, never logout. Read closes after acknowledgement. Responses must not be logged or cached.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ReadSandboxRestartFinalCaptureFileRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // string
    operationId: operationId_example,
    // string | Single directory within the runtime projection. Writes create a missing directory on the same tmpfs; reads never create it. Names must be ASCII, excluding dot, dot-dot and the reserved .s0-write- prefix. Symlinks, submounts and directory replacement during access fail closed. Requires a namespace-capable node; never falls back to the root directory. The mutation sequence is shared across all directories.
    namespace: namespace_example,
    // string | One ASCII file name; dot, dot-dot and the reserved .s0-write- prefix are rejected. No guest or host paths are accepted.
    name: name_example,
    // string
    captureId: captureId_example,
  } satisfies ReadSandboxRestartFinalCaptureFileRequest;

  try {
    const data = await api.readSandboxRestartFinalCaptureFile(body);
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
| **operationId** | `string` |  | [Defaults to `undefined`] |
| **namespace** | `string` | Single directory within the runtime projection. Writes create a missing directory on the same tmpfs; reads never create it. Names must be ASCII, excluding dot, dot-dot and the reserved .s0-write- prefix. Symlinks, submounts and directory replacement during access fail closed. Requires a namespace-capable node; never falls back to the root directory. The mutation sequence is shared across all directories. | [Defaults to `undefined`] |
| **name** | `string` | One ASCII file name; dot, dot-dot and the reserved .s0-write- prefix are rejected. No guest or host paths are accepted. | [Defaults to `undefined`] |
| **captureId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SuccessSandboxRestartFinalCaptureFileResponse**](SuccessSandboxRestartFinalCaptureFileResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Retained metadata or transient file result. Cache-Control: no-store. |  -  |
| **400** | Invalid request |  -  |
| **401** | Authentication required |  -  |
| **403** | Required sandbox permission missing |  -  |
| **404** | Restart capture not found; never an absent-file or logout result |  -  |
| **409** | Capture is not stopped, is acknowledged, or differs from its source or receipt |  -  |
| **503** | Restart control plane temporarily unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## readSandboxSnapshotRestoreFinalCaptureFile

> SuccessSandboxRestartFinalCaptureFileResponse readSandboxSnapshotRestoreFinalCaptureFile(id, operationId, namespace, name, captureId)

Read a file from the exact stopped restart source

Requires sandbox:read and the exact capture_id from status. Never reads live or guest storage, creates files, or resumes execution. found&#x3D;false attests an absent file only after retained backing and external absence are verified. Missing journals, mounts, authority and routes are errors, never logout. Read closes after acknowledgement. Responses must not be logged or cached.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { ReadSandboxSnapshotRestoreFinalCaptureFileRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // string
    operationId: operationId_example,
    // string | Single directory within the runtime projection. Writes create a missing directory on the same tmpfs; reads never create it. Names must be ASCII, excluding dot, dot-dot and the reserved .s0-write- prefix. Symlinks, submounts and directory replacement during access fail closed. Requires a namespace-capable node; never falls back to the root directory. The mutation sequence is shared across all directories.
    namespace: namespace_example,
    // string | One ASCII file name; dot, dot-dot and the reserved .s0-write- prefix are rejected. No guest or host paths are accepted.
    name: name_example,
    // string
    captureId: captureId_example,
  } satisfies ReadSandboxSnapshotRestoreFinalCaptureFileRequest;

  try {
    const data = await api.readSandboxSnapshotRestoreFinalCaptureFile(body);
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
| **operationId** | `string` |  | [Defaults to `undefined`] |
| **namespace** | `string` | Single directory within the runtime projection. Writes create a missing directory on the same tmpfs; reads never create it. Names must be ASCII, excluding dot, dot-dot and the reserved .s0-write- prefix. Symlinks, submounts and directory replacement during access fail closed. Requires a namespace-capable node; never falls back to the root directory. The mutation sequence is shared across all directories. | [Defaults to `undefined`] |
| **name** | `string` | One ASCII file name; dot, dot-dot and the reserved .s0-write- prefix are rejected. No guest or host paths are accepted. | [Defaults to `undefined`] |
| **captureId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SuccessSandboxRestartFinalCaptureFileResponse**](SuccessSandboxRestartFinalCaptureFileResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Retained metadata or transient file result. Cache-Control: no-store. |  -  |
| **400** | Invalid request |  -  |
| **401** | Authentication required |  -  |
| **403** | Required sandbox permission missing |  -  |
| **404** | Restart capture not found; never an absent-file or logout result |  -  |
| **409** | Capture is not stopped, is acknowledged, or differs from its source or receipt |  -  |
| **503** | Snapshot restore control plane temporarily unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## restartSandbox

> SuccessSandboxRestartOperationResponse restartSandbox(id, idempotencyKey, sandboxRestartRequest)

Explicitly replace a sandbox runtime and discard process state

Preserves the writable RootFS through external publication and writer fencing, ends the old processes, and starts a fresh runtime. This is not a reconnect, memory restore, or snapshot rollback. Requires sandbox:write and a stable Idempotency-Key bound to expected_runtime_generation. A duplicate returns the original operation and never restarts a newer generation. Request timeout does not cancel committed work. Find the operation by request_key if its acknowledgement was lost. Completion proves runtime replacement, not guest application health. Never use this as an automatic memory fallback.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { RestartSandboxRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // string
    idempotencyKey: idempotencyKey_example,
    // SandboxRestartRequest
    sandboxRestartRequest: ...,
  } satisfies RestartSandboxRequest;

  try {
    const data = await api.restartSandbox(body);
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
| **sandboxRestartRequest** | [SandboxRestartRequest](SandboxRestartRequest.md) |  | |

### Return type

[**SuccessSandboxRestartOperationResponse**](SuccessSandboxRestartOperationResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Recorded terminal restart result |  -  |
| **202** | Durable restart accepted; completion is asynchronous |  -  |
| **400** | Invalid request |  -  |
| **401** | Authentication required |  -  |
| **403** | Required sandbox permission missing |  -  |
| **404** | Sandbox or restart operation not found |  -  |
| **409** | Request key or source generation conflicts with durable authority |  -  |
| **503** | Restart control plane temporarily unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## restoreSandboxSnapshot

> SuccessSandboxSnapshotRestoreOperationResponse restoreSandboxSnapshot(id, idempotencyKey, sandboxSnapshotRestoreRequest)

Restore a selected snapshot and start a fresh runtime

Explicitly discards source process state and replaces its writable RootFS with the exact selected snapshot generation. Requires sandbox:write, discard_process_state&#x3D;true and a stable Idempotency-Key bound to the source runtime generation and snapshot identity. Admission pins the selected data, including across later snapshot expiry or deletion. External final capture retains projected credential custody before source retirement. Head replacement and cold resume admission commit together. A duplicate returns the original operation and cannot restore again. Request timeout does not cancel accepted work; recover its acknowledgement by request_key. Completion proves external runtime launch, not guest application health. Never use as a memory fallback.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { RestoreSandboxSnapshotRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // string
    idempotencyKey: idempotencyKey_example,
    // SandboxSnapshotRestoreRequest
    sandboxSnapshotRestoreRequest: ...,
  } satisfies RestoreSandboxSnapshotRequest;

  try {
    const data = await api.restoreSandboxSnapshot(body);
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
| **sandboxSnapshotRestoreRequest** | [SandboxSnapshotRestoreRequest](SandboxSnapshotRestoreRequest.md) |  | |

### Return type

[**SuccessSandboxSnapshotRestoreOperationResponse**](SuccessSandboxSnapshotRestoreOperationResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Recorded terminal snapshot restore result |  -  |
| **202** | Durable snapshot restore accepted; completion is asynchronous |  -  |
| **400** | Invalid request |  -  |
| **401** | Authentication required |  -  |
| **403** | Required sandbox permission missing |  -  |
| **404** | Sandbox or snapshot restore operation not found |  -  |
| **409** | Request key or source generation conflicts with durable authority |  -  |
| **503** | Snapshot restore control plane temporarily unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## writeSandboxManagedFile

> SuccessManagedFilesStateResponse writeSandboxManagedFile(id, runtimeGeneration, name, managedFileWriteRequest)

Replace a managed runtime file conditionally

The expected mutation sequence is consumed before file I/O. An ambiguous response must be reconciled with inspect/read; never automatically retry with a newly fetched sequence. The sequence orders platform requests, not native guest refreshes.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { WriteSandboxManagedFileRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // number | Exact current runtime generation to access; never auto-resumes a sandbox.
    runtimeGeneration: 789,
    // string | One ASCII file name; dot, dot-dot and the reserved .s0-write- prefix are rejected. No guest or host paths are accepted.
    name: name_example,
    // ManagedFileWriteRequest
    managedFileWriteRequest: ...,
  } satisfies WriteSandboxManagedFileRequest;

  try {
    const data = await api.writeSandboxManagedFile(body);
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
| **runtimeGeneration** | `number` | Exact current runtime generation to access; never auto-resumes a sandbox. | [Defaults to `undefined`] |
| **name** | `string` | One ASCII file name; dot, dot-dot and the reserved .s0-write- prefix are rejected. No guest or host paths are accepted. | [Defaults to `undefined`] |
| **managedFileWriteRequest** | [ManagedFileWriteRequest](ManagedFileWriteRequest.md) |  | |

### Return type

[**SuccessManagedFilesStateResponse**](SuccessManagedFilesStateResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Exact runtime projection operation completed |  -  |
| **400** | Invalid name, generation, sequence or content |  -  |
| **401** | Authentication is required or the bearer credentials are invalid |  -  |
| **403** | Sandbox read or write permission is required for this operation |  -  |
| **404** | Sandbox or managed file not found. Only error.code managed_file_not_found identifies an absent file after verified backing and runtime custody; a generic 404 can mean an unsupported route and must not be treated as an empty credential. |  -  |
| **409** | Generation or mutation sequence changed, lifecycle is in progress, or the runtime has no managed projection. error.code managed_files_unsupported identifies the legacy layout requiring explicit migration; conflict identifies authority or sequence changes. Reconcile before another mutation. |  -  |
| **503** | Exact external runtime authority is unavailable. A mutation may have consumed its sequence; inspect and read before retrying. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## writeSandboxNamespacedManagedFile

> SuccessManagedFilesStateResponse writeSandboxNamespacedManagedFile(id, runtimeGeneration, name, namespace, managedFileWriteRequest)

Replace a namespaced managed runtime file conditionally

The expected mutation sequence is consumed before file I/O. An ambiguous response must be reconciled with inspect/read; never automatically retry with a newly fetched sequence. The sequence orders platform requests, not native guest refreshes.

### Example

```ts
import {
  Configuration,
  SandboxesApi,
} from 'sandbox0';
import type { WriteSandboxNamespacedManagedFileRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SandboxesApi(config);

  const body = {
    // string
    id: id_example,
    // number | Exact current runtime generation to access; never auto-resumes a sandbox.
    runtimeGeneration: 789,
    // string | One ASCII file name; dot, dot-dot and the reserved .s0-write- prefix are rejected. No guest or host paths are accepted.
    name: name_example,
    // string | Single directory within the runtime projection. Writes create a missing directory on the same tmpfs; reads never create it. Names must be ASCII, excluding dot, dot-dot and the reserved .s0-write- prefix. Symlinks, submounts and directory replacement during access fail closed. Requires a namespace-capable node; never falls back to the root directory. The mutation sequence is shared across all directories.
    namespace: namespace_example,
    // ManagedFileWriteRequest
    managedFileWriteRequest: ...,
  } satisfies WriteSandboxNamespacedManagedFileRequest;

  try {
    const data = await api.writeSandboxNamespacedManagedFile(body);
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
| **runtimeGeneration** | `number` | Exact current runtime generation to access; never auto-resumes a sandbox. | [Defaults to `undefined`] |
| **name** | `string` | One ASCII file name; dot, dot-dot and the reserved .s0-write- prefix are rejected. No guest or host paths are accepted. | [Defaults to `undefined`] |
| **namespace** | `string` | Single directory within the runtime projection. Writes create a missing directory on the same tmpfs; reads never create it. Names must be ASCII, excluding dot, dot-dot and the reserved .s0-write- prefix. Symlinks, submounts and directory replacement during access fail closed. Requires a namespace-capable node; never falls back to the root directory. The mutation sequence is shared across all directories. | [Defaults to `undefined`] |
| **managedFileWriteRequest** | [ManagedFileWriteRequest](ManagedFileWriteRequest.md) |  | |

### Return type

[**SuccessManagedFilesStateResponse**](SuccessManagedFilesStateResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Exact runtime projection operation completed |  -  |
| **400** | Invalid name, generation, sequence or content |  -  |
| **401** | Authentication is required or the bearer credentials are invalid |  -  |
| **403** | Sandbox read or write permission is required for this operation |  -  |
| **404** | Sandbox or managed file not found. Only error.code managed_file_not_found identifies an absent file after verified backing and runtime custody; a generic 404 can mean an unsupported route and must not be treated as an empty credential. |  -  |
| **409** | Generation or mutation sequence changed, lifecycle is in progress, or the runtime has no managed projection. error.code managed_files_unsupported identifies the legacy layout requiring explicit migration; conflict identifies authority or sequence changes. Reconcile before another mutation. |  -  |
| **503** | Exact external runtime authority is unavailable. A mutation may have consumed its sequence; inspect and read before retrying. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

