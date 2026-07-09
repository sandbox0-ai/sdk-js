# ProcessesApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1SandboxesIdProcessesGet**](ProcessesApi.md#apiv1sandboxesidprocessesget) | **GET** /api/v1/sandboxes/{id}/processes | List process sessions |
| [**apiV1SandboxesIdProcessesPost**](ProcessesApi.md#apiv1sandboxesidprocessespost) | **POST** /api/v1/sandboxes/{id}/processes | Create a process session |
| [**apiV1SandboxesIdProcessesProcessIdChannelsChannelPtySizePut**](ProcessesApi.md#apiv1sandboxesidprocessesprocessidchannelschannelptysizeput) | **PUT** /api/v1/sandboxes/{id}/processes/{process_id}/channels/{channel}/pty-size | Resize process PTY channel |
| [**apiV1SandboxesIdProcessesProcessIdDelete**](ProcessesApi.md#apiv1sandboxesidprocessesprocessiddelete) | **DELETE** /api/v1/sandboxes/{id}/processes/{process_id} | Delete process session |
| [**apiV1SandboxesIdProcessesProcessIdEventsGet**](ProcessesApi.md#apiv1sandboxesidprocessesprocessideventsget) | **GET** /api/v1/sandboxes/{id}/processes/{process_id}/events | Stream process events |
| [**apiV1SandboxesIdProcessesProcessIdEventsPost**](ProcessesApi.md#apiv1sandboxesidprocessesprocessideventspost) | **POST** /api/v1/sandboxes/{id}/processes/{process_id}/events | Send process input event |
| [**apiV1SandboxesIdProcessesProcessIdGet**](ProcessesApi.md#apiv1sandboxesidprocessesprocessidget) | **GET** /api/v1/sandboxes/{id}/processes/{process_id} | Get process session |
| [**apiV1SandboxesIdProcessesProcessIdSignalPost**](ProcessesApi.md#apiv1sandboxesidprocessesprocessidsignalpost) | **POST** /api/v1/sandboxes/{id}/processes/{process_id}/signal | Send signal to process session |



## apiV1SandboxesIdProcessesGet

> SuccessProcessSessionListResponse apiV1SandboxesIdProcessesGet(id)

List process sessions

### Example

```ts
import {
  Configuration,
  ProcessesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdProcessesGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ProcessesApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiV1SandboxesIdProcessesGetRequest;

  try {
    const data = await api.apiV1SandboxesIdProcessesGet(body);
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

[**SuccessProcessSessionListResponse**](SuccessProcessSessionListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Process session list |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdProcessesPost

> SuccessProcessSessionResponse apiV1SandboxesIdProcessesPost(id, processSpec)

Create a process session

Creates a broker-owned process session with declared protocol channels. Client disconnects from event subscriptions do not close child process descriptors.

### Example

```ts
import {
  Configuration,
  ProcessesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdProcessesPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ProcessesApi(config);

  const body = {
    // string
    id: id_example,
    // ProcessSpec
    processSpec: ...,
  } satisfies ApiV1SandboxesIdProcessesPostRequest;

  try {
    const data = await api.apiV1SandboxesIdProcessesPost(body);
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
| **processSpec** | [ProcessSpec](ProcessSpec.md) |  | |

### Return type

[**SuccessProcessSessionResponse**](SuccessProcessSessionResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Process session created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdProcessesProcessIdChannelsChannelPtySizePut

> SuccessResizedResponse apiV1SandboxesIdProcessesProcessIdChannelsChannelPtySizePut(id, processId, channel, resizeContextRequest)

Resize process PTY channel

### Example

```ts
import {
  Configuration,
  ProcessesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdProcessesProcessIdChannelsChannelPtySizePutRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ProcessesApi(config);

  const body = {
    // string
    id: id_example,
    // string
    processId: processId_example,
    // string
    channel: channel_example,
    // ResizeContextRequest
    resizeContextRequest: ...,
  } satisfies ApiV1SandboxesIdProcessesProcessIdChannelsChannelPtySizePutRequest;

  try {
    const data = await api.apiV1SandboxesIdProcessesProcessIdChannelsChannelPtySizePut(body);
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
| **processId** | `string` |  | [Defaults to `undefined`] |
| **channel** | `string` |  | [Defaults to `undefined`] |
| **resizeContextRequest** | [ResizeContextRequest](ResizeContextRequest.md) |  | |

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
| **200** | Resized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdProcessesProcessIdDelete

> SuccessDeletedResponse apiV1SandboxesIdProcessesProcessIdDelete(id, processId)

Delete process session

Stops the process session, closes broker-owned channels, and removes it from procd.

### Example

```ts
import {
  Configuration,
  ProcessesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdProcessesProcessIdDeleteRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ProcessesApi(config);

  const body = {
    // string
    id: id_example,
    // string
    processId: processId_example,
  } satisfies ApiV1SandboxesIdProcessesProcessIdDeleteRequest;

  try {
    const data = await api.apiV1SandboxesIdProcessesProcessIdDelete(body);
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
| **processId** | `string` |  | [Defaults to `undefined`] |

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
| **200** | Process session deleted |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdProcessesProcessIdEventsGet

> string apiV1SandboxesIdProcessesProcessIdEventsGet(id, processId, cursor)

Stream process events

Streams replayed and live process events as Server-Sent Events. cursor is the last observed event seq; procd emits cursor_lost if the requested cursor is older than the retained log.

### Example

```ts
import {
  Configuration,
  ProcessesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdProcessesProcessIdEventsGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ProcessesApi(config);

  const body = {
    // string
    id: id_example,
    // string
    processId: processId_example,
    // number (optional)
    cursor: 789,
  } satisfies ApiV1SandboxesIdProcessesProcessIdEventsGetRequest;

  try {
    const data = await api.apiV1SandboxesIdProcessesProcessIdEventsGet(body);
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
| **processId** | `string` |  | [Defaults to `undefined`] |
| **cursor** | `number` |  | [Optional] [Defaults to `undefined`] |

### Return type

**string**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/event-stream`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Process event stream |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdProcessesProcessIdEventsPost

> SuccessProcessEventResponse apiV1SandboxesIdProcessesProcessIdEventsPost(id, processId, processInputEvent)

Send process input event

Sends an idempotent input event to one process channel. event_id is required and repeated identical events return the original accepted event.

### Example

```ts
import {
  Configuration,
  ProcessesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdProcessesProcessIdEventsPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ProcessesApi(config);

  const body = {
    // string
    id: id_example,
    // string
    processId: processId_example,
    // ProcessInputEvent
    processInputEvent: ...,
  } satisfies ApiV1SandboxesIdProcessesProcessIdEventsPostRequest;

  try {
    const data = await api.apiV1SandboxesIdProcessesProcessIdEventsPost(body);
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
| **processId** | `string` |  | [Defaults to `undefined`] |
| **processInputEvent** | [ProcessInputEvent](ProcessInputEvent.md) |  | |

### Return type

[**SuccessProcessEventResponse**](SuccessProcessEventResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **202** | Process input event accepted |  -  |
| **409** | Input backpressure or process state conflict |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdProcessesProcessIdGet

> SuccessProcessSessionResponse apiV1SandboxesIdProcessesProcessIdGet(id, processId)

Get process session

### Example

```ts
import {
  Configuration,
  ProcessesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdProcessesProcessIdGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ProcessesApi(config);

  const body = {
    // string
    id: id_example,
    // string
    processId: processId_example,
  } satisfies ApiV1SandboxesIdProcessesProcessIdGetRequest;

  try {
    const data = await api.apiV1SandboxesIdProcessesProcessIdGet(body);
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
| **processId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SuccessProcessSessionResponse**](SuccessProcessSessionResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Process session |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdProcessesProcessIdSignalPost

> SuccessSignaledResponse apiV1SandboxesIdProcessesProcessIdSignalPost(id, processId, signalContextRequest)

Send signal to process session

### Example

```ts
import {
  Configuration,
  ProcessesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdProcessesProcessIdSignalPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ProcessesApi(config);

  const body = {
    // string
    id: id_example,
    // string
    processId: processId_example,
    // SignalContextRequest
    signalContextRequest: ...,
  } satisfies ApiV1SandboxesIdProcessesProcessIdSignalPostRequest;

  try {
    const data = await api.apiV1SandboxesIdProcessesProcessIdSignalPost(body);
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
| **processId** | `string` |  | [Defaults to `undefined`] |
| **signalContextRequest** | [SignalContextRequest](SignalContextRequest.md) |  | |

### Return type

[**SuccessSignaledResponse**](SuccessSignaledResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Signal sent |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

