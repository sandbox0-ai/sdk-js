.PHONY: apispec

# Generate JS/TS SDK code from OpenAPI spec
apispec:
	@printf "Generating JS/TS API spec code...\n"
	@npm install >/dev/null
	@npm run generate:apispec
