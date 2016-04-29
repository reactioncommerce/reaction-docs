# Layouts

Layouts are a combination of a `layout` object and an array of `workflow` objects. The are initially created in the `Packages` collection using the registry, and are cloned to the `Shops` collection which is where the application refers to them, and where they can be modified or disabled.

Layouts will [render a Blaze template](http://docs.meteor.com/#/full/blaze_render) as defined in the layout **structure**.

The workflow elements will be rendered with the `ReactionTemplates` helper, and are meant to be used in combination with the layout **structure**.

Layouts are meant to be created using the Package Registry, once they are defined in the Registry, they are copied into the `Shops.layout` array and referenced from there.  The Registry serves as the "source of truth", allowing customizations to be made directly to the individual Shops. In the case where we have two layouts with the same key structure (`layout`, `workflow`), the Array is loaded in reverse order, so that the newest layout will be used. Layouts can also be disabled in the data with `enabled:false`. This is reserved for a future UI implementation.

## Changing the global layout

If you need to override the default layout values from `common/config.js`, you can override by creating `main.js` and setting the values there.

```javascript
DEFAULT_LAYOUT = "coreLayout";
DEFAULT_WORKFLOW = "coreWorkflow";
```

`main.js` is only a suggestion. You'll need to create it, as it’s not a file in the repo, and is loaded last and [eagerly by Meteor](http://docs.meteor.com/#/full/modules), thus overriding the values provided by `common/config.js`. *This is a Reaction core file, and thus not a good file to edit if we want to avoid annoying Git conflicts*.

## Changing the index page layout

For convenience, the home page structure can be overridden with `INDEX_OPTIONS`.

```javascript
INDEX_OPTIONS = {
  template: "customHomePageTemplate",
  layoutHeader: "layoutHeader",
  layoutFooter: "layoutFooter",
  notFound: "notFound",
  dashboardControls: "dashboardControls",
  adminControlsFooter: "adminControlsFooter"
};
```

This example would load the `customHomePageTemplate` template, instead of the `coreLayout` default template of `products`.


### Example layout from checkout

Layouts can work in conjunction with [workflows](developer/architecture/workflow.md).  Here is an example of the layout defined in the `reaction-checkout` package in `server/register.js`.

```javascript
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
