# Schemas
Schemas are implemented by the [reactioncommerce:reaction-schemas](https://github.com/reactioncommerce/reaction/tree/development/packages/reaction-schemas) package.

Schemas use the [simple-schema](https://github.com/aldeed/meteor-simple-schema) package.

> A simple, reactive schema validation package for Meteor. It's used by the Collection2 and AutoForm packages, but you can use it by itself, too.

_Example Schema Definition_

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
