# RegistryApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1RegistryCredentialsPost**](RegistryApi.md#apiv1registrycredentialspost) | **POST** /api/v1/registry/credentials | Get registry credentials for uploads |



## apiV1RegistryCredentialsPost

> SuccessRegistryCredentialsResponse apiV1RegistryCredentialsPost()

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

  try {
    const data = await api.apiV1RegistryCredentialsPost();
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

[**SuccessRegistryCredentialsResponse**](SuccessRegistryCredentialsResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Registry credentials |  -  |
| **401** | Unauthorized |  -  |
| **500** | Server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

