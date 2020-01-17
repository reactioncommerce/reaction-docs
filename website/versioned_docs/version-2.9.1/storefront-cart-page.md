---
id: version-2.9.1-storefront-cart-page
title: Build a cart page
original_id: storefront-cart-page
---

This article is part of the [Storefront UI Development Guide](./storefront-intro.md).
- Previous Task: [Add a way to add an item to a cart](./storefront-add-to-cart.md)
- Next Task: [Implement cart modification](./storefront-cart-modification.md)

After a shopper has clicked "Add to Cart", they are going to want to now see their cart. This could be a sidebar component, a modal, or a full page. Either way, the data loading is similar. You will do one query for cart data, with pagination on the `cart.items` connection.

```graphql
query anonymousCartByCartIdQuery($cartId: ID!, $token: String!, $itemsAfterCursor: ConnectionCursor) {
  cart: anonymousCartByCartId(cartId: $cartId, token: $token) {
    items(first: 20, after: $itemsAfterCursor) {
      ...CartItemConnectionFragment
    }
  }
}
```

Typically we recommend an infinite scrolling style pagination for cart items. When the user is scrolling and nears the bottom of the list, refetch this query with `itemsAfterCursor` variable set to the `cursor` from the last item's edge.

Next Task: [Implement cart modification](./storefront-cart-modification.md)
