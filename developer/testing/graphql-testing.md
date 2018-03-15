# Testing GraphQL

## Description

Reaction has testing set up for GraphQL endpoints.

## Running tests

To run tests:

```sh
  npm run test:unit
```

#### Common errors and fixes

These test are run with cache, which can cause issues if new tests are added.

```sh
  npm run test:unit -- --no-cache
```

SyntaxError: Unexpected token import
Clear your node modules, and reinstall

```sh
  rm -rf node_modules
```
```sh
  meteor npm install
```
