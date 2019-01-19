---
id: shipping-admin
title: Shipping
---

Reaction comes with a simple flat rate shipping plugin. To manage your shipping rates, click on the **Shipping icon** <i class="rui font-icon fa fa-truck"></i>.

Your store comes with three default shipping methods: `Free`, `Standard`, and `Priority`. To edit any of these rates, click on the row. To delete a rate, click on **Delete**.

Confused? See [Concepts: Fulfillment](concepts-fulfillment.md)

## Tutorial: How To Configure Flat Rate Shipping in Reaction

[![Tutorial: How To Configure Shipping in Reaction](/assets/guide-shipping-video-screenshot.png)](https://www.youtube.com/watch?v=fiR_kV1GBdg)

## Adding a new shipping method

![](/assets/admin-dashboard-shipping-2.png "Reaction Commerce Shipping")

1. Click the plus <i class="font-icon fa fa-plus"></i>.
2. Fill out the following:

    - Method Name: A unique (per shop) identifier
    - Cost: The cost, as a shop owner, to ship this item.
    - Public Label: How your rate name appears to your customers.
    - Handling: The handling price to charge for this shipping method at checkout.
    - Group: Choose `Ground`, `Priority`, `One Day` or `Free`.
    - Rate: The shipping price to charge for this shipping method at checkout.
    - Enabled: Check this to enable this option.

3. Click **Save Changes**.

## Shipping Restrictions

Operators have the ability to allow and restrict available shipping options based on nearly any aspect of an cart, whether that's an item attribute (i.e. products with the tag `Hazardous` are not shippable, they are pick-up only), a blanket destination restriction (i.e. no shipping to Hawaii), a price limit (i.e. we only ship orders above $100), or a combination of these (i.e. no live plants can be sent to California).

Shipping restrictions can apply universally to all shipping methods (i.e. products with the tag `Hazardous` are not shippable), or select methods (i.e. `Method A` and `Method B` do not ship to Hawaii, but `Method C` does).

Out-of-the-box, shipping methods can be allowed or restricted based on the following item data: 
  - `attributes` - Attributes attached to an item
  - `parcel` dimensions:
    - `height`,`weight`,`width`,`length`
  - `price` - Price per item
  - `productVendor`
  - `quantity` - The number of items of this kind in an order
  - `subtotal` - `price` * `quantity`
  - `tags` - any tag attached to an item
  - `title` -The name of the top-level parent product
  - `variantTitle` - The name of the variant
And the following customer data:
  - shipping destination
    - `postal` code
    - `region`
    - `country`
    
### `Deny` restrictions

Using `type: deny` is saying that this shipping method (or all methods) are not allowed when *all* critera on this restriction are met.

    
### `Allow` restrictions

Using `type: allow` is essentially saying that every other combination of attributes & destinations are not allowed, except for what is explicitely listed here.

Currently, there is no way for an operator to add shipping restrictions via the Operator UI. We are working to build this into our Operator 2.0. Shipping Restrictions can be added to the `FlatRateFulfillmentResctrictions` collection, via a `Mongo` client:


```
{
    "_id" : "allow002",
    "shopId" : "J8Bhq3uTtdgwZx3rz",
    "methodIds" : [ 
        "n3LRFAxTa7ZHYSzAX"
    ],
    "type" : "allow",
    "destination" : {
        "country" : [ 
            "US"
        ]
    }
}
```
