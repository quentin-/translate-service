unit:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require should \
		--reporter spec \
		--harmony \
		--bail \
		api/*/test.js \
		lib/*/*/test.js

lint:
	node_modules/.bin/eslint api lib

.PHONY: lint unit
