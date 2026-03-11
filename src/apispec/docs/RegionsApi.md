# RegionsApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**regionsGet**](RegionsApi.md#regionsget) | **GET** /regions | List regions in the global directory |
| [**regionsIdDelete**](RegionsApi.md#regionsiddelete) | **DELETE** /regions/{id} | Delete a region from the global directory |
| [**regionsIdGet**](RegionsApi.md#regionsidget) | **GET** /regions/{id} | Get a region from the global directory |
| [**regionsIdPut**](RegionsApi.md#regionsidput) | **PUT** /regions/{id} | Update a region in the global directory |
| [**regionsPost**](RegionsApi.md#regionspost) | **POST** /regions | Create a region in the global directory |



## regionsGet

> SuccessRegionListResponse regionsGet()

List regions in the global directory

### Example

```ts
import {
  Configuration,
  RegionsApi,
} from 'sandbox0';
import type { RegionsGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RegionsApi(config);

  try {
    const data = await api.regionsGet();
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

[**SuccessRegionListResponse**](SuccessRegionListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Region list |  -  |
| **401** | Unauthorized |  -  |
| **403** | System admin access required |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## regionsIdDelete

> SuccessMessageResponse regionsIdDelete(id)

Delete a region from the global directory

### Example

```ts
import {
  Configuration,
  RegionsApi,
} from 'sandbox0';
import type { RegionsIdDeleteRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RegionsApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies RegionsIdDeleteRequest;

  try {
    const data = await api.regionsIdDelete(body);
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
| **200** | Region deleted |  -  |
| **401** | Unauthorized |  -  |
| **403** | System admin access required |  -  |
| **404** | Region not found |  -  |
| **409** | Team already exists |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## regionsIdGet

> SuccessRegionResponse regionsIdGet(id)

Get a region from the global directory

### Example

```ts
import {
  Configuration,
  RegionsApi,
} from 'sandbox0';
import type { RegionsIdGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RegionsApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies RegionsIdGetRequest;

  try {
    const data = await api.regionsIdGet(body);
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

[**SuccessRegionResponse**](SuccessRegionResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Region |  -  |
| **401** | Unauthorized |  -  |
| **403** | System admin access required |  -  |
| **404** | Region not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## regionsIdPut

> SuccessRegionResponse regionsIdPut(id, updateRegionRequest)

Update a region in the global directory

### Example

```ts
import {
  Configuration,
  RegionsApi,
} from 'sandbox0';
import type { RegionsIdPutRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RegionsApi(config);

  const body = {
    // string
    id: id_example,
    // UpdateRegionRequest
    updateRegionRequest: ...,
  } satisfies RegionsIdPutRequest;

  try {
    const data = await api.regionsIdPut(body);
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
| **updateRegionRequest** | [UpdateRegionRequest](UpdateRegionRequest.md) |  | |

### Return type

[**SuccessRegionResponse**](SuccessRegionResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Region updated |  -  |
| **400** | Invalid request |  -  |
| **401** | Unauthorized |  -  |
| **403** | System admin access required |  -  |
| **404** | Region not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## regionsPost

> SuccessRegionResponse regionsPost(createRegionRequest)

Create a region in the global directory

### Example

```ts
import {
  Configuration,
  RegionsApi,
} from 'sandbox0';
import type { RegionsPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RegionsApi(config);

  const body = {
    // CreateRegionRequest
    createRegionRequest: ...,
  } satisfies RegionsPostRequest;

  try {
    const data = await api.regionsPost(body);
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
| **createRegionRequest** | [CreateRegionRequest](CreateRegionRequest.md) |  | |

### Return type

[**SuccessRegionResponse**](SuccessRegionResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Region created |  -  |
| **400** | Invalid request |  -  |
| **401** | Unauthorized |  -  |
| **403** | System admin access required |  -  |
| **409** | Region already exists |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

