---
original_id: registry
id: version-v1.1.0-registry
title: Registry
---
    
The `Reaction Registry` is used to add settings, routes, and permissions for Reaction specific packages.

A `registry` object can be any combination of properties, with `provides` and `name` being the only required elements.

_Note: The registry is currently refreshed only on update/deleting the package record in the database, or on delete/addition of the package._

You may filter, or define using any of the optional registry properties:

Example package registry from `reaction-product-variants` plugin module `/imports/plugins/included/product-variant`.

**registerPackage**

```js
import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Products",
  name: "reaction-product-variant",
  icon: "fa fa-cubes",
  autoEnable: true,
  registry: [{
    route: "/product/:handle/:variantId?",
    name: "product",
    template: "productDetail",
    workflow: "coreProductWorkflow"
  }, {
    label: "Product Settings",
    provides: "settings",
    route: "/product/:handle/:variantId?",
    container: "product",
    template: "productDetailForm"
  }, {
    route: "/tag/:slug?",
    name: "tag",
    template: "products",
    workflow: "coreProductWorkflow"
  }, {
    route: "/products/createProduct",
    name: "createProduct",
    label: "Add Product",
    icon: "fa fa-plus",
    template: "productDetail",
    provides: "shortcut",
    container: "addItem",
    priority: 1,
    permissions: [{
      label: "Create Product",
      permission: "createProduct"
    }]
  }],
  layout: [{
    layout: "coreLayout",
    workflow: "coreProductWorkflow",
    collection: "Products",
    theme: "default",
    enabled: true,
    structure: {
      template: "productDetail",
      layoutHeader: "layoutHeader",
      layoutFooter: "",
      notFound: "productNotFound",
      dashboardHeader: "",
      dashboardControls: "dashboardControls",
      dashboardHeaderControls: "",
      adminControlsFooter: "adminControlsFooter"
    }
  }]
});
```

Layout definition can be added to registry, as well as layout workflow definitions.

Layouts defined here need to also exist in the Shops.layout collection to enable them.

```js
layout: [{
  layout: "coreLayout",
  workflow: "coreWorkflow",
  theme: "default",
  enabled: true,
  structure: {
    template: "products",
    layoutHeader: "layoutHeader",
    layoutFooter: "layoutFooter",
    notFound: "productNotFound",
    dashboardControls: "dashboardControls",
    adminControlsFooter: "adminControlsFooter"
  }
}]
```

A layout template definition that will be used for the `coreLayout` layout in the `coreCartWorkflow` workflows:

```js
layout: [
  {
    template: "checkoutLogin",
    label: "Login",
    workflow: 'coreCartWorkflow',
    container: 'checkout-steps-main',
    audience: ["guest", "anonymous"],
    priority: 1,
    position: "1"
  }
]
```

The `container` group alike for presentation _example: used to connect settings on dashboard app card registry object_

**Dynamic Templates**

The `provides` property is a "placement" value, loading it as `dynamic template` where the other conditions match a request from the `reactionApps` helper.

The following `provides` values are defined in reaction-core:

- paymentMethod
- shippingMethod
- settings
- shortcut
- dashboard
- userAccountDropdown

To add a new `settings` link to the app card:

```js
// settings
{
  route: "/dashboard/package/settings"
  provides: 'settings'
  icon: "fa fa-user-plus"
}
```

To add a new `userAccountDropdown` link to the Accounts menu:

```js
// settings
{
  route: "/link"
  provides: 'userAccountDropdown'
  icon: "fa fa-user-plus"
}
```

From templates, you can create additional dynamic template `provides` using the `reactionApps` helper to load registry objects.

```handlebars
{{#each reactionApps provides="settings" name=packageName group=group}}
  <a href="{{pathFor name}}" class="pkg-settings" title="{{i18n 'app.settings' 'Settings'}}">
    <i class="{{orElse icon 'fa fa-cog fa-2x fa-fw'}}"></i>
  </a>
{{/each}}
