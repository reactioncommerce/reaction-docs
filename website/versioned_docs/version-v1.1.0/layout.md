---
original_id: layout
id: version-v1.1.0-layout
title: Layout
---
    
Layouts are a combination of a `layout` object and an array of `workflow` objects. They are initially created in the `Packages` collection during the registry loading, and are cloned to the `Shops` collection which is where the application refers to them, and where they can be modified or disabled.

Layouts will [render a Blaze template](http://docs.meteor.com/#/full/blaze_render) as defined in the layout **structure**.

The workflow elements will be rendered with the `ReactionTemplates` Meteor helper, and are meant to be used in combination with the layout **structure**.

Layouts are meant to be created using the Package Registry, once they are defined in the Registry, they are copied into the `Shops.layout` array and referenced from there.  The Registry serves as the "source of truth", allowing customizations to be made directly to the individual Shops. In the case where we have two layouts with the same key structure (`layout`, `workflow`), the Array is loaded in reverse order, so that the newest layout will be used. Layouts can also be disabled in the data with `enabled:false`. This is reserved for a future UI implementation.

## Changing the global layout

If you need to change the default layout values initial set in `/client/config/defaults.js`, you can customize the layout creating a file like `custom/client/defaults.js` and setting a [Meteor Session](http://docs.meteor.com/api/session.html) variable for `DEFAULT_LAYOUT`.

```js
import { Session } from "meteor/session";

Session.set("DEFAULT_LAYOUT", "coreLayout");
Session.set("DEFAULT_WORKFLOW", "coreWorkflow");
```

This is only a suggested location. You'll need to create the file and it will be automatically loaded by Meteor. We've added a `.gitignore` and `index.js` as placeholders.

## Changing the index page layout

For convenience, the home page structure can be overridden with `INDEX_OPTIONS`.

```js
import { Session } from "meteor/session";

Session.set("INDEX_OPTIONS", {
  template: "customHomePageTemplate",
  layoutHeader: "layoutHeader",
  layoutFooter: "layoutFooter",
  notFound: "notFound",
  dashboardControls: "dashboardControls",
  adminControlsFooter: "adminControlsFooter"
});
```

This example would load the `customHomePageTemplate` template, instead of the `coreLayout` default template of `products`.

### Example layout from checkout

Layouts can work in conjunction with [workflows](workflow.md).  Here is an example of the layout defined in the `/imports/plugins/core/checkout` module.

```js
  layout: [{
    layout: "coreLayout",
    workflow: "coreCartWorkflow",
    collection: "Cart",
    theme: "default",
    enabled: true,
    structure: {
      template: "cartCheckout",
      layoutHeader: "checkoutHeader",
      layoutFooter: "",
      notFound: "notFound",
      dashboardHeader: "",
      dashboardControls: "dashboardControls",
      dashboardHeaderControls: "",
      adminControlsFooter: "adminControlsFooter"
    }
  }, {
    template: "checkoutLogin",
    label: "Login",
    workflow: "coreCartWorkflow",
    container: "checkout-steps-main",
    audience: ["guest", "anonymous"],
    priority: 1,
    position: "1"
  }, {
    template: "checkoutAddressBook",
    label: "Shipping Billing",
    workflow: "coreCartWorkflow",
    container: "checkout-steps-main",
    audience: ["guest", "anonymous"],
    priority: 2,
    position: "2"
  }, {
    template: "coreCheckoutShipping",
    label: "Shipping Options",
    workflow: "coreCartWorkflow",
    container: "checkout-steps-main",
    audience: ["guest", "anonymous"],
    priority: 3,
    position: "3"
  }, {
    template: "checkoutReview",
    label: "Review Payment",
    workflow: "coreCartWorkflow",
    container: "checkout-steps-side",
    audience: ["guest", "anonymous"],
    priority: 4,
    position: "4"
  }, {
    template: "checkoutPayment",
    label: "Complete",
    workflow: "coreCartWorkflow",
    container: "checkout-steps-side",
    audience: ["guest", "anonymous"],
    priority: 5,
    position: "5"
  }]
});
```

## Default layout placement

Layouts work in conjunction with two helpers.  The `reactionTemplate` and `reactionApps` helpers loop through matching workflow and layout elements to render in specific locations.  

Here's a diagram of the default layout.

![CoreLayout](/assets/developer-registry-layout.png)
