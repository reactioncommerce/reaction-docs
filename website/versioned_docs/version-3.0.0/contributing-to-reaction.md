---
id: version-3.0.0-contributing-to-reaction
title: Contributor Home
original_id: contributing-to-reaction
---

At Reaction Commerce, we're dedicated to the open source community. In fact, we've designed our entire platform and business to grow from the passion and creativity that an open source community ignites. We've already attracted a small, dedicated team of open source contributors, and there's always room for more.

## Getting Started

[Getting Started as a Developer](./getting-started-developing-with-reaction)

## Creating Issues and Asking Questions

If you found a bug or want to propose a feature, first determine which plugin repo owns the bug or would own the feature. Go to that repo (see [Links](#links) section below) and click Issues > New Issue. For questions and discussion, use our [Gitter room](https://gitter.im/reactioncommerce/reaction) instead.

If you believe you have discovered a vulnerability or a compliance issue that has not yet been publicly patched, and you wish to privately address the vulnerability, you can provide vulnerability and patch details through our security@reactioncommerce.com email group. See [Reporting Vulnerabilities](./reporting-vulnerabilities).

## Finding Issues to Work On

Use the following GitHub reports to find issues that are ready for community contributors to work on:

- <a href="https://github.com/issues?q=is%3Aopen+is%3Aissue+archived%3Afalse+user%3Areactioncommerce+is%3Apublic+no%3Aassignee+label%3A%22help+wanted%22+" target="_blank">Help Wanted</a>
- <a href="https://github.com/issues?q=is%3Aopen+is%3Aissue+archived%3Afalse+user%3Areactioncommerce+is%3Apublic+no%3Aassignee+label%3A%22good+first+issue%22+" target="_blank">Good First Issue</a> (subset of Help Wanted that are easy for new contributors to do)

### Before You Submit a Pull Request

- Be sure to follow our [Git style guide](./git-style-guide) for all of your commits.
- [Avoid breaking changes](./devs-breaking-changes) without prior discussion because they will probably not be merged, or your PR will be kept on ice until a new major release is approved.

## Issue Reports and Triage

Reports for core contributors:
- <a href="https://github.com/issues?q=is%3Aopen+is%3Aissue+archived%3Afalse+user%3Areactioncommerce+is%3Apublic+no%3Aassignee+label%3A%22core+work%22+" target="_blank">Core Team Work-Tracking Issues</a>
- <a href="https://github.com/issues?q=is%3Aopen+is%3Aissue+archived%3Afalse+user%3Areactioncommerce+is%3Apublic+no%3Aassignee+label%3A%22needs+triage%22" target="_blank">Needs Triage</a>

Other useful issue reports:
- <a href="https://github.com/issues?q=is%3Aopen+is%3Aissue+archived%3Afalse+user%3Areactioncommerce+is%3Apublic+no%3Aassignee+label%3A%22bug%22+" target="_blank">Unassigned Bugs</a>
- <a href="https://github.com/issues?q=is%3Aopen+is%3Aissue+archived%3Afalse+user%3Areactioncommerce+is%3Apublic+no%3Aassignee+label%3Aenhancement+" target="_blank">Unassigned Enhancements</a>
- <a href="https://github.com/issues?q=is%3Aopen+is%3Aissue+archived%3Afalse+user%3Areactioncommerce+is%3Apublic+label%3Abug+label%3A%22severity+high%22+" target="_blank">High Severity Bugs</a>
- <a href="https://github.com/issues?q=is%3Aopen+is%3Aissue+archived%3Afalse+user%3Areactioncommerce+is%3Apublic+label%3Abug+label%3A%22priority+high%22+" target="_blank">High Priority Bugs</a>
- <a href="https://github.com/issues?q=is%3Aopen+is%3Aissue+archived%3Afalse+user%3Areactioncommerce+is%3Apublic+no%3Alabel+" target="_blank">Unlabeled Issues</a>
- <a href="https://github.com/issues?q=is%3Aopen+is%3Aissue+archived%3Afalse+user%3Areactioncommerce+is%3Apublic" target="_blank">All Open Issues, Newest First</a>
- <a href="https://github.com/issues?q=is%3Aopen+is%3Aissue+archived%3Afalse+user%3Areactioncommerce+is%3Apublic+sort%3Acreated-asc" target="_blank">All Open Issues, Oldest First</a>

## Pull Request Tracking

- <a href="https://github.com/pulls?q=is%3Aopen+is%3Apr+archived%3Afalse+user%3Areactioncommerce+is%3Apublic+draft%3Atrue+" target="_blank">Draft PRs</a>
- <a href="https://github.com/pulls?q=is%3Aopen+is%3Apr+archived%3Afalse+user%3Areactioncommerce+is%3Apublic+review%3Anone+draft%3Afalse" target="_blank">PRs that need a reviewer assigned</a>
- <a href="https://github.com/pulls?q=is%3Aopen+is%3Apr+archived%3Afalse+user%3Areactioncommerce+is%3Apublic+-review%3Anone+draft%3Afalse+" target="_blank">PRs in review</a>
- <a href="https://github.com/pulls?q=is%3Aopen+is%3Apr+archived%3Afalse+user%3Areactioncommerce+is%3Apublic" target="_blank">All PRs</a>

## Links

[Reaction Development Platform](https://github.com/reactioncommerce/reaction-development-platform) is the best way to get started with running Reaction components locally for demo, testing, or development.

### Service Repositories

A Reaction installation is made up of at least the following services:

- <a href="https://github.com/reactioncommerce/reaction" target="_blank">Stock Reaction API</a>
- <a href="https://github.com/reactioncommerce/example-storefront" target="_blank">Example Storefront</a>
- <a href="https://github.com/reactioncommerce/reaction-admin" target="_blank">Reaction Admin</a>
- <a href="https://github.com/reactioncommerce/reaction-identity" target="_blank">Reaction Identity</a>

### API Components

The <a href="https://github.com/reactioncommerce/reaction" target="_blank">Stock Reaction API</a> is Node project that combines many different NPM packages, linked here.

- Core Reaction API package (api-core) [GitHub](https://github.com/reactioncommerce/api-core) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-core)
- Reaction API Utilities package (api-utils) [GitHub](https://github.com/reactioncommerce/api-utils) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-utils)
- Stock open source plugins:
  - api-plugin-accounts - [GitHub](https://github.com/reactioncommerce/api-plugin-accounts) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-accounts)
  - api-plugin-address-validation-test - [GitHub](https://github.com/reactioncommerce/api-plugin-address-validation-test) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-address-validation-test)
  - api-plugin-address-validation - [GitHub](https://github.com/reactioncommerce/api-plugin-address-validation) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-address-validation)
  - api-plugin-authentication - [GitHub](https://github.com/reactioncommerce/api-plugin-authentication) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-authentication)
  - api-plugin-authorization-simple - [GitHub](https://github.com/reactioncommerce/api-plugin-authorization-simple) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-authorization-simple)
  - api-plugin-carts - [GitHub](https://github.com/reactioncommerce/api-plugin-carts) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-carts)
  - api-plugin-catalogs - [GitHub](https://github.com/reactioncommerce/api-plugin-catalogs) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-catalogs)
  - api-plugin-discounts-codes - [GitHub](https://github.com/reactioncommerce/api-plugin-discounts-codes) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-discounts-codes)
  - api-plugin-discounts - [GitHub](https://github.com/reactioncommerce/api-plugin-discounts) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-discounts)
  - api-plugin-email-smtp - [GitHub](https://github.com/reactioncommerce/api-plugin-email-smtp) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-email-smtp)
  - api-plugin-email-templates - [GitHub](https://github.com/reactioncommerce/api-plugin-email-templates) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-email-templates)
  - api-plugin-email - [GitHub](https://github.com/reactioncommerce/api-plugin-email) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-email)
  - api-plugin-files - [GitHub](https://github.com/reactioncommerce/api-plugin-files) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-files)
  - api-plugin-i18n - [GitHub](https://github.com/reactioncommerce/api-plugin-i18n) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-i18n)
  - api-plugin-inventory-simple - [GitHub](https://github.com/reactioncommerce/api-plugin-inventory-simple) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-inventory-simple)
  - api-plugin-inventory - [GitHub](https://github.com/reactioncommerce/api-plugin-inventory) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-inventory)
  - api-plugin-job-queue - [GitHub](https://github.com/reactioncommerce/api-plugin-job-queue) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-job-queue)
  - api-plugin-navigation - [GitHub](https://github.com/reactioncommerce/api-plugin-navigation) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-navigation)
  - api-plugin-notifications - [GitHub](https://github.com/reactioncommerce/api-plugin-notifications) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-notifications)
  - api-plugin-orders - [GitHub](https://github.com/reactioncommerce/api-plugin-orders) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-orders)
  - api-plugin-payments-example - [GitHub](https://github.com/reactioncommerce/api-plugin-payments-example) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-payments-example)
  - api-plugin-payments-stripe - [GitHub](https://github.com/reactioncommerce/api-plugin-payments-stripe) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-payments-stripe)
  - api-plugin-payments - [GitHub](https://github.com/reactioncommerce/api-plugin-payments) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-payments)
  - api-plugin-pricing-simple - [GitHub](https://github.com/reactioncommerce/api-plugin-pricing-simple) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-pricing-simple)
  - api-plugin-products - [GitHub](https://github.com/reactioncommerce/api-plugin-products) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-products)
  - api-plugin-settings - [GitHub](https://github.com/reactioncommerce/api-plugin-settings) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-settings)
  - api-plugin-shipments-flat-rate - [GitHub](https://github.com/reactioncommerce/api-plugin-shipments-flat-rate) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-shipments-flat-rate)
  - api-plugin-shipments - [GitHub](https://github.com/reactioncommerce/api-plugin-shipments) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-shipments)
  - api-plugin-shops - [GitHub](https://github.com/reactioncommerce/api-plugin-shops) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-shops)
  - api-plugin-simple-schema - [GitHub](https://github.com/reactioncommerce/api-plugin-simple-schema) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-simple-schema)
  - api-plugin-sitemap-generator - [GitHub](https://github.com/reactioncommerce/api-plugin-sitemap-generator) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-sitemap-generator)
  - api-plugin-surcharges - [GitHub](https://github.com/reactioncommerce/api-plugin-surcharges) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-surcharges)
  - api-plugin-system-information - [GitHub](https://github.com/reactioncommerce/api-plugin-system-information) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-system-information)
  - api-plugin-tags - [GitHub](https://github.com/reactioncommerce/api-plugin-tags) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-tags)
  - api-plugin-taxes-flat-rate - [GitHub](https://github.com/reactioncommerce/api-plugin-taxes-flat-rate) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-taxes-flat-rate)
  - api-plugin-taxes - [GitHub](https://github.com/reactioncommerce/api-plugin-taxes) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-taxes)
  - api-plugin-translations - [GitHub](https://github.com/reactioncommerce/api-plugin-translations) | [NPM](https://www.npmjs.com/package/@reactioncommerce/api-plugin-translations)
