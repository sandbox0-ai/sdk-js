# TenantApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**authRegionTokenPost**](TenantApi.md#authregiontokenpost) | **POST** /auth/region-token | Exchange a global user session for a region-scoped token |
| [**tenantActiveGet**](TenantApi.md#tenantactiveget) | **GET** /tenant/active | Resolve the active team and its routing information |



## authRegionTokenPost

> SuccessIssueRegionTokenResponse authRegionTokenPost(issueRegionTokenRequest)

Exchange a global user session for a region-scoped token

### Example

```ts
import {
  Configuration,
  TenantApi,
} from 'sandbox0';
import type { AuthRegionTokenPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TenantApi(config);

  const body = {
    // IssueRegionTokenRequest (optional)
    issueRegionTokenRequest: ...,
  } satisfies AuthRegionTokenPostRequest;

  try {
    const data = await api.authRegionTokenPost(body);
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
| **issueRegionTokenRequest** | [IssueRegionTokenRequest](IssueRegionTokenRequest.md) |  | [Optional] |

### Return type

[**SuccessIssueRegionTokenResponse**](SuccessIssueRegionTokenResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Region token issued |  -  |
| **400** | Invalid request |  -  |
| **401** | Unauthorized |  -  |
| **403** | Active team cannot be resolved |  -  |
| **409** | Active team is not routable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## tenantActiveGet

> SuccessActiveTeamResponse tenantActiveGet(teamId)

Resolve the active team and its routing information

### Example

```ts
import {
  Configuration,
  TenantApi,
} from 'sandbox0';
import type { TenantActiveGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TenantApi(config);

  const body = {
    // string (optional)
    teamId: teamId_example,
  } satisfies TenantActiveGetRequest;

  try {
    const data = await api.tenantActiveGet(body);
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
| **teamId** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**SuccessActiveTeamResponse**](SuccessActiveTeamResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Active team |  -  |
| **400** | No active team selected |  -  |
| **401** | Unauthorized |  -  |
| **403** | Team not accessible |  -  |
| **409** | Active team is not routable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

