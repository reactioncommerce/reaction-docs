---
title: Marketplace Plugin (Meteor)
id: version-1.15.0-core-plugins-marketplace
original_id: core-plugins-marketplace
---

Every Reaction Commerce installation inherently supports multiple shops: almost all entities and permissions are scoped by shop ID. But there is no relationship between these shops and they do not mix.

If you are interested in creating a marketplace experience, there is an experimental alpha plugin in [`/imports/plugins/included/marketplace`](https://github.com/reactioncommerce/reaction/tree/v1.15.0/imports/plugins/included/marketplace) that allows you to create shops that are “merchant” shops belonging to another shop. Use this at your own risk and expect to have to customize it a bit.

With the marketplace feature enabled, shoppers are able to add items from multiple merchant shops to a single cart. The cart is still associated with a single shop, which is referred to as the **“primary”** shop. Each Reaction installation may have only one primary shop. All of the items and tags from the merchant shops are combined on the primary shop.

When items from multiple shops are added to a cart, it results in the cart (and eventually the order) having **multiple fulfillment groups** and **multiple payments**. Each shop that has items in the cart will have its own fulfillment group and its own payment. Each payment is a separate charge in Stripe (marketplace only works with Stripe payment plugin), so that each payment can be captured after each shop fulfills its piece of the order (the items in its fulfillment group). The charges are all created with the primary shop’s Stripe API keys, but use Stripe Connect to associate each charge with the Stripe account for the merchant shop and to apply an application fee if needed.

A single marketplace cart still becomes a single order, but merchant shops have limited permissions to modify that order. In particular, they can set the status of their fulfillment groups and capture or refund their payments.

<!-- ## Marketplace Stripe Card Payment Method

TODO -->
