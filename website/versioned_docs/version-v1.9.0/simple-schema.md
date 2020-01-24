---
id: version-v1.9.0-simple-schema
title: Schemas
original_id: simple-schema
---

Reaction uses [MongoDB](https://docs.mongodb.com/manual/), which is a schemaless database. This allows maximum flexibility, particularly important when quickly reacting to the design challenges that uniquely different customizations require in the course of an ecommerce operation.

However, we don't want to just get completely crazy, so we define a **schema** that is attached to the previously schemaless collection. These schemas apply basic content and structure validation, also very necessary in ecommerce.

As we apply each additional layer of structure, it's good to remember that there are usually server methods to bypass these layers as well.

## Definition and import

Schemas are implemented using the [simpl-schema](https://github.com/aldeed/simple-schema-js) NPM package.

Reaction.Collections are defined in the common code of `lib/collections`, where the SimpleSchemas defined in [`lib/collections/schemas`](https://github.com/reactioncommerce/reaction/tree/v1.8.0/lib/collections/schemas) are attached. View all schemas in the [API Docs](http://api.docs.reactioncommerce.com/schemas.html).

Custom schemas can also be defined in individual packages, by creating a `lib/collections/schemas` folder inside your package.

## Registering

All schemas should be registered using the [`registerSchema()`](http://api.docs.reactioncommerce.com/module-collections.html#~registerSchema) method that Reaction uses internally to register all of our core Schemas.

```js
import SimpleSchema from "simpl-schema";
import { registerSchema } from "@reactioncommerce/reaction-collections";

const MyNewSchema = new SimpleSchema({
  _id: {
    type: SimpleSchema.Integer,
    label: "ID"
  },
  name: {
    type: String,
    label: "Name of thing"
  },
  description: {
    type: String,
    label: "Description of thing",
    optional: true
  }
});

registerSchema("MyNewSchema", MyNewSchema);
```

All registered schemas can be retrieved by importing `getSchemas`, and then using [`getSchemas()`](http://api.docs.reactioncommerce.com/module-collections.html#~getSchemas).

```js
import { getSchemas } from "@reactioncommerce/reaction-collections";

return getSchemas();
```

## Importing

Schemas should be imported to use:

```js
import * as Schemas from "/lib/collections/schemas";
```

or an individual schema definition:

```js
import { PackageConfig } from "/lib/collections/schemas/registry";
```

### Reaction Schemas

View all schemas in the [API Docs](http://api.docs.reactioncommerce.com/schemas.html).

| [Reaction.Schemas](https://github.com/reactioncommerce/reaction/tree/v1.9.0/lib/collections/schemas) | \*                |
| ---------------------------------------------------------------------------------------------------- | ----------------- |
| Email                                                                                                | Address           |
| Accounts                                                                                             | CartItem          |
| CartItem                                                                                             | CartItems         |
| Cart                                                                                                 | DiscountType      |
| DiscountRules                                                                                        | Discounts         |
| Layout                                                                                               | OrderItem         |
| OrderTransaction                                                                                     | Order             |
| Permissions                                                                                          | Workflow          |
| PackageConfig                                                                                        | CorePackageConfig |
| PaymentMethod                                                                                        | Invoice           |
| Payment                                                                                              | VariantMedia      |
| ProductPosition                                                                                      | ProductVariant    |
| Product                                                                                              | ShippingMethod    |
| ShipmentQuote                                                                                        | ShipmentItem      |
| ShippingParcel                                                                                       | Shipment          |
| ShippingProvider                                                                                     | Shipping          |
| CustomEmailSettings                                                                                  | Metafield         |
| Currency                                                                                             | Locale            |
| Shop                                                                                                 | Tag               |
| TaxRates                                                                                             | Taxes             |
| Templates                                                                                            | Translation       |

### Automatic Values

Reaction provides `autoValue` helpers in [`/lib/collections/schemas/helpers.js`](https://github.com/reactioncommerce/reaction/blob/v1.8.0/lib/collections/schemas/helpers.js).

```js
/**
 * Example Schema with autoValue
 */
import SimpleSchema from "simpl-schema";
import { createdAtAutoValue, shopIdAutoValue } from "/lib/collections/schemas/helpers";

export const SchemaExample =  new SimpleSchema({
  shopId: {
    type: String,
    index: 1,
    autoValue: shopIdAutoValue,
    label: "Example shopId"
  },
  createdAt: {
    type: Date,
    autoValue: createdAtAutoValue
  }
});
```

| Helper method            |      Return value                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------- |
| `createdAtAutoValue`     | Date representing now, if it's an insert                                              |
| `updatedAtAutoValue`     | Date representing now                                                                 |
| `shopIdAutoValue`        | Current shopId                                                                        |
| `shopIdAutoValueForCart` | Current shopId for a cart                                                             |
| `schemaIdAutoValue`      | A `Random.id()` only if not already set on the server, or if inserting on the client. |
| `shopDefaultCountry`     | The country value from the default shop                                               |

### Examples

#### Schema Definition

```js
import { SimpleSchema } from "meteor/aldeed:simple-schema";

export const Workflow = new SimpleSchema({
  "status": {
    type: String,
    defaultValue: "new"
  },
  "workflow": {
    type: Array,
    optional: true
  },
  "workflow.$": String
});
```

### Creating a New Schema Starting From an Existing

This example extends the `Schemas.PackageConfig` and adds new properties to the schema.

```js
import SimpleSchema from "simpl-schema";
import { PackageConfig } from "/lib/collections/schemas/registry";

export const PaypalPackageConfig = PackageConfig.clone().extend({
  // Remove blackbox: true from settings obj
  "settings": {
    type: Object,
    optional: true,
    blackbox: false,
    defaultValue: {}
  },
  "settings.express_enabled": {
    type: Boolean,
    defaultValue: true
  },
  "settings.merchantId": {
    type: String,
    label: "Merchant ID",
    optional: true
  }
});
```

### Extending or Overriding an Existing Schema

In the previous example, we cloned an existing schema to use it as the starting point for a new schema. In other cases, you might want to skip the clone and actually mutate the original schema. This allows you to adjust the schema in a way that will be respected by all code that uses it, without that code even needing to realize that you've made adjustments.

```js
import SimpleSchema from "simpl-schema";
import { CartItem } from "/lib/collections/schemas";

CartItem.extend({
  "mySpecialCartProp": {
    type: String,
    optional: true
  }
});
```

### Replacing the Schema Attached to a Collection

If you don't want to mutate the schema attached to a collection, you can instead attach a different schema of your own making.

```js
import { Cart } from "/lib/collections";

// import or create myCustomSchema

Cart.attachSchema(myCustomSchema, { replace: true });
```

## Getting the Schema for a Collection

In order to make sure that you are never circumventing any schema replacement that other plugins might have done, you should always pull a schema off of its collection rather than importing it directly.

### Incorrect

```js
import { Cart } from "/lib/collections/schemas";

Cart.validate(someObj);
```

This is bad because if some plugin did `Cart.attachSchema(myCustomSchema, { replace: true })`, you would still be using the default schema rather than the custom one it attached.

### Correct

```js
import { Cart } from "/lib/collections";

Cart.simpleSchema(someObj).validate(someObj);
```

This is correct because (a) it pulls the schema off the collection using `Cart.simpleSchema(someObj)`, and (b) it passes the object to `simpleSchema` function to get the correct schema back if multiple have been attached. Refer to [Multiple Schemas](#multiple-schemas) section.

## Multiple Schemas

Multiple Schema functionality allows us to use different schemas for different documents within the same collection.

To work with multi-schema you need to specify the selector. You can do this by several ways:

- If object contains selector (it should because selector should be required):

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

However, now whenever we update a document in the `Products` collection, we need to tell it which schema to use.

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

It's important to note that collections do not enforce structure, so nothing will stop you from updating a product with a `"type:simple"`, using the `"type:variant"` schema.

### Updates

Updates where the _selector is not provided must have the selector in the update statement_.

Provide selector in **query**:

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
