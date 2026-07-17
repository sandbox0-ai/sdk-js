# ObservabilityApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1SandboxesIdObservabilityEventsGet**](ObservabilityApi.md#apiv1sandboxesidobservabilityeventsget) | **GET** /api/v1/sandboxes/{id}/observability/events | Query canonical signed sandbox observability events |
| [**apiV1SandboxesIdObservabilityLogsGet**](ObservabilityApi.md#apiv1sandboxesidobservabilitylogsget) | **GET** /api/v1/sandboxes/{id}/observability/logs | Query historical sandbox logs |
| [**getSandboxRuntimeMetrics**](ObservabilityApi.md#getsandboxruntimemetrics) | **GET** /api/v1/sandboxes/{id}/metrics | Query chart-ready sandbox runtime metrics |
| [**getSandboxRuntimeMetricsCatalog**](ObservabilityApi.md#getsandboxruntimemetricscatalog) | **GET** /api/v1/sandboxes/{id}/metrics/catalog | Get the sandbox runtime metric catalog |



## apiV1SandboxesIdObservabilityEventsGet

> SuccessSandboxObservabilityEventsResponse apiV1SandboxesIdObservabilityEventsGet(id, startTime, endTime, limit, cursor, watch, source, eventType, outcome, actorKind, actorId, action, resourceType, operationId, eventId)

Query canonical signed sandbox observability events

Queries canonical signed per-sandbox audit facts from ClickHouse. Every returned event includes an inline signature verification status, while event-ID payload conflicts are reported independently. Access requires the enterprise sandbox_audit feature and the sandboxaudit:read permission.

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
    // number | Maximum number of events to return. Values above 1000 are capped. Exact event_id mode ignores this value and returns at most two payload variants. (optional)
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
    // SandboxAuditActorKind (optional)
    actorKind: ...,
    // string (optional)
    actorId: actorId_example,
    // string (optional)
    action: action_example,
    // string (optional)
    resourceType: resourceType_example,
    // string (optional)
    operationId: operationId_example,
    // string | Exact lookup mode for one stable audit event ID. It cannot be combined with time, cursor, watch, or other event filters and returns one canonical row or two conflicting payload variants. (optional)
    eventId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
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
| **limit** | `number` | Maximum number of events to return. Values above 1000 are capped. Exact event_id mode ignores this value and returns at most two payload variants. | [Optional] [Defaults to `100`] |
| **cursor** | `string` | Opaque pagination cursor returned by a previous response. When watch is true, this must be a watch resume cursor from an NDJSON watermark line. | [Optional] [Defaults to `undefined`] |
| **watch** | `boolean` | Stream matching records as application/x-ndjson in ingestion order until the client disconnects. When watch is true, end_time is not supported. Without cursor or start_time, streaming starts at request time. | [Optional] [Defaults to `false`] |
| **source** | `ObservabilityEventSource` |  | [Optional] [Defaults to `undefined`] [Enum: cluster_gateway, manager, netd, procd, ctld, storage_proxy] |
| **eventType** | `SandboxObservabilityEventType` |  | [Optional] [Defaults to `undefined`] [Enum: lifecycle, network_audit, runtime_stats, api_access, process, file] |
| **outcome** | `SandboxObservabilityOutcome` |  | [Optional] [Defaults to `undefined`] [Enum: completed, denied, error, succeeded, failed, accepted, unknown] |
| **actorKind** | `SandboxAuditActorKind` |  | [Optional] [Defaults to `undefined`] [Enum: human, api_key, service, sandbox_workload, ssh_user, exposure_credential, anonymous] |
| **actorId** | `string` |  | [Optional] [Defaults to `undefined`] |
| **action** | `string` |  | [Optional] [Defaults to `undefined`] |
| **resourceType** | `string` |  | [Optional] [Defaults to `undefined`] |
| **operationId** | `string` |  | [Optional] [Defaults to `undefined`] |
| **eventId** | `string` | Exact lookup mode for one stable audit event ID. It cannot be combined with time, cursor, watch, or other event filters and returns one canonical row or two conflicting payload variants. | [Optional] [Defaults to `undefined`] |

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
| **200** | Canonical signed sandbox observability events |  -  |
| **400** | Invalid query parameters |  -  |
| **403** | Forbidden or sandbox_audit is not licensed |  -  |
| **503** | Sandbox observability backend disabled or unavailable |  -  |

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


## getSandboxRuntimeMetrics

> SuccessSandboxRuntimeMetricsResponse getSandboxRuntimeMetrics(id, startTime, endTime, metrics, stepSeconds, statistic, maxPoints)

Query chart-ready sandbox runtime metrics

Returns bounded, downsampled sandbox-wide runtime series. When timestamps are omitted, the query covers the hour ending now. The maximum range is 30 days. Counter rates never cross a runtime reset boundary. Missing data is reported as gaps and is never synthesized as zero. This endpoint is separate from platform service metrics and metering usage truth.

### Example

```ts
import {
  Configuration,
  ObservabilityApi,
} from 'sandbox0';
import type { GetSandboxRuntimeMetricsRequest } from 'sandbox0';

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
    // Date | Query observations at or after this RFC3339 timestamp. Defaults to one hour before end_time. (optional)
    startTime: 2013-10-20T19:20:30+01:00,
    // Date | Query observations at or before this RFC3339 timestamp. Defaults to the current time. (optional)
    endTime: 2013-10-20T19:20:30+01:00,
    // string | Comma-separated canonical metric names. Defaults to CPU utilization, memory utilization, and network I/O. (optional)
    metrics: metrics_example,
    // number | Requested bucket width in seconds. The effective step is at least 15 seconds and may be increased to honor max_points. (optional)
    stepSeconds: 56,
    // SandboxRuntimeMetricStatistic | Aggregation applied within each output bucket. Auto uses average for gauges and rate for counters. (optional)
    statistic: ...,
    // number | Maximum points per returned series. The server may increase step_seconds to honor this bound. (optional)
    maxPoints: 56,
  } satisfies GetSandboxRuntimeMetricsRequest;

  try {
    const data = await api.getSandboxRuntimeMetrics(body);
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
| **startTime** | `Date` | Query observations at or after this RFC3339 timestamp. Defaults to one hour before end_time. | [Optional] [Defaults to `undefined`] |
| **endTime** | `Date` | Query observations at or before this RFC3339 timestamp. Defaults to the current time. | [Optional] [Defaults to `undefined`] |
| **metrics** | `string` | Comma-separated canonical metric names. Defaults to CPU utilization, memory utilization, and network I/O. | [Optional] [Defaults to `undefined`] |
| **stepSeconds** | `number` | Requested bucket width in seconds. The effective step is at least 15 seconds and may be increased to honor max_points. | [Optional] [Defaults to `undefined`] |
| **statistic** | `SandboxRuntimeMetricStatistic` | Aggregation applied within each output bucket. Auto uses average for gauges and rate for counters. | [Optional] [Defaults to `undefined`] [Enum: auto, average, minimum, maximum, last, rate] |
| **maxPoints** | `number` | Maximum points per returned series. The server may increase step_seconds to honor this bound. | [Optional] [Defaults to `240`] |

### Return type

[**SuccessSandboxRuntimeMetricsResponse**](SuccessSandboxRuntimeMetricsResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Chart-ready sandbox runtime metric series |  -  |
| **400** | Invalid query parameters |  -  |
| **403** | Forbidden |  -  |
| **503** | Historical observability backend disabled or unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getSandboxRuntimeMetricsCatalog

> SuccessSandboxRuntimeMetricsCatalogResponse getSandboxRuntimeMetricsCatalog(id)

Get the sandbox runtime metric catalog

Returns the bounded canonical metric names, kinds, units, and dimensions supported by the runtime metrics API.

### Example

```ts
import {
  Configuration,
  ObservabilityApi,
} from 'sandbox0';
import type { GetSandboxRuntimeMetricsCatalogRequest } from 'sandbox0';

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
  } satisfies GetSandboxRuntimeMetricsCatalogRequest;

  try {
    const data = await api.getSandboxRuntimeMetricsCatalog(body);
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

[**SuccessSandboxRuntimeMetricsCatalogResponse**](SuccessSandboxRuntimeMetricsCatalogResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Sandbox runtime metric catalog |  -  |
| **403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

