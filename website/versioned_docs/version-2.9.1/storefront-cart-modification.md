---
id: version-2.9.1-storefront-cart-modification
title: Implement cart modification
original_id: storefront-cart-modification
---

This article is part of the [Storefront UI Development Guide](./storefront-intro.md).
- Previous Task: [Build a cart page](./storefront-cart-page.md)
- Next Task: [Build a checkout page](./storefront-checkout-page.md)

Now that a shopper can view their cart, they'll likely want to change it. They already have the ability to add additional items to it, but at some point they'll want to change the quantity for an item or remove it entirely. We'll implement those actions in this task. There are additional cart mutations that will happen during a checkout flow, which we'll implement later.

## Change the quantity for a cart item

The quantity change mutation is usually invoked by clicking a quantity increment or decrement button or entering or clicking a specific quantity. Regardless of what you do for the UI, all you need to do is figure out what new quantity the shopper wants, and then pass it to the `updateCartItemsQuantity` mutation.

```graphql
mutation updateCartItemsQuantityMutation($input: UpdateCartItemsQuantityInput!) {
  updateCartItemsQuantity(input: $input) {
    cart {
      ...CartFragment
    }
  }
}
```

Where the `input` variable looks like this:

```js
{
  cartId, // from application state
  items: [
    { cartItemId, quantity }
  ],
  token // from application state
}
```

`cartItemId` is the `item._id` and `quantity` is the new desired quantity, which must be an integer of 0 or greater. A quantity of `0` removes the item, but we recommend calling the `removeCartItems` mutation instead.

## Remove a cart item

Removing a cart item is usually done by clicking a "Remove" button on the cart item UI. This should invoke the `removeCartItems` mutation.

```graphql
mutation removeCartItemsMutation($input: RemoveCartItemsInput!) {
  removeCartItems(input: $input) {
    cart {
      ...CartFragment
    }
  }
}
```

Where the `input` variable looks like this:

```js
{
  cartId, // from application state
  cartItemIds: [],
  token // from application state
}
```

`cartItemIds` is an array of IDs from `item._id`.

Next Task: [Build a checkout page](./storefront-checkout-page.md)
