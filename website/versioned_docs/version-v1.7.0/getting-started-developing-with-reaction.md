---
id: version-v1.7.0-getting-started-developing-with-reaction
title: Getting started
original_id: getting-started-developing-with-reaction
---
    
Reaction uses Meteor as a build tool and development environment. Meteor eases Reaction's use of ES6, npm packages, services, and React by providing additional glue for the integration and deployment of these components.

- [Meteor](https://www.meteor.com/developers)
- [npm](https://docs.npmjs.com/how-npm-works/packages)
- [Less](http://guide.meteor.com/build-tool.html#less)
- [React](https://facebook.github.io/react/tutorial/tutorial.html)

## Customization Guide

Looking to customize your store? Check out our [customization guide](tutorial.md) for a walkthrough, as well as examples on how to create your own custom packages.

## Local Plugins

A number of plugin modules are imported in the `reaction` local `/imports/plugins` folder. We will refer to these local packages as "Core" packages, or as local plugin modules.

There are many Reaction plugins included. The current `imports` folder contains core, included, and a folder for custom plugins.

```sh
    `-- ./plugins
        |-- ./plugins/custom
        |-- ./plugins/core
        |   |-- ./plugins/core/revisions
        |   |-- ./plugins/core/ui-navbar
        |   |-- ./plugins/core/versions
        |   |-- ./plugins/core/discounts
        |   |-- ./plugins/core/collections
        |   |-- ./plugins/core/accounts
        |   |-- ./plugins/core/catalog
        |   |-- ./plugins/core/layout
        |   |-- ./plugins/core/payments
        |   |-- ./plugins/core/shipping
        |   |-- ./plugins/core/taxes
        |   |-- ./plugins/core/templates
        |   |-- ./plugins/core/ui
        |   |-- ./plugins/core/ui-grid
        |   |-- ./plugins/core/ui-tagnav
        |   |-- ./plugins/core/checkout
        |   |-- ./plugins/core/email
        |   |-- ./plugins/core/i18n
        |   |-- ./plugins/core/logging
        |   |-- ./plugins/core/dashboard
        |   |-- ./plugins/core/orders
        |   `-- ./plugins/core/router
        `-- ./plugins/included
            |-- ./plugins/included/jobcontrol
            |-- ./plugins/included/email-templates
            |-- ./plugins/included/taxes-taxjar
            |-- ./plugins/included/discount-codes
            |-- ./plugins/included/notifications
            |-- ./plugins/included/discount-rates
            |-- ./plugins/included/analytics
            |-- ./plugins/included/default-theme
            |-- ./plugins/included/inventory
            |-- ./plugins/included/launchdock-connect
            |-- ./plugins/included/product-admin
            |-- ./plugins/included/product-detail-simple
            |-- ./plugins/included/product-variant
            |-- ./plugins/included/search-mongo
            |-- ./plugins/included/shipping-rates
            |-- ./plugins/included/shippo
            |-- ./plugins/included/social
            |-- ./plugins/included/ui-search
            |-- ./plugins/included/sms
            |-- ./plugins/included/taxes-avalara
            |-- ./plugins/included/taxes-taxcloud
            |-- ./plugins/included/payments-authnet
            |-- ./plugins/included/payments-braintree
            |-- ./plugins/included/payments-example
            |-- ./plugins/included/payments-paypal
            `-- ./plugins/included/payments-stripe
```

### Packages

The preferred method of extending Reaction functionality is to use local import plugins or [**npm**](https://www.npmjs.com/) packages.

Reaction is also able to install Meteor packages from [Atmosphere](https://atmospherejs.com/), Meteor's legacy package registry.

To further customize your experience, you can create or use community packages from npm and Atmosphere. For more info, [click here](https://guide.meteor.com/atmosphere-vs-npm.html).

## Roadmap

A long term roadmap and completed features list is on our [features page](https://reactioncommerce.com/features).

You will find these roadmap items defined as projects on the [Reaction repository's project page](https://github.com/reactioncommerce/reaction/projects).

Specific features in progress are found grouped on the [Reaction repository's milestones page](https://github.com/reactioncommerce/reaction/milestones).

## Issues

To assign tasks or issues, please visit our project's [Issues](https://github.com/reactioncommerce/reaction/issues?state=open) page, where we track issues for all [reactioncommerce:\*](https://github.com/reactioncommerce/) packages.

### Other Resources

Got a question, comment, or suggestion? Check out our [![Gitter chat room](https://badges.gitter.im/JoinChat.svg)](https://gitter.im/reactioncommerce/reaction?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge).
