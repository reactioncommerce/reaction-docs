---
id: version-v1.11.0-plugin-customizing-templates-4
title: Part 3: Customizing Templates
original_id: plugin-customizing-templates-4
---
    
If you have been following along exactly with this tutorial you may have noticed what we have accomplished so far,
we have broken the site. Why? Because the layout we specified cannot be found. So let's add it now.

## [/client/](https://github.com/reactioncommerce/reaction-example-plugin/tree/master/client)

Create a new directory with the name `templates` within the `client/` directory. Then, create a directory with the name `layouts` within the `templates/` directory.

Your `client` directory should look like this:

```sh
client/
└──defaults.js
└─┬templates/
  └─┬layouts/
    └─core.js
```

## [/client/index.js](https://github.com/reactioncommerce/reaction-example-plugin/blob/master/client/index.js)

To make this new `templates` directory of the project, we need to import it. Add a path to `./templates` to the `index.js` at the root of the `client` directory, where we imported the LESS files. 

In `client/index.js`, add:

```js
import "./templates";
```

## [/client/templates/index.js](https://github.com/reactioncommerce/reaction-example-plugin/blob/master/client/templates/index.js)

Then we need to create another `index.js` at the root of the `templates` directory and import all of our templates there.

Every time we add new template files, remember to import the files need to be imported to this file.

In `client/templates/index.js`, add:

```js
import "./layouts/core.js";
```

## [/client/templates/layouts/core.js](https://github.com/reactioncommerce/reaction-example-plugin/blob/master/client/templates/layouts/core.js)

Now, we're ready to write a layout component.

In `client/templates/layouts/core.js`, add: 

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
registerComponent("coreLayoutBeesknees", CoreLayoutBeesknees);


export default CoreLayoutBeesknees;
```

See that line that says:

```js
<Blaze template={template} />
```

You may remember that when we created our layout entry there was a variable called `template` that was set to `products`. So when we add back in that main section, it's rendering the template called "products" in that main section. That's why once you put that section back in you will suddenly get the list of products appearing again.

Now what if you don't want to show the `products` template there but show your own template with your own unique way of displaying products?

You just need to change the entry in the layout record to point to your template. This completely decouples your template from the original template.

So let's go and create our template first and then we will point our new layout at it.

## [/client/templates/products/](https://github.com/reactioncommerce/reaction-example-plugin/tree/master/client/templates/products)

Create a directory under `client/templates` called `products`. From there, create a file called `productsLanding.html` and a file called `productsLanding.js`

For the purposes of this tutorial, we are just copying over the original template files from the `product-variant` plugin. You, of course, are creating a brand new, innovative way of displaying products.

If you look at these templates you will see templates and sub-templates. Basically if you want use the default you can just references back to the original template by name, or you can change the name and create your own template. All templates go into a single global namespace and must be unique.

Oh, and let's not forget to import these files in `client/templates/index.js`:

```js
// products
import "./products/productsLanding.html";
import "./products/productsLanding";
```

## [/register.js](https://github.com/reactioncommerce/reaction-example-plugin/blob/master/register.js)

Now we need to change the entry in our layout record in our `register.js` file. 

Change the `template:` value to `productsLanding`:

```js
    structure: {
      template: "productsLanding"
    } }
```

## `productsLanding` template

Now, run `reaction reset` to render the site with the new `register.js` settings.

When the site is rendered now, it should be rendering the home page with the `productsLanding` template, rather than the default `products`.

Next: [Fixtures](plugin-fixtures-5.md)

## Read more

[React](https://facebook.github.io/react/)
