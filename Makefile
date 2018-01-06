.PHONY: help build publish

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

build: index.js ## Build index.js
	yarn run build
	@echo "Built index.js"

publish: build
	git add -A
	git commit -m "Publish plugin"
	git push
	npm publish
