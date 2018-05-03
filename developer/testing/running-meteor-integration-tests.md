## Running Meteor Integration Tests

Integration testing is implemented using [Mocha](https://mochajs.org/#installation) and [`meteor --test`](https://guide.meteor.com/testing.html).

Shortcut for running the test suite:

```sh
reaction test
```

Tests can be run from the command line:

```sh
SERVER_TEST_REPORTER="dot" meteor test --full-app --once --driver-package dispatch:mocha
```

For more detailed explanation see the tutorial for writing tests for Reaction
