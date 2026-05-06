.PHONY: apispec check build lint test-e2e set-version tag publish release install

# Version for publishing (usage: make publish v=0.1.0)
v ?=

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
	@npm run lint:e2e

# Set version in package.json
set-version:
ifndef v
	@echo "Error: version not specified. Usage: make set-version v=0.1.0"
	@exit 1
endif
	@echo "Setting version to $(v) in package.json..."
	@node -e "const fs=require('fs');const p=JSON.parse(fs.readFileSync('package.json'));p.version='$(v)';fs.writeFileSync('package.json',JSON.stringify(p,null,2)+'\n')"
	@echo "Version updated to $(v)"

# Create and push git tag
tag:
ifndef v
	@echo "Error: version not specified. Usage: make tag v=0.1.0"
	@exit 1
endif
	@echo "Creating and pushing tag v$(v)..."
	@git tag -a v$(v) -m "Release v$(v)"
	@git push origin v$(v)

# Publish to npm (requires NPM_TOKEN env var)
publish:
ifndef NPM_TOKEN
	@echo "Error: NPM_TOKEN not set. Get your token from https://www.npmjs.com/settings/tokens"
	@exit 1
endif
	@echo "Publishing to npm..."
	@npm install >/dev/null
	@npm run build
	@echo "//registry.npmjs.org/:_authToken=$(NPM_TOKEN)" > .npmrc
	@npm publish --access public
	@rm -f .npmrc
	@echo "Published successfully!"

# Full release workflow
release: check set-version tag
	@echo "Release v$(v) completed! CI will publish to npm."

# Create local tarball for installation without publishing
install: build
	@rm -f *.tgz
	@npm pack
	@echo ""
	@echo "Tarball created. Install in your project with:"
	@echo "  npm install $(shell pwd)/sandbox0-$(shell node -p "require('./package.json').version").tgz"
