# Products
## Product Methods
Product methods can be found in [reaction-core/server/methods/products/methods.js](https://github.com/reactioncommerce/reaction/blob/development/packages/reaction-core/server/methods/products.js)

### products/createProduct
The createProduct method creates a new product with an empty variant. All products have at least one variant with pricing and details. This method can only be triggered by users with an admin role.

Usage:

```
Meteor.call "products/createProduct", (error, productId) ->
  if error
    # do something if error
  else
    # do something on successful callback
```

createProduct returns the insert callback from the newly created product. As with all [meteor inserts](https://docs.meteor.com/#insert), this callback includes an error object as the first argument and, if no error, the _id of the new document as the second.

### products/cloneProduct
The cloneProduct method clones a whole product, including all variants and images. This method can only be triggered by users with an admin role.

Usage:

```
Meteor.call "products/cloneProduct", productId, (error, newCloneId) ->
  if error
    # do something if error
  else
    # do something on successful callback
```

cloneProduct takes a product object (the one you want to clone) and returns the insert callback from the newly created clone. As with all [meteor inserts](https://docs.meteor.com/#insert), this callback includes an error object as the first argument and, if no error, the _id of the new document as the second.

_Note: In the future we are going to implement an inheritance product that maintains relationships with the cloned product tree_

### deleteProduct
The deleteProduct method removes a product and unlinks it from all media. This method can only be triggered by users with an admin role. While you can use it directly, it is worth noting that we provide a maybeDeleteProduct helper, which adds a layer of confirmation and alerts around the deletion process.

Usage:

```
Meteor.call "products/deleteProduct", productId, (error, result) ->
  if error
    # do something if error
  else
    # do something on successful callback
```

deleteProduct takes a product _id and returns an error object as well as a result, which is true if the removal was successful or false if not.

### updateProductField
The updateProductField method updates a single product field.

Usage:

```
Meteor.call "products/updateProductField", productId, field, value, (error, result) ->
  if error
    # do something if error
  else
    # do something on successful callback
```

products/updateProductField takes a product id, a field name, and a value and updates that single product field. It then returns the meteor [update callback](https://docs.meteor.com/#update).

### updateProductTags
The updateProductTags method inserts or updates tags with hierarchy.

Usage:

```
Meteor.call "products/updateProductTags", productId, tagName, tagId, (result) ->
  unless result
    # do something if error
  # do something on successful callback
```

products/updateProductTags will insert if given only tagName and will update existing if given tagName and tagId.

### products/removeProductTag
The removeProductTag method removes a single tag from a product, but preserves the tag in the database if in use elsewhere in the system.

Usage:

```
Meteor.call "products/removeProductTag", productId, tagId, (result) ->
  unless result
    # do something if error
  # do something on successful callback
```

products/removeProductTag takes a product id and tag id and returns false if called by a non-admin user.

### products/setHandleTag
The setHandleTag method toggles (sets or unsets) the handle for a given product. The product handle defines the direct url path for that product.

Usage:

```
Meteor.call "products/setHandleTag", productId, tagId, (handle) ->
  unless handle
    # do something if error
  # do something on successful callback
```

products/setHandleTag takes a product id and a tag id, set that tag to the handle for the product and returns the handle, which is a string of the slug.

### products/updateProductPosition
The products/updateProductPosition method updates a products position in the display grid. Position is an object with tag, position, and dimensions.

Usage:

```
Meteor.call "products/updateProductPosition", productId, positionData
```

products/updateProductPosition takes a product id and a position object.

### products/updateMetaFields
The updateMetaFields method updates the meta fields for a product. Meta fields consist of a title and a value, for example "Material", "100% Cotton".

Usage:

```
Meteor.call "products/updateMetaFields", productId, updatedMeta
```

products/updateMetaFields takes a product id and a meta object that includes a key ("Material") and a value ("100% Cotton").

### products/createVariant
The products/createVariant method initializes an empty variant template for a product. All other variants are clones and so this should only be seen when all variants have been deleted from a product.

Usage:

```
Meteor.call "updateMetaFields", productId
```

### products/cloneVariant
The products/cloneVariant method copies variants, but will also create and clone child variants (options)

Usage:

```
# to clone a variant
Meteor.call "products/cloneVariant", productId, variantId

# to create a child option from a variant
Meteor.call "products/cloneVariant", productId, variantId, parentId
```

products/cloneVariant takes a product id, a variant id to clone a variant. Adding a parent id will make the new clone as an option of that parent.

### products/updateVariant
The products/updateVariant method updates an individual variant with new values and merges into the original.

Usage:

```
Meteor.call "products/updateVariant", variant
```

updateVariant takes a variant object which only needs to include fields which are being updated.

### products/updateVariants
The updateVariants method updates a whole variants array.

Usage:

```
Meteor.call "products/updateVariants", variants
```

products/updateVariants takes a whole variant array object and updates the included fields.
