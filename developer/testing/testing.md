# Testing

Integration testing is implemented using the[`meteor --test` with Mocha](https://guide.meteor.com/testing.html) .

Tests can be run from the command line:

```bash
SERVER_TEST_REPORTER="dot" meteor test --full-app --driver-package dispatch:mocha"
```

Tests can be written and ran at both the application level, and for individual packages.

Shortcut for running the test suite:

```bash
./reaction test
```

## Acceptance Testing

Step 1) To get started with Acceptance Testing first you must download Selenium Standalone Server .jar which can be found <http://goo.gl/2lZ46z>.

Step 2) Next step is to update the Firefox geckodriver for Selenium 3.

Download the latest geckodriver from <https://github.com/mozilla/geckodriver/releases>.

Make sure Firefox isn't running before updating. If on a Mac run: `./geckodriver -b /Applications/Firefox.app/Contents/MacOS/firefox-bin`

Linux: `./geckodriver -b /usr/bin/firefox`

Step 3) Install Java. That can be found <http://www.oracle.com/technetwork/java/javase/downloads/index.html>.

Step 4) Run Selenium Server:

```
java -jar selenium-server-standalone-3.0.0-beta2.jar
```

As a note, since this is a .jar file this can be located anywhere.

Step 5) Be sure to add your application user information in:

```
/tests/acceptance-tests/config/user-data.yml
```

Step 6) Execute acceptance tests:

```
./node_modules/.bin/wdio wdio.conf.js
```

Currently the test runner for acceptance testing is located in:

```
wdio.conf.js
```

By default, acceptance tests use the Firefox browser. You should see an instance of Firefox appear and run through the tests.

Dealing with failing tests... If a test fails, a screenshot of the failed test step will be generated in:

```
/tests/acceptance-tests/errorShots/*.png
```
