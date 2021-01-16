---
title: How To: Extend the Product Schema
---

## Prerequisite Reading
- [Catalogs](./developer-catalog.md)
- [Understanding Plugins](./core-plugins-intro.md)
- [Developing Plugins](./core-plugins-developing.md)

## Overview

As a developer customizing Reaction, you may find a need to add some custom property to products. You should avoid this if you can achieve your goals some other way, such as using `metafields`, tags, or a separate data store that references product IDs. But in some cases, extending products is the best way.

Because products have a publishing flow and have variants, extending them requires many steps. In general, they are as follows:
- Extend database schemas
- Extend GraphQL schemas
- Register your custom property as published, if it should be published to the catalog
- Register a function that publishes your custom property, if it should be published to the catalog
- Create a GraphQL mutation for setting your custom property value
- Create a React component that allows an operator to set the custom property value, and wire it up to your mutation, or set your property in some other way

### Extend database schemas

To extend any database schema, you just need a file that is imported into server code. We recommend using a file named `simpleSchemas.js` in your plugin, and then importing that file in your plugin's `index.js`.

Refer to [SimpleSchema docs](https://github.com/aldeed/simple-schema-js#schema-rules) for more information about the object you pass to `extend`.

```js
import {
  CatalogProduct,
  CatalogVariantSchema,
  Product,
  ProductVariant,
  VariantBaseSchema
} from "/imports/collections/schemas";

const schemaExtension = {
  myProperty: {
    type: String,
    optional: true
  }
};

// Extend the Product database schema, if your custom property will be on products
Product.extend(schemaExtension);

// Extend the Variant database schema, if your custom property will be on variants
ProductVariant.extend(schemaExtension);

// Extend the CatalogProduct database schema, if your custom property will be on products
CatalogProduct.extend(schemaExtension);

// Extend the catalog variant database schemas, if your custom property will be on variants. There are two schemas for this one.
VariantBaseSchema.extend(schemaExtension);
CatalogVariantSchema.extend(schemaExtension);
```

### Extend GraphQL schemas

- Extend the `Product` GraphQL type, if your custom property will be on products
- Extend the `ProductVariant` GraphQL type, if your custom property will be on variants
- Extend the `CatalogProduct` GraphQL type, if your custom property will be on products and is published to the catalog
- Extend the `CatalogProductVariant` GraphQL type, if your custom property will be on variants and is published to the catalog
- Create a GraphQL resolver for your property if it needs any transformation

Refer to [How To: Extend GraphQL to add a field](./how-to-extend-graphql-to-add-field.md).

### Register custom property as published

*Skip this step if your property is not needed in the published catalog*

A plugin can include a `catalog` object in `registerPlugin`, with `publishedProductFields` and `publishedProductVariantFields` that are set to arrays of property names. These will be appended to the core list of fields for which published status should be tracked. This is used to build the hashes that are used to display an indicator when changes need to be published.

```js
export default async function register(app) {
  await app.registerPlugin({
    catalog: {
      publishedProductFields: ["myProperty"],
      publishedProductVariantFields: ["myProperty"]
    },
    // other props
  });
}
```

### Register a function that publishes custom property

*Skip this step if your property is not needed in the published catalog*

```js
import publishProductToCatalog from "./publishProductToCatalog";

export default async function register(app) {
  await app.registerPlugin({
    functionsByType: {
      publishProductToCatalog: [publishProductToCatalog]
    },
    // other props
  });
}
```

Where the `publishProductToCatalog` function looks something like this:

```js
export default function publishProductToCatalog(catalogProduct, { context, product, shop, variants }) {
  catalogProduct.myProperty = product.myProperty;
  // Also set on each catalogProduct.variants if necessary
}
```

### Create a GraphQL mutation for setting your custom property value

Refer to [How To: Create a new GraphQL mutation](./graphql-create-mutation.md). After mutating the `Product` document in your function, you must also call `context.mutations.hashProduct(productId, context.collections, false)`. This will update the current product hash, causing the operator UI to indicate that there are changes needing publishing.
