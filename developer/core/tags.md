# Tags
Tags are used on Products, and are cross referenced to provide navigation data stored in the `Tags` collection.

## Tag Methods
### tags/updateHeaderTags
The `tags/updateHeaderTags` method inserts or updates navigation tags taking into account hierarchy.

Usage:

```
Meteor.call "tags/updateHeaderTags", tagName, tagId, currentTagId
```

If given only `tagName`, `tags/updateHeaderTags` will insert a new top level tag. If given `tagName` and `tagId`, `tags/updateHeaderTags` will update an existing tag. Adding `currentTagId` will give parental hierarchy.

### tags/removeHeaderTag
The `tags/removeHeaderTag` method removes a tag from the navigation. It also checks to make sure the tag isn't in use elsewhere before removing it completely from the system.

Usage:

```
Meteor.call "tags/updateHeaderTags", tagId, currentTagId (error) ->
  if error
    # do something if error
```

`tags/removeHeaderTag` takes a tag id (`tagId`) and optionally the id of the parent tag (`currentTagId`) and returns an error object if something goes wrong. If `currentTagId` is present, then `tagId` is removed as a related tag. Either way the method checks to see if `tagId` is in use elsewhere in the system, and if not the tag is removed completely.
