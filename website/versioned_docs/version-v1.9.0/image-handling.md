---
id: version-v1.9.0-image-handling
title: Images
original_id: image-handling
---
    
We are using [Reaction FileCollections](https://github.com/reactioncommerce/reaction-file-collections) for file uploading, downloading, and transformation.

## The Media FileCollection

There is just one `MeteorFileCollection` named `Media`, which is defined in `/imports/plugins/core/files`. The related server setup is in `/imports/plugins/core/files/server/fileCollections.js`.

The `Media` FileCollection is available in both client code and server code with a similar API.

Importing in a client code file:

```js
import { Media } from "/imports/plugins/core/files/client";
```

Importing in a server code file:

```js
import { Media } from "/imports/plugins/core/files/server";
```

The normal `Mongo.Collection` that backs the `Media` FileCollection is imported like any other collection:

```js
import { MediaRecords } from "/lib/collections";
```

Use `Media` when you want to work with `FileRecord` instances. Use `MediaRecords` directly if you just want to modify the collection data directly, either for performance or convenience.

## Changing the Binary Data Store

By default, GridFS is used to store the actual file data (as opposed to the information about the file, which is what is stored in the `MediaRecords` collection). GridFS stores the binary data in MongoDB collections.

If you'd like to use a different store, such as a cloud storage service, this is relatively easy. Refer to [Reaction FileCollections](https://github.com/reactioncommerce/reaction-file-collections) documentation. Then import your storage adapter and change all of the `new GridFSStore` in `/imports/plugins/core/files/server/fileCollections.js` to `new YourCustomStore`.

## Image Transformation

The [Sharp](http://sharp.pixelplumbing.com/en/stable/) package handles resizing images when they are uploaded. Refer to the `imgTransforms` array and the `transformWrite` functions in `/imports/plugins/core/files/server/fileCollections.js`. For more details about `transformWrite`, refer to [Reaction FileCollections](https://github.com/reactioncommerce/reaction-file-collections) documentation.
