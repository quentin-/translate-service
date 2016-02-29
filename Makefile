
test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require should \
		--reporter spec \
		--harmony \
		--bail \
		api/*/test.js \
		lib/*/*/test.js

.PHONY: test
