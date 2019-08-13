tests-unit:
	yarn test

tests-integration:
	echo "Not implemented"

deploy:
	sls deploy --stage $(stage)

install:
	yarn

start:
	yarn build
	yarn start
