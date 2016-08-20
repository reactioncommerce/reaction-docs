# Testing

## Integration Testing

Integration testing is implemented using the [`meteor --test` with Mocha](https://guide.meteor.com/testing.html) .

Tests can be written and ran at both the application level, and for individual packages.

Shortcut for running the test suite:

```bash
reaction test
```

Tests can be run from the command line:

```bash
SERVER_TEST_REPORTER="dot" meteor test --full-app --driver-package dispatch:mocha"
```

## Acceptance Testing

To get started with Acceptance Testing, first you must download [Selenium Standalone Server .jar](http://selenium-release.storage.googleapis.com/2.53/selenium-server-standalone-2.53.1.jar).

Run Selenium Server:

```bash
java -jar selenium-server-standalone-2.53.1.jar
```

Currently the test runner for acceptance testing is located in:

```bash
/reaction/wdio.conf.js
```

Be sure to add your application user information in:

```bash
/reaction/tests/acceptance-tests/config/user-data.yml
```

To execute acceptance tests run:

```bash
./node_modules/.bin/wdio wdio.conf.js
```

By default, acceptance tests use the Firefox browser. You should see an instance of Firefox appear and run through the tests.

Dealing with failing tests... If a test fails, a screenshot of the failed test step will be generated in:

```bash
/reaction/tests/acceptance-tests/errorShots/*.png
```
