---
id: version-v1.5.0-testing-reaction
title: Testing
original_id: testing-reaction
---
    
## Integration Tests

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

## Acceptance Tests

In acceptance testing, the idea is to simulate a users experience to validate functionality on the front end. Some test scripts simulate real user login and test functionality.

### Setup

To get started with Acceptance Testing first you must install the latest [Java SE Development Kit](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) and download [Selenium Standalone Server](http://goo.gl/2lZ46z).

Place Selenium Server in your home directory.

```sh
mv ~/Downloads/selenium-server-standalone-* ~/
```

### Install [chromedriver](https://sites.google.com/a/chromium.org/chromedriver/)

#### Linux

Download [chromedriver](https://sites.google.com/a/chromium.org/chromedriver/).

```sh
sudo mv ~/Downloads/chromedriver /usr/bin/
```

#### macOS

Install manually or using `brew`.

```sh
brew install chromedriver
```

Run Selenium Server (**NOTE:** your selenium version might differ):

```sh
java -jar selenium-server-standalone-3.0.0-beta2.jar
```

### Install Test Reporter

#### Debian

```sh
sudo apt-add-repository ppa:yandex-qatools/allure-framework
sudo apt-get update
sudo apt-get install allure-commandline
```

#### macOS

```sh
brew tap qatools/formulas
brew install allure-commandline
```

### Configuration

#### Test Settings

```sh
tests/acceptance-tests/config/settings.yml
```

```yaml
base_url: http://localhost:3000

browser: chrome

# browserstack additional capabilities
browser_version: "52.0"
os: Windows
os_version: "10"
resolution: "1920x1080"
```

`browser`: Which browser you would like to run the tests against.

If you decide to use a third party test runner. Their browser capabilities can be placed here.

#### Configure User Data

```sh
tests/acceptance-tests/config/user-data.yml
```

```yaml
admin_email: testing@reactioncommerce.com
admin_pw: password123

guest_pw: password123

# shop address
country: US
name: Lewis Hamilton
address1: 2110 Main Street.
postal: 90405
city: Santa Monica
region: CA
phone: 555-555-5555

# payment info
card_holder: Nico Roseberg
visa: 4242424242424242
paypal_visa: 4111111111111111
stripe_visa: 4000000000000077
exp_month: 1
exp_year: 2020
cvv: 123
```

For ease of use make sure the admin email and password match what you have in your `settings.json`, or in `~/.bash_profile`.

If none are set..

Open:

```sh
~/.bash_profile
```

Add the following lines.

```sh
export REACTION_USER="admin"
export REACTION_AUTH="0r61DHmH"
export REACTION_EMAIL="prwtfizd@localhost"
```

```sh
source ~/.bash_profile
```

#### Configure Test Suite

```sh
test/acceptance-tests/config/test-suite-config.yml
```

```yaml
# Enable and disable different suites of tests

# Payment Processor specific tests
braintree: false
stripe: false
authnet: false
paypal: false
example: false

# Admin functionality
permissions: false

# Regression suites
smoke_test: true
```

By default all but `smoke_test` will be set to `false` (off). Setting to `true` will enable that suite of tests.

### Run

#### Start Reaction Application

```sh
reaction
```

#### Run tests

Running tests locally:

```sh
npm install browserstack-local
npm run test-local
```

### Automate with BrowserStack

![BrowserStack Logo](https://d98b8t1nnulk5.cloudfront.net/production/images/layout/logo-header.png?1469004780)

We use [BrowserStack](https://www.browserstack.com) for automated acceptance testing.

#### Configure BrowserStack

Add your BrowserStack credentials in `~/.bash_profile`.

```sh
export BROWSERSTACK_USERNAME="your_username"
export BROWSERSTACK_ACCESS_KEY="your_api_key"
```

Running tests on BrowserStack:

```sh
npm run test-browserstack
```

### Reporter

To enable Allure reporting results set `allure: true` in:

```sh
test/acceptance-tests/config/test-suite-config.yml
```

```yml
# Test reporter
allure: true
```

After a test run has completed a `allure-results` directory is created.

Viewing the results of your tests:

```sh
npm run create-report
```

This compiles the report into your `$HOME` directory as `allure-report`.

```sh
npm run open-report
```

```js
screenshotPath: "./tests/acceptance-tests/errorShots/"
```

The report will then be open in a browser window.

To remove test report files run:

```sh
npm run del-report
```
