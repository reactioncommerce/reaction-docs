# Collections
Meteor and Reaction store data in `collections`.  Collections are declared with [Mongo.Collection](http://docs.meteor.com/#/full/mongo_collection) which provides `find`,`findOne`,`update`,`upsert`, `remove` methods.

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
import { Template } from "meteor/templating";
import { Collections } from "meteor/reactioncommerce:reaction-collections";

Template.myTemplate.onCreated(function () {
  this.subscribe("products");
});

Template.myTemplate.helpers(function () {
  products() {
    return Collections.Products.find({});
  }
});
```

See the [Meteor docs for collection find](http://docs.meteor.com/#/full/find).

## Server Example
**Server**

```js
import { Collections } from "meteor/reactioncommerce:reaction-collections";

function updateProductTitle(productId, title) {
  Collections.Products.update({
    _id: productId
  }, {
    $set: {
      title
    }
  });
}
```

```js
// Register you method as a Meteor Method
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
Reaction Core collections are defined in the [reactioncommerce:reaction-collections](https://github.com/reactioncommerce/reaction/tree/development/packages/reaction-collections) package.

**reaction-collections** extends [Mongo.Collection](http://docs.meteor.com/#/full/mongo_collection) with a framework of Forms, Collections and Schemas, using these dependencies:
- [aldeed:AutoForm](https://github.com/aldeed/meteor-autoform)
- [aldeed:collection2](https://github.com/aldeed/meteor-collection2)
- [aldeed:simple-schema](https://github.com/aldeed/meteor-simple-schema)
- [matb33:collection-hooks](https://github.com/matb33/meteor-collection-hooks)

Collections and Schemas can be used to create or customize collections, including extending Reaction Core collections.

In Reaction, we export the namespaced `ReactionCore.Collections` as a prefix for our collections.

Some of the [ReactionCore.Collections](https://github.com/reactioncommerce/reaction/blob/development/packages/reaction-collections/common/collections/collections.js) are:
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

The [ReactionCore Collection hooks](https://github.com/reactioncommerce/reaction/blob/development/packages/reaction-collections/common/collections/hooks/hooks.js) extend [Mongo.Collection](http://docs.meteor.com/#/full/mongo_collection) with before/after hooks for insert, update, remove, find, and findOne.

Example creation of the "Packages" collection:

```js
/**
* ReactionCore Collections Packages
*/
ReactionCore.Collections.Packages = new Mongo.Collection("Packages");
```

Schemas provide validation, typing, and default definitions to enforce structure on the collections.

Example attaching Schema to a Collection:

```js
/**
* ReactionCore Collections Packages
*/
ReactionCore.Collections.Packages = new Mongo.Collection("Packages");

ReactionCore.Collections.Packages.attachSchema(ReactionCore.Schemas.PackageConfig);
```
