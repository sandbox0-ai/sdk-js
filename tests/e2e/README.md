# E2E tests

E2E tests are explicit smoke tests against a real Sandbox0 region. They are not
part of `npm test`.

## Environment

All suites accept these Sandbox0 variables:

```sh
export SANDBOX0_TOKEN=...
export SANDBOX0_BASE_URL=https://ali-ue1.sandbox0.ai
export SANDBOX0_TEMPLATE=default
```

The token should belong to a disposable test team. The harness records the
sandbox list before each test and deletes sandboxes created during the run.

Framework adapter suites may need additional provider credentials. The Eve suite
uses an OpenAI-compatible model provider:

```sh
export S0_EVE_E2E_MODEL_API_KEY=...
export S0_EVE_E2E_MODEL_BASE_URL=https://api.example.com/v1
export S0_EVE_E2E_MODEL_ID=...
```

For local Kimi testing, `KIMI_API_KEY`, `KIMI_API_HOST`, and `KIMI_MODEL` are
also recognized.

## Commands

```sh
npm run test:e2e:sdk
npm run test:e2e:eve
npm run test:e2e:frameworks
```

`npm run test:e2e:eve` builds local tarballs for `sandbox0` and `@sandbox0/eve`,
creates a temporary Eve app from `packages/eve/e2e/fixtures/basic`, installs its
dependencies, starts `eve start`, calls the app through `eve/client`, verifies
the Sandbox0-backed sandbox result, and cleans up newly created sandboxes.
