---
title: Fulfillment
id: version-1.15.0-concepts-fulfillment
original_id: concepts-fulfillment
---

Broadly, the term “fulfillment” refers to the way in which shoppers choose to receive the items they order, and the process of completing (fulfilling) that order. To properly understand fulfillment, you must understand the many related terms we use for different aspects of fulfillment.

## Fulfillment Types

A **fulfillment type** is an identifier that categorizes a certain way in which an order for an item can be fulfilled. The built-in fulfillment types are **“shipping”**, **“pickup”**, and **“digital”**.

Every product variant (catalog item) has a list of available fulfillment types. If a catalog item can be fulfilled in more than one way (e.g., shipping or pickup), then a shopper is shown a selector during checkout, allowing her to choose the fulfillment type she prefers.

The fulfillment type also determines which user interface components are shown to a shopper during checkout. For example, a client may show a shipping address form for items with the “shipping” type, and a pickup time and location form for items with the “pickup” type.

## Fulfillment Groups

Items in a cart, and ultimately in an order, are divided into **fulfillment groups**. As soon as items are added to a cart, they are divided into one group per combination of shop and fulfillment type.

For example, let’s say you add the following items to a cart:

- Shoes from shop A, only available by shipping
- Socks from shop A, only available by pickup
- A scarf from shop B, only available by shipping

This will result in the following auto-created fulfillment groups:

- A “Shop A, shipping type” group with the shoes item in it
- A “Shop A, pickup type” group with the socks item in it
- A “Shop B, shipping type” group with the scarf item in it

After items are initially placed into a group, they may be moved to another group by the shopper, if the client user interface provides a way to do this. In the previous example, if the socks had two supported fulfillment types, shipping and pickup, then they would initially be placed in the “Shop A, shipping type” group with the shoes item, but the shopper could move them to a new “Shop A, pickup type” group.

## Fulfillment Methods

A **fulfillment method** is one potential method of fulfillment within a particular fulfillment type. For example, there might be two methods for the “shipping” type, “Free Shipping” and “Flat Rate USPS”. During checkout, a shopper is able to choose between these two methods for each fulfillment group that has the “shipping” type.

Some fulfillment types may only have a single fulfillment method associated with them, in which case the shopper would not see any choice during checkout.

## Fulfillment Quotes

A **fulfillment quote** represents the current price of a single fulfillment method, for a specific cart. The price may be a fixed amount or may be calculated based on the “from” and “to” addresses, the parcel dimensions, discounts, and other factors. Thus, as the items in a fulfillment group change, the fulfillment quotes for that group are updated and can also change.

The price may also be comprised of multiple prices, for example, shipping and handling. These prices are separated for tax or accounting purposes, but may or may not be shown separated to the shopper.

## Fulfillment Options

A **fulfillment option** is a fulfillment method with a quote attached. It is the thing that links the quote and the method together, and to the cart they’re for.
