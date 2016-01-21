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
