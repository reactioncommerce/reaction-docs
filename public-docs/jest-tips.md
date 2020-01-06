---
id: jest-tips
title: Jest Tips
---

## Common Errors and Fixes

- Jest testing has some caching built in. This can continue to show bad cached results, even if tests are fixed. To run tests without cache, run:

```sh
npm run test:unit -- --no-cache
```

- `SyntaxError: Unexpected token import` is an error you'll see if your compiled node modules build is different from the ones the tests are running against. To fix this issue, try the following commands, testing after each command to see if it's been fixed:

```sh
rm -rf node_modules && npm install
```
```sh
npm rebuild
```

- `Error: 'fsevents' unavailable (this watcher can only be used on Darwin)` is thrown when `watchman` is not installed. Install `watchman` to fix this error:

```sh
brew install watchman
```
