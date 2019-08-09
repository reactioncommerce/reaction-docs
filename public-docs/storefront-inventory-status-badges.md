---
id: storefront-inventory-status-badges
title: Show inventory status badges
---

This article is part of the [Storefront UI Development Guide](./storefront-intro.md).
- Previous Task: [Build an account management page](./storefront-account-management.md)
- Next Task: *None*

`CatalogProduct`s, `CatalogProductVariant`s, and `CartItem`s have a few inventory status fields available through GraphQL: `isSoldOut`, `isLowQuantity`, and `isBackordered`. You may want to use these to display badges on the product listing page, the product details page, and the cart list. If you are using certain UI components from the Example Storefront Component Library, they may show a badge automatically if you are including the status fields in your query.

We recommend the following logic for badge display if you write such logic yourself:
- If `isBackordered`, show "backordered" badge.
- Else if `isSoldOut`, show "sold out" badge.
- Else if `isLowQuantity`, show "low quantity" badge.

The order of checks is important because when `isBackordered` is `true`, the other two fields will likely also be `true`, and you would not want a product to appear sold out when backordering is enabled for it.

> If possible you should use the [InventoryStatus](https://designsystem.reactioncommerce.com/#!/InventoryStatus) component from the Example Storefront Component Library, which automatically handles these status checks.
