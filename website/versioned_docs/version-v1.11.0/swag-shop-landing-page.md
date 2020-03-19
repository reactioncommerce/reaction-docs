---
id: version-v1.11.0-swag-shop-landing-page
title: Part 3: The Landing Page
original_id: swag-shop-landing-page
---

> ⚠️ Note: This tutorial has been deprecated as the release of Reaction 2.0. The latest tutorial can be found at [here](https://docs.reactioncommerce.com/docs/swag-shop-1).

In this part, we’ll show you how we...

- Added featured products to the landing page
- Added fields in Admin
- Customized Publications and Subscriptions

All code presented here can be found in our [Swag Shop repository](https://github.com/reactioncommerce/reaction-swag-shop) on GitHub.

## Adding featured products to the landing page

The [Featured Products](https://github.com/reactioncommerce/reaction-swag-shop/issues/13) functionality is the first real feature that we're implementing. The idea is to show shoppers a colored label in the product image’s upper left-hand corner for certain products, specified by the shop admin.

The label's text should be editable through the admin backend. This requires some database schema changes for the products, since we want to store the label text persistently. The necessary changes for the admin backend are covered in [#19](https://github.com/reactioncommerce/reaction-swag-shop/issues/19).

Essentially, we're extending the existing `Product` database schema with a new field called `featuredProductLabel`, which holds the label text. This can be seen in [/imports/plugins/custom/reaction-swag-shop/lib/collections/schemas/swagProducts.js](https://github.com/reactioncommerce/reaction-swag-shop/blob/15ae96a2f9607e155df0b2ae9a47210d799eb2a8/lib/collections/schemas/swagProduct.js):
```js
import { Meteor } from "meteor/meteor";
import Schemas from "@reactioncommerce/schemas";
import { Products } from "/lib/collections/index";

const ExtendedSchema = Schemas.Product.extend({
  featuredProductLabel: {
    optional: true,
    type: String
  },
  // -------------- %< --------------------
  //             more stuff
  // -------------- %< --------------------
});

Products.attachSchema(ExtendedSchema, { replace: true, selector: { type: "simple" } });
```

Besides the Product schema, we’ll also need to extend the Filters schema, which is used to pass filter criteria when subscribing to products. For more information on how simple schemas are used and how to override it in Reaction, visit our [docs](https://docs.reactioncommerce.com/reaction-docs/trunk/simple-schema).

[/imports/plugins/custom/reaction-swag-shop/server/publications/collections/schemas/filters.js](https://github.com/reactioncommerce/reaction-swag-shop/blob/15ae96a2f9607e155df0b2ae9a47210d799eb2a8/server/publications/collections/schemas/filters.js)
```js
import Schemas from "@reactioncommerce/schemas";

Schemas.filters.extend({
  featuredProductLabel: {
    type: String,
    optional: true
  },
  // -------------- %< --------------------
  //             more stuff
  // -------------- %< --------------------
});
```

## Adding an admin field
Next, let’s provide a new text field in the backend, Featured product label.

![](https://user-images.githubusercontent.com/1733229/34875802-18914a86-f79f-11e7-9a9c-46509c845c38.jpg)

To extend the default product settings form, replace the `ProductAdmin` component with our customized version. This version contains a text field for our newly-created schema field, `featuredProductLabel`:

[/imports/plugins/custom/reaction-swag-shop/client/components/product-admin/productAdmin.js](https://github.com/reactioncommerce/reaction-swag-shop/blob/755a6025c25bcbd21e58c2afb72a15fa2c5ee390/client/components/product-admin/productAdmin.js)
```js
import React from "react";
import { Components, replaceComponent } from "@reactioncommerce/reaction-components";
import CoreProductAdmin from "/imports/plugins/included/product-admin/client/components/productAdmin";


class ProductAdmin extends CoreProductAdmin {
  render() {
    return (
      // -------------- %< --------------------
      //             more stuff
      // -------------- %< --------------------
      <Components.Divider />
      <div className="row">
        <div className="col-sm-12">
          <Components.TextField
            i18nKeyLabel="productVariant.featuredProductLabel"
            i18nKeyPlaceholder=""
            placeholder=""
            label="Featured product label"
            name="featuredProductLabel"
            ref="featuredProductLabel"
            value={this.product.featuredProductLabel}
            onBlur={this.handleFieldBlur}
            onChange={this.handleFieldChange}
            onReturnKeyDown={this.handleFieldBlur}
          />
        </div>
      </div>
      // -------------- %< --------------------
      //             more stuff
      // -------------- %< --------------------
    );
  }
}

replaceComponent("ProductAdmin", ProductAdmin);

export default ProductAdmin;
```
In the above snippets, there are two important bits to consider:
1. We're extending the original `ProductAdmin` component and overriding the render() method, rendering a new TextField for the featuredProductLabel product property instead.

2. The Reaction default `ProductAdmin` React component is replaced with our derived version. This is done via calling `replaceComponent`. For more information on how the Reaction Component API works, [visit our API docs](http://api.docs.reactioncommerce.com/Components.html).

## Modifying the product grid
Now that we have the backend functionality in place, let's move on to the public-facing landing page and render those labels in different colors.

Clone the `ProductGridItems` component from _/imports/plugins/included/product-variant/component/productGridItems.js_ into our plugin. To keep track of where we originally copied the files from, name the newly-created file the same as your files in core. Also, keep the name of the plugin in its path name. Here, the newly created file becomes:

[/imports/plugins/custom/reaction-swag-shop/client/components/product-variant/productGridItems.js](https://github.com/reactioncommerce/reaction-swag-shop/blob/755a6025c25bcbd21e58c2afb72a15fa2c5ee390/client/components/product-variant/customer/productGridItem.js)
```js
import React from "react";
import { PropTypes } from "prop-types";
import { replaceComponent } from "@reactioncommerce/reaction-components";
import ProductGridItemCore from "/imports/plugins/included/product-variant/components/customer/productGridItem";


class ProductGridItem extends ProductGridItemCore {
  static propTypes = {
    showFeaturedLabel: PropTypes.bool,
    ...ProductGridItemCore.propTypes
  };

  static defaultProps = {
    showFeaturedLabel: true
  };

  static labelColorPalette = [
    "#2899D3", // blue
    "#40e0d0", // turquoise
    "#F2542F" // orange
  ];

  renderFeaturedProductLabel() {
    const { featuredProductLabel } = this.props.product;
    let bgColor;
    if (featuredProductLabel) {
      const hash = featuredProductLabel.split("").reduce((acc, value, i) => {
        const code = featuredProductLabel.charCodeAt(i);
        return code + acc;
      }, 0);
      bgColor = ProductGridItem.labelColorPalette[hash % 3];
    }
    return (
      <div className="grid-item-featured-product-label" style={bgColor ? { backgroundColor: bgColor } : {}}>
        {featuredProductLabel}
      </div>
    );
  }

  render() {
    const { product, isSearch } = this.props;
    return (
      <li
        className={this.productClassNames}
        data-id={product._id}
        id={product._id}
      >
        <div className={(isSearch) ? "item-content" : ""}>
          <span className="product-grid-item-alerts" />

          <a className="product-grid-item-images"
            href={this.productURL}
            data-event-category="grid"
            data-event-label="grid product click"
            data-event-value={product._id}
            onClick={this.handleClick}
          >
            <div className="product-primary-images">
              {this.props.showFeaturedLabel && this.renderFeaturedProductLabel()}
              {this.renderMedia()}
            </div>
            {this.renderAdditionalMedia()}
          </a>

          {!isSearch && this.renderNotices()}
          {this.renderGridContent()}
        </div>
      </li>
    );
  }
}

replaceComponent("ProductGridItemCustomer", ProductGridItem);

export default ProductGridItem;
```
Again, we're extending the original component and enhancing it with a new method called `renderFeaturedProductLabel`, which is responsible for rendering the colored labels. The colors for the labels get assigned in a pseudo-random fashion: a simple algorithm calculates the sum of the text label's ASCII values and maps them to a fixed color list through the modulo operation:
![](https://user-images.githubusercontent.com/1733229/34934351-799b0f6e-f9da-11e7-87f8-4faa9aa5019c.jpg)

## Customizing publications and subscriptions
When the default publication publishes a product for the landing page, it doesn't care if it's a featured product or not. Because the user story requests only publishing featured products (i.e. "Products We Love"), we’ll need to modify the server side publication function. Start with copying _/server/publications/collections/products.js_ verbatim to our plugin and save it to
[/imports/plugins/custom/reaction-swag-shop/server/publications/collections/products.js](https://github.com/reactioncommerce/reaction-swag-shop/blob/755a6025c25bcbd21e58c2afb72a15fa2c5ee390/server/publications/collections/products.js):
```js
import _ from "lodash";
import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import { Shops, Tags, Catalog } from "/lib/collections";
import { Logger } from "/server/api";
import Schemas from "@reactioncommerce/schemas";


// Validate the subscription filter against our extended filter schema.
const { filters } = Schemas;

function filterProducts(productFilters) {
    // -------------- %< --------------------
    //             more stuff
    // -------------- %< --------------------

    // BOF: swag shop featuredProduct filter
    if (Object.prototype.hasOwnProperty.call(productFilters, "featuredProductLabel")) {
      if (productFilters.featuredProductLabel !== "") {
        _.extend(selector, {
          // Return only featured products that match the label exactly
          featuredProductLabel: productFilters.featuredProductLabel
        });
      } else {
        // Return all featured products, regardless of label
        _.extend(selector, {
          featuredProductLabel: {
            $exists: true
          }
        });
      }
    }

    if (Object.prototype.hasOwnProperty.call(productFilters, "relatedTag")) {
      if (productFilters.relatedTag !== "") {
        const tag = Tags.findOne({ name: productFilters.relatedTag });
        if (tag) {
          _.extend(selector, {
            hashtags: tag._id,
            ancestors: { $size: 0 }
          });
        }
      }
    }
    // EOF: swag shop featuredProduct filter
  } // end if productFilters

  return selector;
}

/* Replace stock publication with our custom publication that knows how to filter
 * featured products as well.
 */
Meteor.startup(() => {
  Meteor.default_server.publish_handlers["Products/grid"] = publishFeaturedSwagProducts;
});


/**
 * Swag shop products publication. Knows how to filter for featured products.
 * @param {Number} [productScrollLimit] - optional, defaults to 24
 * @param {Array} shops - array of shopId to retrieve product from.
 * @return {Object} return product cursor
 */
function publishFeaturedSwagProducts(productScrollLimit = 24, productFilters, sort = {}) {
  check(productScrollLimit, Number);
  check(productFilters, Match.OneOf(undefined, Object));
  check(sort, Match.OneOf(undefined, Object));

  const newSelector = filterProducts(productFilters);

  if (newSelector === false) {
    return this.ready();
  }

  const productCursor = Catalog.find(newSelector, {
    sort,
    limit: productScrollLimit,
    fields: {
      variants: 0
    }
  });

  return productCursor;
}
```
This overridden method adds another filter criteria to the database query, which allows for searching featured products only. The corresponding subscription lives as a part of a higher order component in _/imports/plugins/included/product-variant/containers/productsContainerCustomer.js_. We'll be modifying the filters passed to the subscription, so the file is copied to [/imports/plugins/custom/reaction-swag-shop/client/containers/product-variant/productsContainerCustomer.js](https://github.com/reactioncommerce/reaction-swag-shop/blob/755a6025c25bcbd21e58c2afb72a15fa2c5ee390/client/containers/product-variant/productsContainerCustomer.js) and adapted accordingly:
```js
import _ from "lodash";
import { composeWithTracker, getHOCs, replaceComponent } from "@reactioncommerce/reaction-components";
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { Reaction } from "/client/api";
import { ReactionProduct } from "/lib/api";
import { Catalog, Tags, Shops } from "/lib/collections";
import ProductGrid from "../../components/product-variant/customer/productGrid";

/*
 * Customized version of imports/plugins/included/product-variant/containers/productsContainerCustomer.js
 * It subscribes to featured products only for landing page section "Products we love"
 */
function composer(props, onData) {
  // -------------- %< --------------------
  //             more stuff
  // -------------- %< --------------------

  const queryParams = Object.assign({}, tags, Reaction.Router.current().query, shopIds);
  // BOF: swag shop featuredProduct filter
  let swagShopScrollLimit;
  if (slug) {
    // e.g. route /tag/:slug?
    swagShopScrollLimit = Session.get("productScrollLimit");
  } else {
    // e.g. index route /
    // Only interested in first 3 products for "Products we love" section
    swagShopScrollLimit = 3;
    queryParams.featuredProductLabel = ""; // subscribe to all featured products, regardless of label
  }

  const productsSubscription = Meteor.subscribe("Products/grid", swagShopScrollLimit, queryParams, sort);
  // EOF: swag shop featuredProduct filter

  // -------------- %< --------------------
  //             more stuff
  // -------------- %< --------------------

  // BOF: swag shop tags for category tiles
  tags = Tags.find({ isTopLevel: true }, { sort: { position: 1 } }).fetch();
  tags = _.sortBy(tags, "position"); // puts tags without position at end of array
  // EOF: swag shop tags for category tiles

  const products = productCursor.fetch();
  const productIds = products.map((p) => p._id);

  const mediaSub = Meteor.subscribe("ProductGridMedia", productIds);

  if (mediaSub.ready()) {
    onData(null, {
      canLoadMoreProducts,
      products,
      productsSubscription,
      tags
    });
  }
}

const higherOrderFuncs = getHOCs("ProductsCustomer");
higherOrderFuncs[0] = composeWithTracker(composer);

replaceComponent("ProductsCustomer", ProductGrid);
```
The important bit here is that we're replacing a higher order component (HOC), which is responsible for injecting data from subscriptions into the real `Products` component. With `getHOCs`, we obtain a handle to the original HOCs. The base component is wrapped with two of them, but we're only interested in replacing the first with our own. Then, the original Products component is replaced with our own we imported from _/imports/plugins/custom/reaction-swag-shop/client/components/product-variant/customer/productGrid.js_. Here’s how it’s done:
```js
higherOrderFuncs[0] = composeWithTracker(composer);
replaceComponent("ProductsCustomer", ProductGrid);
```

## Do I really need a custom React component for everything?

The rule is as following: If you’re happy with the rendered markup and you don't need custom behaviour for a component (like overriding event handlers), you can get away with simple CSS changes. CSS changes are done in _/imports/plugins/custom/reaction-swag-shop/client/styles_. Because CSS files from custom plugins are loaded after the default CSS styles, it's generally sufficient to copy the original CSS selectors and modify their values according to your needs.

## What's next
Read in part 4 about how we implemented the [Product Detail Page (PDP)](swag-shop-pdp).
