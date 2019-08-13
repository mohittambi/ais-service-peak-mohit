# ais-service-peak-mohit
Maintained by: mohit tambi
Contact: some.guy@peak.ai

#### Service type: http

## Running locally
- `$ make run-graphql tenant=yourtenant stage=latest` will run a GraphQL server - when running your user interface/client application locally, ensure you override the `APPSYNC_ENDPOINT` env var with `http://localhost:8970`, or your chosen port.

## Branching and Github workflow
[Please read here](https://peak-bi.atlassian.net/wiki/spaces/PE/pages/723681318/Github+Workflow+Peak).

## Deploying
- Entire service: `$ make deploy stage=latest`.
- GraphQL schema: `$ make graphql-deploy stage=latest`.

## Unit tests
- Run unit tests: `$ make tests-unit`.
- Run integration tests: `$ make tests-integration`.


## Directory structure
```
graphql <- graphql config (local and appsync, shared)
src/ <- main service code
  deliveries/ <- writing responses to a protocol
    graphql/ <- for testing locally
    lambda/ <- for appsync/production
  entities/ <- entities/models/domain objects
  repository/ <- collection of entities
  usecases/ <- business logic
```

## Architecture
This service vaguely follows Uncle Bobs good clean architecture. The crux of this approach is to decouple business logic from 'details' such as http, lambda, dynamodb, s3, sns, etc.

### Deliveries
Deliveries simply translate an input, to our business logic, and shield our business logic from outside details. For example, you would have a Lambda delivery which extracts the variables our business logic requires, and passes those variables into the usecase. This means that this very thin layer, means our business logic could be called by anything.

### Usecases
This is where your core business logic lives. Usecases call repositories and services, and are only called by deliveries, or other usecases.

### Repositories
Repositories are used to abstract database, or data source technologies. Repositories may make DynamoDB queries using [Jedlik](https://github.com/PeakBI/jedlik) entities, or a repository may interface an S3 bucket for example.

### Services
Are used to interact with other services, preferably via [Service Discovery](https://github.com/PeakBI/ais-service-discovery).

### Entities
All data is mapped into entities, these are used to hold our data in objects, which we can utilise within our repositories.

## Domains managed by: Serverless Domain Manager
- [Docs](https://github.com/amplify-education/serverless-domain-manager)
- [Blog](https://serverless.com/blog/api-gateway-multiple-services/)


This plugin is used to map multiple serverless services to the same domain. It adds a base-path mapping for the services APIGateway REST API to the chosen domain.

It is configured in the `custom.customDomain` section of `serverless.yml`:

- `domainName` is the domain to deploy to (e.g. `api.dev.peak.ai`) - this is configured in the cloudformation stack and available to the build as an env variable.
- `basePath` is the path that the service will be available under on the given domain. So a` basePath` of `my-service` would be available under `api.dev.peak.ai/my-service`. A function with a http event with the path of `/example` would be available under `api.dev.peak.ai/my-service/example`.

N.B. This plugin is only required for services that use HTTP events. If the service doesn't use them feel free to uninstall. (The service may not even deploy if you use this plugin without using HTTP). You should also remove the domain options from the pipeline.yml file.

## Integration with Authentication service
- [Post](https://forum.serverless.com/t/custom-authorizer-arn-reference/3030/8)

We have an authentication service, which can be used to authenticate http endpoints rather than adding auth functions to each service. To use the authentication service to an endpoint, set `functions.{function}.events.http.authorizer.arn` to the arn exported by the authentication service.

e.g. to use the combinedAuth function from the auth service:

```yaml
functions:
  myFunction:
    ...
    events:
      https:
        ...
        authorizer:
          arn: ${cf:ais-service-authentication-${opt:stage}.CombinedAuthLambdaFunctionQualifiedArn}
```
