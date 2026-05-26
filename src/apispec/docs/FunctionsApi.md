# FunctionsApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1SandboxesIdFunctionsNameInvokePost**](FunctionsApi.md#apiv1sandboxesidfunctionsnameinvokepost) | **POST** /api/v1/sandboxes/{id}/functions/{name}/invoke | Invoke a sandbox function |



## apiV1SandboxesIdFunctionsNameInvokePost

> SuccessFunctionInvokeResponse apiV1SandboxesIdFunctionsNameInvokePost(id, name, functionInvokeRequest)

Invoke a sandbox function

Invokes /workspace/functions/{name}.py through the Python function runtime. The default handler is &#x60;handler&#x60;.

### Example

```ts
import {
  Configuration,
  FunctionsApi,
} from 'sandbox0';
import type { ApiV1SandboxesIdFunctionsNameInvokePostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FunctionsApi(config);

  const body = {
    // string
    id: id_example,
    // string
    name: name_example,
    // FunctionInvokeRequest
    functionInvokeRequest: ...,
  } satisfies ApiV1SandboxesIdFunctionsNameInvokePostRequest;

  try {
    const data = await api.apiV1SandboxesIdFunctionsNameInvokePost(body);
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
| **name** | `string` |  | [Defaults to `undefined`] |
| **functionInvokeRequest** | [FunctionInvokeRequest](FunctionInvokeRequest.md) |  | |

### Return type

[**SuccessFunctionInvokeResponse**](SuccessFunctionInvokeResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Function invocation completed |  -  |
| **400** | Invalid invocation request |  -  |
| **404** | Function not found |  -  |
| **500** | Function invocation failed |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

