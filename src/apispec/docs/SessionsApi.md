# SessionsApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1SandboxesIdSessionsGet**](SessionsApi.md#apiv1sandboxesidsessionsget) | **GET** /api/v1/sandboxes/{id}/sessions | List execution sessions |
| [**apiV1SandboxesIdSessionsPost**](SessionsApi.md#apiv1sandboxesidsessionspost) | **POST** /api/v1/sandboxes/{id}/sessions | Create an execution session |
| [**apiV1SandboxesIdSessionsSessionIdAttemptsPost**](SessionsApi.md#apiv1sandboxesidsessionssessionidattemptspost) | **POST** /api/v1/sandboxes/{id}/sessions/{session_id}/attempts | Create a new execution session attempt |
| [**apiV1SandboxesIdSessionsSessionIdDelete**](SessionsApi.md#apiv1sandboxesidsessionssessioniddelete) | **DELETE** /api/v1/sandboxes/{id}/sessions/{session_id} | Delete an execution session |
| [**apiV1SandboxesIdSessionsSessionIdDesiredStatePut**](SessionsApi.md#apiv1sandboxesidsessionssessioniddesiredstateput) | **PUT** /api/v1/sandboxes/{id}/sessions/{session_id}/desired-state | Set execution session desired state |
| [**apiV1SandboxesIdSessionsSessionIdEventsGet**](SessionsApi.md#apiv1sandboxesidsessionssessionideventsget) | **GET** /api/v1/sandboxes/{id}/sessions/{session_id}/events | List execution session events |
| [**apiV1SandboxesIdSessionsSessionIdEventsStreamGet**](SessionsApi.md#apiv1sandboxesidsessionssessionideventsstreamget) | **GET** /api/v1/sandboxes/{id}/sessions/{session_id}/events/stream | Stream execution session events |
| [**apiV1SandboxesIdSessionsSessionIdGet**](SessionsApi.md#apiv1sandboxesidsessionssessionidget) | **GET** /api/v1/sandboxes/{id}/sessions/{session_id} | Get an execution session |
| [**apiV1SandboxesIdSessionsSessionIdInputsPost**](SessionsApi.md#apiv1sandboxesidsessionssessionidinputspost) | **POST** /api/v1/sandboxes/{id}/sessions/{session_id}/inputs | Append execution session input |
| [**apiV1SandboxesIdSessionsSessionIdPut**](SessionsApi.md#apiv1sandboxesidsessionssessionidput) | **PUT** /api/v1/sandboxes/{id}/sessions/{session_id} | Replace an execution session specification |
| [**apiV1SandboxesIdSessionsSessionIdSignalsPost**](SessionsApi.md#apiv1sandboxesidsessionssessionidsignalspost) | **POST** /api/v1/sandboxes/{id}/sessions/{session_id}/signals | Send a signal to an execution session attempt |
| [**apiV1SandboxesIdSessionsSessionIdTerminalPut**](SessionsApi.md#apiv1sandboxesidsessionssessionidterminalput) | **PUT** /api/v1/sandboxes/{id}/sessions/{session_id}/terminal | Resize an execution session terminal |
| [**apiV1SandboxesIdSessionsSessionIdWsGet**](SessionsApi.md#apiv1sandboxesidsessionssessionidwsget) | **GET** /api/v1/sandboxes/{id}/sessions/{session_id}/ws | Attach to an execution session with WebSocket |



## apiV1SandboxesIdSessionsGet

> SuccessExecutionSessionListResponse apiV1SandboxesIdSessionsGet(id)

List execution sessions

Lists durable process-backed sessions in the sandbox.

### Example

```ts
import {
  Configuration,
  SessionsApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdSessionsGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SessionsApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiV1SandboxesIdSessionsGetRequest;

  try {
    const data = await api.apiV1SandboxesIdSessionsGet(body);
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

[**SuccessExecutionSessionListResponse**](SuccessExecutionSessionListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Execution session list |  -  |
| **429** | The admission control applicable to this route and deployment topology rejected the request. &#x60;error.code&#x60; is &#x60;quota_exceeded&#x60; for a team-attributed Team Quota such as &#x60;active_request_count&#x60;, &#x60;active_connection_count&#x60;, &#x60;api_requests&#x60;, or a traffic-byte rate, &#x60;identity_limit_exceeded&#x60; for an IdentityResourceGuard cardinality limit, or &#x60;rate_limited&#x60; for an aggregate overload guard. A given route does not necessarily use every control.  |  * Retry-After - Suggested delay in seconds when token-bucket or overload admission provides one; identity cardinality rejections may omit it <br>  |
| **503** | The fail-closed admission backend applicable to this route is unavailable. Depending on deployment topology, this is the region Team Quota policy or Redis path, or the public identity entrypoint\&#39;s shared overload-guard backend; a given route does not necessarily use both.  |  * Retry-After - Suggested retry delay in seconds <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdSessionsPost

> SuccessExecutionSessionResponse apiV1SandboxesIdSessionsPost(id, executionSessionSpec, idempotencyKey)

Create an execution session

Creates a durable process-backed session. The client connection does not own the session lifecycle.

### Example

```ts
import {
  Configuration,
  SessionsApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdSessionsPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SessionsApi(config);

  const body = {
    // string
    id: id_example,
    // ExecutionSessionSpec
    executionSessionSpec: ...,
    // string | Optional key for retrying creation without creating a duplicate session. (optional)
    idempotencyKey: idempotencyKey_example,
  } satisfies ApiV1SandboxesIdSessionsPostRequest;

  try {
    const data = await api.apiV1SandboxesIdSessionsPost(body);
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
| **executionSessionSpec** | [ExecutionSessionSpec](ExecutionSessionSpec.md) |  | |
| **idempotencyKey** | `string` | Optional key for retrying creation without creating a duplicate session. | [Optional] [Defaults to `undefined`] |

### Return type

[**SuccessExecutionSessionResponse**](SuccessExecutionSessionResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Execution session created |  -  |
| **200** | Existing execution session returned for an idempotent retry |  -  |
| **429** | The sandbox already retains the maximum 1024 execution sessions |  -  |
| **503** | The fail-closed admission backend applicable to this route is unavailable. Depending on deployment topology, this is the region Team Quota policy or Redis path, or the public identity entrypoint\&#39;s shared overload-guard backend; a given route does not necessarily use both.  |  * Retry-After - Suggested retry delay in seconds <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdSessionsSessionIdAttemptsPost

> SuccessExecutionSessionResponse apiV1SandboxesIdSessionsSessionIdAttemptsPost(id, sessionId, createExecutionSessionAttemptRequest)

Create a new execution session attempt

Starts a new process attempt. Set replace_current to stop and replace a running attempt.

### Example

```ts
import {
  Configuration,
  SessionsApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdSessionsSessionIdAttemptsPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SessionsApi(config);

  const body = {
    // string
    id: id_example,
    // string
    sessionId: sessionId_example,
    // CreateExecutionSessionAttemptRequest (optional)
    createExecutionSessionAttemptRequest: ...,
  } satisfies ApiV1SandboxesIdSessionsSessionIdAttemptsPostRequest;

  try {
    const data = await api.apiV1SandboxesIdSessionsSessionIdAttemptsPost(body);
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
| **sessionId** | `string` |  | [Defaults to `undefined`] |
| **createExecutionSessionAttemptRequest** | [CreateExecutionSessionAttemptRequest](CreateExecutionSessionAttemptRequest.md) |  | [Optional] |

### Return type

[**SuccessExecutionSessionResponse**](SuccessExecutionSessionResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Attempt created |  -  |
| **429** | The admission control applicable to this route and deployment topology rejected the request. &#x60;error.code&#x60; is &#x60;quota_exceeded&#x60; for a team-attributed Team Quota such as &#x60;active_request_count&#x60;, &#x60;active_connection_count&#x60;, &#x60;api_requests&#x60;, or a traffic-byte rate, &#x60;identity_limit_exceeded&#x60; for an IdentityResourceGuard cardinality limit, or &#x60;rate_limited&#x60; for an aggregate overload guard. A given route does not necessarily use every control.  |  * Retry-After - Suggested delay in seconds when token-bucket or overload admission provides one; identity cardinality rejections may omit it <br>  |
| **503** | The fail-closed admission backend applicable to this route is unavailable. Depending on deployment topology, this is the region Team Quota policy or Redis path, or the public identity entrypoint\&#39;s shared overload-guard backend; a given route does not necessarily use both.  |  * Retry-After - Suggested retry delay in seconds <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdSessionsSessionIdDelete

> SuccessDeletedResponse apiV1SandboxesIdSessionsSessionIdDelete(id, sessionId)

Delete an execution session

### Example

```ts
import {
  Configuration,
  SessionsApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdSessionsSessionIdDeleteRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SessionsApi(config);

  const body = {
    // string
    id: id_example,
    // string
    sessionId: sessionId_example,
  } satisfies ApiV1SandboxesIdSessionsSessionIdDeleteRequest;

  try {
    const data = await api.apiV1SandboxesIdSessionsSessionIdDelete(body);
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
| **sessionId** | `string` |  | [Defaults to `undefined`] |

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
| **200** | Execution session deleted |  -  |
| **429** | The admission control applicable to this route and deployment topology rejected the request. &#x60;error.code&#x60; is &#x60;quota_exceeded&#x60; for a team-attributed Team Quota such as &#x60;active_request_count&#x60;, &#x60;active_connection_count&#x60;, &#x60;api_requests&#x60;, or a traffic-byte rate, &#x60;identity_limit_exceeded&#x60; for an IdentityResourceGuard cardinality limit, or &#x60;rate_limited&#x60; for an aggregate overload guard. A given route does not necessarily use every control.  |  * Retry-After - Suggested delay in seconds when token-bucket or overload admission provides one; identity cardinality rejections may omit it <br>  |
| **503** | The fail-closed admission backend applicable to this route is unavailable. Depending on deployment topology, this is the region Team Quota policy or Redis path, or the public identity entrypoint\&#39;s shared overload-guard backend; a given route does not necessarily use both.  |  * Retry-After - Suggested retry delay in seconds <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdSessionsSessionIdDesiredStatePut

> SuccessExecutionSessionResponse apiV1SandboxesIdSessionsSessionIdDesiredStatePut(id, sessionId, executionSessionDesiredStateRequest)

Set execution session desired state

### Example

```ts
import {
  Configuration,
  SessionsApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdSessionsSessionIdDesiredStatePutRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SessionsApi(config);

  const body = {
    // string
    id: id_example,
    // string
    sessionId: sessionId_example,
    // ExecutionSessionDesiredStateRequest
    executionSessionDesiredStateRequest: ...,
  } satisfies ApiV1SandboxesIdSessionsSessionIdDesiredStatePutRequest;

  try {
    const data = await api.apiV1SandboxesIdSessionsSessionIdDesiredStatePut(body);
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
| **sessionId** | `string` |  | [Defaults to `undefined`] |
| **executionSessionDesiredStateRequest** | [ExecutionSessionDesiredStateRequest](ExecutionSessionDesiredStateRequest.md) |  | |

### Return type

[**SuccessExecutionSessionResponse**](SuccessExecutionSessionResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Desired state updated |  -  |
| **429** | The admission control applicable to this route and deployment topology rejected the request. &#x60;error.code&#x60; is &#x60;quota_exceeded&#x60; for a team-attributed Team Quota such as &#x60;active_request_count&#x60;, &#x60;active_connection_count&#x60;, &#x60;api_requests&#x60;, or a traffic-byte rate, &#x60;identity_limit_exceeded&#x60; for an IdentityResourceGuard cardinality limit, or &#x60;rate_limited&#x60; for an aggregate overload guard. A given route does not necessarily use every control.  |  * Retry-After - Suggested delay in seconds when token-bucket or overload admission provides one; identity cardinality rejections may omit it <br>  |
| **503** | The fail-closed admission backend applicable to this route is unavailable. Depending on deployment topology, this is the region Team Quota policy or Redis path, or the public identity entrypoint\&#39;s shared overload-guard backend; a given route does not necessarily use both.  |  * Retry-After - Suggested retry delay in seconds <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdSessionsSessionIdEventsGet

> SuccessExecutionSessionEventPageResponse apiV1SandboxesIdSessionsSessionIdEventsGet(id, sessionId, after, limit)

List execution session events

Returns retained events after the supplied sequence. Delivery is cursor-based and at least once.

### Example

```ts
import {
  Configuration,
  SessionsApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdSessionsSessionIdEventsGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SessionsApi(config);

  const body = {
    // string
    id: id_example,
    // string
    sessionId: sessionId_example,
    // number (optional)
    after: 789,
    // number (optional)
    limit: 56,
  } satisfies ApiV1SandboxesIdSessionsSessionIdEventsGetRequest;

  try {
    const data = await api.apiV1SandboxesIdSessionsSessionIdEventsGet(body);
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
| **sessionId** | `string` |  | [Defaults to `undefined`] |
| **after** | `number` |  | [Optional] [Defaults to `undefined`] |
| **limit** | `number` |  | [Optional] [Defaults to `1000`] |

### Return type

[**SuccessExecutionSessionEventPageResponse**](SuccessExecutionSessionEventPageResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Execution session events |  -  |
| **410** | The requested cursor is older than retained history |  -  |
| **429** | The admission control applicable to this route and deployment topology rejected the request. &#x60;error.code&#x60; is &#x60;quota_exceeded&#x60; for a team-attributed Team Quota such as &#x60;active_request_count&#x60;, &#x60;active_connection_count&#x60;, &#x60;api_requests&#x60;, or a traffic-byte rate, &#x60;identity_limit_exceeded&#x60; for an IdentityResourceGuard cardinality limit, or &#x60;rate_limited&#x60; for an aggregate overload guard. A given route does not necessarily use every control.  |  * Retry-After - Suggested delay in seconds when token-bucket or overload admission provides one; identity cardinality rejections may omit it <br>  |
| **503** | The fail-closed admission backend applicable to this route is unavailable. Depending on deployment topology, this is the region Team Quota policy or Redis path, or the public identity entrypoint\&#39;s shared overload-guard backend; a given route does not necessarily use both.  |  * Retry-After - Suggested retry delay in seconds <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdSessionsSessionIdEventsStreamGet

> string apiV1SandboxesIdSessionsSessionIdEventsStreamGet(id, sessionId, after, lastEventID)

Stream execution session events

Streams retained and live events using SSE. Reconnect with Last-Event-ID or the after query parameter.

### Example

```ts
import {
  Configuration,
  SessionsApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdSessionsSessionIdEventsStreamGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SessionsApi(config);

  const body = {
    // string
    id: id_example,
    // string
    sessionId: sessionId_example,
    // number (optional)
    after: 789,
    // string (optional)
    lastEventID: lastEventID_example,
  } satisfies ApiV1SandboxesIdSessionsSessionIdEventsStreamGetRequest;

  try {
    const data = await api.apiV1SandboxesIdSessionsSessionIdEventsStreamGet(body);
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
| **sessionId** | `string` |  | [Defaults to `undefined`] |
| **after** | `number` |  | [Optional] [Defaults to `undefined`] |
| **lastEventID** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

**string**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/event-stream`, `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Server-sent event stream |  -  |
| **429** | The admission control applicable to this route and deployment topology rejected the request. &#x60;error.code&#x60; is &#x60;quota_exceeded&#x60; for a team-attributed Team Quota such as &#x60;active_request_count&#x60;, &#x60;active_connection_count&#x60;, &#x60;api_requests&#x60;, or a traffic-byte rate, &#x60;identity_limit_exceeded&#x60; for an IdentityResourceGuard cardinality limit, or &#x60;rate_limited&#x60; for an aggregate overload guard. A given route does not necessarily use every control.  |  * Retry-After - Suggested delay in seconds when token-bucket or overload admission provides one; identity cardinality rejections may omit it <br>  |
| **503** | The fail-closed admission backend applicable to this route is unavailable. Depending on deployment topology, this is the region Team Quota policy or Redis path, or the public identity entrypoint\&#39;s shared overload-guard backend; a given route does not necessarily use both.  |  * Retry-After - Suggested retry delay in seconds <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdSessionsSessionIdGet

> SuccessExecutionSessionResponse apiV1SandboxesIdSessionsSessionIdGet(id, sessionId)

Get an execution session

### Example

```ts
import {
  Configuration,
  SessionsApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdSessionsSessionIdGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SessionsApi(config);

  const body = {
    // string
    id: id_example,
    // string
    sessionId: sessionId_example,
  } satisfies ApiV1SandboxesIdSessionsSessionIdGetRequest;

  try {
    const data = await api.apiV1SandboxesIdSessionsSessionIdGet(body);
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
| **sessionId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SuccessExecutionSessionResponse**](SuccessExecutionSessionResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Execution session |  -  |
| **429** | The admission control applicable to this route and deployment topology rejected the request. &#x60;error.code&#x60; is &#x60;quota_exceeded&#x60; for a team-attributed Team Quota such as &#x60;active_request_count&#x60;, &#x60;active_connection_count&#x60;, &#x60;api_requests&#x60;, or a traffic-byte rate, &#x60;identity_limit_exceeded&#x60; for an IdentityResourceGuard cardinality limit, or &#x60;rate_limited&#x60; for an aggregate overload guard. A given route does not necessarily use every control.  |  * Retry-After - Suggested delay in seconds when token-bucket or overload admission provides one; identity cardinality rejections may omit it <br>  |
| **503** | The fail-closed admission backend applicable to this route is unavailable. Depending on deployment topology, this is the region Team Quota policy or Redis path, or the public identity entrypoint\&#39;s shared overload-guard backend; a given route does not necessarily use both.  |  * Retry-After - Suggested retry delay in seconds <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdSessionsSessionIdInputsPost

> SuccessExecutionSessionInputResponse apiV1SandboxesIdSessionsSessionIdInputsPost(id, sessionId, executionSessionInputRequest)

Append execution session input

Writes binary-safe input to the current attempt. Once an input receipt is recorded, retrying the same input_id and content is deduplicated. A transport failure before the receipt is durable can make delivery ambiguous, so consumers must tolerate replay.

### Example

```ts
import {
  Configuration,
  SessionsApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdSessionsSessionIdInputsPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SessionsApi(config);

  const body = {
    // string
    id: id_example,
    // string
    sessionId: sessionId_example,
    // ExecutionSessionInputRequest
    executionSessionInputRequest: ...,
  } satisfies ApiV1SandboxesIdSessionsSessionIdInputsPostRequest;

  try {
    const data = await api.apiV1SandboxesIdSessionsSessionIdInputsPost(body);
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
| **sessionId** | `string` |  | [Defaults to `undefined`] |
| **executionSessionInputRequest** | [ExecutionSessionInputRequest](ExecutionSessionInputRequest.md) |  | |

### Return type

[**SuccessExecutionSessionInputResponse**](SuccessExecutionSessionInputResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **202** | Input accepted |  -  |
| **429** | The admission control applicable to this route and deployment topology rejected the request. &#x60;error.code&#x60; is &#x60;quota_exceeded&#x60; for a team-attributed Team Quota such as &#x60;active_request_count&#x60;, &#x60;active_connection_count&#x60;, &#x60;api_requests&#x60;, or a traffic-byte rate, &#x60;identity_limit_exceeded&#x60; for an IdentityResourceGuard cardinality limit, or &#x60;rate_limited&#x60; for an aggregate overload guard. A given route does not necessarily use every control.  |  * Retry-After - Suggested delay in seconds when token-bucket or overload admission provides one; identity cardinality rejections may omit it <br>  |
| **503** | The fail-closed admission backend applicable to this route is unavailable. Depending on deployment topology, this is the region Team Quota policy or Redis path, or the public identity entrypoint\&#39;s shared overload-guard backend; a given route does not necessarily use both.  |  * Retry-After - Suggested retry delay in seconds <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdSessionsSessionIdPut

> SuccessExecutionSessionResponse apiV1SandboxesIdSessionsSessionIdPut(id, sessionId, executionSessionSpec)

Replace an execution session specification

Replaces the specification. Changes to command, environment, I/O, or readiness create a new process attempt when the desired state is running.

### Example

```ts
import {
  Configuration,
  SessionsApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdSessionsSessionIdPutRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SessionsApi(config);

  const body = {
    // string
    id: id_example,
    // string
    sessionId: sessionId_example,
    // ExecutionSessionSpec
    executionSessionSpec: ...,
  } satisfies ApiV1SandboxesIdSessionsSessionIdPutRequest;

  try {
    const data = await api.apiV1SandboxesIdSessionsSessionIdPut(body);
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
| **sessionId** | `string` |  | [Defaults to `undefined`] |
| **executionSessionSpec** | [ExecutionSessionSpec](ExecutionSessionSpec.md) |  | |

### Return type

[**SuccessExecutionSessionResponse**](SuccessExecutionSessionResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Execution session updated |  -  |
| **429** | The admission control applicable to this route and deployment topology rejected the request. &#x60;error.code&#x60; is &#x60;quota_exceeded&#x60; for a team-attributed Team Quota such as &#x60;active_request_count&#x60;, &#x60;active_connection_count&#x60;, &#x60;api_requests&#x60;, or a traffic-byte rate, &#x60;identity_limit_exceeded&#x60; for an IdentityResourceGuard cardinality limit, or &#x60;rate_limited&#x60; for an aggregate overload guard. A given route does not necessarily use every control.  |  * Retry-After - Suggested delay in seconds when token-bucket or overload admission provides one; identity cardinality rejections may omit it <br>  |
| **503** | The fail-closed admission backend applicable to this route is unavailable. Depending on deployment topology, this is the region Team Quota policy or Redis path, or the public identity entrypoint\&#39;s shared overload-guard backend; a given route does not necessarily use both.  |  * Retry-After - Suggested retry delay in seconds <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdSessionsSessionIdSignalsPost

> SuccessAcceptedResponse apiV1SandboxesIdSessionsSessionIdSignalsPost(id, sessionId, executionSessionSignalRequest)

Send a signal to an execution session attempt

### Example

```ts
import {
  Configuration,
  SessionsApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdSessionsSessionIdSignalsPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SessionsApi(config);

  const body = {
    // string
    id: id_example,
    // string
    sessionId: sessionId_example,
    // ExecutionSessionSignalRequest
    executionSessionSignalRequest: ...,
  } satisfies ApiV1SandboxesIdSessionsSessionIdSignalsPostRequest;

  try {
    const data = await api.apiV1SandboxesIdSessionsSessionIdSignalsPost(body);
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
| **sessionId** | `string` |  | [Defaults to `undefined`] |
| **executionSessionSignalRequest** | [ExecutionSessionSignalRequest](ExecutionSessionSignalRequest.md) |  | |

### Return type

[**SuccessAcceptedResponse**](SuccessAcceptedResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **202** | Signal accepted |  -  |
| **429** | The admission control applicable to this route and deployment topology rejected the request. &#x60;error.code&#x60; is &#x60;quota_exceeded&#x60; for a team-attributed Team Quota such as &#x60;active_request_count&#x60;, &#x60;active_connection_count&#x60;, &#x60;api_requests&#x60;, or a traffic-byte rate, &#x60;identity_limit_exceeded&#x60; for an IdentityResourceGuard cardinality limit, or &#x60;rate_limited&#x60; for an aggregate overload guard. A given route does not necessarily use every control.  |  * Retry-After - Suggested delay in seconds when token-bucket or overload admission provides one; identity cardinality rejections may omit it <br>  |
| **503** | The fail-closed admission backend applicable to this route is unavailable. Depending on deployment topology, this is the region Team Quota policy or Redis path, or the public identity entrypoint\&#39;s shared overload-guard backend; a given route does not necessarily use both.  |  * Retry-After - Suggested retry delay in seconds <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdSessionsSessionIdTerminalPut

> SuccessResizedResponse apiV1SandboxesIdSessionsSessionIdTerminalPut(id, sessionId, executionSessionTerminalResizeRequest)

Resize an execution session terminal

### Example

```ts
import {
  Configuration,
  SessionsApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdSessionsSessionIdTerminalPutRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SessionsApi(config);

  const body = {
    // string
    id: id_example,
    // string
    sessionId: sessionId_example,
    // ExecutionSessionTerminalResizeRequest
    executionSessionTerminalResizeRequest: ...,
  } satisfies ApiV1SandboxesIdSessionsSessionIdTerminalPutRequest;

  try {
    const data = await api.apiV1SandboxesIdSessionsSessionIdTerminalPut(body);
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
| **sessionId** | `string` |  | [Defaults to `undefined`] |
| **executionSessionTerminalResizeRequest** | [ExecutionSessionTerminalResizeRequest](ExecutionSessionTerminalResizeRequest.md) |  | |

### Return type

[**SuccessResizedResponse**](SuccessResizedResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Terminal resized |  -  |
| **429** | The admission control applicable to this route and deployment topology rejected the request. &#x60;error.code&#x60; is &#x60;quota_exceeded&#x60; for a team-attributed Team Quota such as &#x60;active_request_count&#x60;, &#x60;active_connection_count&#x60;, &#x60;api_requests&#x60;, or a traffic-byte rate, &#x60;identity_limit_exceeded&#x60; for an IdentityResourceGuard cardinality limit, or &#x60;rate_limited&#x60; for an aggregate overload guard. A given route does not necessarily use every control.  |  * Retry-After - Suggested delay in seconds when token-bucket or overload admission provides one; identity cardinality rejections may omit it <br>  |
| **503** | The fail-closed admission backend applicable to this route is unavailable. Depending on deployment topology, this is the region Team Quota policy or Redis path, or the public identity entrypoint\&#39;s shared overload-guard backend; a given route does not necessarily use both.  |  * Retry-After - Suggested retry delay in seconds <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdSessionsSessionIdWsGet

> apiV1SandboxesIdSessionsSessionIdWsGet(id, sessionId, after)

Attach to an execution session with WebSocket

A WebSocket is an ephemeral attachment. Closing it does not stop the session or close process input.

### Example

```ts
import {
  Configuration,
  SessionsApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdSessionsSessionIdWsGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SessionsApi(config);

  const body = {
    // string
    id: id_example,
    // string
    sessionId: sessionId_example,
    // number (optional)
    after: 789,
  } satisfies ApiV1SandboxesIdSessionsSessionIdWsGetRequest;

  try {
    const data = await api.apiV1SandboxesIdSessionsSessionIdWsGet(body);
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
| **sessionId** | `string` |  | [Defaults to `undefined`] |
| **after** | `number` |  | [Optional] [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **101** | Switching Protocols |  -  |
| **429** | The admission control applicable to this route and deployment topology rejected the request. &#x60;error.code&#x60; is &#x60;quota_exceeded&#x60; for a team-attributed Team Quota such as &#x60;active_request_count&#x60;, &#x60;active_connection_count&#x60;, &#x60;api_requests&#x60;, or a traffic-byte rate, &#x60;identity_limit_exceeded&#x60; for an IdentityResourceGuard cardinality limit, or &#x60;rate_limited&#x60; for an aggregate overload guard. A given route does not necessarily use every control.  |  * Retry-After - Suggested delay in seconds when token-bucket or overload admission provides one; identity cardinality rejections may omit it <br>  |
| **503** | The fail-closed admission backend applicable to this route is unavailable. Depending on deployment topology, this is the region Team Quota policy or Redis path, or the public identity entrypoint\&#39;s shared overload-guard backend; a given route does not necessarily use both.  |  * Retry-After - Suggested retry delay in seconds <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
