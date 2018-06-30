---
original_id: simple-schema
id: version-v1.1.0-simple-schema
title: Schemas
---
    
Reaction uses MongoDB, which is a schema-less database. This allows maximum flexibility, particularly important when quickly reacting to the design challenges that uniquely different customizations require in the course of a commerce operation.

However, we don't want to just get completely crazy, so we define a **Schema** that is attached to the previously schema-less collection. These Schemas apply basic content and structure validation, also very necessary in commerce.

As we apply each additional layer of structure, it's good to remember that there are usually server side methods to bypass these layers as well.

## Definition and import

Schemas are implemented using the [aldeed:simple-schema](https://github.com/aldeed/meteor-simple-schema) package.

Reaction.Collections are defined in the common code of `lib/collections`, where the Schemas defined in `lib/collections/schemas` are attached.

Schemas should be imported to use

```js
import * as Schemas from "/lib/collections/schemas";
```

or an individual schema definition

```js
import { PackageConfig } from "/lib/collections/schemas/registry";
```

### Reaction Schemas

| [Reaction.Schemas](https://github.com/reactioncommerce/reaction/tree/development/lib/collections/schemas) | *                |
| --------------------------------------------------------------------------------------------------------- | ----------------- |
| Email                                                                                                     | Address           |
| Accounts                                                                                                  | CartItem          |
| CartItem                                                                                                  | CartItems         |
| Cart                                                                                                      | DiscountType      |
| DiscountRules                                                                                             | Discounts         |
| Layout                                                                                                    | OrderItem         |
| OrderTransaction                                                                                          | Order             |
| Permissions                                                                                               | Workflow          |
| PackageConfig                                                                                             | CorePackageConfig |
| PaymentMethod                                                                                             | Invoice           |
| Payment                                                                                                   | VariantMedia      |
| ProductPosition                                                                                           | ProductVariant    |
| Product                                                                                                   | ShippingMethod    |
| ShipmentQuote                                                                                             | ShipmentItem      |
| ShippingParcel                                                                                            | Shipment          |
| ShippingProvider                                                                                          | Shipping          |
| CustomEmailSettings                                                                                       | Metafield         |
| Currency                                                                                                  | Locale            |
| Shop                                                                                                      | Tag               |
| TaxRates                                                                                                  | Taxes             |
| Templates                                                                                                 | Translation       |

### Autovalue

Reaction provides Autovalue helpers in `/lib/collections/helpers.js`.

```js
/**
 * Example Schema with Autovalue
 */
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { shopIdAutoValue } from "./helpers";

export const SchemaExample =  new SimpleSchema({
  shopId: {
    type: String,
    index: 1,
    autoValue: shopIdAutoValue,
    label: "Example shopId"
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date
        };
      }
    }
  }
});
```

#### Reaction.shopIdAutoValue

Used for schema injection autoValue of currentShopId.

#### Reaction.schemaIdAutoValue

Used for schema injection autoValue of a random id.

### Examples

#### Schema Definition

```js
/**
 * workflow schema for attaching to collection where
 * PackageWorkflow is controlling view flow
 * Shop defaultWorkflow is defined in Shop
 */
import { SimpleSchema } from "meteor/aldeed:simple-schema";

export const Workflow = new SimpleSchema({
  status: {
    type: String,
    defaultValue: "new"
  },
  workflow: {
    type: [String],
    optional: true
  }
});
```

### Extending a Schema

This example extends the `Schemas.PackageConfig` and adds new properties to the schema.

```js
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { PackageConfig } from "/lib/collections/schemas/registry";

export const PaypalPackageConfig = new SimpleSchema([
  PackageConfig, {
    "settings.express_enabled": {
      type: Boolean,
      defaultValue: true
    },
    "settings.merchantId": {
      type: String,
      label: "Merchant ID",
      optional: true
    }
  }
]);
```

## Multiple Schemas

Multiple Schema functionality allows us to use different schemas for different documents within the same collection.

To work with multi-schema you need to specify the selector. You can do this by several ways:

If object contains selector (it should because selector should be required)

```js
MyCollection.simpleSchema(object);
```

And if object doesn't:

```js
MyCollection.simpleSchema(object, { selector: { field: 'value' } });
```

### Product Schema

In `/lib/collections/schemas/products.js`, we attach two different schemas to the same `Products` collection.

The multiple schemas are attached to the collection with a **selector option**.

```js
Reaction.Collections.Products.attachSchema(Reaction.Schemas.Product,
  { selector: { type: "simple" } });
Reaction.Collections.Products.attachSchema(Reaction.Schemas.ProductVariant,
  { selector: { type: "variant" } });
```

However, now whenever we update a document in the `Products` collection, we need define a schema to use.

Applies a schema where `price` is a **Number**:

```js
Reaction.Collections.Products.update("SMr4rhDFnYvFMtDTX", {
  $set: {
    price: 10
  }
}, {
  selector: {
    type: "variant"
  }
});
```

Applies a schema where `price` is an **Object**:

```js
Reaction.Collections.Products.update("BCTMZ6HTxFSppJESk", {
  $set: {
    price: {
      range: "1.00 - 12.99",
      min: 1.00,
      max: 12.99
    }
  }
}, {
  selector: {
    type: "simple"
  }
});
```

It's important to note that collections do not enforce structure, so nothing will stop you from updating a product with a "type:simple", using the "type:variant" schema.

### Updates

Updates where the _selector is not provided must have the selector in the update statement_.

Provide selector in **query**

```js
Reaction.Collections.Products.update(
  {
    title: "This is a product", type: "simple"
  }, {
    $set: { description: "This is a modified product" }
  }
);
```

Provide selector in **update** statement:

```js
Reaction.Collections.Products.update(
  { title: "Product One" },
  { $set: {
    description: "This is a modified product",
    type: 'simple' // selector in <update>
  }}
);
```

Provide selector as an **option**

```js
Reaction.Collections.Products.update(
  { title: "Product One", type: "simple" },
  { $set: {
    description: 'This is a modified product three.'
  } },
  { selector: { type: "simple" } }
);
```

### Inserts

Provide the schema selector in the insert object:

```js
Reaction.Collections.Products.insert({ title: "This is a product", type: "simple"});
```

Provide the schema selector as **options**

```js
Reaction.Collections.Products.insert({ title: "This is a product" }, { selector: { type: "simple" } });
```
