---
id: version-2.9.1-storefront-intro
title: Storefront UI Development Overview
original_id: storefront-intro
---

Reaction Commerce is a headless commerce platform, which means that its focus is on providing a top-notch server API rather than on UI. But this doesn't mean you're completely on your own.

There is a built-in user interface for shop operators and admins, which supports plugins and should work well for many shops. We refer to this as the "operator UI". If you prefer, you can build your own operator UI or adapt one that you already have.

For your storefront — your public-facing website or app on which consumers browse your catalog, manage their account, and purchase items — Reaction assumes that you will build your own UI to meet your needs. For those who want to get going fast, Reaction plans to provide example storefronts that you can use as starting points. These are UI projects that we expect you to fork and modify. Currently, there is one such project, the [example storefront](https://github.com/reactioncommerce/example-storefront).

However, if you already have a storefront UI or if the example projects are not to your liking, then you can connect any UI of your choosing to the Reaction API. If this describes your organization, then this guide is for you. It will walk you through everything that is necessary to build or adapt a storefront to use Reaction for its data.

In general, you'll want to do the following tasks in roughly this order:

1. [Add and configure Apollo Client](./storefront-apollo-client.md)
2. [Build a product listing page](./storefront-product-listing-page.md)
3. [Build a product detail page](./storefront-product-detail-page.md)
4. [Build navigation menus](./storefront-nav-menus.md)
5. [Add a way to add an item to a cart](./storefront-add-to-cart.md)
6. [Build a cart page](./storefront-cart-page.md)
7. [Implement cart modification](./storefront-cart-modification.md)
8. [Build a checkout page](./storefront-checkout-page.md)
9. [Build an order view page](./storefront-order-view-page.md)
10. [Add ability to log in](./storefront-login.md)
11. [Build an account management page](./storefront-account-management.md)

This guide will walk you through how to complete these tasks in a general, framework-agnostic way. While we don't care which UI framework you use, which component libraries you use, or how you manage app state, we do have two recommendations that will save you time.
- Use [Apollo Client](https://www.apollographql.com/docs/react/) to interact with the Reaction GraphQL API when possible.
- Use React storefront components from the [Example Storefront Component Library](https://designsystem.reactioncommerce.com) wherever you can. In many cases, these components do much of the heavy lifting for you, encapsulating logic that would require much effort to implement correctly without them.

[Start Building](./storefront-apollo-client.md)
