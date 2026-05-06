# ObservabilityApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1ObservabilityLogsGet**](ObservabilityApi.md#apiv1observabilitylogsget) | **GET** /api/v1/observability/logs | Query observability logs |
| [**apiV1ObservabilityTracesGet**](ObservabilityApi.md#apiv1observabilitytracesget) | **GET** /api/v1/observability/traces | Query observability trace spans |



## apiV1ObservabilityLogsGet

> SuccessObservabilityLogRecordListResponse apiV1ObservabilityLogsGet(sandboxId, traceId, startTime, endTime, limit)

Query observability logs

Returns OpenTelemetry log records stored for the selected team and region.

### Example

```ts
import {
  Configuration,
  ObservabilityApi,
} from 'sandbox0';
import type { ApiV1ObservabilityLogsGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ObservabilityApi(config);

  const body = {
    // string | Filter logs by sandbox id when available in resource attributes. (optional)
    sandboxId: sandboxId_example,
    // string | Filter logs by OpenTelemetry trace id. (optional)
    traceId: traceId_example,
    // Date | Include logs at or after this timestamp. (optional)
    startTime: 2013-10-20T19:20:30+01:00,
    // Date | Include logs at or before this timestamp. (optional)
    endTime: 2013-10-20T19:20:30+01:00,
    // number (optional)
    limit: 56,
  } satisfies ApiV1ObservabilityLogsGetRequest;

  try {
    const data = await api.apiV1ObservabilityLogsGet(body);
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
| **sandboxId** | `string` | Filter logs by sandbox id when available in resource attributes. | [Optional] [Defaults to `undefined`] |
| **traceId** | `string` | Filter logs by OpenTelemetry trace id. | [Optional] [Defaults to `undefined`] |
| **startTime** | `Date` | Include logs at or after this timestamp. | [Optional] [Defaults to `undefined`] |
| **endTime** | `Date` | Include logs at or before this timestamp. | [Optional] [Defaults to `undefined`] |
| **limit** | `number` |  | [Optional] [Defaults to `100`] |

### Return type

[**SuccessObservabilityLogRecordListResponse**](SuccessObservabilityLogRecordListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Log records |  -  |
| **400** | Invalid query parameters |  -  |
| **403** | Forbidden |  -  |
| **503** | Observability is unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1ObservabilityTracesGet

> SuccessObservabilityTraceSpanListResponse apiV1ObservabilityTracesGet(sandboxId, traceId, startTime, endTime, limit)

Query observability trace spans

Returns OpenTelemetry trace spans stored for the selected team and region.

### Example

```ts
import {
  Configuration,
  ObservabilityApi,
} from 'sandbox0';
import type { ApiV1ObservabilityTracesGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ObservabilityApi(config);

  const body = {
    // string | Filter spans by sandbox id when available in resource attributes. (optional)
    sandboxId: sandboxId_example,
    // string | Filter spans by OpenTelemetry trace id. (optional)
    traceId: traceId_example,
    // Date | Include spans at or after this timestamp. (optional)
    startTime: 2013-10-20T19:20:30+01:00,
    // Date | Include spans at or before this timestamp. (optional)
    endTime: 2013-10-20T19:20:30+01:00,
    // number (optional)
    limit: 56,
  } satisfies ApiV1ObservabilityTracesGetRequest;

  try {
    const data = await api.apiV1ObservabilityTracesGet(body);
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
| **sandboxId** | `string` | Filter spans by sandbox id when available in resource attributes. | [Optional] [Defaults to `undefined`] |
| **traceId** | `string` | Filter spans by OpenTelemetry trace id. | [Optional] [Defaults to `undefined`] |
| **startTime** | `Date` | Include spans at or after this timestamp. | [Optional] [Defaults to `undefined`] |
| **endTime** | `Date` | Include spans at or before this timestamp. | [Optional] [Defaults to `undefined`] |
| **limit** | `number` |  | [Optional] [Defaults to `100`] |

### Return type

[**SuccessObservabilityTraceSpanListResponse**](SuccessObservabilityTraceSpanListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Trace spans |  -  |
| **400** | Invalid query parameters |  -  |
| **403** | Forbidden |  -  |
| **503** | Observability is unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

