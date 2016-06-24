# Tags
Tags are used on Products, and are cross referenced to provide navigation data stored in the `Tags` collection.

## Tag Methods
### tags/updateHeaderTags
The `tags/updateHeaderTags` method inserts or updates navigation tags taking into account hierarchy.

Usage:

```js
Meteor.call("tags/updateHeaderTags", tagName, tagId, currentTagId);
```

If given only `tagName`, `tags/updateHeaderTags` will insert a new top level tag. If given `tagName` and `tagId`, `tags/updateHeaderTags` will update an existing tag. Adding `currentTagId` will give parental hierarchy.
