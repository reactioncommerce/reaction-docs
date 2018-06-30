---
original_id: collection-hooks
id: version-v1.1.0-collection-hooks
title: Collection Hooks
---
    
The [Reaction Collection hooks](https://github.com/reactioncommerce/reaction/blob/development/packages/reaction-collections/common/collections/hooks/hooks.js) extend [Mongo.Collection](http://docs.meteor.com/#/full/mongo_collection) with before/after hooks for insert, update, remove, find, and findOne.

Works across client, server or a mix. Also works when a client initiates a collection method and the server runs the hook, all while respecting the collection validators (allow/deny).

Collection hooks are provided by the `matb33:collection-hooks` Meteor package.

Detailed documentation can be found on the package repo: [matb33:collection-hooks](https://github.com/matb33/meteor-collection-hooks)

```js
const test = new Mongo.Collection("test");

# example before insert of test collection
test.before.insert(function (userId, doc) {
  doc.createdAt = Date.now();
});

# example before update of test collection
test.before.update(function (userId, doc, fieldNames, modifier, options) {
  modifier.$set = modifier.$set || {};
  modifier.$set.modifiedAt = Date.now();
});
```
