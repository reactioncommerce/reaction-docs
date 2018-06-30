---
id: version-v1.7.0-fixtures-images
title: Tutorial: Upload images as data fixtures
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

The idea behind the cryptic names of the product images is to have them related to the product ids in Products.json. This allows us to easily identify which image goes to which product.

Notice: Because the images can only be loaded through the Meteor Assets API, it's important for now, that the fixture data lives under the private folder of your root application (not within the plugin folder itself). This is necessary, because assets (non-code files) can't be loaded via the ES6 `import` keyword, resp. `require` function.

## Step 2: Import the images into Media collection during application startup

Every time the application starts, we want to check if each product has its corresponding image imported already. That can be achieved through adding a Reaction hook:

**/server/init.js**

```js
import { Hooks } from "/server/api";
import { Products, Media } from "/lib/collections";


function getTopVariant(productId) {
  const topVariant = Products.findOne({
    "ancestors": { $in: [productId] },
    "ancestors.1": { $exists: false }
  });
  return topVariant;
}

Hooks.Events.add("afterCoreInit", () => {
  const products = Products.find({ type: "simple" }).fetch();
   for (const product of products) {
     const productId = product._id;
     if (!Media.findOne({ "metadata.productId": productId })) {
       const shopId = product.shopId;
       const filepath = "data/product-images/" + productId + ".jpg";
       const binary = Assets.getBinary(filepath);
       const fileObj = new FS.File();
       const fileName = `${productId}.jpg`;
       fileObj.attachData(binary, { type: "image/jpeg", name: fileName });
       fileObj.metadata = {
         productId: productId,
         toGrid: 1,
         shopId: shopId,
         priority: 0,
         workflow: "published"
       };
       Media.insert(fileObj);

       const topVariant = getTopVariant(productId);
       fileObj.metadata = {
         productId: productId,
         variantId: topVariant._id,
         toGrid: 1,
         shopId: shopId,
         priority: 0,
         workflow: "published"
       };
       Media.insert(fileObj);
     }
   }
});
```
