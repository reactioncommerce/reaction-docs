---
id: developer-catalog
title: Catalogs
---

In Reaction, an operator creates and edits products and variants of those products, but none of this is visible on the storefront until the product is **published**. Publishing is a single button click for the operator, but let's look at what actually happens in the code.

1. The UI calls the `publishProductsToCatalog` GraphQL mutation, passing an array of product IDs.
    - Provided by the `catalog` plugin
    - `/imports/plugins/core/catalog/server/no-meteor/mutations/publishProducts.js`
    - If you need to, you can call this from elsewhere in API server code as `context.mutations.publishProducts(context, productIds)`
1. Publication will fail if any of the product IDs are not found in the `Products` collection in the database.
1. Permission is checked. You must have `createProduct` permission for every shop that is associated with any of the products, OR you must have `createProduct` permission for the primary shop.
1. If all products exist and you have proper permissions, then the products and their variants are looked up, transformed, and put into the `Catalog` collection.

## Converting a product to a catalog product

In the `Products` collection, the top-level product and its sellable variants and options are each separate documents. In the `Catalog` collection, these are all combined into a single document, and some of the field names are different.

The combining and transforming is owned by the "Catalog" plugin and happens in `/imports/plugins/core/catalog/server/no-meteor/utils/createCatalogProduct.js`

## Determining if a product has changes that need to be published

Not everything about a product is published to catalogs, but many properties are. When those properties are later changed by a shop operator, it can be helpful to query to find out which products have changes that need to be published. For this purpose, each top-level `Products` document has two hash fields on it, `currentProductHash` and `publishedProductHash`. These are object hashes of all publishable fields from the top-level product and all of its variants and options. `publishedProductHash` is updated only when publishing the product while `currentProductHash` is updated whenever any published field changes in the `Products` document.

If you need to show an indicator of published status for a product or find unpublished documents, simply compare `currentProductHash` to `publishedProductHash`. If they are not exactly equal, then there are changes since the product was last published.

## Querying the catalog

To query for the catalog from a storefront UI, call the `catalogItems` GraphQL query. This returns only catalog items and products where `isVisible` is `true` and `isDeleted` is not `true`.

You can also call the `catalogItemProduct` GraphQL query to get a single catalog item if you know the product slug or ID.
