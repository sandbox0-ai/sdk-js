# FilesApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1SandboxesIdFilesDelete**](FilesApi.md#apiv1sandboxesidfilesdelete) | **DELETE** /api/v1/sandboxes/{id}/files | Delete file or directory |
| [**apiV1SandboxesIdFilesGet**](FilesApi.md#apiv1sandboxesidfilesget) | **GET** /api/v1/sandboxes/{id}/files | Read file content |
| [**apiV1SandboxesIdFilesListGet**](FilesApi.md#apiv1sandboxesidfileslistget) | **GET** /api/v1/sandboxes/{id}/files/list | List directory entries |
| [**apiV1SandboxesIdFilesMovePost**](FilesApi.md#apiv1sandboxesidfilesmovepost) | **POST** /api/v1/sandboxes/{id}/files/move | Move a file or directory |
| [**apiV1SandboxesIdFilesPost**](FilesApi.md#apiv1sandboxesidfilespost) | **POST** /api/v1/sandboxes/{id}/files | Write file or create directory |
| [**apiV1SandboxesIdFilesStatGet**](FilesApi.md#apiv1sandboxesidfilesstatget) | **GET** /api/v1/sandboxes/{id}/files/stat | Stat a file |
| [**apiV1SandboxesIdFilesWatchGet**](FilesApi.md#apiv1sandboxesidfileswatchget) | **GET** /api/v1/sandboxes/{id}/files/watch | File watch WebSocket |



## apiV1SandboxesIdFilesDelete

> SuccessDeletedResponse apiV1SandboxesIdFilesDelete(id, path)

Delete file or directory

### Example

```ts
import {
  Configuration,
  FilesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdFilesDeleteRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FilesApi(config);

  const body = {
    // string
    id: id_example,
    // string
    path: path_example,
  } satisfies ApiV1SandboxesIdFilesDeleteRequest;

  try {
    const data = await api.apiV1SandboxesIdFilesDelete(body);
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
| **path** | `string` |  | [Defaults to `undefined`] |

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
| **200** | Deleted |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdFilesGet

> Blob apiV1SandboxesIdFilesGet(id, path)

Read file content

Use query params: - path&#x3D;/tmp/a.txt: target file path When &#x60;Accept&#x60; or &#x60;Content-Type&#x60; is &#x60;application/json&#x60;, returns a base64 JSON payload. 

### Example

```ts
import {
  Configuration,
  FilesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdFilesGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FilesApi(config);

  const body = {
    // string
    id: id_example,
    // string
    path: path_example,
  } satisfies ApiV1SandboxesIdFilesGetRequest;

  try {
    const data = await api.apiV1SandboxesIdFilesGet(body);
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
| **path** | `string` |  | [Defaults to `undefined`] |

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
| **200** | File content |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdFilesListGet

> SuccessFileListResponse apiV1SandboxesIdFilesListGet(id, path)

List directory entries

Use query params: - path&#x3D;/tmp: target directory path 

### Example

```ts
import {
  Configuration,
  FilesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdFilesListGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FilesApi(config);

  const body = {
    // string
    id: id_example,
    // string
    path: path_example,
  } satisfies ApiV1SandboxesIdFilesListGetRequest;

  try {
    const data = await api.apiV1SandboxesIdFilesListGet(body);
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
| **path** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SuccessFileListResponse**](SuccessFileListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Directory entries |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdFilesMovePost

> SuccessMovedResponse apiV1SandboxesIdFilesMovePost(id, moveFileRequest)

Move a file or directory

### Example

```ts
import {
  Configuration,
  FilesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdFilesMovePostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FilesApi(config);

  const body = {
    // string
    id: id_example,
    // MoveFileRequest
    moveFileRequest: ...,
  } satisfies ApiV1SandboxesIdFilesMovePostRequest;

  try {
    const data = await api.apiV1SandboxesIdFilesMovePost(body);
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
| **moveFileRequest** | [MoveFileRequest](MoveFileRequest.md) |  | |

### Return type

[**SuccessMovedResponse**](SuccessMovedResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Moved |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdFilesPost

> SuccessWrittenResponse apiV1SandboxesIdFilesPost(id, path, mkdir, recursive, body)

Write file or create directory

Use &#x60;path&#x60; query param and &#x60;mkdir&#x3D;true&#x60; to create directories, otherwise writes file content.

### Example

```ts
import {
  Configuration,
  FilesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdFilesPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FilesApi(config);

  const body = {
    // string
    id: id_example,
    // string
    path: path_example,
    // boolean (optional)
    mkdir: true,
    // boolean (optional)
    recursive: true,
    // Blob (optional)
    body: BINARY_DATA_HERE,
  } satisfies ApiV1SandboxesIdFilesPostRequest;

  try {
    const data = await api.apiV1SandboxesIdFilesPost(body);
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
| **path** | `string` |  | [Defaults to `undefined`] |
| **mkdir** | `boolean` |  | [Optional] [Defaults to `undefined`] |
| **recursive** | `boolean` |  | [Optional] [Defaults to `undefined`] |
| **body** | `Blob` |  | [Optional] |

### Return type

[**SuccessWrittenResponse**](SuccessWrittenResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/octet-stream`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | File written |  -  |
| **201** | Directory created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdFilesStatGet

> SuccessFileStatResponse apiV1SandboxesIdFilesStatGet(id, path)

Stat a file

Use query params: - path&#x3D;/tmp/a.txt: target file path 

### Example

```ts
import {
  Configuration,
  FilesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdFilesStatGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FilesApi(config);

  const body = {
    // string
    id: id_example,
    // string
    path: path_example,
  } satisfies ApiV1SandboxesIdFilesStatGetRequest;

  try {
    const data = await api.apiV1SandboxesIdFilesStatGet(body);
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
| **path** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SuccessFileStatResponse**](SuccessFileStatResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | File metadata |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1SandboxesIdFilesWatchGet

> apiV1SandboxesIdFilesWatchGet(id)

File watch WebSocket

Upgrades to WebSocket for file watch events. Client messages: - { \&quot;action\&quot;: \&quot;subscribe\&quot;, \&quot;path\&quot;: \&quot;/tmp\&quot;, \&quot;recursive\&quot;: false } - { \&quot;action\&quot;: \&quot;unsubscribe\&quot;, \&quot;watch_id\&quot;: \&quot;watch-id\&quot; } Server messages: - { \&quot;type\&quot;: \&quot;subscribed\&quot;, \&quot;watch_id\&quot;: \&quot;watch-id\&quot;, \&quot;path\&quot;: \&quot;/tmp\&quot; } - { \&quot;type\&quot;: \&quot;event\&quot;, \&quot;watch_id\&quot;: \&quot;watch-id\&quot;, \&quot;event\&quot;: \&quot;write\&quot;, \&quot;path\&quot;: \&quot;/tmp/a.txt\&quot; } - { \&quot;type\&quot;: \&quot;unsubscribed\&quot;, \&quot;watch_id\&quot;: \&quot;watch-id\&quot; } - { \&quot;type\&quot;: \&quot;error\&quot;, \&quot;error\&quot;: \&quot;message\&quot; } 

### Example

```ts
import {
  Configuration,
  FilesApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdFilesWatchGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FilesApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiV1SandboxesIdFilesWatchGetRequest;

  try {
    const data = await api.apiV1SandboxesIdFilesWatchGet(body);
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

`void` (Empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **101** | Switching Protocols |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

