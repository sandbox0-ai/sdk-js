# ApiKeysApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiKeysGet**](ApiKeysApi.md#apikeysget) | **GET** /api-keys | List API keys |
| [**apiKeysIdDeactivatePost**](ApiKeysApi.md#apikeysiddeactivatepost) | **POST** /api-keys/{id}/deactivate | Deactivate API key |
| [**apiKeysIdDelete**](ApiKeysApi.md#apikeysiddelete) | **DELETE** /api-keys/{id} | Delete API key |
| [**apiKeysPost**](ApiKeysApi.md#apikeyspost) | **POST** /api-keys | Create API key |



## apiKeysGet

> SuccessAPIKeyListResponse apiKeysGet()

List API keys

### Example

```ts
import {
  Configuration,
  ApiKeysApi,
} from 'sandbox0';
import type { ApiKeysGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ApiKeysApi(config);

  try {
    const data = await api.apiKeysGet();
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

[**SuccessAPIKeyListResponse**](SuccessAPIKeyListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | API key list |  -  |
| **401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiKeysIdDeactivatePost

> SuccessMessageResponse apiKeysIdDeactivatePost(id)

Deactivate API key

### Example

```ts
import {
  Configuration,
  ApiKeysApi,
} from 'sandbox0';
import type { ApiKeysIdDeactivatePostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ApiKeysApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiKeysIdDeactivatePostRequest;

  try {
    const data = await api.apiKeysIdDeactivatePost(body);
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

[**SuccessMessageResponse**](SuccessMessageResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | API key deactivated |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiKeysIdDelete

> SuccessMessageResponse apiKeysIdDelete(id)

Delete API key

### Example

```ts
import {
  Configuration,
  ApiKeysApi,
} from 'sandbox0';
import type { ApiKeysIdDeleteRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ApiKeysApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiKeysIdDeleteRequest;

  try {
    const data = await api.apiKeysIdDelete(body);
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

[**SuccessMessageResponse**](SuccessMessageResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | API key deleted |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiKeysPost

> SuccessCreateAPIKeyResponse apiKeysPost(createAPIKeyRequest)

Create API key

### Example

```ts
import {
  Configuration,
  ApiKeysApi,
} from 'sandbox0';
import type { ApiKeysPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ApiKeysApi(config);

  const body = {
    // CreateAPIKeyRequest
    createAPIKeyRequest: ...,
  } satisfies ApiKeysPostRequest;

  try {
    const data = await api.apiKeysPost(body);
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
| **createAPIKeyRequest** | [CreateAPIKeyRequest](CreateAPIKeyRequest.md) |  | |

### Return type

[**SuccessCreateAPIKeyResponse**](SuccessCreateAPIKeyResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | API key created |  -  |
| **400** | Invalid request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

