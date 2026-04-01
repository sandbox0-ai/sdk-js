# VolumeSyncApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1SandboxvolumesIdSyncBootstrapArchiveGet**](VolumeSyncApi.md#apiv1sandboxvolumesidsyncbootstraparchiveget) | **GET** /api/v1/sandboxvolumes/{id}/sync/bootstrap/archive | Download a bootstrap snapshot archive for local-first sync |
| [**apiV1SandboxvolumesIdSyncBootstrapPost**](VolumeSyncApi.md#apiv1sandboxvolumesidsyncbootstrappost) | **POST** /api/v1/sandboxvolumes/{id}/sync/bootstrap | Create a bootstrap snapshot and journal anchor for local-first sync |
| [**apiV1SandboxvolumesIdSyncChangesGet**](VolumeSyncApi.md#apiv1sandboxvolumesidsyncchangesget) | **GET** /api/v1/sandboxvolumes/{id}/sync/changes | List volume sync journal entries |
| [**apiV1SandboxvolumesIdSyncConflictsConflictIdPut**](VolumeSyncApi.md#apiv1sandboxvolumesidsyncconflictsconflictidput) | **PUT** /api/v1/sandboxvolumes/{id}/sync/conflicts/{conflict_id} | Resolve or ignore a volume sync conflict |
| [**apiV1SandboxvolumesIdSyncConflictsGet**](VolumeSyncApi.md#apiv1sandboxvolumesidsyncconflictsget) | **GET** /api/v1/sandboxvolumes/{id}/sync/conflicts | List volume sync conflicts |
| [**apiV1SandboxvolumesIdSyncReplayPayloadGet**](VolumeSyncApi.md#apiv1sandboxvolumesidsyncreplaypayloadget) | **GET** /api/v1/sandboxvolumes/{id}/sync/replay-payload | Download a replay payload for one sync journal entry |
| [**apiV1SandboxvolumesIdSyncReplicasReplicaIdChangesPost**](VolumeSyncApi.md#apiv1sandboxvolumesidsyncreplicasreplicaidchangespost) | **POST** /api/v1/sandboxvolumes/{id}/sync/replicas/{replica_id}/changes | Append replica-originated sync journal entries |
| [**apiV1SandboxvolumesIdSyncReplicasReplicaIdCursorPut**](VolumeSyncApi.md#apiv1sandboxvolumesidsyncreplicasreplicaidcursorput) | **PUT** /api/v1/sandboxvolumes/{id}/sync/replicas/{replica_id}/cursor | Advance a volume sync replica cursor |
| [**apiV1SandboxvolumesIdSyncReplicasReplicaIdGet**](VolumeSyncApi.md#apiv1sandboxvolumesidsyncreplicasreplicaidget) | **GET** /api/v1/sandboxvolumes/{id}/sync/replicas/{replica_id} | Get a volume sync replica |
| [**apiV1SandboxvolumesIdSyncReplicasReplicaIdPut**](VolumeSyncApi.md#apiv1sandboxvolumesidsyncreplicasreplicaidput) | **PUT** /api/v1/sandboxvolumes/{id}/sync/replicas/{replica_id} | Register or update a volume sync replica |



## apiV1SandboxvolumesIdSyncBootstrapArchiveGet

> Blob apiV1SandboxvolumesIdSyncBootstrapArchiveGet(id, snapshotId)

Download a bootstrap snapshot archive for local-first sync

### Example

```ts
import {
  Configuration,
  VolumeSyncApi,
} from 'sandbox0';
import type { ApiV1SandboxvolumesIdSyncBootstrapArchiveGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new VolumeSyncApi(config);

  const body = {
    // string
    id: id_example,
    // string
    snapshotId: snapshotId_example,
  } satisfies ApiV1SandboxvolumesIdSyncBootstrapArchiveGetRequest;

  try {
    const data = await api.apiV1SandboxvolumesIdSyncBootstrapArchiveGet(body);
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

**Blob**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/gzip`, `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Bootstrap snapshot archive |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxvolumesIdSyncBootstrapPost

> SuccessVolumeSyncBootstrapResponse apiV1SandboxvolumesIdSyncBootstrapPost(id, createVolumeSyncBootstrapRequest)

Create a bootstrap snapshot and journal anchor for local-first sync

### Example

```ts
import {
  Configuration,
  VolumeSyncApi,
} from 'sandbox0';
import type { ApiV1SandboxvolumesIdSyncBootstrapPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new VolumeSyncApi(config);

  const body = {
    // string
    id: id_example,
    // CreateVolumeSyncBootstrapRequest (optional)
    createVolumeSyncBootstrapRequest: ...,
  } satisfies ApiV1SandboxvolumesIdSyncBootstrapPostRequest;

  try {
    const data = await api.apiV1SandboxvolumesIdSyncBootstrapPost(body);
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
| **createVolumeSyncBootstrapRequest** | [CreateVolumeSyncBootstrapRequest](CreateVolumeSyncBootstrapRequest.md) |  | [Optional] |

### Return type

[**SuccessVolumeSyncBootstrapResponse**](SuccessVolumeSyncBootstrapResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Bootstrap anchor created |  -  |
| **409** | Snapshot bootstrap conflict such as incompatible path semantics |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxvolumesIdSyncChangesGet

> SuccessVolumeSyncChangeListResponse apiV1SandboxvolumesIdSyncChangesGet(id, after, limit)

List volume sync journal entries

### Example

```ts
import {
  Configuration,
  VolumeSyncApi,
} from 'sandbox0';
import type { ApiV1SandboxvolumesIdSyncChangesGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new VolumeSyncApi(config);

  const body = {
    // string
    id: id_example,
    // number (optional)
    after: 789,
    // number (optional)
    limit: 56,
  } satisfies ApiV1SandboxvolumesIdSyncChangesGetRequest;

  try {
    const data = await api.apiV1SandboxvolumesIdSyncChangesGet(body);
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
| **after** | `number` |  | [Optional] [Defaults to `0`] |
| **limit** | `number` |  | [Optional] [Defaults to `256`] |

### Return type

[**SuccessVolumeSyncChangeListResponse**](SuccessVolumeSyncChangeListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Journal entries |  -  |
| **409** | Journal history before &#x60;after&#x60; has been compacted and the replica must reseed |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxvolumesIdSyncConflictsConflictIdPut

> SuccessVolumeSyncConflictResponse apiV1SandboxvolumesIdSyncConflictsConflictIdPut(id, conflictId, resolveVolumeSyncConflictRequest)

Resolve or ignore a volume sync conflict

### Example

```ts
import {
  Configuration,
  VolumeSyncApi,
} from 'sandbox0';
import type { ApiV1SandboxvolumesIdSyncConflictsConflictIdPutRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new VolumeSyncApi(config);

  const body = {
    // string
    id: id_example,
    // string
    conflictId: conflictId_example,
    // ResolveVolumeSyncConflictRequest
    resolveVolumeSyncConflictRequest: ...,
  } satisfies ApiV1SandboxvolumesIdSyncConflictsConflictIdPutRequest;

  try {
    const data = await api.apiV1SandboxvolumesIdSyncConflictsConflictIdPut(body);
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
| **conflictId** | `string` |  | [Defaults to `undefined`] |
| **resolveVolumeSyncConflictRequest** | [ResolveVolumeSyncConflictRequest](ResolveVolumeSyncConflictRequest.md) |  | |

### Return type

[**SuccessVolumeSyncConflictResponse**](SuccessVolumeSyncConflictResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Updated conflict |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxvolumesIdSyncConflictsGet

> SuccessVolumeSyncConflictListResponse apiV1SandboxvolumesIdSyncConflictsGet(id, status, limit)

List volume sync conflicts

### Example

```ts
import {
  Configuration,
  VolumeSyncApi,
} from 'sandbox0';
import type { ApiV1SandboxvolumesIdSyncConflictsGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new VolumeSyncApi(config);

  const body = {
    // string
    id: id_example,
    // string (optional)
    status: status_example,
    // number (optional)
    limit: 56,
  } satisfies ApiV1SandboxvolumesIdSyncConflictsGetRequest;

  try {
    const data = await api.apiV1SandboxvolumesIdSyncConflictsGet(body);
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
| **status** | `string` |  | [Optional] [Defaults to `undefined`] |
| **limit** | `number` |  | [Optional] [Defaults to `256`] |

### Return type

[**SuccessVolumeSyncConflictListResponse**](SuccessVolumeSyncConflictListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Conflict list |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxvolumesIdSyncReplayPayloadGet

> Blob apiV1SandboxvolumesIdSyncReplayPayloadGet(id, contentRef)

Download a replay payload for one sync journal entry

### Example

```ts
import {
  Configuration,
  VolumeSyncApi,
} from 'sandbox0';
import type { ApiV1SandboxvolumesIdSyncReplayPayloadGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new VolumeSyncApi(config);

  const body = {
    // string
    id: id_example,
    // string
    contentRef: contentRef_example,
  } satisfies ApiV1SandboxvolumesIdSyncReplayPayloadGetRequest;

  try {
    const data = await api.apiV1SandboxvolumesIdSyncReplayPayloadGet(body);
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
| **contentRef** | `string` |  | [Defaults to `undefined`] |

### Return type

**Blob**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/octet-stream`, `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Replay payload bytes |  -  |
| **400** | Invalid replay payload reference |  -  |
| **404** | Replay payload not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxvolumesIdSyncReplicasReplicaIdChangesPost

> SuccessVolumeSyncAppendResponse apiV1SandboxvolumesIdSyncReplicasReplicaIdChangesPost(id, replicaId, appendReplicaChangesRequest)

Append replica-originated sync journal entries

### Example

```ts
import {
  Configuration,
  VolumeSyncApi,
} from 'sandbox0';
import type { ApiV1SandboxvolumesIdSyncReplicasReplicaIdChangesPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new VolumeSyncApi(config);

  const body = {
    // string
    id: id_example,
    // string
    replicaId: replicaId_example,
    // AppendReplicaChangesRequest
    appendReplicaChangesRequest: ...,
  } satisfies ApiV1SandboxvolumesIdSyncReplicasReplicaIdChangesPostRequest;

  try {
    const data = await api.apiV1SandboxvolumesIdSyncReplicasReplicaIdChangesPost(body);
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
| **replicaId** | `string` |  | [Defaults to `undefined`] |
| **appendReplicaChangesRequest** | [AppendReplicaChangesRequest](AppendReplicaChangesRequest.md) |  | |

### Return type

[**SuccessVolumeSyncAppendResponse**](SuccessVolumeSyncAppendResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Append result |  -  |
| **400** | Invalid request body such as a missing request id |  -  |
| **409** | Cursor conflict, expired replica lease, reseed required, or request id collision |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxvolumesIdSyncReplicasReplicaIdCursorPut

> SuccessVolumeSyncReplicaResponse apiV1SandboxvolumesIdSyncReplicasReplicaIdCursorPut(id, replicaId, updateSyncReplicaCursorRequest)

Advance a volume sync replica cursor

### Example

```ts
import {
  Configuration,
  VolumeSyncApi,
} from 'sandbox0';
import type { ApiV1SandboxvolumesIdSyncReplicasReplicaIdCursorPutRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new VolumeSyncApi(config);

  const body = {
    // string
    id: id_example,
    // string
    replicaId: replicaId_example,
    // UpdateSyncReplicaCursorRequest
    updateSyncReplicaCursorRequest: ...,
  } satisfies ApiV1SandboxvolumesIdSyncReplicasReplicaIdCursorPutRequest;

  try {
    const data = await api.apiV1SandboxvolumesIdSyncReplicasReplicaIdCursorPut(body);
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
| **replicaId** | `string` |  | [Defaults to `undefined`] |
| **updateSyncReplicaCursorRequest** | [UpdateSyncReplicaCursorRequest](UpdateSyncReplicaCursorRequest.md) |  | |

### Return type

[**SuccessVolumeSyncReplicaResponse**](SuccessVolumeSyncReplicaResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Replica state |  -  |
| **409** | Cursor conflict, expired replica lease, or reseed required |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxvolumesIdSyncReplicasReplicaIdGet

> SuccessVolumeSyncReplicaResponse apiV1SandboxvolumesIdSyncReplicasReplicaIdGet(id, replicaId)

Get a volume sync replica

### Example

```ts
import {
  Configuration,
  VolumeSyncApi,
} from 'sandbox0';
import type { ApiV1SandboxvolumesIdSyncReplicasReplicaIdGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new VolumeSyncApi(config);

  const body = {
    // string
    id: id_example,
    // string
    replicaId: replicaId_example,
  } satisfies ApiV1SandboxvolumesIdSyncReplicasReplicaIdGetRequest;

  try {
    const data = await api.apiV1SandboxvolumesIdSyncReplicasReplicaIdGet(body);
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
| **replicaId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SuccessVolumeSyncReplicaResponse**](SuccessVolumeSyncReplicaResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Replica state |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxvolumesIdSyncReplicasReplicaIdPut

> SuccessVolumeSyncReplicaResponse apiV1SandboxvolumesIdSyncReplicasReplicaIdPut(id, replicaId, upsertSyncReplicaRequest)

Register or update a volume sync replica

### Example

```ts
import {
  Configuration,
  VolumeSyncApi,
} from 'sandbox0';
import type { ApiV1SandboxvolumesIdSyncReplicasReplicaIdPutRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new VolumeSyncApi(config);

  const body = {
    // string
    id: id_example,
    // string
    replicaId: replicaId_example,
    // UpsertSyncReplicaRequest
    upsertSyncReplicaRequest: ...,
  } satisfies ApiV1SandboxvolumesIdSyncReplicasReplicaIdPutRequest;

  try {
    const data = await api.apiV1SandboxvolumesIdSyncReplicasReplicaIdPut(body);
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
| **replicaId** | `string` |  | [Defaults to `undefined`] |
| **upsertSyncReplicaRequest** | [UpsertSyncReplicaRequest](UpsertSyncReplicaRequest.md) |  | |

### Return type

[**SuccessVolumeSyncReplicaResponse**](SuccessVolumeSyncReplicaResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Replica state |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

