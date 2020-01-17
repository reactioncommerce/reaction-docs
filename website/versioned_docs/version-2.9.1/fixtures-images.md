---
id: version-2.9.1-fixtures-images
title: How To: Upload images as data fixtures
original_id: fixtures-images
---

## Step 1: Make images available as static server assets

Place your images in your application's `private` directory, e.g. like this:

```sh
-- ./private
    |-- ./data
        |-- ./Products.json
        |-- ./Shipping.json
        |-- ./Shops.json
        |-- ./Tags.json
        |-- ./product-images
            |-- ./BCTMZ6HTxFSppJESk.jpg
            |-- ./GpZM5v5qQBCdXsoqW.jpg
            |-- ./gygxrADdPPWoCCmS7.jpg
            |-- ./h2v7MYCXBtjMm7Piv.jpg
            |-- ./ioKwBYk6Nom9K92cv.jpg
```

The idea behind the cryptic names of the product images is to have them related to the product IDs in Products.json. This allows us to easily identify which image is for which product.

Notice: Because the images can only be loaded through the Meteor Assets API, it's important for now, that the fixture data lives under the private folder of your root application (not within the plugin folder itself). This is necessary, because assets (non-code files) can't be loaded via the ES6 `import` keyword, resp. `require` function.

## Step 2: Import the images into Media collection during application startup

**Install dependency**

```sh
meteor npm install buffer-stream-reader --save
```

Every time the application starts, we want to check if each product has its corresponding image imported already. That can be achieved through adding a Reaction hook:

**/server/loadProductImages.js**

```js
import bufferStreamReader from "buffer-stream-reader";
import Hooks from "@reactioncommerce/hooks";
import { FileRecord } from "@reactioncommerce/file-collections";
import { Products } from "/lib/collections";
import { Media } from "/imports/plugins/core/files/server";

function getTopVariant(productId) {
  const topVariant = Products.findOne({
    ancestors: { $in: [productId] },
    "ancestors.1": { $exists: false }
  });
  return topVariant;
}

async function storeFromAttachedBuffer(fileRecord) {
  const { stores } = fileRecord.collection.options;
  const bufferData = fileRecord.data;

  // We do these in series to avoid issues with multiple streams reading
  // from the temp store at the same time.
  try {
    for (const store of stores) {
      if (fileRecord.hasStored(store.name)) {
        return Promise.resolve();
      }

      // Make a new read stream in each loop because you can only read once
      const readStream = new bufferStreamReader(bufferData);
      const writeStream = await store.createWriteStream(fileRecord);
      await new Promise((resolve, reject) => {
        fileRecord.once("error", reject);
        fileRecord.once("stored", resolve);
        readStream.pipe(writeStream);
      });
    }
  } catch (error) {
    throw new Error("Error in storeFromAttachedBuffer:", error);
  }
}

function addProductImage(product) {
  const filepath = `data/product-images/${product._id}.jpg`;
  const binary = Assets.getBinary(filepath);
  const buffer = new Buffer(binary);
  const fileName = `${product._id}.jpg`;
  const fileRecord = new FileRecord({
    original: {
      name: fileName,
      size: buffer.length,
      type: "image/jpeg",
      updatedAt: new Date()
    }
  });
  fileRecord.attachData(buffer);

  const topVariant = getTopVariant(product._id);
  const { shopId } = product;
  fileRecord.metadata = {
    productId: product._id,
    variantId: topVariant._id,
    toGrid: 1,
    shopId,
    priority: 0,
    workflow: "published"
  };

  Promise.await(Media.insert(fileRecord));
  Promise.await(storeFromAttachedBuffer(fileRecord));
}

Hooks.Events.add("afterCoreInit", () => {
  Products.find({ type: "simple" }).forEach(product => {
    if (!Promise.await(Media.findOne({ "metadata.productId": product._id }))) {
      addProductImage(product);
    }
  });
});
```
