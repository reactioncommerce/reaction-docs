# Testing
Reaction uses [Meteor Jasmine](https://meteor-testing.readme.io/docs/getting-started) and the Meteor testing framework **Velocity**.

Tests can be written and ran at both the application level, and for individual packages.

To run the test suite:

```bash
./reaction test
```

You can also test individual packages.

```
VELOCITY_TEST_PACKAGES=1 meteor test-packages --driver-package velocity:html-reporter <org:package-to-test>
```
