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

Place Selenium Server in your home directory. Really, it can live anywhere.

Step 2) Next step is to install chromedriver.

For Linux: Download chromedriver which can be found <https://sites.google.com/a/chromium.org/chromedriver/>. Place chromedriver in `/usr/bin/`.

For Mac: `brew install chromedriver`

Step 3) Install the latest Java SE Development Kit. That can be found <http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html>.

Step 4) Run Selenium Server (NOTE: your selenium version might differ, also you must be using a ):

```
java -jar selenium-server-standalone-3.0.0-beta2.jar
```

Step 5) In order to run some of the tests, it is required you create a guest user and have admin user credentials. These credentials can be placed in:

```
tests/acceptance-tests/config/user-data.yml
```

In acceptance testing, the idea is to simulate a users experience to validate functionality on the front end. Some test scripts simulate real user login and

do stuff functionality. The credentials put in this file are safe and cannot be accessed from the outside world. Just remember not to commit credentials

when creating pull requests.

Step 6) Execute acceptance tests:

```
./node_modules/.bin/wdio wdio.conf.js
```

Currently the test runner for acceptance testing is located in:

```
wdio.conf.js
```

Let's break down whats happening in 'wdio.conf.js'. --PLEASE READ BEFORE CONTINUING--

At the top of the file you will see a specs array. Like: `specs: []` Herein lies the paths to all the test files as such:

`specs: [ "./tests/acceptance-tests/test/specs/logged-in-authorizenet-checkout.app-test.js", ]`

This allows for just adding tests you would like to run. Handy for debugging, when all you want to do is run one test. Or, you may want to run all the tests:

`"./tests/acceptance-tests/test/specs/**/*.js"`

Next is the `maxInstances` param. This indicates how many instances of a browser you would like run at a single time. This will be set at `1` by default.

Now while having `maxInstances 10` might sound like a good idea - hey all tests will run faster. Running 10 instances of Google Chrome on your laptop

might not be ideal, unless a dedicated instance is used. Also, application load will need to be taken into consideration, especially if running a local instance

of Reaction.

Just beneath `maxInstances` is `browserName`. This allows you to choose the browser of your choosing. The caveat - each browser type requires it's own

driver install. With the current release of Selenium 3 we will only be supporting Google Chrome for the interim.

Over time we will broaden our support to include: PhantomJS, IE/Edge, Firefox, Safari and Opera

`baseUrl` - This can be completely ignored.

In our tests we pull baseUrl from `tests/acceptance-tests/config/settings.yml`. By default this will be `base_url: http://localhost:3000`.

This should be renamed if you are running tests against a qa/staging environment.

`screenshotPath` is for capturing screenshots upon a failure and which directory to put those images in. Really, this can be anywhere. By default this feature

is disabled. To enable uncomment the following line and replace with a path of your choosing:

```
/tests/acceptance-tests/errorShots/*.png
```
