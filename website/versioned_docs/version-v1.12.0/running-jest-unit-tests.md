---
id: version-v1.12.0-running-jest-unit-tests
title: Running Jest Unit Tests
original_id: running-jest-unit-tests
---

## Description

We're incrementally moving unit tests out of Meteor+Mocha and into pure Jest tests. Jest test files end in `.test.js` and can be anywhere in the Reaction codebase, ideally in the same folder and with the same base filename as the code being tested.

Jest tests are used for all of the GraphQL code.

### Prerequisites

Install `watchman` if you are on Mac OSX and you'd like to run `--watch` or `--watchAll` on tests (such as the `npm run test:unit:watch` command).

```sh
brew install watchman
```

## Run tests

To run tests:

```sh
npm run test:unit
```

## Run tests in watch mode

To run tests and rerun as you make changes to test files:

```sh
npm run test:unit:watch
```

## Run tests within a Docker container

You can use Docker Compose to run a local development container and run tests within it. This gives a more accurate picture of how production code running in a container will behave.

```sh
docker-compose run --rm reaction npm run test:unit
```

(This will also work with `:watch` suffix for watch mode.)
