---
id: version-2.9.1-collections
title: Collections
original_id: collections
---

Meteor and Reaction store data in `collections`.
Collections are declared in a common location with [Mongo.Collection](http://docs.meteor.com/api/collections.html).

```js
import { Mongo } from "meteor/mongo";

SupportChats = new Mongo.Collection("supportchats");
```

Collections provide the following methods.

- [find](http://docs.meteor.com/api/collections.html#Mongo-Collection-find)
- [findOne](http://docs.meteor.com/api/collections.html#Mongo-Collection-findOne)
- [insert](http://docs.meteor.com/api/collections.html#Mongo-Collection-insert)
- [update](http://docs.meteor.com/api/collections.html#Mongo-Collection-update)
- [upsert](http://docs.meteor.com/api/collections.html#Mongo-Collection-upsert)
- [remove](http://docs.meteor.com/api/collections.html#Mongo-Collection-remove)
- [allow](http://docs.meteor.com/api/collections.html#Mongo-Collection-allow)
- [deny](http://docs.meteor.com/api/collections.html#Mongo-Collection-deny)

## Client Example

Listing products

**myTemplate.html**

```html
<template name="myTemplate">
  <ul>
    {{#each product in products}}
      <li>{{product.title}}</li>
    {{/each}}
  </ul>
</template>
```

**myTemplate.js**

```js
// Import Collections
import { Products } from "/lib/collections";

Template.myTemplate.onCreated(function () {
  this.subscribe("products");
});

Template.myTemplate.helpers(function () {
  products() {
    return Products.find({});
  }
});
```

See the [Meteor docs for collection find](http://docs.meteor.com/#/full/find).

## Server Example

**Server**

```js
import { Products } from "/lib/collections";

function updateProductTitle(productId, title) {
  Products.update(
    {
      _id: productId
    },
    {
      $set: {
        title
      }
    }
  );
}

// Register your method as a Meteor Method
Meteor.methods({
  "myNamespace/updateProductTitle": updateProductTitle
});
```

**Call from client or server**

```js
Meteor.call("myNamespace/updateProductTitle", "<product id>", "New Title");
```

See the [Meteor docs for collection updating](http://docs.meteor.com/#/full/update).

## Security

Client collection access is restricted through a Meteor [publication/subscription](http://docs.meteor.com/#/full/meteor_publish) model and policies implemented with the [ongoworks:meteor-security](https://github.com/ongoworks/meteor-security) package.

## Reaction Collections

Reaction Core collections defined in `lib/collections/collections.js` extend [Mongo.Collection](http://docs.meteor.com/#/full/mongo_collection) with additional functionality providing Auto Forms and Schemas using a frameworks of helper dependencies.

- [aldeed:AutoForm](https://github.com/aldeed/meteor-autoform)
- [aldeed:collection2](https://github.com/aldeed/meteor-collection2)
- [aldeed:simple-schema](https://github.com/aldeed/meteor-simple-schema)
- [matb33:collection-hooks](https://github.com/matb33/meteor-collection-hooks)

Collections and Schemas can be used to create or customize collections, including extending Reaction Core collections.

As a convenience, Collections and Schemas are attached to the Reaction export, so that you if you import Reaction, you can directly use the Collections and Schemas without importing them independently.

```js
// server api import
import Reaction from "/imports/plugins/core/core/server/Reaction";

const packages = Reaction.Collections.Packages.find({
  shopId: Reaction.getShopId(),
  "layout.workflow": workflow
});
```

Some of the [Reaction Collections](https://github.com/reactioncommerce/reaction/blob/v2.9.1/lib/collections/collections.js) are:

- Accounts
- AnalyticsEvents
- Cart
- Discounts
- Inventory
- Jobs
- Orders
- Packages
- Shipping
- Shops
- Tags
- Taxes

The [Reaction Commerce/hooks](https://www.npmjs.com/package/@reactioncommerce/hooks) extend [Mongo.Collection](http://docs.meteor.com/#/full/mongo_collection) with before/after hooks for `insert`, `update`, `remove`, `find`, and `findOne`.

### Attaching a schema

Example creation of the "Packages" collection:

```js
/**
 * Packages Collection
 */
export const Packages = new Mongo.Collection("Packages");

Packages.attachSchema(Schemas.PackageConfig);
```

Schemas provide validation, typing, and default definitions to enforce structure on the collections.
