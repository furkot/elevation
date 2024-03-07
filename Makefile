check: lint test

lint:
	./node_modules/.bin/jshint *.js lib test

test:
	node --test \
	  --no-experimental-fetch \
		--require should \
		--require ./test/replay/index.js \
		--require isomorphic-fetch

.PHONY: check lint test
