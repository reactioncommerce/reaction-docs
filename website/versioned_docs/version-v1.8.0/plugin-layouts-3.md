---
id: version-v1.8.0-plugin-layouts-3
title: Part 2: Layouts
original_id: plugin-layouts-3
---
    
_Some of the concepts in this section will be easier to understand if you have read the [Blaze](http://blazejs.org/guide/introduction.html) documentation._

## Purpose

In general layouts are a way of applying a structure to a site beyond what you would want to have in one particular template, allowing you to share components and reduce repetition. This is something you might do in server-side includes in other languages/frameworks.

### How Reaction uses layouts

Reaction uses one primary layout as the master or default called `coreLayout`. This layout is just another React component. The code in this template (/imports/plugins/core/layout/client/components/coreLayout.js) is pretty minimal and you can see contains very little. So before jumping in to replace this you may want to ask yourself if this is what you actually need to do. But because we are changing the global structure of our site to accommodate our customised &lt;main> section we need to.

**[/client/templates/layouts/core.js](https://github.com/reactioncommerce/reaction-example-plugin/blob/master/client/templates/layouts/core.js)**

```js
import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Blaze from "meteor/gadicc:blaze-react-component";
import { Template } from "meteor/templating";

import { getComponent as assertComponent, registerComponent } from "/imports/plugins/core/components/lib";


class CoreLayoutBeesknees extends Component {
  static propTypes = {
    actionViewIsOpen: PropTypes.bool,
    data: PropTypes.object,
    structure: PropTypes.object
  }

  getComponent(name) {
    try {
      if (name) {
        return assertComponent(name);
      }
    } catch (error) {
      // No-op
    }
    return null;
  }

  renderMain() {
    const template = this.props.structure && this.props.structure.template;
    const mainComponent = this.getComponent(template);
    if (mainComponent) {
      return React.createElement(mainComponent, {});
    } else if (Template[template]) {
      return (
        <Blaze template={template} />
      );
    }
    return null;
  }

  render() {
    const { layoutHeader, layoutFooter, template } = this.props.structure || {};
    const pageClassName = classnames({
      "page": true,
      "show-settings": this.props.actionViewIsOpen
    });

    const headerComponent = layoutHeader && this.getComponent(layoutHeader);
    const footerComponent = layoutFooter && this.getComponent(layoutFooter);

    return (
      <div className={pageClassName} id="reactionAppContainer">

        {headerComponent && React.createElement(headerComponent, {})}

        <Blaze template="cartDrawer" className="reaction-cart-drawer" />

        <main>
          <div className="rui beesknees">
            <div className="bkdebug">
              <em>{"Bee's Knees layout"}</em>
            </div>
            <div className="bkdebug">
              <em>{"layoutHeader component:"}</em>
              {this.props.structure.layoutHeader || "not applicable"}
            </div>
            <div className="bkdebug">
              <em>{"layoutFooter component:"}</em>
              {this.props.structure.layoutFooter || "not applicable"}
            </div>
            <div className="bkdebug">
              <em>main {this.getComponent(template) ? "component:" : "(Blaze template):"}</em>
              {template}
            </div>
          </div>

          { this.renderMain() }
        </main>

        {footerComponent && React.createElement(footerComponent, {})}
      </div>
    );
  }
}

// Register component for it to be usable
registerComponent("coreLayoutBeesknees", CoreLayoutBeesknees);

export default CoreLayoutBeesknees;
```

In order to change our default layout, we need add a record to the **registry** for our package. We also need to add a special `defaults.js` that will add some global options.

**Note**: If you just want to override the homepage and leave everything else alone, you can do that by adding special INDEX_OPTIONS parameters to this `defaults.js` file. See the ["How to create a custom homepage"](how-to-create-a-custom-homepage.md) documentation for more info.

First let's create our `defaults.js` with our custom layout. You will place this file in the `client` folder in your plugin. The `defaults.js` just looks like this:

**[/client/default.js](https://github.com/reactioncommerce/reaction-example-plugin/blob/fbf7d01921393e6926d567951d80a6d2bb9b8dc0/client/defaults.js)**

```js
import { Session } from "meteor/session";

Session.set("DEFAULT_LAYOUT", "coreLayoutBeesknees");
```

In order for this file to take affect, we need to also import it. So we add it to our `index.js` in your `client` directory.

**[/client/index.js](https://github.com/reactioncommerce/reaction-example-plugin/blob/master/client/index.js)**

```js
import "./defaults";
```

We also need to add our layout to the registry via our `register.js`. We are going to add a `layout` entry that looks like this:

```js
layout: [{
  layout: "coreLayoutBeesknees",
  workflow: "coreProductGridWorkflow",
  collection: "Products",
  theme: "default",
  enabled: true,
  structure: {
    template: "products",
    layoutHeader: "NavBar",
    layoutFooter: "Footer",
    notFound: "productNotFound",
    dashboardHeader: "",
    dashboardControls: "dashboardControls",
    dashboardHeaderControls: "",
    adminControlsFooter: "adminControlsFooter"
  }
}]
```

so that our file will look like this
**[/register.js](https://github.com/reactioncommerce/reaction-example-plugin/blob/master/register.js)**

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
    workflow: "coreProductGridWorkflow",
    collection: "Products",
    theme: "default",
    enabled: true,
    structure: {
      template: "productsLanding",
      layoutHeader: "NavBar",
      layoutFooter: "Footer",
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
layout template we will create in the next chapter. We also specify which templates we want for the header and footer (we are just keeping the default for now, which
are built-in React components called NavBar & Footer),
and what's the main template that we render and that's `products`. We also
specified which template we would use for a "notFound". When we get to the routing and template more of this will make sense.

One important aspect is the casing of the properties within the `structure`.
React component names start with capital letters, whereas Blaze templates
begin with a lower character. For now it's not possible to use React
components for properties that are expecting Blaze template names to be passed
(and vice versa). Though, in future all properties should designate React component names.

More detailed documentation on the other `register.js` can be found in this [blog post](https://blog.reactioncommerce.com/an-intro-to-architecture-the-registry/).

One important thing to understand is that at any point in time when Reaction goes to render a route/page, it's going to
determine how to pull the layout record from a key of `layout + workflow`. The `coreWorkflow` is a special case in that it is a workflow with just one step.

It is essentially the "default" workflow when you hit the home page.

Also note that:
1. We have other parts that we could substitute without changing our layout. For example we change point our header or footer to a custom React component by changing the values for "layoutHeader" or "layoutFooter".
2. There is a `priority` field on layout objects (with a default value) of `999`. When Reaction goes to render a route/page
(as explained above) and more than one layout match is found, this `priority` field is used to determine which one is
 used. Lower values override the default. [See example](https://github.com/reactioncommerce/reaction-example-plugin/pull/9/files).

Next: [Customizing templates](plugin-customizing-templates-4.md)

## Read More

[Layouts](layout.md)
