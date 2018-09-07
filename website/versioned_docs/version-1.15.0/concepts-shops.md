---
title: Shops
id: version-1.15.0-concepts-shops
original_id: concepts-shops
---

Reaction Commerce is a **multi-shop system**, which means that more than one shop can exist within the same installation. Most API calls require you to specify a shop or shops. But what exactly is a shop?

While you might think you intuitively know what a “shop” is, things can become fuzzy when there are complex scenarios like multiple frontend apps, or shops that sell items from other shops. In fact, it is really up to you to decide what you want a “shop” to be in your system. But there are also some rules you have to know to make this decision wisely.

In general, we recommend that you create **shops** to be unique groupings of items and/or payment settings. In doing so, be aware of the following:

- More than one domain name or frontend app (e.g., native mobile) can point to the same default shop. This is configurable.

- A web or mobile frontend app may allow browsing of multiple shops. This is configurable.

- Carts and orders belong to a single shop, but they may contain items and fulfillment groups for multiple shops if you enable this feature.

- A single user account can be configured to have access to multiple shops.

- A single order will result in multiple fulfillment groups (e.g., multiple shipments) in the system if it contains items from multiple shops.

- A single order will result in multiple payment charges in the system if it contains items from multiple shops.

During checkout, the payment methods for the default shop will be available, and the default shop payment service credentials will be used. But actual payment can be redirected to the shops that will be fulfilling the order, in cases where there are items from multiple shops in the same order.

## Shops and clients

Every client, whether it be website, desktop app, mobile app, or IoT button, has a default shop. In the simplest scenario, the default shop will be the shop with type **“primary”**, which might be the only shop.

While the ID of the default shop could be coded into the client, we recommend that each client query the GraphQL API on startup and let the server determine what the default shop should be.

Some clients may choose to allow you to visit other shops as well. For example, a website may show items from the default shop at `/` route but show items from another shop at `/shop/:slug` route.
