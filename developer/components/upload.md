# Upload

The Upload component provides you an interface to uploading files into reaction using [CollectionsFS](https://github.com/CollectionFS/Meteor-CollectionFS).

### Using the component

Property                       | Type     | Description
------------------------------ | -------- | -----------------------------------------------------------------------------
[onUpload]                     | Function | Callback function that has one parameter, `files`, which is an array of `file` objects that may be inserted into the `Media` collection.

##### Example (Client) (Blaze)

###### myTemplate.html
```
<template name="myTemplate">
  {{> upload onUpload=handleFileUpload}}
</template>
```

###### myTemplate.js
```
const Media = ReactionCore.Collections.Media;

Template.myTemplate.helpers({
  handleFileUpload() {
    const userId = Meteor.userId();
    const shopId = ReactionCore.getShopId();

    return (files) => {
      for (let file of files) {
        file.metadata = {
          type: "asset",
          ownerId: userId,
          shopId: shopId
        };

        Media.insert(file);
      }
    };
  }
});
```
