# Collections
Collections are implemented in the [reactioncommerce:reaction-collections](https://github.com/reactioncommerce/reaction/tree/development/packages/reaction-collections) package.

[AutoForm, collection2, simple-schema](https://github.com/aldeed/meteor-autoform) packages provide functionality for defining forms, collections and schemas.

You can extend core collections, schemas in Reaction. You can also create your own collections.

Example of extending a core schema:

```
ReactionCore.Schemas.BraintreePackageConfig = new SimpleSchema([
  ReactionCore.Schemas.PackageConfig
  {
    "settings.mode":
      type: Boolean
      defaultValue: false
    "settings.merchant_id":
      type: String
      label: "Merchant ID"
    "settings.public_key":
      type: String
      label: "Public Key"
    "settings.private_key":
      type: String
      label: "Private Key"
  }
])
```
