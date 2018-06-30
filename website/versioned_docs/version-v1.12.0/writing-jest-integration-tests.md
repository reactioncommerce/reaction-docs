---
id: version-v1.12.0-writing-jest-integration-tests
title: Writing Jest Integration Tests
original_id: writing-jest-integration-tests
---
    
Jest integration tests are written in almost the same way as unit tests, so you should read and understand the [Writing Jest Unit tests](writing-jest-unit-tests.md) article before moving on to this one.

These are the key differences:
- Integration tests are also named with a `.test.js` suffix, but they all live in the `/tests` root folder.
- Integration tests can write some initial test data into an in-memory MongoDB store, allowing them to test database queries without mocking them.
- Integration tests can send actual GraphQL requests to a server that is the same as the real server and is spun up temporarily while tests are running.

## GraphQL Integration Tests

GraphQL integration tests are useful for testing things like

- queries involving multiple resolvers
- response pagination
- whether mutations properly affect the MongoDB collections
- the effect of complex permission rules on query results

### Writing GraphQL Tests

The folder and file structure in `/tests` should match as much as possible the graphql plugin folder structure.

Prior to running the tests in each file, initialize a server, in-memory database, and any collection data you need. Then stop the server when done. The general pattern is something like this:

```js
import GraphTester from "../GraphTester";

let tester;
beforeAll(async () => {
  tester = new GraphTester();
  await tester.start();
});

afterAll(() => tester.stop());

test("something", async () => {
  // (1) use tester.collections to write to MongoDB collections to set up initial data state
  // (2) execute a GraphQL query or mutation using tester.query()() or tester.mutation()()
  // (3) verify the response is as expected and/or verify that the collection data has been changed
  // (4) optionally reset the database if there is a chance it will conflict with the next test in this file
});
```

### Further Reading

- The MongoDB collections are simulated in-memory collections, implemented using [mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server).
- The `query`, `mutation`, and `subscription` properties of the `GraphTester` instance are wrappers around the methods of the same name provided by the [graphql.js](https://github.com/f/graphql.js) package.
