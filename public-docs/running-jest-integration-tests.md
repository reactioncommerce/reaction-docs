---
id: running-jest-integration-tests
title: Running Jest Integration Tests
---

## Description

Jest integration test files end in `.test.js` and are all located in the `/tests` folder.

### Prerequisites

Install `watchman` if you are on Mac OSX and you'd like to run `--watch` or `--watchAll` on tests (such as the `npm run test:integration:watch` command).

```sh
brew install watchman
```

## Run tests

To run tests:

```sh
npm run test:integration
```

## Run tests in watch mode

To run tests and rerun as you make changes to test files:

```sh
npm run test:integration:watch
```

## Run tests within a Docker container

You can use Docker Compose to run a local development container and run tests within it. This gives a more accurate picture of how production code running in a container will behave.

```sh
docker-compose run --rm reaction npm run test:integration
```

(This will also work with `:watch` suffix for watch mode.)
