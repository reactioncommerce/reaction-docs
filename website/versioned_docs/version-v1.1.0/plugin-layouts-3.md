---
original_id: plugin-layouts-3
id: version-v1.1.0-plugin-layouts-3
title: Layouts
---
    
_Some of the concepts in this section will be easier to understand if you have read the [Blaze](http://blazejs.org/guide/introduction.html) documentation._

## Purpose

In general layouts are a way of applying a structure to a site beyond what you would want to have in one particular template, allowing you to share components and reduce repetition. This is something you might do in server-side includes in other languages/frameworks.

### How Reaction uses layouts

Reaction Commerce uses one primary layout as the master or default called `coreLayout`. This layout is just another Blaze template. The code in this template is pretty minimal and you can see contains very little HTML. So before jumping in to replace this you may want to ask yourself if this is what you actually need to do. But because we are changing the global structure of our site to accommodate our "one-page-checkout" we need to.

```html
<template name="coreLayout">
  {{#if hasDashboardAccess}}
    {{> coreAdminLayout}}
  {{else}}
    <nav class="reaction-navigation-header">
      <!-- begin layoutHeader -->
      {{> Template.dynamic template=layoutHeader}}
      <!-- end layoutHeader -->
    </nav>

    <nav class="reaction-cart-drawer">
      {{>cartDrawer}}
    </nav>

    <main role="main" id="main">
      <span id="layout-alerts">{{> inlineAlerts}}</span>
      {{#if hasPermission 'guest'}}
        <!-- begin template region -->
        {{> Template.dynamic template=template}}
        <!-- end template region -->
      {{/if}}

      <footer class="reaction-navigation-footer footer-default">{{> Template.dynamic template=layoutFooter}}</footer>
    </main>

  {{/if}}
</template>
```

A common mistake that people make is that they see `Template.dynamic template=layoutHeader` and assume they can change
the name of the template there. In this context `layoutHeader` is **not** the name of the template but the name of the **variable**
that contains the template. Changing the name here will break this functionality. It's confusing because the name of the variable
and the name of the template here are the same so it's an easy mistake to me.

In order to change our default layout, we need add a record to the **registry** for our package. We also need to add a special `defaults.js` that will add some global options.

**Note**: If you just want to override the homepage and leave everything else alone, you can do that by adding special INDEX_OPTIONS parameters to this `defaults.js` file. See the ["Changing the index page layout"](https://docs.reactioncommerce.com/reaction-docs/development/layout) documentation for more info.

First let's create our `defaults.js` with our custom layout. You will place this file in the `client` folder in your plugin. The `defaults.js` just looks like this:

```js
import { Session } from "meteor/session";

Session.set("DEFAULT_LAYOUT", "coreLayoutBeesknees");
Session.set("DEFAULT_WORKFLOW", "coreWorkflow");
```

In order for this file to take affect, we need to also import it. So we add it to our `index.js` in your `client` directory.

```js
import "./defaults";
```

We also need to add our layout to the registry via our `register.js`. We are going to add a `layout` entry that looks like this:

```js
layout: [{
  layout: "coreLayoutBeesknees",
  workflow: "coreProductWorkflow",
  collection: "Products",
  theme: "default",
  enabled: true,
  structure: {
    template: "products",
    layoutHeader: "layoutHeader",
    layoutFooter: "layoutFooter",
    notFound: "productNotFound",
    dashboardHeader: "",
    dashboardControls: "dashboardControls",
    dashboardHeaderControls: "",
    adminControlsFooter: "adminControlsFooter"
  }
}]
```

so that our file will look like this

```js
import { Reaction } from "/server/api";

// Register package as ReactionCommerce package
Reaction.registerPackage({
  label: "Bees Knees",
  name: "beesknees",
  icon: "fa fa-vine",
  autoEnable: true,
  layout: [{
    layout: "coreLayoutBeesknees",
    workflow: "coreWorkflow",
    collection: "Products",
    theme: "default",
    enabled: true,
    structure: {
      template: "productsLanding",
      layoutHeader: "layoutHeader",
      layoutFooter: "layoutFooter",
      notFound: "productNotFound",
      dashboardHeader: "",
      dashboardControls: "dashboardControls",
      dashboardHeaderControls: "",
      adminControlsFooter: "adminControlsFooter"
    } }
  ]
});
```

You can see we specified several things there. The most important thing was the "layout" record, which refers to the new
layout template we will create in the next chapter. We also specify which templates we want for the header and footer (we are just keeping the default for now),
and what's the main template that we render and that's `products`. We also
specified which template we would use for a "notFound". When we get to the routing and template more of this will make sense.

One important thing to understand is that at any point in time when RC goes to render a route/page it's going to
determine how to pull the layout record from a key of `layout + workflow`. The `coreWorkflow` is a special case in that it is a workflow with just one step.
It is essentially the "default" workflow when you hit the home page.

Also note that we have other parts that we could substitute without
changing our layout. For example we change point our header or footer to
a custom template by changing the values for "layoutHeader" or "layoutFooter".

Next: [Customizing Templates](plugin-customizing-templates-4)

## Read More

[Layouts](layout)
