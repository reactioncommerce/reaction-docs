# Acceptance Testing

## Overview

**What is Acceptance Testing or AT**
AT is a process of testing the application to verify functionality from a users perspective. Related functionality is group together and tested by following the steps of an AT script. AT scripts will outline the functionality to be tested, success criteria, testing steps and any test variants.

**Why is this important?**
AT gives us:
 - Insight to pain-points and issues related to any user-flows. 
 - Clear step to reproduce any issues discovered during AT.
 - A plan to test all user-flow variants.

## Getting Started
There are three key touch points within the AT process
 - Test setup
 - Testing
 - Issue reporting

**Test Setup**
Most AT scripts will have setup steps as a prerequisite to the actual test. All relevant setup steps will be listed in each AT script under _Test Setup Steps_. Review all the AT setup steps [here](/developer/acceptance-testing/scripts/test-setup.md).

**Testing**
Once the test setup process is complete it's time for testing. Each AT script will have user-flow steps to complete, many user-flow steps will have test variants that may also need to be tested. Success critical test variants will be listed in the script's _Touch Points_, these test variants must be completed for the test to be considered successful.

**Issue Reporting**
All AT scripts will have an _Intended Outcome_ section, if you've completed each step of the AT script and you're not seeing the intended outcome then the acceptance test is consided a failure. If this is the case follow the steps for reporitng an issue in the [Contributing Guide](https://docs.reactioncommerce.com/reaction-docs/master/contributing-to-reaction#step-2-find-or-open-an-issue)

## Test Scripts
Table of contents for all Reaction Commerce AT scripts.

**Order Scripts**
 - [Order Creation](/developer/acceptance-testing/scripts/order-creation.md)
 - [Order Fulfillment](/developer/acceptance-testing/scripts/order-fulfillment.md)
 - [Order Canceling](/developer/acceptance-testing/scripts/order-canceling.md)
 - [Order Refunding](/developer/acceptance-testing/scripts/order-refunding.md)

## Glossary
TODO: list of AT terms with definition

## Resources
**Testing**
 - [reaction-devtools](https://github.com/reactioncommerce/reaction-devtools)
 - [Acceptance Test Script Templates](/developer/acceptance-testing/acceptance-testing-script-template.md)

**Reporting**
 - [Contributing Guide](https://docs.reactioncommerce.com/reaction-docs/master/contributing-to-reaction)
