.PHONY: apispec check build lint test-e2e

# E2E tests (requires S0_E2E_BASE_URL and S0_E2E_PASSWORD env vars)
test-e2e:
	@printf "Running E2E tests...\n"
	@npm install >/dev/null
	@npm run test:e2e

# Generate JS/TS SDK code from OpenAPI spec
apispec:
	@printf "Generating JS/TS API spec code...\n"
	@npm install >/dev/null
	@npm run generate:apispec

check: lint lint-examples build

build:
	@printf "Building sdk-js...\n"
	@npm install >/dev/null
	@npm run build

lint:
	@printf "Type-checking sdk-js...\n"
	@npm install >/dev/null
	@npm run lint

lint-examples:
	@printf "Type-checking sdk-js examples...\n"
	@npm install >/dev/null
	@npm run lint:examples
