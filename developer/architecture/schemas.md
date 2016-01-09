# Schemas
`ReactionCore.Schemas` are implemented by the [reactioncommerce:reaction-schemas](https://github.com/reactioncommerce/reaction/tree/development/packages/reaction-schemas) package.

Schemas use the [simple-schema](https://github.com/aldeed/meteor-simple-schema) package.

> A simple, reactive schema validation package for Meteor. It's used by the Collection2 and AutoForm packages, but you can use it by itself, too.

## Schema Definition

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

## Extending a Schema
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

## Autovalue
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

### ReactionCore.shopIdAutoValue
Used for schema injection autoValue of currentShopId.

### ReactionCore.schemaIdAutoValue
Used for schema injection autoValue of a random id.
