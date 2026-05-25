# QuotasApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1QuotasDimensionDelete**](QuotasApi.md#apiv1quotasdimensiondelete) | **DELETE** /api/v1/quotas/{dimension} | Delete team quota |
| [**apiV1QuotasDimensionGet**](QuotasApi.md#apiv1quotasdimensionget) | **GET** /api/v1/quotas/{dimension} | Get team quota |
| [**apiV1QuotasDimensionPut**](QuotasApi.md#apiv1quotasdimensionput) | **PUT** /api/v1/quotas/{dimension} | Set team quota |



## apiV1QuotasDimensionDelete

> SuccessDeletedResponse apiV1QuotasDimensionDelete(dimension)

Delete team quota

### Example

```ts
import {
  Configuration,
  QuotasApi,
} from 'sandbox0';
import type { ApiV1QuotasDimensionDeleteRequest } from 'sandbox0';

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
  } satisfies ApiV1QuotasDimensionDeleteRequest;

  try {
    const data = await api.apiV1QuotasDimensionDelete(body);
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
| **dimension** | `QuotaDimension` |  | [Defaults to `undefined`] [Enum: active_sandboxes, cpu_millicpu, memory_mib, volume_storage_gb, snapshot_storage_gb, egress, ingress] |

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
| **200** | Deleted team quota |  -  |
| **400** | Invalid request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


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
| **dimension** | `QuotaDimension` |  | [Defaults to `undefined`] [Enum: active_sandboxes, cpu_millicpu, memory_mib, volume_storage_gb, snapshot_storage_gb, egress, ingress] |

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


## apiV1QuotasDimensionPut

> SuccessTeamQuotaResponse apiV1QuotasDimensionPut(dimension, putTeamQuotaRequest)

Set team quota

### Example

```ts
import {
  Configuration,
  QuotasApi,
} from 'sandbox0';
import type { ApiV1QuotasDimensionPutRequest } from 'sandbox0';

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
    // PutTeamQuotaRequest
    putTeamQuotaRequest: ...,
  } satisfies ApiV1QuotasDimensionPutRequest;

  try {
    const data = await api.apiV1QuotasDimensionPut(body);
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
| **dimension** | `QuotaDimension` |  | [Defaults to `undefined`] [Enum: active_sandboxes, cpu_millicpu, memory_mib, volume_storage_gb, snapshot_storage_gb, egress, ingress] |
| **putTeamQuotaRequest** | [PutTeamQuotaRequest](PutTeamQuotaRequest.md) |  | |

### Return type

[**SuccessTeamQuotaResponse**](SuccessTeamQuotaResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Updated team quota |  -  |
| **400** | Invalid request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

