# RegistryApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1RegistryCredentialsPost**](RegistryApi.md#apiv1registrycredentialspost) | **POST** /api/v1/registry/credentials | Get registry credentials for uploads |



## apiV1RegistryCredentialsPost

> SuccessRegistryCredentialsResponse apiV1RegistryCredentialsPost(registryCredentialsRequest)

Get registry credentials for uploads

### Example

```ts
import {
  Configuration,
  RegistryApi,
} from 'sandbox0';
import type { ApiV1RegistryCredentialsPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RegistryApi(config);

  const body = {
    // RegistryCredentialsRequest (optional)
    registryCredentialsRequest: ...,
  } satisfies ApiV1RegistryCredentialsPostRequest;

  try {
    const data = await api.apiV1RegistryCredentialsPost(body);
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
| **registryCredentialsRequest** | [RegistryCredentialsRequest](RegistryCredentialsRequest.md) |  | [Optional] |

### Return type

[**SuccessRegistryCredentialsResponse**](SuccessRegistryCredentialsResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Registry credentials |  -  |
| **400** | Invalid request |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **500** | Server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

