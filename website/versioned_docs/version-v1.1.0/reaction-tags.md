---
original_id: reaction-tags
id: version-v1.1.0-reaction-tags
title: Tags
---
    
Tags are used on Products, and are cross referenced to provide navigation data stored in the `Tags` collection.

## Tag Methods

### shop/updateHeaderTags

The `shop/updateHeaderTags` method inserts or updates navigation tags taking into account hierarchy.

Usage:

```js
Meteor.call("shop/updateHeaderTags", tagName, tagId, currentTagId);
```

If given only `tagName`, `shop/updateHeaderTags` will insert a new top level tag. If given `tagName` and `tagId`, `shop/updateHeaderTags` will update an existing tag. Adding `currentTagId` will give parental hierarchy.
