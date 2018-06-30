---
original_id: packages
id: version-v1.1.0-packages
title: Plugins
---
    
Reaction packages can be **npm** packages, local plugins, or Atmosphere packages that define a Reaction Registry using `Reaction.registerPackage`.

## imports/plugins

The `imports/plugins` folder contain plugin modules for Reaction.

- core (required core modules)
- included (optional modules distributed with Reaction)
- custom (a folder for custom plugins)

The plugins in the `imports` folder will not be [bundled by Meteor](https://guide.meteor.com/structure.html#structuring-imports) unless the modules are imported.

The Meteor build system will only bundle and include that file if it is referenced from another file using an import (also called “lazy evaluation or loading”).

## Reaction.registerPackage

The `Reaction.registerPackage` method describes a Meteor package to other Reaction packages.

Note: The registry entries load does not overwrite existing package entries in the `Packages` collection. However, if there is a package settings object, these entries will be refreshed on change. You'll need to either clear the `Packages` collection, or do a `meteor reset` to re-write other changes to a package registry entry.

Integrate packages with Reaction by creating a **server/register.js** and add to the Registry:

```js
import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: 'PayPal',
  name: 'reaction-paypal',
  autoEnable: false,
  registry: [
    {
      provides: 'dashboard',
      label: 'PayPal',
      description: 'PayPal Payments',
      icon: 'fa fa-paypal',
      priority: 3,
      container: 'reaction-paypal',
      permissions: [
        {
          label: 'PayPal',
          permission: 'dashboard/payments'
        }
      ]
    }, {
      label: 'PayPal Settings',
      route: 'paypal',
      provides: 'settings',
      container: 'reaction-paypal',
      template: 'paypalSettings'
    }, {
      template: 'paypalPaymentForm',
      provides: 'paymentMethod'
    }
  ]
});
```
