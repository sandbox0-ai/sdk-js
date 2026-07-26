# UsageApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1UsageWindowsGet**](UsageApi.md#apiv1usagewindowsget) | **GET** /api/v1/usage/windows | List usage windows for the current team |



## apiV1UsageWindowsGet

> SuccessUsageWindowsResponse apiV1UsageWindowsGet(cursor, limit, windowType)

List usage windows for the current team

Returns immutable, closed usage windows belonging to the authenticated team. The opaque cursor can be retained and reused to incrementally import newly recorded windows. 

### Example

```ts
import {
  Configuration,
  UsageApi,
} from 'sandbox0';
import type { ApiV1UsageWindowsGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsageApi(config);

  const body = {
    // string | Opaque pagination cursor returned by a previous response. (optional)
    cursor: cursor_example,
    // number | Maximum number of windows to return. Values above 1000 are capped. (optional)
    limit: 56,
    // string | Return only windows with this exact usage type. (optional)
    windowType: windowType_example,
  } satisfies ApiV1UsageWindowsGetRequest;

  try {
    const data = await api.apiV1UsageWindowsGet(body);
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
| **cursor** | `string` | Opaque pagination cursor returned by a previous response. | [Optional] [Defaults to `undefined`] |
| **limit** | `number` | Maximum number of windows to return. Values above 1000 are capped. | [Optional] [Defaults to `100`] |
| **windowType** | `string` | Return only windows with this exact usage type. | [Optional] [Defaults to `undefined`] |

### Return type

[**SuccessUsageWindowsResponse**](SuccessUsageWindowsResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Team usage windows |  -  |
| **400** | Invalid cursor, limit, or team context |  -  |
| **401** | Missing or invalid authentication |  -  |
| **403** | Missing usage read permission |  -  |
| **503** | Usage query backend is unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

