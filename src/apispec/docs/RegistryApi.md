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
| **429** | The admission control applicable to this route and deployment topology rejected the request. &#x60;error.code&#x60; is &#x60;quota_exceeded&#x60; for a team-attributed Team Quota such as &#x60;active_request_count&#x60;, &#x60;active_connection_count&#x60;, &#x60;api_requests&#x60;, or a traffic-byte rate, &#x60;identity_limit_exceeded&#x60; for an IdentityResourceGuard cardinality limit, or &#x60;rate_limited&#x60; for an aggregate overload guard. A given route does not necessarily use every control.  |  * Retry-After - Suggested delay in seconds when token-bucket or overload admission provides one; identity cardinality rejections may omit it <br>  |
| **503** | The fail-closed admission backend applicable to this route is unavailable. Depending on deployment topology, this is the region Team Quota policy or Redis path, or the public identity entrypoint\&#39;s shared overload-guard backend; a given route does not necessarily use both.  |  * Retry-After - Suggested retry delay in seconds <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
