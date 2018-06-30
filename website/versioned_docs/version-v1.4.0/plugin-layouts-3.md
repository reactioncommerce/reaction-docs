---
id: version-v1.4.0-plugin-layouts-3
title: Layouts
original_id: plugin-layouts-3
---
    
_Some of the concepts in this section will be easier to understand if you have read the [Blaze](http://blazejs.org/guide/introduction.html) documentation._

## Purpose

In general layouts are a way of applying a structure to a site beyond what you would want to have in one particular template, allowing you to share components and reduce repetition. This is something you might do in server-side includes in other languages/frameworks.

### How Reaction uses layouts

Reaction uses one primary layout as the master or default called `coreLayout`. This layout is just another React component. The code in this template is pretty minimal and you can see contains very little. So before jumping in to replace this you may want to ask yourself if this is what you actually need to do. But because we are changing the global structure of our site to accommodate our "one-page-checkout" we need to.

```js
import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Blaze from "meteor/gadicc:blaze-react-component";
import { Template } from "meteor/templating";
import { registerComponent } from "/imports/plugins/core/layout/lib/components";

class CoreLayoutBeesknees extends Component {
  static propTypes = {
    actionViewIsOpen: PropTypes.bool,
    data: PropTypes.object,
    structure: PropTypes.object
  }

  render() {
    const { layoutHeader, layoutFooter, template } = this.props.structure || {};
    const pageClassName = classnames({
      "page": true,
      "show-settings": this.props.actionViewIsOpen
    });

    return (
      <div className={pageClassName} id="reactionAppContainer">
        { Template[layoutHeader] &&
          <Blaze template={layoutHeader} className="reaction-navigation-header" />
        }

        <Blaze template="cartDrawer" className="reaction-cart-drawer" />

        { Template[template] &&
          <main>
            <Blaze template={template} />
          </main>
        }

        { Template[layoutFooter] &&
          <Blaze template={layoutFooter} className="reaction-navigation-footer footer-default" />
        }
      </div>
    );
  }
}

// Register component for it to be usable
registerComponent({
  name: "coreLayoutBeesknees",
  component: CoreLayoutBeesknees
});

export default CoreLayoutBeesknees;

```

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

Also note that:
1. We have other parts that we could substitute without
changing our layout. For example we change point our header or footer to
a custom template by changing the values for "layoutHeader" or "layoutFooter".
2. There is a `priority` field on layout objects (with a default value) of `999`. When RC goes to render a route/page
(as explained above) and more than one layout match is found, this `priority` field is used to determine which one is
 used. Lower values override the default. [See example](https://github.com/reactioncommerce/reaction-example-plugin/pull/9/files).

Next: [Customizing Templates](plugin-customizing-templates-4.md)

## Read More

[Layouts](layout.md)
