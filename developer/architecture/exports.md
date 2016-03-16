# Export
## Namespaces
There is a measure of [built in namespacing already provided by Meteor.](http://docs.meteor.com/#/full/namespacing).

Meteor constructs: `Session`, `Meteor.methods`, `Meteor.publish/subscribe`, `Mongo.Collection` are global.

`globals` defined in the packages are scoped to the package, unless [exported](http://docs.meteor.com/#/full/pack_export).

## Exports
`reaction/packages/reaction-core/common/global.js` configures the `ReactionCore` global.

The `reaction-core` package exports `ReactionCore`, on both client and server:

```javascript
// exported, global/window scope
ReactionCore = {};
ReactionCore.Schemas = {}; // Schemas defined in common/schemas
ReactionCore.Collections = {}; // Collections defined in common/collections
ReactionCore.Helpers = {}; // Misc.helpers defined in common/helpers
ReactionCore.Locale = {}; // i18n translation object
ReactionCore.Log = {}; // Logger instantiation (server)
```

## Meteor 1.3
> Future Alert: Exporting ReactionCore.methods

Upcoming Meteor 1.3 will bring support for `import`, `export` and `require`.
