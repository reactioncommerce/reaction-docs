---
id: version-2.9.1-devs-understanding-commonorder
title: Understanding CommonOrder
original_id: devs-understanding-commonorder
---

In Reaction, the `Cart` and `Order` schemas are similar but with several key differences. But there are often calculations for taxes, shipping, and such that need to happen for both types of entities, and it can be overly complex to write such calculation functions in a way that takes into account all of the differences between carts and orders.

To solve this problem, we introduced a third entity type, the `CommonOrder`, as well as transformations that can convert carts and orders to one or more `CommonOrders`.

The best way to fully understand what a `CommonOrder` looks like is to examine its schema. But here's a brief summary:
- Carts and Orders can contain multiple fulfillment groups and items from multiple shops, but a `CommonOrder` is limited to just a single fulfillment for a single shop. Roughly speaking, each fulfillment group on a cart or order is converted to one `CommonOrder`.
- Carts have a single list of items while Orders have an item list per fulfillment group. Since a `CommonOrder` represents just one fulfillment group, it has just one list of items.
- A `CommonOrder` has a limited subset of fields, focusing on order properties that are useful for calculations.
- A `CommonOrder` may have `billingAddress`, `shippingAddress`, or `originAddress` properties, if each is known.
- `CommonOrder.sourceType` is set to either "cart" or "order", allowing you to check what entity was converted into the `CommonOrder` when it truly matters. The `CommonOrder` has `cartId` and/or `orderId` properties on it, providing a link back to the source entities. (`orderId` will be `null` when created from a cart and `cartId` may be `null` when created from an order, if the order was not placed from a cart.)
