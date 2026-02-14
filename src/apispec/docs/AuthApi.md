# AuthApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**authChangePasswordPost**](AuthApi.md#authchangepasswordpost) | **POST** /auth/change-password | Change password |
| [**authLoginPost**](AuthApi.md#authloginpost) | **POST** /auth/login | Login with email and password |
| [**authLogoutPost**](AuthApi.md#authlogoutpost) | **POST** /auth/logout | Logout |
| [**authOidcProviderCallbackGet**](AuthApi.md#authoidcprovidercallbackget) | **GET** /auth/oidc/{provider}/callback | OIDC callback |
| [**authOidcProviderLoginGet**](AuthApi.md#authoidcproviderloginget) | **GET** /auth/oidc/{provider}/login | Initiate OIDC login |
| [**authProvidersGet**](AuthApi.md#authprovidersget) | **GET** /auth/providers | Get available auth providers |
| [**authRefreshPost**](AuthApi.md#authrefreshpost) | **POST** /auth/refresh | Refresh access token |
| [**authRegisterPost**](AuthApi.md#authregisterpost) | **POST** /auth/register | Register a new user |



## authChangePasswordPost

> SuccessMessageResponse authChangePasswordPost(changePasswordRequest)

Change password

### Example

```ts
import {
  Configuration,
  AuthApi,
} from 'sandbox0';
import type { AuthChangePasswordPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AuthApi(config);

  const body = {
    // ChangePasswordRequest
    changePasswordRequest: ...,
  } satisfies AuthChangePasswordPostRequest;

  try {
    const data = await api.authChangePasswordPost(body);
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
| **changePasswordRequest** | [ChangePasswordRequest](ChangePasswordRequest.md) |  | |

### Return type

[**SuccessMessageResponse**](SuccessMessageResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Password changed |  -  |
| **400** | Invalid request |  -  |
| **401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## authLoginPost

> SuccessLoginResponse authLoginPost(loginRequest)

Login with email and password

### Example

```ts
import {
  Configuration,
  AuthApi,
} from 'sandbox0';
import type { AuthLoginPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const api = new AuthApi();

  const body = {
    // LoginRequest
    loginRequest: ...,
  } satisfies AuthLoginPostRequest;

  try {
    const data = await api.authLoginPost(body);
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
| **loginRequest** | [LoginRequest](LoginRequest.md) |  | |

### Return type

[**SuccessLoginResponse**](SuccessLoginResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Login successful |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **400** | Invalid request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## authLogoutPost

> SuccessMessageResponse authLogoutPost()

Logout

### Example

```ts
import {
  Configuration,
  AuthApi,
} from 'sandbox0';
import type { AuthLogoutPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AuthApi(config);

  try {
    const data = await api.authLogoutPost();
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

[**SuccessMessageResponse**](SuccessMessageResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Logged out |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## authOidcProviderCallbackGet

> SuccessLoginResponse authOidcProviderCallbackGet(provider, code, state)

OIDC callback

### Example

```ts
import {
  Configuration,
  AuthApi,
} from 'sandbox0';
import type { AuthOidcProviderCallbackGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const api = new AuthApi();

  const body = {
    // string
    provider: provider_example,
    // string
    code: code_example,
    // string
    state: state_example,
  } satisfies AuthOidcProviderCallbackGetRequest;

  try {
    const data = await api.authOidcProviderCallbackGet(body);
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
| **provider** | `string` |  | [Defaults to `undefined`] |
| **code** | `string` |  | [Defaults to `undefined`] |
| **state** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SuccessLoginResponse**](SuccessLoginResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Tokens issued |  -  |
| **400** | Invalid request |  -  |
| **401** | OIDC authorization failed |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## authOidcProviderLoginGet

> authOidcProviderLoginGet(provider, returnUrl)

Initiate OIDC login

### Example

```ts
import {
  Configuration,
  AuthApi,
} from 'sandbox0';
import type { AuthOidcProviderLoginGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const api = new AuthApi();

  const body = {
    // string
    provider: provider_example,
    // string (optional)
    returnUrl: returnUrl_example,
  } satisfies AuthOidcProviderLoginGetRequest;

  try {
    const data = await api.authOidcProviderLoginGet(body);
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
| **provider** | `string` |  | [Defaults to `undefined`] |
| **returnUrl** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **302** | Redirect to OIDC provider |  -  |
| **400** | Invalid request |  -  |
| **404** | Provider not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## authProvidersGet

> SuccessAuthProvidersResponse authProvidersGet()

Get available auth providers

### Example

```ts
import {
  Configuration,
  AuthApi,
} from 'sandbox0';
import type { AuthProvidersGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const api = new AuthApi();

  try {
    const data = await api.authProvidersGet();
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

[**SuccessAuthProvidersResponse**](SuccessAuthProvidersResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Providers list |  -  |
| **500** | Server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## authRefreshPost

> SuccessLoginResponse authRefreshPost(refreshRequest)

Refresh access token

### Example

```ts
import {
  Configuration,
  AuthApi,
} from 'sandbox0';
import type { AuthRefreshPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const api = new AuthApi();

  const body = {
    // RefreshRequest
    refreshRequest: ...,
  } satisfies AuthRefreshPostRequest;

  try {
    const data = await api.authRefreshPost(body);
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
| **refreshRequest** | [RefreshRequest](RefreshRequest.md) |  | |

### Return type

[**SuccessLoginResponse**](SuccessLoginResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Token refreshed |  -  |
| **400** | Invalid request |  -  |
| **401** | Invalid refresh token |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## authRegisterPost

> SuccessLoginResponse authRegisterPost(registerRequest)

Register a new user

### Example

```ts
import {
  Configuration,
  AuthApi,
} from 'sandbox0';
import type { AuthRegisterPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const api = new AuthApi();

  const body = {
    // RegisterRequest
    registerRequest: ...,
  } satisfies AuthRegisterPostRequest;

  try {
    const data = await api.authRegisterPost(body);
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
| **registerRequest** | [RegisterRequest](RegisterRequest.md) |  | |

### Return type

[**SuccessLoginResponse**](SuccessLoginResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Registered |  -  |
| **400** | Invalid request |  -  |
| **403** | Registration disabled |  -  |
| **409** | Email already exists |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

