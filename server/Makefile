TSC = npm run build
ESLINT = npm run lint
TEST = npm test
DOC = npm run doc


all: lint coverage doc build


lint:
	$(ESLINT)


test:
	$(TEST)


coverage:
	$(TEST) --coverage


doc:
	$(DOC)


build:
	$(TSC)


clean:
	rm -rf dist


.PHONY: all lint test coverage doc buid clean
