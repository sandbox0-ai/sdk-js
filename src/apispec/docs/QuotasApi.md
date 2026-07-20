# QuotasApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1QuotasDimensionGet**](QuotasApi.md#apiv1quotasdimensionget) | **GET** /api/v1/quotas/{dimension} | Get team quota |
| [**apiV1QuotasGet**](QuotasApi.md#apiv1quotasget) | **GET** /api/v1/quotas | List team quotas |



## apiV1QuotasDimensionGet

> SuccessTeamQuotaResponse apiV1QuotasDimensionGet(dimension)

Get team quota

### Example

```ts
import {
  Configuration,
  QuotasApi,
} from 'sandbox0';
import type { ApiV1QuotasDimensionGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new QuotasApi(config);

  const body = {
    // QuotaDimension
    dimension: ...,
  } satisfies ApiV1QuotasDimensionGetRequest;

  try {
    const data = await api.apiV1QuotasDimensionGet(body);
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
| **dimension** | `QuotaDimension` |  | [Defaults to `undefined`] [Enum: active_sandboxes, cpu_millicpu, memory_mib, volume_storage_gb, snapshot_storage_gb, api_requests, network_egress_bytes, network_ingress_bytes] |

### Return type

[**SuccessTeamQuotaResponse**](SuccessTeamQuotaResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Team quota |  -  |
| **400** | Invalid request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1QuotasGet

> ApiV1QuotasGet200Response apiV1QuotasGet()

List team quotas

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

[**ApiV1QuotasGet200Response**](ApiV1QuotasGet200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | All team quota statuses |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

