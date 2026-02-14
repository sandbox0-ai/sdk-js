# HealthApi

All URIs are relative to *https://api.sandbox0.ai*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**healthzGet**](HealthApi.md#healthzget) | **GET** /healthz | Health check |
| [**metricsGet**](HealthApi.md#metricsget) | **GET** /metrics | Prometheus metrics |
| [**readyzGet**](HealthApi.md#readyzget) | **GET** /readyz | Readiness check |



## healthzGet

> SuccessHealthResponse healthzGet()

Health check

### Example

```ts
import {
  Configuration,
  HealthApi,
} from 'sandbox0';
import type { HealthzGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const api = new HealthApi();

  try {
    const data = await api.healthzGet();
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

[**SuccessHealthResponse**](SuccessHealthResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Service is healthy |  -  |
| **500** | Unhealthy |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## metricsGet

> string metricsGet()

Prometheus metrics

### Example

```ts
import {
  Configuration,
  HealthApi,
} from 'sandbox0';
import type { MetricsGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const api = new HealthApi();

  try {
    const data = await api.metricsGet();
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

**string**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/plain`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Metrics payload |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## readyzGet

> SuccessHealthResponse readyzGet()

Readiness check

### Example

```ts
import {
  Configuration,
  HealthApi,
} from 'sandbox0';
import type { ReadyzGetRequest } from 'sandbox0';

async function example() {
  console.log("🚀 Testing sandbox0 SDK...");
  const api = new HealthApi();

  try {
    const data = await api.readyzGet();
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

[**SuccessHealthResponse**](SuccessHealthResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Service is ready |  -  |
| **503** | Not ready |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

