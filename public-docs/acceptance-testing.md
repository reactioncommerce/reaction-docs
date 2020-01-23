---
id: acceptance-testing
title: Acceptance Testing
---

## Overview

### What is Acceptance Testing?

Acceptance testing (AT) is a process of testing the application to verify functionality from a user's perspective. Related functionality is grouped together and tested by following the steps of an AT script. AT scripts outline the functionality to be tested, success criteria, testing steps and any test variants.

### Why is AT important?

Acceptance testing gives us:
- Insight to pain-points and issues related to user flows
- Clear steps to reproduce any issues discovered during AT
- A plan to test all user-flow variants

## Getting Started
There are three key touch points within the AT process
- Test setup
- Testing
- Issue reporting

**Test Setup**
Most AT scripts will have setup steps as a prerequisite to the actual test. All relevant setup steps will be listed in each AT script under _Test Setup Steps_. Review all the AT setup steps [here](test-setup.md).

**Testing**
Once the test setup process is complete it's time for testing. Each AT script will have user-flow steps to complete, many user-flow steps will have test variants that may also need to be tested. Success critical test variants will be listed in the script's _Touch Points_, these test variants must be completed for the test to be considered successful.

**Issue Reporting**
All AT scripts will have an _Intended Outcome_ section, if you've completed each step of the AT script and you're not seeing the intended outcome then the acceptance test is considered a failure. If this is the case follow the steps for reporting an issue in the [Contributing Guide](https://docs.reactioncommerce.com/reaction-docs/trunk/contributing-to-reaction#step-2-find-or-open-an-issue)

## Test Scripts
Table of contents for all Reaction Commerce AT scripts.

**Order Scripts**
- [Order Creation](order-creation.md)

<!--
 - [Order Fulfillment](scripts/order-fulfillment.md)
 - [Order Canceling](scripts/order-canceling.md)
 - [Order Refunding](scripts/order-refunding.md)
-->

## Resources
**Testing**
- [reaction-devtools](https://github.com/reactioncommerce/reaction-devtools)
- [Acceptance Test Script Templates](script-template)

**Reporting**
- [Contributing Guide](contributing-to-reaction)
