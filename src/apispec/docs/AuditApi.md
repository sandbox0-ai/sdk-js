# AuditApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1SandboxesIdAuditEventsGet**](AuditApi.md#apiv1sandboxesidauditeventsget) | **GET** /api/v1/sandboxes/{id}/audit/events | Query historical sandbox audit events |



## apiV1SandboxesIdAuditEventsGet

> SuccessSandboxObservabilityEventsResponse apiV1SandboxesIdAuditEventsGet(id, startTime, endTime, limit, cursor, watch, source, eventType, outcome)

Query historical sandbox audit events

Queries the audit-focused projection for a sandbox. Network audit events are included in scope; file audit is intentionally not included. 

### Example

```ts
import {
  Configuration,
  AuditApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdAuditEventsGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AuditApi(config);

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
  } satisfies ApiV1SandboxesIdAuditEventsGetRequest;

  try {
    const data = await api.apiV1SandboxesIdAuditEventsGet(body);
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
| **200** | Historical sandbox audit events |  -  |
| **400** | Invalid query parameters |  -  |
| **403** | Forbidden |  -  |
| **503** | Historical observability backend disabled or unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

