# Javascript Code Test

Link to original [README](./__original__/README.md) and [code](./__original__/).

## :superhero: Getting started

### Pre-requisites

Node 20

### Setup the application

```shell
nvm use
npm install
cp .env.template .env # Copy the template file and set the variables
```

### Run the application

```shell
npm run dev
```

Once running, you can use Swagger to test the application at: http://localhost:3080/v1/api-docs/

You can also hit the /search endpoint directly with: http://localhost:3080/v1/search?author=frank&offset=0&limit=10

### Run the code quality tools

```shell
npm run lint # Check the codebase is linted correctly
npm run test # Run the unit tests
npm run coverage # Run the test coverage report
```

### example-client.mjs (changed to mjs from js)

I modified [example-client.mjs](./example-client.mjs) to use the new project setup. Make sure the application isn't running on port 3080; then run the following in your terminal:

```shell
node ./example-client.mjs

# OR
npm run test-script
```

It will start up the server, and make a request to the paginated /search endpoint. The output should look something like:

```shell
❯ node ./example-client.js
Starting development server...
Attempting to fetch data (try 1/10)...
Server not ready, retrying in 3s...
Attempting to fetch data (try 2/10)...
Server Response: {
  data: [
    {
      title: 'Dune',
      author: 'Frank Herbert',
      publisher: 'Chilton Books',
      publish_date: '1965-08-01'
    },
    {
        ...
  ],
  pagination: { limit: 10, offset: 0 }
}
```

## :classical_building: Work undertaken

Based on the brief to improve the existing [BookSearchApiClient](./__original__/BookSearchApiClient.js); the codebase has been updated to run as an Express application using TypeScript. The main areas of note are:

- [server.ts](./src/server.ts) - this is the entry point, sets up the server making use of Helmet, adding tracing to requests, setting an API version on the routes, and setting up Swagger
- [routes.ts](./src/routes.ts) - defines the routes of the application; GET `/search` and GET `/healthcheck`
- The `/search` endpoint has validation to ensure the correct query parameters are provided. As the endpoint is paginated, there is a limit on how many items can be fetched at once
- The handlers for each route are all defined under `/src/handlers`
- The search handler makes use of an adapter to fetch data from the external API, abstracting the specific logic

## :ferris_wheel: Routes

### GET /healthcheck

http://localhost:3080/v1/healthcheck

This is a simple route just to confirm the application is running. Likely to be used for a ping monitor in production to check the application is running correctly.

### GET /search

http://localhost:3080/v1/search

This endpoint allows you to search for books. Behind the scenes this is making a call to an external API to fetch books based on the parameters.

#### Expected query parameters

As part of this request, you will need to send the following query parameters:

| Query Parameter Name | Type    | Validation              |
| -------------------- | ------- | ----------------------- |
| author               | string  | Is present              |
| limit                | integer | Has to be 10, 20, or 30 |
| offset               | integer | Is present              |

> [!NOTE]
> If these parameters are not provided then a 400 Bad Request will be returned

### Architecture choice for /search endpoint

#### Why was GET chosen?

**Idempotent:** Repeated requests with the same parameters won’t change the server state
**Cacheable:** Allows client-side and CDN caching for better performance
**Follows REST principles:** It is retrieving data and not modifying anything
**Cleaner URLs:** Query parameters make it easy to construct and share search URLs

#### Why was a single /search endpoint created and not multiple?

**Flexibility:** I could have created separate search endpoints for the different filter types, i.e. `/search/{type}`; where `type` could be `author | publisher` etc. However it was decided to keep as a single endpoint for flexibility and to handle searches based on either or both parameters.
**Scalability:** As the application grows, all of the search logic can stay in 1 endpoint and the search criteria extended with additional query parameters rather than have to create a new endpoint each time.
**Consistency:** The API remains consistent with 1 endpoint and consumers don't need to use multiple endpoints to access similar data. Equally splitting searches by type would likely make it harder to combine search parameters.

#### Futureproof?

Admittedly this is all somewhat academic; it is not known what the other endpoints of the external API might look like and implementing this for real might bring up more considerations. It is simpler to start with a single endpoint and break it out into multiple later if needed.

## :thinking: Areas considered in this task

- **Documentation:** Used Swagger UI to test API
- **Code quality checks:** There are a number of unit tests in place; along with linting (ESLint and Prettier) and Coverage reporting
- **CI/CD:** GitHub Action created to run code quality checks on feature branches and PR creation
- **Monitoring:** Added a logger and a unique request ID to all requests to be able to trace requests
- **Environment variables:** Used a `.env` file to set variables, used for Pino log levels
- **Endpoint validation:** Validation is set against the POST `/search` endpoint to restrict what can be fetched

## :book: Extensibility based on requirements

### 1. How could you easily add other book seller APIs in the the future

Using an adapter pattern, the logic to fetch the books from the external book client has been contained within [src/adapters/bookSearchClient/bookSearchClient.ts](./src/adapters/bookSearchClient/bookSearchClient.ts).
The search handler and endpoint is abstracted away from the external API, so if the API was to switch to a different seller API then there would be no contract change for the consumers of this API.

#### Further considerations

- At the moment, to switch to a different API, you would write a new adapter and change the code in [src/handlers/search.ts](./src/handlers/search.ts) to use the new adapter. However you might want to switch using different techniques such as:

  - You could write all adapters into the handler in a switch statement, and pass in a flag at runtime to indicate which you want to use (potentially as a header passed in by the consumer, or similar)
  - I've made use of versioning (`/v1/search`); you could create a new version `v2` to distinguish the change
  - You could handle the switching of seller APIs by environment variable instead. Allowing you to change the logic quickly without code changes and potentially helping A/B test or slowly migrate to a new seller API

### 2. How would you manage differences in response payloads between different APIs without needing to make future changes to whatever code you have in example-client.js

Once the data has been returned in [src/adapters/bookSearchClient/bookSearchClient.ts](./src/adapters/bookSearchClient/bookSearchClient.ts), it parses the response into a common API response that is defined as the TypeScript `type` [SearchResult](./src/types/search.ts). In the current example API it maps the response to the [SearchResult](./src/types/search.ts) type as shown in [bookClientParser](./src/lib/parsers/bookClientParser.ts).
If you created a new adapter to access a new API, another parser would likely be required to convert their format to this APIs standard; however this small change would maintain consistency in this API and not affect consumers.

### 3. How would you implement different query types for example: by publisher, by year published etc

In the current scenario; more query parameters could be added to the `GET` request as required wihout making a breaking change. This woud also allow for combining the filters to narrow down searches for the consumer. It would be easy to add `publisher` for example i.e.:

```shell
?author=frank&publisher=penguin
```

### 4. How your code would be tested

There is admittedly not full test coverage in this demo API, so further tests are required to cover all parts of the system. The current unit tests can be run with the following commands:

```shell
npm run test # Run the unit tests
npm run coverage # Run the test coverage report
```

These are also linked up to the GitHub workflow to allow automatic checking as part of a PR creation.

> [!INFO]
> I chose to use `Vitest` instead of `Jest` for the unit tests

#### Initial e2e tests also added

I've created an [e2e/](./e2e/) folder that contains some basic end to end tests too. There is a [README](./e2e/README.md) that explains the setup. The app needs to be running locally and then the e2e tests can be run against the application.

> [!WARNING]
> There's something odd going on with `nock` occasionally and it decides that the route isn't captured and returns a 500 response and then causes the e2e tests to fail. It seems a bit tempermental, I wonder down to the filtering logic in place.
> In a real system, the actual API should be in place so this wouldn't be an issue

## :construction: What's still needed to be done

- Adding an API Key to the API to restrict access
- Potentially adding a header to identify the consumer; i.e. `X-Consumer`
- Finishing off the tests
- Completing the CI pipeline process for merging to `main` and releasing the API
- Infrastructure as code logic, at the moment this is a locally running Express app. This could be containerised with Docker or run as part of a Lambda instead
- Handling XML and JSON data responses
- The external API is mocked using `nock` this needs to be replaced with a real API
- I've added a few `TODO:` comments in the code for areas that need extra work
