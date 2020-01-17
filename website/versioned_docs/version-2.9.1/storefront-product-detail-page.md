---
id: version-2.9.1-storefront-product-detail-page
title: Build a product detail page
original_id: storefront-product-detail-page
---

This article is part of the [Storefront UI Development Guide](./storefront-intro.md).
- Previous Task: [Build a product listing page](./storefront-product-listing-page.md)
- Next Task: [Build navigation menus](./storefront-nav-menus.md)

A product detail page generally needs only one query for its data. For a more complex storefront, you may have additional queries to other systems for related data that appears on the page.

Here's a typical query to start with:

```graphql
query catalogItemProductQuery($slugOrId: String!) {
  catalogItemProduct(slugOrId: $slugOrId) {
    product {
      _id
      productId
      title
      slug
      description
      vendor
      isLowQuantity
      isSoldOut
      isBackorder
      pricing {
        displayPrice
      }
      media {
        URLs {
          thumbnail
          small
          medium
          large
          original
        }
      }
      tags {
        nodes {
          name
        }
      }
      variants {
        _id
        variantId
        title
        optionTitle
        pricing {
          compareAtPrice {
            displayAmount
          }
          displayPrice
        }
        canBackorder
        inventoryAvailableToSell
        isBackorder
        isSoldOut
        isLowQuantity
        options {
          _id
          variantId
          title
          pricing {
            compareAtPrice {
              displayAmount
            }
            displayPrice
          }
          optionTitle
          canBackorder
          inventoryAvailableToSell
          isBackorder
          isSoldOut
          isLowQuantity
          media {
            URLs {
              thumbnail
              small
              medium
              large
              original
            }
          }
        }
        media {
          URLs {
            thumbnail
            small
            medium
            large
            original
          }
        }
      }
    }
  }
}
```

The `slugOrId` variable will typically be a product slug from the URL. So for example you product list component would have a link somewhere on each list item, which would go to a `/product/:productSlug` route, where you would perform the above query passing the `productSlug` from the URL as the `slugOrId` variable.

From there, it is simply a matter of arranging the data on the page to match your storefront design. You will eventually want an "Add to Cart" button somewhere on the page, but we'll add that later.

Next Task: [Build navigation menus](./storefront-nav-menus.md)
