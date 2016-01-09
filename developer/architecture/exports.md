# Exports
This is an evolving topic right now.

Input appreciated.

## Globals
_core/common/packageGlobals.js:_

```javascript
// exported, global/window scope
ReactionCore = {};
ReactionCore.Schemas = {}; // Schemas defined in common/schemas
ReactionCore.Collections = {}; //Collections defined in common/collections
ReactionCore.Helpers = {}; //Misc.helpers defined in common/helpers
ReactionCore.MetaData = {}; // SEO, Metadata object
ReactionCore.Locale = {}; //i18n translation object
ReactionCore.Log = {}; // Logger instantiation (server)
```

> In the future we may implement ReactionCore.methods

_core/common/collections/products.js:_

```javascript
ReactionCore.Collections.Product = new Mongo.Collection("Product");
# etc...
```

The `reaction-core` package exports `ReactionCore`, on both client and server:
