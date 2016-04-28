# Layout

Layouts are a combination a `layout` and a series of `workflow` elements.

The layout will render a Blaze template as defined in the layout structure.

The workflow elements will be rendered with the `ReactionTemplates` helper, and are meant to be used in combination with the layout **structure**.

Layouts are meant to be created using the Package Registry, once they are defined in the Registry, they are copied into the `Shops.layout` array and referenced from there.  The Registry serves as the "source of truth", allowing customizations to be made directly to the individual Shops. In the case where we have two layouts with the same key structure (`layout`, `workflow`), the Array is loaded in reverse order, so that the newest layout will be used. Layouts can also be disabled in the data with `enabled:false`. This is reserved for a future UI implementation.

If you need to override the default layouts set in `common/config.js`, you can override in `main.js`.

```javascript
DEFAULT_LAYOUT = "coreLayout";
DEFAULT_WORKFLOW = "coreWorkflow";
```

For convenience, the home page structure can be overridden with `INDEX_OPTIONS`.

```javascript
INDEX_OPTIONS = {
  template: "products",
  layoutHeader: "layoutHeader",
  layoutFooter: "layoutFooter",
  notFound: "productNotFound",
  dashboardControls: "dashboardControls",
  adminControlsFooter: "adminControlsFooter"
};
```


## Package Registry - Layout
From a `Packages.registry` document as defined in the `reaction-checkout` package.

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
### CoreLayout

![CoreLayout](/assets/developer-registry-layout.png)
