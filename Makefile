check: lint test

lint:
	./node_modules/.bin/jshint *.js lib test

test:
	./node_modules/.bin/mocha --recursive \
		--require should \
		--require test/replay \
		--require isomorphic-fetch \
		--require localenv

.PHONY: check lint test
