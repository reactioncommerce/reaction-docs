---
id: version-3.0.0-simple-schema
title: Schemas
original_id: simple-schema
---

Reaction uses [MongoDB](https://docs.mongodb.com/manual/), which is a schemaless database. This allows maximum flexibility, particularly important when quickly reacting to the design challenges that uniquely different customizations require in the course of an ecommerce operation.

However, we don't want to just get completely crazy, so we define a **schema** that is attached to the previously schemaless collection. These schemas apply basic content and structure validation, also very necessary in ecommerce.

Schemas are implemented using the [simpl-schema](https://github.com/aldeed/simple-schema-js) NPM package. In most cases the schemas can be kept private to the plugin that creates them. Typically, you will import them into a mutation function and validate a document before inserting or updating it.

```js
OrderSchema.validate(order); // Will throw a validation error if invalid
await Orders.insertOne(order);
```

An update example:

```js
OrderSchema.validate(modifier, { modifier: true });

const { value: updatedOrder } = await Orders.findOneAndUpdate(
    { _id: orderId },
    modifier,
    { returnOriginal: false }
  );
```
