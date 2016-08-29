# Testing

## Unit Tests

Unit testing is implemented using [Mocha](mochajs) and [`meteor --test`](https://guide.meteor.com/testing.html).

Tests can be written and ran at both the application level, and for individual packages.

Shortcut for running the unit test suite:

```sh
reaction test
```

Tests can be run from the command line:

```sh
SERVER_TEST_REPORTER="dot" meteor test --full-app --driver-package dispatch:mocha
```

## Acceptance Tests

In acceptance testing, the idea is to simulate a users experience to validate functionality on the front end. Some test scripts simulate real user login and test functionality.

### Setup
To get started with Acceptance Testing first you must install the latest [Java SE Development Kit](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
and download [Selenium Standalone Server](http://goo.gl/2lZ46z).

Place Selenium Server in your home directory.

```sh
mv ~/Downloads/selenium-server-standalone-* ~/
```

**Install [chromedriver](https://sites.google.com/a/chromium.org/chromedriver/).**

**Linux**

Download [chromedriver](https://sites.google.com/a/chromium.org/chromedriver/).

```sh
sudo mv ~/Downloads/chromedriver /usr/bin/
```

**macOS**

Install manually or using `brew`.

```sh
brew install chromedriver
```


Run Selenium Server (**NOTE:** your selenium version might differ):

```sh
java -jar selenium-server-standalone-3.0.0-beta2.jar
```

### Run
In order to run some of the tests, it is required you create a guest user and have admin user credentials. These credentials are placed in:

```sh
tests/acceptance-tests/config/user-data.yml
```

```yaml
admin_email: your_admin@domain.com
admin_pw: password123
guest_email: your_guest@domain.com
guest_pw: guestpassword
```

_The credentials put in this file are safe and cannot be accessed from the outside world. Just remember not to commit credentials when creating pull requests._

**_Start Reaction Application_**

```sh
reaction
```

**Run tests:**

```
./node_modules/.bin/wdio wdio.conf.js
```

### Test Runner

[WebdriverIO](http://webdriver.io/guide/testrunner/gettingstarted.html) provides our test runner.

The Reaction WebdriverIO configuration file is already provided, so you can start your integration tests by calling:

```sh
wdio.conf.js
```

#### Quick Walkthrough

At the top of the file you will see a specs array.

```js
specs: []
```

Herein lies the paths to all the test files:

```js
specs: [ "./tests/acceptance-tests/test/specs/logged-in-authorizenet-checkout.app-test.js" ]
```

This allows for adding tests you would like to run, or not run. Handy for debugging, when all you want to do is run one test. Or, you may want to run all the tests:

```js
specs: [ "./tests/acceptance-tests/test/specs/**/*.js" ]
```

**maxInstances** indicates how many instances of a browser you would like run at a single time. This is set at **1** by default.

Now while having **maxInstances: 10** might sound like a good idea - hey all tests will run faster. Running 10 instances of Google Chrome on your laptop might not be ideal, unless a dedicated instance is used. Also, application load will need to be taken into consideration, especially if running a local instance of Reaction.

**browserName** allows you to choose the browser of your choosing. The caveat - each browser type requires it's own driver install. With the current release of Selenium 3 we will only be supporting Google Chrome for the interim.

Over time we will broaden our support to include: PhantomJS, IE/Edge, Firefox, Safari and Opera

Add **base_url** to:

```sh
tests/acceptance-tests/config/settings.yml
```

```yaml
base_url: http://localhost:3000
```

By default this will be `http://localhost:3000`.

This should be renamed if you are running tests against a qa/staging environment.

**screenshotPath** is for capturing screenshots upon a failure and which directory to put those images in. By default this feature is disabled. To enable, uncomment the following line and replace with a path of your choosing:

```js
screenshotPath: "./tests/acceptance-tests/errorShots/",
```
