# QuotasApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1QuotasGet**](QuotasApi.md#apiv1quotasget) | **GET** /api/v1/quotas | List effective quotas for the current team |
| [**apiV1TeamsTeamIdQuotasGet**](QuotasApi.md#apiv1teamsteamidquotasget) | **GET** /api/v1/teams/{team_id}/quotas | List effective quotas for a team |
| [**apiV1TeamsTeamIdQuotasKeyDelete**](QuotasApi.md#apiv1teamsteamidquotaskeydelete) | **DELETE** /api/v1/teams/{team_id}/quotas/{key} | Delete a team quota policy |
| [**apiV1TeamsTeamIdQuotasKeyPut**](QuotasApi.md#apiv1teamsteamidquotaskeyput) | **PUT** /api/v1/teams/{team_id}/quotas/{key} | Set a team quota policy |



## apiV1QuotasGet

> SuccessTeamQuotaListResponse apiV1QuotasGet()

List effective quotas for the current team

Requires quota:read. Returns every effective policy. Capacity rows include PostgreSQL-backed usage, concurrency rows include current live lease usage, and rate rows return committed, reserved, and used as zero with remaining null because distributed Redis token balances are not exposed.

### Example

```ts
import {
  Configuration,
  QuotasApi,
} from 'sandbox0';
import type { ApiV1QuotasGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new QuotasApi(config);

  try {
    const data = await api.apiV1QuotasGet();
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

[**SuccessTeamQuotaListResponse**](SuccessTeamQuotaListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Effective team quotas |  -  |
| **401** | Unauthorized |  -  |
| **403** | Insufficient permissions |  -  |
| **429** | The admission control applicable to this route and deployment topology rejected the request. &#x60;error.code&#x60; is &#x60;quota_exceeded&#x60; for a team-attributed Team Quota such as &#x60;active_request_count&#x60;, &#x60;active_connection_count&#x60;, &#x60;api_requests&#x60;, or a traffic-byte rate, &#x60;identity_limit_exceeded&#x60; for an IdentityResourceGuard cardinality limit, or &#x60;rate_limited&#x60; for an aggregate overload guard. A given route does not necessarily use every control.  |  * Retry-After - Suggested delay in seconds when token-bucket or overload admission provides one; identity cardinality rejections may omit it <br>  |
| **503** | The fail-closed admission backend applicable to this route is unavailable. Depending on deployment topology, this is the region Team Quota policy or Redis path, or the public identity entrypoint\&#39;s shared overload-guard backend; a given route does not necessarily use both.  |  * Retry-After - Suggested retry delay in seconds <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TeamsTeamIdQuotasGet

> SuccessTeamQuotaListResponse apiV1TeamsTeamIdQuotasGet(teamId)

List effective quotas for a team

System admin access is required. Returns explicit team overrides and inherited defaults as effective policies.

### Example

```ts
import {
  Configuration,
  QuotasApi,
} from 'sandbox0';
import type { ApiV1TeamsTeamIdQuotasGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new QuotasApi(config);

  const body = {
    // string
    teamId: teamId_example,
  } satisfies ApiV1TeamsTeamIdQuotasGetRequest;

  try {
    const data = await api.apiV1TeamsTeamIdQuotasGet(body);
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
| **teamId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SuccessTeamQuotaListResponse**](SuccessTeamQuotaListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Effective team quotas |  -  |
| **401** | Unauthorized |  -  |
| **403** | System admin access required |  -  |
| **404** | Team not found |  -  |
| **503** | Team directory or Team Quota policy store unavailable |  * Retry-After - Suggested retry delay in seconds <br>  |
| **429** | The admission control applicable to this route and deployment topology rejected the request. &#x60;error.code&#x60; is &#x60;quota_exceeded&#x60; for a team-attributed Team Quota such as &#x60;active_request_count&#x60;, &#x60;active_connection_count&#x60;, &#x60;api_requests&#x60;, or a traffic-byte rate, &#x60;identity_limit_exceeded&#x60; for an IdentityResourceGuard cardinality limit, or &#x60;rate_limited&#x60; for an aggregate overload guard. A given route does not necessarily use every control.  |  * Retry-After - Suggested delay in seconds when token-bucket or overload admission provides one; identity cardinality rejections may omit it <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TeamsTeamIdQuotasKeyDelete

> SuccessMessageResponse apiV1TeamsTeamIdQuotasKeyDelete(teamId, key)

Delete a team quota policy

System admin access is required. The effective policy falls back to the region default after the override is deleted.

### Example

```ts
import {
  Configuration,
  QuotasApi,
} from 'sandbox0';
import type { ApiV1TeamsTeamIdQuotasKeyDeleteRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new QuotasApi(config);

  const body = {
    // string
    teamId: teamId_example,
    // TeamQuotaKey
    key: ...,
  } satisfies ApiV1TeamsTeamIdQuotasKeyDeleteRequest;

  try {
    const data = await api.apiV1TeamsTeamIdQuotasKeyDelete(body);
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
| **teamId** | `string` |  | [Defaults to `undefined`] |
| **key** | `TeamQuotaKey` |  | [Defaults to `undefined`] [Enum: sandbox_identity_count, sandbox_runtime_count, sandbox_cpu_millicores, sandbox_memory_bytes, sandbox_ephemeral_storage_bytes, volume_storage_bytes, snapshot_storage_bytes, rootfs_storage_bytes, template_image_storage_bytes, storage_object_count, control_plane_object_count, active_connection_count, active_request_count, api_requests, sandbox_service_requests, sandbox_starts, network_operations, network_ingress_bytes, network_egress_bytes, storage_operations, observability_ingest_bytes] |

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
| **200** | Team quota policy deleted |  -  |
| **400** | Invalid quota key |  -  |
| **401** | Unauthorized |  -  |
| **403** | System admin access required |  -  |
| **404** | Team not found |  -  |
| **503** | Team directory or Team Quota policy store unavailable |  * Retry-After - Suggested retry delay in seconds <br>  |
| **429** | The admission control applicable to this route and deployment topology rejected the request. &#x60;error.code&#x60; is &#x60;quota_exceeded&#x60; for a team-attributed Team Quota such as &#x60;active_request_count&#x60;, &#x60;active_connection_count&#x60;, &#x60;api_requests&#x60;, or a traffic-byte rate, &#x60;identity_limit_exceeded&#x60; for an IdentityResourceGuard cardinality limit, or &#x60;rate_limited&#x60; for an aggregate overload guard. A given route does not necessarily use every control.  |  * Retry-After - Suggested delay in seconds when token-bucket or overload admission provides one; identity cardinality rejections may omit it <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TeamsTeamIdQuotasKeyPut

> SuccessTeamQuotaPolicyResponse apiV1TeamsTeamIdQuotasKeyPut(teamId, key, teamQuotaPolicyWriteRequest)

Set a team quota policy

System admin access is required. Replaces the explicit override for one quota key. The request kind must match the canonical kind of the path key.

### Example

```ts
import {
  Configuration,
  QuotasApi,
} from 'sandbox0';
import type { ApiV1TeamsTeamIdQuotasKeyPutRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new QuotasApi(config);

  const body = {
    // string
    teamId: teamId_example,
    // TeamQuotaKey
    key: ...,
    // TeamQuotaPolicyWriteRequest
    teamQuotaPolicyWriteRequest: ...,
  } satisfies ApiV1TeamsTeamIdQuotasKeyPutRequest;

  try {
    const data = await api.apiV1TeamsTeamIdQuotasKeyPut(body);
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
| **teamId** | `string` |  | [Defaults to `undefined`] |
| **key** | `TeamQuotaKey` |  | [Defaults to `undefined`] [Enum: sandbox_identity_count, sandbox_runtime_count, sandbox_cpu_millicores, sandbox_memory_bytes, sandbox_ephemeral_storage_bytes, volume_storage_bytes, snapshot_storage_bytes, rootfs_storage_bytes, template_image_storage_bytes, storage_object_count, control_plane_object_count, active_connection_count, active_request_count, api_requests, sandbox_service_requests, sandbox_starts, network_operations, network_ingress_bytes, network_egress_bytes, storage_operations, observability_ingest_bytes] |
| **teamQuotaPolicyWriteRequest** | [TeamQuotaPolicyWriteRequest](TeamQuotaPolicyWriteRequest.md) |  | |

### Return type

[**SuccessTeamQuotaPolicyResponse**](SuccessTeamQuotaPolicyResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Team quota policy replaced |  -  |
| **400** | Invalid quota policy |  -  |
| **401** | Unauthorized |  -  |
| **403** | System admin access required |  -  |
| **404** | Team not found |  -  |
| **503** | Team directory or Team Quota policy store unavailable |  * Retry-After - Suggested retry delay in seconds <br>  |
| **429** | The admission control applicable to this route and deployment topology rejected the request. &#x60;error.code&#x60; is &#x60;quota_exceeded&#x60; for a team-attributed Team Quota such as &#x60;active_request_count&#x60;, &#x60;active_connection_count&#x60;, &#x60;api_requests&#x60;, or a traffic-byte rate, &#x60;identity_limit_exceeded&#x60; for an IdentityResourceGuard cardinality limit, or &#x60;rate_limited&#x60; for an aggregate overload guard. A given route does not necessarily use every control.  |  * Retry-After - Suggested delay in seconds when token-bucket or overload admission provides one; identity cardinality rejections may omit it <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
