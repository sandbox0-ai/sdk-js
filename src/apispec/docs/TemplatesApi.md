# TemplatesApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1TemplatesFromSandboxPost**](TemplatesApi.md#apiv1templatesfromsandboxpost) | **POST** /api/v1/templates/from-sandbox | Create template from sandbox |
| [**apiV1TemplatesGet**](TemplatesApi.md#apiv1templatesget) | **GET** /api/v1/templates | List templates |
| [**apiV1TemplatesIdDelete**](TemplatesApi.md#apiv1templatesiddelete) | **DELETE** /api/v1/templates/{id} | Delete template |
| [**apiV1TemplatesIdGet**](TemplatesApi.md#apiv1templatesidget) | **GET** /api/v1/templates/{id} | Get template |
| [**apiV1TemplatesIdPut**](TemplatesApi.md#apiv1templatesidput) | **PUT** /api/v1/templates/{id} | Update template |
| [**apiV1TemplatesPost**](TemplatesApi.md#apiv1templatespost) | **POST** /api/v1/templates | Create template |



## apiV1TemplatesFromSandboxPost

> SuccessTemplateResponse apiV1TemplatesFromSandboxPost(templateFromSandboxCreateRequest, idempotencyKey)

Create template from sandbox

Asynchronously captures the sandbox\&#39;s writable root filesystem, publishes it to the Sandbox0-configured team registry, and creates a digest-pinned template. The capture point is reported by &#x60;status.creation.capturedAt&#x60;, not by acceptance of this request. Keep the source sandbox available and avoid rootfs writes until capture completes. Poll the returned template with &#x60;GET /api/v1/templates/{id}&#x60; until &#x60;status.creation.state&#x60; is &#x60;ready&#x60; or &#x60;failed&#x60;. The caller needs both &#x60;template:create&#x60; and &#x60;sandbox:read&#x60; permissions.

### Example

```ts
import {
  Configuration,
  TemplatesApi,
} from 'sandbox0';
import type { ApiV1TemplatesFromSandboxPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TemplatesApi(config);

  const body = {
    // TemplateFromSandboxCreateRequest
    templateFromSandboxCreateRequest: ...,
    // string | Optional key for retrying creation without starting a duplicate image build. (optional)
    idempotencyKey: idempotencyKey_example,
  } satisfies ApiV1TemplatesFromSandboxPostRequest;

  try {
    const data = await api.apiV1TemplatesFromSandboxPost(body);
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
| **templateFromSandboxCreateRequest** | [TemplateFromSandboxCreateRequest](TemplateFromSandboxCreateRequest.md) |  | |
| **idempotencyKey** | `string` | Optional key for retrying creation without starting a duplicate image build. | [Optional] [Defaults to `undefined`] |

### Return type

[**SuccessTemplateResponse**](SuccessTemplateResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **202** | Template creation accepted |  * Location - URL of the accepted template resource. <br>  * Retry-After - Suggested seconds before polling a template that is still creating. <br>  |
| **400** | Invalid template ID, sandbox ID, overrides, or idempotency key |  -  |
| **401** | Unauthorized |  -  |
| **403** | Missing template:create or sandbox:read permission, or source sandbox access is forbidden |  -  |
| **404** | Source sandbox not found |  -  |
| **409** | Template ID or idempotency key conflict, or source sandbox is not captureable |  -  |
| **500** | Server error |  -  |
| **503** | Source data plane or template image build capability is unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TemplatesGet

> SuccessTemplateListResponse apiV1TemplatesGet()

List templates

### Example

```ts
import {
  Configuration,
  TemplatesApi,
} from 'sandbox0';
import type { ApiV1TemplatesGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TemplatesApi(config);

  try {
    const data = await api.apiV1TemplatesGet();
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

[**SuccessTemplateListResponse**](SuccessTemplateListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Templates list |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TemplatesIdDelete

> SuccessMessageResponse apiV1TemplatesIdDelete(id)

Delete template

### Example

```ts
import {
  Configuration,
  TemplatesApi,
} from 'sandbox0';
import type { ApiV1TemplatesIdDeleteRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TemplatesApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiV1TemplatesIdDeleteRequest;

  try {
    const data = await api.apiV1TemplatesIdDelete(body);
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
| **200** | Template deleted |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TemplatesIdGet

> SuccessTemplateResponse apiV1TemplatesIdGet(id)

Get template

### Example

```ts
import {
  Configuration,
  TemplatesApi,
} from 'sandbox0';
import type { ApiV1TemplatesIdGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TemplatesApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiV1TemplatesIdGetRequest;

  try {
    const data = await api.apiV1TemplatesIdGet(body);
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

[**SuccessTemplateResponse**](SuccessTemplateResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Template |  -  |
| **404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TemplatesIdPut

> SuccessTemplateResponse apiV1TemplatesIdPut(id, templateUpdateRequest)

Update template

### Example

```ts
import {
  Configuration,
  TemplatesApi,
} from 'sandbox0';
import type { ApiV1TemplatesIdPutRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TemplatesApi(config);

  const body = {
    // string
    id: id_example,
    // TemplateUpdateRequest
    templateUpdateRequest: ...,
  } satisfies ApiV1TemplatesIdPutRequest;

  try {
    const data = await api.apiV1TemplatesIdPut(body);
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
| **templateUpdateRequest** | [TemplateUpdateRequest](TemplateUpdateRequest.md) |  | |

### Return type

[**SuccessTemplateResponse**](SuccessTemplateResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Template updated |  -  |
| **409** | The template is still creating or its creation failed |  * Retry-After - Suggested retry delay in seconds when template creation is still in progress <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TemplatesPost

> SuccessTemplateResponse apiV1TemplatesPost(templateCreateRequest)

Create template

### Example

```ts
import {
  Configuration,
  TemplatesApi,
} from 'sandbox0';
import type { ApiV1TemplatesPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TemplatesApi(config);

  const body = {
    // TemplateCreateRequest
    templateCreateRequest: ...,
  } satisfies ApiV1TemplatesPostRequest;

  try {
    const data = await api.apiV1TemplatesPost(body);
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
| **templateCreateRequest** | [TemplateCreateRequest](TemplateCreateRequest.md) |  | |

### Return type

[**SuccessTemplateResponse**](SuccessTemplateResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Template created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
