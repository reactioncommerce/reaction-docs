# Layouts

A Reaction layout (subsequently referred to only as _Layout_) defines the if, how and where different sections (subsequently referred to only as _Container_) like header, footer, the main content of one specific route (subsequently referred to only as _View_) are displayed. There's additionally a more lightweight way of rendering templates directly without the need for a _Layout_ which is explained in the [Routes section](https://docs.reactioncommerce.com/reaction-docs/master/plugin-routes-6)

_Layouts_ are always used in conjunction with _workflow processes_ or sometimes - even more specifically - with individual _workflow steps_, which both acts as _Container_ as the _Layout_ is rendered.

Here is a simplified example from `reaction-checkout` package that reflects a stock ReactionCommerce installation:

```js
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
}]
```

### _Workflow process_ vs. _workflow steps_
As you can see, the object within the layout array are not uniform. This is due to the fact that the first item is belonging to a _workflow process_, whereas the second and third items are belonging to individual _workflow steps_ (in this case the _workflow steps_ are part of the _workflow process_ of the first item, because they share the same value for `workflow`). Distinguishing between _workflow process_ and _workflow steps_ is easy: The _workflow process_ are containing `layout` and `structure` properties. _Workflow steps_ feature a `container` property.

_Workflow processes_ and _workflow steps_ are serving different needs, which is why they have different properties (a lot of them are not shown in the above example for clarity reasons). However, from a UI perspective the difference is that the _workflow process_ acts as a parent container element for the _workflow step_ children. This also implies that a _View_ can accommodate more than one _Layout_. Obviously, that's happening in the example above, because there are multiple, individual _workflow steps_ declared.


### Workflow process properties
`workflow`
* Name for the workflow. Correlates with a _View_ specified in registry. See also the [Routes section](https://docs.reactioncommerce.com/reaction-docs/master/plugin-routes-6)

`layout`
* This property's name is a bit misleading. Conceptually it designates a shop wide identifier for a collection of _Layouts_ (subsequently referred to only as **_Global Layout_**), because it covers potentially many routes (as opposed to _Layout_, which only refers to a specific _View_)

`collection`
* Refers to a mongo collection which holds the _workflow state_, if any.

`structure`
* Contains information about which components/widgets should be rendered when this _workflow process_ is applied by the Reaction router.
* `structure.template`
  * The name of the [Blaze](http://docs.meteor.com/#/full/blaze_render) template that renders the main content for this _workflow process_.
* `structure.notFound`
  * Name of Blaze template that gets rendered if `structure.template` does not exist (Should not be necessary).
* `structure.headerLayout`
  * The name of the React component that renders the header for this _workflow process_.
* `structure.footerLayout`
  * The name of the React component that renders the footer for this _workflow process_.

`enabled`
  * Whether this _workflow process_ should be enabled or not.

`priority`
*  This field denotes which _workflow process_ will be used when there're multiple _workflow processes) with the same key structure (layout, workflow). Lower values have higher precedence.

### Workflow step properties
`workflow`
* Name for the workflow. Correlates with a _View_ specified in registry. See also the [Routes section](https://docs.reactioncommerce.com/reaction-docs/master/plugin-routes-6)

`container`
* The DOM element where the rendered template should go into.

`template`
  * The name of the [Blaze](http://docs.meteor.com/#/full/blaze_render) template that renders the content for this _workflow step_.

`enabled`
  * Whether this _workflow step_ should be enabled or not

### Notices
* At any given time, only one _Global Layout_ can be active. See also `layout` property above.

* At any given time - within the active _Global Layout_ - only one of the related workflow processes can be active.

### Implementation details:

* Layouts are meant to be created using the Package Registry. During initialization, the _workflow processes_ are cloned to the Shops collection which is where the application refers to them at runtime. On the other hand, the _workflow steps_ are not cloned to the Shops collection.

* It's perfectly legal to have a workflow process **without** a corresponding workflow step. This just means that the rendered _Container_ does not have children that are dependent on the state of the _workflow process_.

* The _workflow process_ will be rendered with the `ReactionLayout` function in /imports/plugins/core/router/lib/router.js.

* The _workflow steps_ will be rendered with the `reactionTemplate` Meteor helper.

* The Registry serves as the "source of truth", allowing customizations to be made directly to the individual shops through `Shops.layout`.

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

## Default layout placement

Here's a diagram of the default layout.

![CoreLayout](/assets/developer-registry-layout.png)
