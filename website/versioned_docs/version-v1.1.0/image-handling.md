---
original_id: image-handling
id: version-v1.1.0-image-handling
title: Images
---
    
We are using [CollectionFs](https://github.com/CollectionFS/Meteor-CollectionFS)  for file uploading handling.  There is a [CFS GraphicsMagick](https://github.com/CollectionFS/Meteor-cfs-graphicsmagick) package that handles resizing images when they are uploaded.

Media collections are defined in `/lib/collections/collectionFS.js`.

Example use in Template:

```handlebars
  {{#with media}}
    <div class="center-cropped" style="background-image: url('{{url}}');">
      <img src="{{url}}" class="product-grid-item-images img-responsive">
    </div>
  {{else}}
    <div class="center-cropped" style="background-image: url('/resources/placeholder.gif');">
      <img src= "/resources/placeholder.gif" class="product-grid-item-images img-responsive">
    </div>
  {{/with}}
```
