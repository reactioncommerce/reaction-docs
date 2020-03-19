---
id: version-v1.7.0-layout
title: Layout
original_id: layout
---

A Reaction layout defines the if, how and where different sections like header, footer or main content of one specific route are displayed.

Throughout this tutorial, we'll refer to layouts as _Layout_, sections as _Container_ and a route as _View_.

A _Layout_ is always used in conjunction with _workflow processes_ or sometimes - even more specifically - with individual _workflow steps_, which both acts as _Container_ as the _Layout_ is rendered.

> ProTip: There's additionally a more lightweight way of rendering templates directly without the need for a _Layout_ which is explained in the [Routes section](https://docs.reactioncommerce.com/reaction-docs/trunk/plugin-routes-6.md)

## What is a Layout?

Let's take a look at an example of a Layout object, taken from the `reaction-checkout` package's `register.js` file.

First, notice that a Layout is an array that contains many Workflow objects.

```js
// from reaction/imports/plugins/core/checkout/register.js
"layout": [
  {
    "workflow" : "coreCartWorkflow",
    "layout" : "coreLayout",
    "structure" : {
      "template" : "cartCheckout",
      --- %< ---
    },
  --- %< ---
  }, {
    "workflow" : "coreCartWorkflow",
    "template" : "checkoutLogin",
    "container" : "checkout-steps-main",
    --- %< ---
  }, {
    "workflow" : "coreCartWorkflow",
    "template" : "checkoutAddressBook",
    "container" : "checkout-steps-main",
    --- %< ---
  }
]
```

See the full [`register.js`](https://github.com/reactioncommerce/reaction/blob/v1.6.0/imports/plugins/core/checkout/register.js).

Next, notice that the objects within the Layout array have different structures within them.

The first object is a _workflow process_, whereas the second and third individual _workflow steps_. In this case, the second and third objects, _workflow steps_ with a `workflow` value of `"coreCartWorkflow"`, are part of the first `"coreCartWorkflow"` _workflow process_, because of the shared `workflow` name.

Distinguishing between _workflow process_ and _workflow steps_ is easy: The _workflow process_ contain `layout` and `structure` properties, while _Workflow steps_ have a `container` property.

The _workflow process_ acts as a parent container element for the _workflow step_ children. This also implies that a single _View_ can accommodate more than one _Layout_. That's happening in the example above, because there are multiple, individual _workflow steps_ declared.

Let's dive deeper into the properties of Workflow processes and Workflow steps:

## Workflow processes and steps

### Workflow process

Let's look at the full object from [`register.js`](https://github.com/reactioncommerce/reaction/blob/v1.6.0/imports/plugins/core/checkout/register.js#L23). A workflow process contains a `layout` key, a `structure` object and a few more properties.

```js
  {
    workflow: "coreCartWorkflow",
    layout: "coreLayout",
    collection: "Cart",
    theme: "default",
    enabled: true,
    structure: {
      template: "cartCheckout",
      layoutHeader: "NavBarCheckout",
      layoutFooter: "",
      notFound: "notFound",
      dashboardHeader: "",
      dashboardControls: "dashboardControls",
      dashboardHeaderControls: "",
      adminControlsFooter: "adminControlsFooter"
    }
  }
```

### Workflow process properties

- `workflow`: Name for the workflow. Correlates with a _View_ specified in registry. See the [Routes section](https://docs.reactioncommerce.com/reaction-docs/trunk/plugin-routes-6)

- `layout`: This property's name is a bit misleading. Conceptually, it designates a shop-wide identifier for a collection of _Layouts_ (subsequently referred to only as **_Global Layout_**), because it covers potentially many routes (as opposed to _Layout_, which only refers to a specific _View_)

- `collection`: Refers to a Mongo collection which holds the _workflow state_, if any.

- `enabled`: Whether this _workflow process_ should be enabled or not.

- `structure`: Contains information about which components should be rendered when this _workflow process_ is applied by the Reaction router.
  - `structure.template`: The name of the [Blaze](http://docs.meteor.com/#/full/blaze_render) template that renders the main content for this _workflow process_.
  - `structure.notFound`: Name of Blaze template that gets rendered if `structure.template` does not exist (Should not be necessary).
  - `structure.headerLayout`: The name of the React component that renders the header for this _workflow process_.
  - `structure.footerLayout`: The name of the React component that renders the footer for this _workflow process_.

- `priority`: This field denotes which _workflow process_ will be used when there are multiple _workflow processes_) with the same key structure (layout, workflow). Lower values have higher precedence.

### Workflow step

A workflow step contains a `container` property, along with a few other values. Let's look at the full object from [`register.js`](https://github.com/reactioncommerce/reaction/blob/v1.6.0/imports/plugins/core/checkout/register.js#L39).

```js
  {
    template: "checkoutLogin",
    label: "Login",
    workflow: "coreCartWorkflow",
    container: "checkout-steps-main",
    audience: ["guest", "anonymous"],
    position: "1"
  }
```

### Workflow step properties

- `workflow`: Name for the workflow. Correlates with a _View_ specified in registry. See also the [Routes section](https://docs.reactioncommerce.com/reaction-docs/trunk/plugin-routes-6)
- `container`: The DOM element where the rendered template should go into.
- `template`: The name of the [Blaze](http://docs.meteor.com/#/full/blaze_render) template that renders the content for this _workflow step_.
- `enabled`: Whether this _workflow step_ should be enabled or not

## How Reaction incorporates Layouts and Workflows

Now that we've looked into the structure of the Layout arrays with Workflow processes and steps, let's discuss how Layouts are used.

Layouts are meant to be created using the Package Registry. The Package Registry serves as the "source of truth", allowing customizations to be made directly to the individual shops through `Shops.layout`.

During initialization, the _workflow processes_ are cloned to the Shops collection, which is where the application refers to them at runtime. On the other hand, the _workflow steps_ are not cloned to the Shops collection.

One key thing to remember is that at any given time, only one Global Layout can be active. See also `layout` property above. At any given time - within the active Global Layout - only one of the related workflow processes can be active.

### Workflow proceses

- The _workflow process_ will be returned in the `ReactionLayout` function in [`/imports/plugins/core/router/lib/router.js`](https://github.com/reactioncommerce/reaction/blob/v1.6.0/imports/plugins/core/router/lib/router.js#L412).
- Cloned in the Shops collection at initialization

### Workflow steps

- The _workflow steps_ will be rendered with the [`reactionTemplate`](https://github.com/reactioncommerce/reaction/blob/1.6/client/modules/core/helpers/layout.js#L9) Meteor helper.
- Workflow steps are not required. This just means that the rendered _Container_ does not have children that are dependent on the state of the _workflow process_.
- Workflow steps are not cloned to the Shops collection.

## Overriding default Layout settings

You can change the default layout values in [`/client/config/defaults.js`](https://github.com/reactioncommerce/reaction/blob/v1.6.0/client/config/defaults.js) by overriding them in a new file.

1. Create a file called `default.js` in the [`custom/client/`](https://github.com/reactioncommerce/reaction/tree/v1.7.0/custom/client) folder, already created for you.

2. Import [Meteor Session](http://docs.meteor.com/api/session.html), using `import { Session } from "meteor/session";`

3. Set a [Meteor Session](http://docs.meteor.com/api/session.html) variable for `DEFAULT_LAYOUT`.
    Your resulting file should look like:

```js
import { Session } from "meteor/session";

Session.set("DEFAULT_LAYOUT", "coreLayout");
```

4. Make sure to restart the server when changing global variables.

Use the same pattern to override home page structure with `INDEX_OPTIONS`:

```js
import { Session } from "meteor/session";

Session.set("INDEX_OPTIONS", {
  template: "customHomePageTemplate",
  layoutHeader: "NavBar",
  layoutFooter: "Footer",
  notFound: "notFound",
  dashboardControls: "dashboardControls",
  adminControlsFooter: "adminControlsFooter"
});
```

This example would load the `customHomePageTemplate` template, instead of the `coreLayout` default template of `products`.
