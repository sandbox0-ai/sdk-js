# UsersApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**usersMeGet**](UsersApi.md#usersmeget) | **GET** /users/me | Get current user |
| [**usersMeIdentitiesGet**](UsersApi.md#usersmeidentitiesget) | **GET** /users/me/identities | List current user identities |
| [**usersMeIdentitiesIdDelete**](UsersApi.md#usersmeidentitiesiddelete) | **DELETE** /users/me/identities/{id} | Delete a user identity |
| [**usersMePut**](UsersApi.md#usersmeput) | **PUT** /users/me | Update current user |
| [**usersMeSshKeysGet**](UsersApi.md#usersmesshkeysget) | **GET** /users/me/ssh-keys | List current user SSH public keys |
| [**usersMeSshKeysIdDelete**](UsersApi.md#usersmesshkeysiddelete) | **DELETE** /users/me/ssh-keys/{id} | Delete a current user SSH public key |
| [**usersMeSshKeysPost**](UsersApi.md#usersmesshkeyspost) | **POST** /users/me/ssh-keys | Create a current user SSH public key |



## usersMeGet

> SuccessUserResponse usersMeGet()

Get current user

### Example

```ts
import {
  Configuration,
  UsersApi,
} from 'sandbox0';
import type { UsersMeGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsersApi(config);

  try {
    const data = await api.usersMeGet();
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

[**SuccessUserResponse**](SuccessUserResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Current user |  -  |
| **401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## usersMeIdentitiesGet

> SuccessIdentityListResponse usersMeIdentitiesGet()

List current user identities

### Example

```ts
import {
  Configuration,
  UsersApi,
} from 'sandbox0';
import type { UsersMeIdentitiesGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsersApi(config);

  try {
    const data = await api.usersMeIdentitiesGet();
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

[**SuccessIdentityListResponse**](SuccessIdentityListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Identities list |  -  |
| **401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## usersMeIdentitiesIdDelete

> SuccessMessageResponse usersMeIdentitiesIdDelete(id)

Delete a user identity

### Example

```ts
import {
  Configuration,
  UsersApi,
} from 'sandbox0';
import type { UsersMeIdentitiesIdDeleteRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsersApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies UsersMeIdentitiesIdDeleteRequest;

  try {
    const data = await api.usersMeIdentitiesIdDelete(body);
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
| **200** | Identity removed |  -  |
| **400** | Invalid request |  -  |
| **401** | Unauthorized |  -  |
| **404** | Identity not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## usersMePut

> SuccessUserResponse usersMePut(updateUserRequest)

Update current user

### Example

```ts
import {
  Configuration,
  UsersApi,
} from 'sandbox0';
import type { UsersMePutRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsersApi(config);

  const body = {
    // UpdateUserRequest
    updateUserRequest: ...,
  } satisfies UsersMePutRequest;

  try {
    const data = await api.usersMePut(body);
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
| **updateUserRequest** | [UpdateUserRequest](UpdateUserRequest.md) |  | |

### Return type

[**SuccessUserResponse**](SuccessUserResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Updated user |  -  |
| **400** | Invalid request |  -  |
| **401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## usersMeSshKeysGet

> SuccessSSHPublicKeyListResponse usersMeSshKeysGet()

List current user SSH public keys

### Example

```ts
import {
  Configuration,
  UsersApi,
} from 'sandbox0';
import type { UsersMeSshKeysGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsersApi(config);

  try {
    const data = await api.usersMeSshKeysGet();
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

[**SuccessSSHPublicKeyListResponse**](SuccessSSHPublicKeyListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | SSH public key list |  -  |
| **401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## usersMeSshKeysIdDelete

> SuccessMessageResponse usersMeSshKeysIdDelete(id)

Delete a current user SSH public key

### Example

```ts
import {
  Configuration,
  UsersApi,
} from 'sandbox0';
import type { UsersMeSshKeysIdDeleteRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsersApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies UsersMeSshKeysIdDeleteRequest;

  try {
    const data = await api.usersMeSshKeysIdDelete(body);
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
| **200** | SSH public key removed |  -  |
| **400** | Invalid request |  -  |
| **401** | Unauthorized |  -  |
| **404** | SSH public key not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## usersMeSshKeysPost

> SuccessSSHPublicKeyResponse usersMeSshKeysPost(createSSHPublicKeyRequest)

Create a current user SSH public key

### Example

```ts
import {
  Configuration,
  UsersApi,
} from 'sandbox0';
import type { UsersMeSshKeysPostRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsersApi(config);

  const body = {
    // CreateSSHPublicKeyRequest
    createSSHPublicKeyRequest: ...,
  } satisfies UsersMeSshKeysPostRequest;

  try {
    const data = await api.usersMeSshKeysPost(body);
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
| **createSSHPublicKeyRequest** | [CreateSSHPublicKeyRequest](CreateSSHPublicKeyRequest.md) |  | |

### Return type

[**SuccessSSHPublicKeyResponse**](SuccessSSHPublicKeyResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Created SSH public key |  -  |
| **400** | Invalid request |  -  |
| **401** | Unauthorized |  -  |
| **409** | SSH public key already exists |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

