---
id: version-v1.11.0-running-jest-tests
title: Running Jest Tests
original_id: running-jest-tests
---
    
## Description

We're incrementally moving most unit tests out of Meteor+mocha and into pure Jest tests. Jest test files end in `.test.js` and can be anywhere in the Reaction codebase, typically in the same folder and with the same base filename as the code being tested.

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

## Common errors and fixes

- Jest testing has some caching built in. This can continue to show bad cached results, even if tests are fixed. To run tests without cache, run:

```sh
npm run test:unit -- --no-cache
```

- `SyntaxError: Unexpected token import` is an error you'll see if your compiled node modules build is different from the ones the tests are running against. To fix this issue, try the following commands, testing after each command to see if it's been fixed:

```sh
rm -rf node_modules && meteor npm install
```
```sh
npm rebuild
```

- `Error: 'fsevents' unavailable (this watcher can only be used on Darwin)` is thrown when `watchman` is not installed. Install `watchman` to fix this error:

```sh
brew install watchman
```
