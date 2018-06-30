---
id: version-v1.12.0-running-meteor-integration-tests
title: Running Meteor Integration Tests
original_id: running-meteor-integration-tests
---
    
Integration testing is implemented using [Mocha](https://mochajs.org/#installation) and [`meteor test`](https://guide.meteor.com/testing.html). The driver package is [meteortesting:mocha](https://github.com/meteortesting/meteor-mocha).

Tests can be run from the command line:

```sh
npm run test:app
```

Or to watch for code changes and restart:

```sh
npm run test:app:watch
```
