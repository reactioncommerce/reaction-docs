# Schemas
Schemas are implemented in the [reactioncommerce:reaction-schemas](https://github.com/reactioncommerce/reaction/tree/development/packages/reaction-schemas) package.

Schemas use the [simple-schema](https://github.com/aldeed/meteor-simple-schema) package.

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
