# Revision Control

> *Deprecation warning:* Revision Control was part of Reaction until version 1.12. When changes are made to a product, a collection hook in `/imports/plugins/core/revisions/server/hooks.js` is fired and diverts most changes bound for the `Products` collection to a document in the `Revisions` collection.