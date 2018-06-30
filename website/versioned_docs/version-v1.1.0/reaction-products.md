---
original_id: reaction-products
id: version-v1.1.0-reaction-products
title: Products
---
    
## Product Methods

Core Product methods are defined in `server/methods/catalog.js`.

### products/createProduct

The createProduct method creates a new product with an empty variant. All products have at least one variant with pricing and details. This method can only be triggered by users with an admin role.

Usage:

```js
Meteor.call("products/createProduct", (error, productId) => {
  if (error) {
    throw new Meteor.Error("create-product-error", error);
  }
  // do something on successful callback
});
```

`products/createProduct` returns the insert callback from the newly created product. As with all [meteor inserts](https://docs.meteor.com/#insert), this callback includes an error object as the first argument and, if no error, the \_id of the new document as the second.

### products/cloneProduct

The cloneProduct method clones a whole product, including all variants and images. This method can only be triggered by users with an admin role.

Usage:

```js
Meteor.call("products/cloneProduct", products, function (error, result) {
  // callback processing
});
```

cloneProduct takes a product object (the one you want to clone) and returns the insert callback from the newly created clone. As with all [meteor inserts](https://docs.meteor.com/#insert), this callback includes an error object as the first argument and, if no error, the \_id of the new document as the second.

_Note: In the future we are going to implement an inheritance product that maintains relationships with the cloned product tree_

### products/deleteProduct

The `products/deleteProduct` method removes a product and unlinks it from all media. This method can only be triggered by users with an admin role. While you can use it directly, it is worth noting that we provide a maybeDeleteProduct helper, which adds a layer of confirmation and alerts around the deletion process.

Usage:

```js
Meteor.call("products/deleteProduct", productIds, function (error, result) {
  // callback processing
});
```

deleteProduct takes a product \_id and returns an error object as well as a result, which is true if the removal was successful or false if not.

### products/updateProductField

The `products/updateProductField` method updates a single product field.

Usage:

```js
Meteor.call("products/updateProductField", productId, "hashtags", _.uniq(tagIds));
```

`products/updateProductField` takes a product id, a field name, and a value and updates that single product field. It then returns the meteor [update callback](https://docs.meteor.com/#update).

### products/updateProductTags

The `products/updateProductTags` method inserts or updates tags with hierarchy.

Usage:

```js
import { ReactionProduct } from "/lib/api";

Meteor.call("products/removeProductTag", ReactionProduct.selectedProductId(), this._id);
```

`products/updateProductTags` will insert if given only tagName and will update existing if given tagName and tagId.

### products/removeProductTag

The `products/removeProductTag` method removes a single tag from a product, but preserves the tag in the database if in use elsewhere in the system.

Usage:

```js
Meteor.call("products/removeProductTag", productId, tag._id, function (error) {
  if (error) {
    Alerts.toast(i18next.t("productDetail.tagExists"), "error");
   }
 });
```

`products/removeProductTag` takes a product id and tag id and returns false if called by a non-admin user.

### products/setHandleTag

The `products/setHandleTag` method toggles (sets or unsets) the handle for a given product. The product handle defines the direct url path for that product.

Usage:

```js
import { ReactionProduct } from "/lib/api";
import { Reaction } from "/client/api";

Meteor.call("products/setHandleTag", ReactionProduct.selectedProductId(), this._id, (error, result) => {
  if (!error) {
    Reaction.Router.go("product", { handle: result });
  }
});
```

`products/setHandleTag` takes a product id and a tag id, set that tag to the handle for the product and returns the handle, which is a string of the slug.

### products/updateProductPosition

The `products/updateProductPosition` method updates a products position in the display grid. Position is an object with tag, position, and dimensions.

Usage:

```js
Meteor.call("products/updateProductPosition", productId, positionData);
```

`products/updateProductPosition` takes a product id and a position object.

### products/updateMetaFields

The `products/updateMetaFields` method updates the meta fields for a product. Meta fields consist of a title and a value, for example "Material", "100% Cotton".

Usage:

```js
Meteor.call("products/updateMetaFields", productId, updatedMeta);
```

### products/removeMetaFields

The `products/removeMetaFields` method removes a meta field object from the product. Meta fields consist of a title and a value, for example "Material", "100% Cotton".

Usage:

```js
Meteor.call("products/removeMetaFields", productId, metafield);
```

`products/updateMetaFields` takes a product id and a meta object that includes a key ("Material") and a value ("100% Cotton").

### products/createVariant

The `products/createVariant` method initializes an empty variant template for a product. All other variants are clones and so this should only be seen when all variants have been deleted from a product.

Usage:

```js
Meteor.call("products/createVariant", productId;)
```

### products/cloneVariant

The `products/cloneVariant` method copies variants, but will also create and clone child variants (options)

Usage:

```js
# to clone a variant
Meteor.call("products/cloneVariant", productId, variantId);

# to create a child option from a variant
Meteor.call "products/cloneVariant", productId, variantId, parentId);
```

`products/cloneVariant` takes a product id, a variant id to clone a variant. Adding a parent id will make the new clone as an option of that parent.

### products/updateVariant

The `products/updateVariant` method updates an individual variant with new values and merges into the original.

Usage:

```js
Meteor.call("products/updateVariant", variant);
```

`products/updateVariant` takes a variant object which only needs to include fields which are being updated.

### products/updateVariants

The `products/updateVariants` method updates a whole variants array.

Usage:

```js
Meteor.call("products/updateVariants", variants);
```

`products/updateVariants` takes a whole variant array object and updates the included fields.
