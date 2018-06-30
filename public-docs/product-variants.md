---
id: product-variants
title: Product Variants
---
    
## Schemas

In `lib/collections`, we attach two different schemas to the same `Products` collection.

The full schema can be found in `lib/collections/schemas/products.js`

**An example of the product - variant multiple schema**

```js
export const Product = new SimpleSchema({
  _id: {
    type: String,
    optional: true
  },
  title: {
    type: String,
    defaultValue: ""
  },
  type: {
    label: "Type",
    type: String,
    defaultValue: "simple"
  },
  description: {
    type: String,
    defaultValue: "This is a simple product."
  }
});

export const ProductVariant = new SimpleSchema({
  _id: {
    type: String,
    optional: true
  },
  title: {
    type: String,
    defaultValue: ""
  },
  optionTitle: {
    label: "Option",
    type: String,
    optional: true
  },
  type: {
    label: "Type",
    type: String,
    defaultValue: "variant"
  },
  price: {
    label: "Price",
    type: Number,
    decimal: true,
    min: 0,
    optional: true,
    defaultValue: 5
  }
```

Most of the fields are pretty obvious, but here are some of the non-obvious fields contained in the product schema explained.

### Product

- **ancestors: Array** ancestors array for product is always empty in current version
- **price: String** variants' price range, it is needed for denormalizing variants prices to display it in `productGrid`
- **isLowQuantity: Boolean** indicates when at least one of variants' `inventoryQuantity` is lower than their `lowInventoryWarningThreshold`. Used to display 'Limited Supply' label in UI
- **isSoldOut: Boolean** indicates when all variants' `inventoryQuantity` is zero
- **isBackorder: Boolean** Indicates when the seller has allowed the sale of product which is not in stock

### ProductVariant

- **ancestors: Array** contains ancestors of item. Currently it could be one or two `_ids`
- **index: Number** position relative to other variants, similarly to index in array. This is needed for moving variants through list (i.e. drag'n'drop)
- **minOrderQuantity: Number** restricts the minimum quantity which can be ordered. It is used inside cart `quantityProcessing` function
- **inventoryPolicy: Boolean** if `false` it means items should always be sale-able regardless of inventory (we take backorders). if `true` then we warn when less than threshold, and stop accepting orders at 0
- **lowInventoryWarningThreshold: Number** the count below which the variant is considered 'limited'
