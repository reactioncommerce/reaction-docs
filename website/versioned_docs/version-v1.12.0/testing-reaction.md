---
id: version-v1.12.0-testing-reaction
title: Testing
original_id: testing-reaction
---

Testing Reaction breaks down into two broad categories:

- Manual or automated acceptance testing
- Automated code tests

The automated code tests category can be further divided into three main types:

- Jest unit tests
- Jest integration tests
- Mocha integration tests with Meteor dependencies

The Mocha integration tests are gradually being converted to Jest, either unit or integration tests as appropriate.

The aim is to have full test coverage with Jest tests.

## Unit vs. Integration

Unit tests simulate all possible outputs of a single function or component, given various inputs. They mock all external function calls in order to achieve a pure test of only that one function's logic.

Integration tests check to make sure that various functions or components are working together properly.

For example, if you write a GraphQL `shop` resolver and a `tags` resolver, each of those must have a unit test that determines whether the shop or tags list, respectively, is correctly returned. But assuming that a shop has a `tags` field, your `shop` unit test will be mocking or otherwise ignoring the output of the `tags` resolver. To ensure that the two resolvers work together to produce the correct `shop.tags` field, you need an integration test.

The different between a unit test and an integration test is not always clear cut. You might choose to test two functions together but still mock all other functions that they call. This is technically an integration test, but might be best written in a unit testing pattern.

For this reason, think of the terms "unit" and "integration" more as ends of a spectrum, where the "unit" end mocks everything and tests in complete isolation while the "integration" end mocks nothing and is essentially like running the app itself.

In practice, in the Reaction codebase, the primary distinction is that integration tests are all written in the `/tests` folder and can make use of a fake, in-memory version of MongoDB, while unit tests have no mock database and are written in files throughout the code, with names similar to the name of the file they test.

NOTE: For now, there are also some Meteor integration tests, which are located throughout the code, have the `.app-test.js` extension, and do have access to the full Meteor environemnt, including MongoDB, while running.

## When To Run Tests

- If you are changing code and submitting a pull request, you should run all tests on your machine prior to submitting the pull request for review. Use the `reaction test` or `npm test` command to do this.
- For all pull requests, CircleCI automatically runs all unit and integration tests and will not allow merging until they all pass.

## Further Reading

For Jest, see the following:
- [Running Jest Unit Tests](running-jest-unit-tests.md)
- [Running Jest Integration Tests](running-jest-integration-tests.md)
- [Writing Jest Unit tests](writing-jest-unit-tests.md)
- [Writing Jest Integration Tests](writing-jest-integration-tests.md)
- [Writing Jest Tests for React Components](react-testing.md)
- [Creating Test Data](creating-test-data.md)
- [Jest Tips](jest-tips.md)
- [The official Jest documentation](https://facebook.github.io/jest/)

For Mocha/Meteor, see the following:
- [Creating Test Data for Meteor Tests](creating-test-data-for-meteor-tests.md)
- [The official Meteor testing documentation](https://guide.meteor.com/testing.html)

For acceptance testing, see the [Acceptance Testing](acceptance-testing.md) section.
