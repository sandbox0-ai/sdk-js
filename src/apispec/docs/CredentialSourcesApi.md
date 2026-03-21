# CredentialSourcesApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1CredentialSourcesGet**](CredentialSourcesApi.md#apiv1credentialsourcesget) | **GET** /api/v1/credential-sources | List credential sources |
| [**apiV1CredentialSourcesNameDelete**](CredentialSourcesApi.md#apiv1credentialsourcesnamedelete) | **DELETE** /api/v1/credential-sources/{name} | Delete credential source |
| [**apiV1CredentialSourcesNameGet**](CredentialSourcesApi.md#apiv1credentialsourcesnameget) | **GET** /api/v1/credential-sources/{name} | Get credential source |
| [**apiV1CredentialSourcesNamePut**](CredentialSourcesApi.md#apiv1credentialsourcesnameput) | **PUT** /api/v1/credential-sources/{name} | Update credential source |
| [**apiV1CredentialSourcesPost**](CredentialSourcesApi.md#apiv1credentialsourcespost) | **POST** /api/v1/credential-sources | Create credential source |



## apiV1CredentialSourcesGet

> SuccessCredentialSourceListResponse apiV1CredentialSourcesGet()

List credential sources

### Example

```ts
import {
  Configuration,
  CredentialSourcesApi,
} from 'sandbox0';
import type { ApiV1CredentialSourcesGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CredentialSourcesApi(config);

  try {
    const data = await api.apiV1CredentialSourcesGet();
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

[**SuccessCredentialSourceListResponse**](SuccessCredentialSourceListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Credential sources |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1CredentialSourcesNameDelete

> SuccessMessageResponse apiV1CredentialSourcesNameDelete(name)

Delete credential source

### Example

```ts
import {
  Configuration,
  CredentialSourcesApi,
} from 'sandbox0';
import type { ApiV1CredentialSourcesNameDeleteRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CredentialSourcesApi(config);

  const body = {
    // string
    name: name_example,
  } satisfies ApiV1CredentialSourcesNameDeleteRequest;

  try {
    const data = await api.apiV1CredentialSourcesNameDelete(body);
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
| **name** | `string` |  | [Defaults to `undefined`] |

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
| **200** | Credential source deleted |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1CredentialSourcesNameGet

> SuccessCredentialSourceResponse apiV1CredentialSourcesNameGet(name)

Get credential source

### Example

```ts
import {
  Configuration,
  CredentialSourcesApi,
} from 'sandbox0';
import type { ApiV1CredentialSourcesNameGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CredentialSourcesApi(config);

  const body = {
    // string
    name: name_example,
  } satisfies ApiV1CredentialSourcesNameGetRequest;

  try {
    const data = await api.apiV1CredentialSourcesNameGet(body);
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
| **name** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SuccessCredentialSourceResponse**](SuccessCredentialSourceResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Credential source |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1CredentialSourcesNamePut

> SuccessCredentialSourceResponse apiV1CredentialSourcesNamePut(name, credentialSourceWriteRequest)

Update credential source

### Example

```ts
import {
  Configuration,
  CredentialSourcesApi,
} from 'sandbox0';
import type { ApiV1CredentialSourcesNamePutRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CredentialSourcesApi(config);

  const body = {
    // string
    name: name_example,
    // CredentialSourceWriteRequest
    credentialSourceWriteRequest: ...,
  } satisfies ApiV1CredentialSourcesNamePutRequest;

  try {
    const data = await api.apiV1CredentialSourcesNamePut(body);
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
| **name** | `string` |  | [Defaults to `undefined`] |
| **credentialSourceWriteRequest** | [CredentialSourceWriteRequest](CredentialSourceWriteRequest.md) |  | |

### Return type

[**SuccessCredentialSourceResponse**](SuccessCredentialSourceResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Credential source updated |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1CredentialSourcesPost

> SuccessCredentialSourceResponse apiV1CredentialSourcesPost(credentialSourceWriteRequest)

Create credential source

### Example

```ts
import {
  Configuration,
  CredentialSourcesApi,
} from 'sandbox0';
import type { ApiV1CredentialSourcesPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CredentialSourcesApi(config);

  const body = {
    // CredentialSourceWriteRequest
    credentialSourceWriteRequest: ...,
  } satisfies ApiV1CredentialSourcesPostRequest;

  try {
    const data = await api.apiV1CredentialSourcesPost(body);
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
| **credentialSourceWriteRequest** | [CredentialSourceWriteRequest](CredentialSourceWriteRequest.md) |  | |

### Return type

[**SuccessCredentialSourceResponse**](SuccessCredentialSourceResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Credential source created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

