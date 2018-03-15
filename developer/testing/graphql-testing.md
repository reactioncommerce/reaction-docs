# Testing GraphQL

## Description

Reaction has testing set up for GraphQL endpoints.

### Prerequisites

Install `watchman` if you'd like to run `--watch` or `--watchAll` on tests

```sh
brew install watchman
```

## Running tests

To run tests:

```sh
  npm run test:unit
```

## Common errors and fixes

- Jest testing has some caching built in. This can continue to show bad cached results, even if tests are fixed. To run tests without cache, run:

```sh
  npm run test:unit -- --no-cache
```

- `SyntaxError: Unexpected token import` is an error you'll see if your compiled node modules build is different than the ones the tests are running against. To fix this issue, try the following commands:

```sh
  npm rebuild
```
```sh
  rm -rf node_modules
```
```sh
  meteor npm install
```
