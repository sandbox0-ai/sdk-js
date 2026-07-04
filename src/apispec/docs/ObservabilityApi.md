# ObservabilityApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1SandboxesIdObservabilityEventsGet**](ObservabilityApi.md#apiv1sandboxesidobservabilityeventsget) | **GET** /api/v1/sandboxes/{id}/observability/events | Query historical sandbox observability events |
| [**apiV1SandboxesIdObservabilityLogsGet**](ObservabilityApi.md#apiv1sandboxesidobservabilitylogsget) | **GET** /api/v1/sandboxes/{id}/observability/logs | Query historical sandbox logs |
| [**apiV1SandboxesIdObservabilityMetricsGet**](ObservabilityApi.md#apiv1sandboxesidobservabilitymetricsget) | **GET** /api/v1/sandboxes/{id}/observability/metrics | Query historical sandbox metric samples |



## apiV1SandboxesIdObservabilityEventsGet

> SuccessSandboxObservabilityEventsResponse apiV1SandboxesIdObservabilityEventsGet(id, startTime, endTime, limit, cursor, watch, source, eventType, outcome)

Query historical sandbox observability events

Queries the asynchronous per-sandbox observability projection for lifecycle, network audit, and runtime stats events. This endpoint does not expose backend SQL and does not replace the metering usage truth stored in PostgreSQL. 

### Example

```ts
import {
  Configuration,
  ObservabilityApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdObservabilityEventsGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ObservabilityApi(config);

  const body = {
    // string
    id: id_example,
    // Date | Include events that occurred at or after this RFC3339 timestamp. (optional)
    startTime: 2013-10-20T19:20:30+01:00,
    // Date | Include events that occurred at or before this RFC3339 timestamp. (optional)
    endTime: 2013-10-20T19:20:30+01:00,
    // number | Maximum number of events to return. Values above 1000 are capped. (optional)
    limit: 56,
    // string | Opaque pagination cursor returned by a previous response. When watch is true, this must be a watch resume cursor from an NDJSON watermark line. (optional)
    cursor: cursor_example,
    // boolean | Stream matching records as application/x-ndjson in ingestion order until the client disconnects. When watch is true, end_time is not supported. Without cursor or start_time, streaming starts at request time. (optional)
    watch: true,
    // ObservabilityEventSource (optional)
    source: ...,
    // SandboxObservabilityEventType (optional)
    eventType: ...,
    // SandboxObservabilityOutcome (optional)
    outcome: ...,
  } satisfies ApiV1SandboxesIdObservabilityEventsGetRequest;

  try {
    const data = await api.apiV1SandboxesIdObservabilityEventsGet(body);
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
| **startTime** | `Date` | Include events that occurred at or after this RFC3339 timestamp. | [Optional] [Defaults to `undefined`] |
| **endTime** | `Date` | Include events that occurred at or before this RFC3339 timestamp. | [Optional] [Defaults to `undefined`] |
| **limit** | `number` | Maximum number of events to return. Values above 1000 are capped. | [Optional] [Defaults to `100`] |
| **cursor** | `string` | Opaque pagination cursor returned by a previous response. When watch is true, this must be a watch resume cursor from an NDJSON watermark line. | [Optional] [Defaults to `undefined`] |
| **watch** | `boolean` | Stream matching records as application/x-ndjson in ingestion order until the client disconnects. When watch is true, end_time is not supported. Without cursor or start_time, streaming starts at request time. | [Optional] [Defaults to `false`] |
| **source** | `ObservabilityEventSource` |  | [Optional] [Defaults to `undefined`] [Enum: manager, netd, procd] |
| **eventType** | `SandboxObservabilityEventType` |  | [Optional] [Defaults to `undefined`] [Enum: lifecycle, network_audit, runtime_stats] |
| **outcome** | `SandboxObservabilityOutcome` |  | [Optional] [Defaults to `undefined`] [Enum: completed, denied, error, succeeded, failed] |

### Return type

[**SuccessSandboxObservabilityEventsResponse**](SuccessSandboxObservabilityEventsResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `application/x-ndjson`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Historical sandbox observability events |  -  |
| **400** | Invalid query parameters |  -  |
| **403** | Forbidden |  -  |
| **503** | Historical observability backend disabled or unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdObservabilityLogsGet

> SuccessSandboxObservabilityLogsResponse apiV1SandboxesIdObservabilityLogsGet(id, startTime, endTime, limit, cursor, watch, contextId, stream)

Query historical sandbox logs

Queries the asynchronous per-sandbox log projection. This endpoint is for historical log lookup and is separate from live log streaming. 

### Example

```ts
import {
  Configuration,
  ObservabilityApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdObservabilityLogsGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ObservabilityApi(config);

  const body = {
    // string
    id: id_example,
    // Date | Include log entries that occurred at or after this RFC3339 timestamp. (optional)
    startTime: 2013-10-20T19:20:30+01:00,
    // Date | Include log entries that occurred at or before this RFC3339 timestamp. (optional)
    endTime: 2013-10-20T19:20:30+01:00,
    // number | Maximum number of log entries to return. Values above 1000 are capped. (optional)
    limit: 56,
    // string | Opaque pagination cursor returned by a previous response. When watch is true, this must be a watch resume cursor from an NDJSON watermark line. (optional)
    cursor: cursor_example,
    // boolean | Stream matching records as application/x-ndjson in ingestion order until the client disconnects. When watch is true, end_time is not supported. Without cursor or start_time, streaming starts at request time. (optional)
    watch: true,
    // string | Restrict results to a sandbox process context. (optional)
    contextId: contextId_example,
    // SandboxObservabilityLogStream (optional)
    stream: ...,
  } satisfies ApiV1SandboxesIdObservabilityLogsGetRequest;

  try {
    const data = await api.apiV1SandboxesIdObservabilityLogsGet(body);
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
| **startTime** | `Date` | Include log entries that occurred at or after this RFC3339 timestamp. | [Optional] [Defaults to `undefined`] |
| **endTime** | `Date` | Include log entries that occurred at or before this RFC3339 timestamp. | [Optional] [Defaults to `undefined`] |
| **limit** | `number` | Maximum number of log entries to return. Values above 1000 are capped. | [Optional] [Defaults to `100`] |
| **cursor** | `string` | Opaque pagination cursor returned by a previous response. When watch is true, this must be a watch resume cursor from an NDJSON watermark line. | [Optional] [Defaults to `undefined`] |
| **watch** | `boolean` | Stream matching records as application/x-ndjson in ingestion order until the client disconnects. When watch is true, end_time is not supported. Without cursor or start_time, streaming starts at request time. | [Optional] [Defaults to `false`] |
| **contextId** | `string` | Restrict results to a sandbox process context. | [Optional] [Defaults to `undefined`] |
| **stream** | `SandboxObservabilityLogStream` |  | [Optional] [Defaults to `undefined`] [Enum: stdout, stderr, pty] |

### Return type

[**SuccessSandboxObservabilityLogsResponse**](SuccessSandboxObservabilityLogsResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `application/x-ndjson`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Historical sandbox logs |  -  |
| **400** | Invalid query parameters |  -  |
| **403** | Forbidden |  -  |
| **503** | Historical observability backend disabled or unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdObservabilityMetricsGet

> SuccessSandboxObservabilityMetricsResponse apiV1SandboxesIdObservabilityMetricsGet(id, startTime, endTime, limit, cursor, watch, contextId, name, names)

Query historical sandbox metric samples

Queries the asynchronous per-sandbox metric sample projection. This endpoint is separate from platform service metrics and PostgreSQL metering usage truth. 

### Example

```ts
import {
  Configuration,
  ObservabilityApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdObservabilityMetricsGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ObservabilityApi(config);

  const body = {
    // string
    id: id_example,
    // Date | Include samples that occurred at or after this RFC3339 timestamp. (optional)
    startTime: 2013-10-20T19:20:30+01:00,
    // Date | Include samples that occurred at or before this RFC3339 timestamp. (optional)
    endTime: 2013-10-20T19:20:30+01:00,
    // number | Maximum number of samples to return. Values above 1000 are capped. (optional)
    limit: 56,
    // string | Opaque pagination cursor returned by a previous response. When watch is true, this must be a watch resume cursor from an NDJSON watermark line. (optional)
    cursor: cursor_example,
    // boolean | Stream matching records as application/x-ndjson in ingestion order until the client disconnects. When watch is true, end_time is not supported. Without cursor or start_time, streaming starts at request time. (optional)
    watch: true,
    // string | Restrict results to a sandbox process context. (optional)
    contextId: contextId_example,
    // Array<string> | Metric name filter. This parameter may be repeated. (optional)
    name: ...,
    // string | Comma-separated metric name filter. (optional)
    names: names_example,
  } satisfies ApiV1SandboxesIdObservabilityMetricsGetRequest;

  try {
    const data = await api.apiV1SandboxesIdObservabilityMetricsGet(body);
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
| **startTime** | `Date` | Include samples that occurred at or after this RFC3339 timestamp. | [Optional] [Defaults to `undefined`] |
| **endTime** | `Date` | Include samples that occurred at or before this RFC3339 timestamp. | [Optional] [Defaults to `undefined`] |
| **limit** | `number` | Maximum number of samples to return. Values above 1000 are capped. | [Optional] [Defaults to `100`] |
| **cursor** | `string` | Opaque pagination cursor returned by a previous response. When watch is true, this must be a watch resume cursor from an NDJSON watermark line. | [Optional] [Defaults to `undefined`] |
| **watch** | `boolean` | Stream matching records as application/x-ndjson in ingestion order until the client disconnects. When watch is true, end_time is not supported. Without cursor or start_time, streaming starts at request time. | [Optional] [Defaults to `false`] |
| **contextId** | `string` | Restrict results to a sandbox process context. | [Optional] [Defaults to `undefined`] |
| **name** | `Array<string>` | Metric name filter. This parameter may be repeated. | [Optional] |
| **names** | `string` | Comma-separated metric name filter. | [Optional] [Defaults to `undefined`] |

### Return type

[**SuccessSandboxObservabilityMetricsResponse**](SuccessSandboxObservabilityMetricsResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `application/x-ndjson`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Historical sandbox metric samples |  -  |
| **400** | Invalid query parameters |  -  |
| **403** | Forbidden |  -  |
| **503** | Historical observability backend disabled or unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

