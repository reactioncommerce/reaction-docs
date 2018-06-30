---
id: version-v1.4.0-plugin-customizing-templates-4
title: Customizing Templates
original_id: plugin-customizing-templates-4
---
    
If you have been following along exactly with this tutorial you may have noticed what we have accomplished so far,
we have broken the site. Why? Because the layout we specified cannot be found. So let's add it now.

Create the following directory structure under the `client` directory.
(_Note that none of this structure except for client is required by Meteor, it's just how I like to structure things, [YMMV](http://www.urbandictionary.com/define.php?term=ymmv)_)

```sh
client/
└─┬index.js
  └─┬templates/
    └─┬layouts/
      └─core.js
```

**client/index.js**

To make this template part of the project we need to import it, so we add it to the `index.js` at the root of the `client` directory (where we imported the LESS files). We add this line

```js
// client/index.js
import "./components";
```

**client/templates/index.js**

Then we need to create another `index.js` at the root of the `templates` directory and import all of our templates there. _Every time we add a template we need to import here in this file. I won't be mentioning that every time from here on out_. So in `client/templates/index.js` we add

```js
// client/templates/index.js
import "./layouts/core.js";
```

**client/templates/layouts/core.js**

Add the following to `core.js` to get the standard layout.

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
            <div className="rui beesknees">
              <div className="bkdebug"><em>{"Bee's Knees layout"}</em></div>
              <div className="bkdebug"><em>{"layoutHeader template:"}</em> {this.props.structure.layoutHeader}</div>
              <div className="bkdebug"><em>{"layoutFooter template:"}</em> {this.props.structure.layoutFooter}</div>
              <div className="bkdebug"><em>{"Main Template:"}</em> {this.props.structure.template}</div>
            </div>
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

See that line that says:

```js
<Blaze template={template} />
```

You may remember that when we created our layout entry there was a variable called `template` that was set to `products`.
So when we add back in that main section it's rendering the template called "products" in that main section.
That's why once you put that section back in you will suddenly get the list of products appearing again.

Now what if you don't want to show the `products` template there but
show your own template with your own unique way of displaying products?
You just need to change the entry in the layout record to point to your
template. This completely decouples your template from the original
template.

So let's go and create our template first and then we will point our new layout at it.

Create a directory under `client/templates` called `products` and there create a file called `productsLanding.html` and a file called `productsLanding.js`

_For the purposes of this tutorial we are just copying over the original template files from the `product-variant` plugin. You, of course, are creating a brand new, innovative way of displaying products._

If you look at these templates you will see templates and sub-templates. Basically if you want use the default you can just references back to the original template by name, or you can change the name and create your own template. All templates go into a single global namespace and must be unique.

Oh, and let's not forget to import these files in our `index.js`.

(Note, this list might change as we try to make this example store more custom)

```js
// products
import "./products/productsLanding.html";
import "./products/productsLanding";
```

Now we need to change the entry in our layout record in our `register.js` file. Just change the entry that says
"template" to be "productsLanding" (no need for the .html) Again this will require a `reaction reset` to take effect.

When the site is rendered now, it should be rendering the home page with the `productsLanding` template, rather than the default `products`.

Next: [Fixtures](plugin-fixtures-5.md)

## Read More

[React](https://facebook.github.io/react/)
