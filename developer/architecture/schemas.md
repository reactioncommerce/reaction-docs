# Schemas
Reaction uses MongoDB, which is a schema-less database. This allows maximum flexibility, particularly important when quickly reacting to the design challenges that uniquely different customizations require in the course of a commerce operation.

However, we don't want to just get completely crazy, so we define a **Schema** that is attached to the previously schema-less collection. These Schemas apply basic content and structure validation, also very necessary in commerce.

As we apply each additional layer of structure, it's good to remember that there are usually server side methods to bypass these layers as well.

## Reaction Schemas
Schemas implement the [simple-schema](https://github.com/aldeed/meteor-simple-schema) package.

The Core Collections defined in [reactioncommerce:reaction-collection](https://github.com/reactioncommerce/reaction/tree/development/packages/reaction-collections) attach the Core Schemas defined in [reactioncommerce:reaction-schemas](https://github.com/reactioncommerce/reaction/tree/development/packages/reaction-schemas).

[ReactionCore.Schemas ](https://github.com/reactioncommerce/reaction/tree/development/packages/reaction-schemas/common/schemas) | *
------------------------------------------------------------------------------------------------------------------------------- | -----------------
Email                                                                                                                           | Address
Accounts                                                                                                                        | CartItem
CartItem                                                                                                                        | CartItems
Cart                                                                                                                            | DiscountType
DiscountRules                                                                                                                   | Discounts
Layout                                                                                                                          | OrderItem
OrderTransaction                                                                                                                | Order
Permissions                                                                                                                     | Workflow
PackageConfig                                                                                                                   | CorePackageConfig
PaymentMethod                                                                                                                   | Invoice
Payment                                                                                                                         | VariantMedia
ProductPosition                                                                                                                 | ProductVariant
Product                                                                                                                         | ShippingMethod
ShipmentQuote                                                                                                                   | ShipmentItem
ShippingParcel                                                                                                                  | Shipment
ShippingProvider                                                                                                                | Shipping
CustomEmailSettings                                                                                                             | Metafield
Currency                                                                                                                        | Locale
Shop                                                                                                                            | Tag
TaxRates                                                                                                                        | Taxes
Templates                                                                                                                       | Translation

### Autovalue
ReactionCore provides two Autovalue [methods in `reactioncommerce:reaction-schemas`](https://github.com/reactioncommerce/reaction/blob/e9ddd6dee16573a86c30179b4f3427913b47287d/packages/reaction-schemas/common/globals.js).

```js
/**
 * Example Schema with Autovalue
 */

ReactionCore.Schemas.Example = new SimpleSchema({
  shopId: {
    type: String,
    index: 1,
    autoValue: ReactionCore.shopIdAutoValue,
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

#### ReactionCore.shopIdAutoValue
Used for schema injection autoValue of currentShopId.

#### ReactionCore.schemaIdAutoValue
Used for schema injection autoValue of a random id.

### Examples
#### Schema Definition

```js
/**
 * workflow schema for attaching to collection where
 * PackageWorkflow is controlling view flow
 * Shop defaultWorkflow is defined in Shop
 */

ReactionCore.Schemas.Workflow = new SimpleSchema({
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

#### Extending a Schema
This example extends the `ReactionCore.Schemas.PackageConfig` and adds new properties to the schema.

```js
ReactionCore.Schemas.PaypalPackageConfig = new SimpleSchema([
  ReactionCore.Schemas.PackageConfig, {
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

# Multiple Schemas
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

## Product Schema
In `reaction-collections`, we attach two different schemas to the same `Products` collection.

Multiple Schema Example:

```
Product = new SimpleSchema({
  _id: {
    type: String,
    optional: true
  },
  title: {
    type: String,
    defaultValue: ""
  },
  type: {
    label: "Type",
    type: String,
    defaultValue: "simple"
  },
  description: {
    type: String,
    defaultValue: "This is a simple product."
  }
});

ProductVariant = new SimpleSchema({
  _id: {
    type: String,
    optional: true
  },
  title: {
    type: String,
    defaultValue: ""
  },
  optionTitle: {
    label: "Option",
    type: String,
    optional: true
  },
  type: {
    label: "Type",
    type: String,
    defaultValue: "variant"
  },
  price: {
    label: "Price",
    type: Number,
    decimal: true,
    min: 0,
    optional: true,
    defaultValue: 5
  }
```

The multiple schemas are attached to the collection with a **selector option**.

```
ReactionCore.Collections.Products.attachSchema(ReactionCore.Schemas.Product,
  { selector: { type: "simple" } });
ReactionCore.Collections.Products.attachSchema(ReactionCore.Schemas.ProductVariant,
  { selector: { type: "variant" } });
```

However, now whenever we update a document in the `Products` collection, we need define a schema to use.

Applies a schema where `price` is a **Number**:

```
ReactionCore.Collections.Products.update("SMr4rhDFnYvFMtDTX", {
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

```
ReactionCore.Collections.Products.update("BCTMZ6HTxFSppJESk", {
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

```
ReactionCore.Collections.Products.update(
  {
    title: "This is a product", type: "simple"
  }, {
    $set: { description: "This is a modified product" }
  }
);
```

Provide selector in **update** statement:

```
ReactionCore.Collections.Products.update(
  { title: "Product One" },
  { $set: {
    description: "This is a modified product",
    type: 'simple' // selector in <update>
  }}
);
```

Provide selector as an **option**

```js
ReactionCore.Collections.Products.update(
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
ReactionCore.Collections.Products.insert({ title: "This is a product", type: "simple"});
```

Provide the schema selector as **options**

```js
ReactionCore.Collections.Products.insert({ title: "This is a product" }, { selector: { type: "simple" } });
```
