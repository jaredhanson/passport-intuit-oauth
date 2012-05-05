NODE = node
TEST = ./node_modules/.bin/vows
TESTS ?= test/*-test.js

test:
	@NODE_ENV=test NODE_PATH=lib $(TEST) $(TEST_FLAGS) $(TESTS)

docs: docs/api.html

docs/api.html: lib/passport-intuit-oauth/*.js
	dox \
		--title Passport-Intuit-OAuth \
		--desc "Intuit (OAuth) authentication strategy for Passport" \
		$(shell find lib/passport-intuit-oauth/* -type f) > $@

docclean:
	rm -f docs/*.{1,html}

.PHONY: test docs docclean
