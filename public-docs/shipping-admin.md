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

There are two types of restrictions, `allow` and `deny`.

### Destination Allow Rules

Every shipping method you wish to add restrictions to is required to have an `allow` restriction, which enables the method to ship to one or more destinations, whether that's one or more countries, regions, or postal codes.

Creating an `allow` restriction will allow the method to be shipped to any location inside the stated rule location.

- If you start at the highest level, `country`, then the method will ship to the entire country, including any region and postal code inside of it.
- If you start at the `region` (state) level, then it will ship to that region, and any postal code inside of it.
- If you start at the `postal` level, then you can only ship to that postal code.

Each of the above, country, region, and postal, are arrays, so multiple locations are allowed inside each restriction.

Each restriction can also apply to one or more shipping methods.

Example 1: Shipping method with the ID `stviZaLdqRvTKW6J5` is `allow`ed to ship to anywhere in the United States and Canada. This shipping method would be allowed to an address in Los Angeles or Toronto, but not an address in London.
```
[
  {
    "_id" : "allow001",
    "shopId" : "J8Bhq3uTtdgwZx3rz",
    "methodIds" : [
        "stviZaLdqRvTKW6J5"
    ],
    "type" : "allow",
    "destination" : {
        "country" : [
            "CA",
            "US"
        ]
    }
  }
]
```

Example 2: Shipping methods with the ID's `stviZaLdqRvTKW6J5` or `oSKoZBTrfbacmES8S` are `allow`ed to ship to anywhere in New Jersey or New York. This shipping method would be allowed to an address in New York City or Newark, but not an address in Los Angeles.
```
[
  {
    "_id" : "allow001",
    "shopId" : "J8Bhq3uTtdgwZx3rz",
    "methodIds" : [
        "stviZaLdqRvTKW6J5",
        "oSKoZBTrfbacmES8S"
    ],
    "type" : "allow",
    "destination" : {
        "region" : [
            "NJ",
            "NY"
        ]
    }
  }
]
```

Example 3: Shipping methods with the ID's `stviZaLdqRvTKW6J5` or `oSKoZBTrfbacmES8S` are `allow`ed to ship to anywhere in the zip codes `10001` or `10019`. This shipping method would be allowed to a couple postal codes in New York City, but not 90405, a postal code in Los Angeles. This example might be good for something like a courier service, where you restrict your service to a few block radius around your building.
```
[
  {
    "_id" : "allow001",
    "shopId" : "J8Bhq3uTtdgwZx3rz",
    "methodIds" : [
        "stviZaLdqRvTKW6J5",
        "oSKoZBTrfbacmES8S"
    ],
    "type" : "allow",
    "destination" : {
        "postal" : [
            "10001",
            "10019"
        ]
    }
  }
]
```


### Destination Deny Rules

Shipping methods *are not* required to have a `deny` restriction, but it does make creating rules easier when trying to restrict shipping to small regions, but allow it everywhere else. For example, allowing shipping to the contiguous United States, but not Alaska or Hawaii.

Creating an `deny` restriction will restrict the method from being shipped to any location inside the stated rule location. Checks are done in reverse order, to allow you to pinpoint smaller areas to restrict. Keeping in mind that the restriction already has an `allow` rule on it, we'll assume it's a `country` rule:

- If you deny at the `postal` level, then you can ship to anywhere in the allowed `country` except for that postal code.
- If you deny at the `region` level, then you can ship to anywhere in the allowed `country` except for that region.
- The country restriction wouldn't apply in this particular case, but if you deny at the `country` level, then you can ship to anywhere aside from that country. This might make sense in the future if we have a `universal` method, but doesn't come into play in the current environment.

Each of the above, country, region, and postal, are arrays, so multiple locations are allowed inside each restriction.

Each restriction can also apply to one or more shipping methods.

Example 1: Shipping method with the ID `stviZaLdqRvTKW6J5` is `allow`ed to ship to anywhere in the United States, but `deny`ed from shipping to Alaska or Hawaii. This shipping method would be allowed to an address in Los Angeles, but not an address in Honolulu.
```
[
  {
    "_id" : "allow001",
    "shopId" : "J8Bhq3uTtdgwZx3rz",
    "methodIds" : [
        "stviZaLdqRvTKW6J5"
    ],
    "type" : "allow",
    "destination" : {
        "country" : [
            "US"
        ]
    }
  },
  {
      "_id" : "deny001",
      "shopId" : "J8Bhq3uTtdgwZx3rz",
      "methodIds" : [
          "stviZaLdqRvTKW6J5"
      ],
      "type" : "deny",
      "destination" : {
          "region" : [
              "HI"
          ]
      }
  }
]
```

Example 2: Shipping method with the ID's `stviZaLdqRvTKW6J5` or `oSKoZBTrfbacmES8S` are `allow`ed to ship to anywhere in New York State, but `deny`ed from shipping to the zip codes `10001` or `10019`. This shipping method would be allowed to most addresses in New York State, unless they fall within those two postal codes. This example might be good for something like shipping alcohol to certain locations, which might be allowed in some parts of a state but not a certain city.
```
[
  {
    "_id" : "allow001",
    "shopId" : "J8Bhq3uTtdgwZx3rz",
    "methodIds" : [
        "stviZaLdqRvTKW6J5",
        "oSKoZBTrfbacmES8S"
    ],
    "type" : "allow",
    "destination" : {
        "region" : [
            "NY"
        ]
    }
  },
  {
      "_id" : "deny001",
      "shopId" : "J8Bhq3uTtdgwZx3rz",
      "methodIds" : [
        "stviZaLdqRvTKW6J5",
        "oSKoZBTrfbacmES8S"
      ],
      "type" : "deny",
      "destination" : {
          "postal" : [
              "10001",
              "10019"
          ]
      }
  }
]
```


### Attribute Deny Rules

Shipping methods are also able to be restricted depending on attributes of the cart, or items in the cart. These attributes are added as a new array inside the existing restriction. Multiple attributes can be added, and we treat this as an `and` operator, meaning if multiple attributes are present, the cart or item must match all the attributes for the restriction to trigger.

Attribute restrictions can be added independently, or combined with destination restrictions to create a destination specific attribute restriction. For example, you are not allowed to ship knives to New York.


Example 1: Shipping method with the ID `stviZaLdqRvTKW6J5` is `allow`ed to ship to anywhere in the United States, but `deny`ed from shipping products that are made by `Restricted Vendor Services`.
```
[
  {
    "_id" : "allow001",
    "shopId" : "J8Bhq3uTtdgwZx3rz",
    "methodIds" : [
        "stviZaLdqRvTKW6J5"
    ],
    "type" : "allow",
    "destination" : {
        "country" : [
            "US"
        ]
    }
  },
  {
    "_id" : "deny001",
    "shopId" : "J8Bhq3uTtdgwZx3rz",
    "methodIds" : [
        "stviZaLdqRvTKW6J5"
    ],
    "type" : "deny",
    "attributes" : [
      {
        property: "vendor",
        value: "Restricted Vendor Services",
        propertyType: "string",
        operator: "eq"
      }
    ]
  }
]
```

Example 2: Shipping method with the ID `stviZaLdqRvTKW6J5` is `allow`ed to ship to anywhere in the United States, but `deny`ed from shipping products that weigh over 50 pounds.
```
[
  {
    "_id" : "allow001",
    "shopId" : "J8Bhq3uTtdgwZx3rz",
    "methodIds" : [
        "stviZaLdqRvTKW6J5"
    ],
    "type" : "allow",
    "destination" : {
        "country" : [
            "US"
        ]
    }
  },
  {
    "_id" : "deny001",
    "shopId" : "J8Bhq3uTtdgwZx3rz",
    "methodIds" : [
        "stviZaLdqRvTKW6J5"
    ],
    "type" : "deny",
    "attributes" : [
      {
        property: "weight",
        value: 50,
        propertyType: "int",
        operator: "gt"
      }
    ]
  }
]
```

Example 3: Shipping method with the ID `stviZaLdqRvTKW6J5` is `allow`ed to ship to anywhere in the United States, but `deny`ed from shipping products that weigh over 50 pounds and are less than 19.99 each. This example might be good for something like disallowing a free shipping method for heavy items unless the item cost makes up for lack of shipping cost.
```
[
  {
    "_id" : "allow001",
    "shopId" : "J8Bhq3uTtdgwZx3rz",
    "methodIds" : [
        "stviZaLdqRvTKW6J5"
    ],
    "type" : "allow",
    "destination" : {
        "country" : [
            "US"
        ]
    }
  },
  {
    "_id" : "deny001",
    "shopId" : "J8Bhq3uTtdgwZx3rz",
    "methodIds" : [
        "stviZaLdqRvTKW6J5"
    ],
    "type" : "deny",
    "attributes" : [
      {
        property: "weight",
        value: 50,
        propertyType: "int",
        operator: "gt"
      },
      {
        property: "price",
        value: 19.99,
        propertyType: "float",
        operator: "lt"
      }
    ]
  }
]
```

Example 4: Shipping method with the ID `stviZaLdqRvTKW6J5` is `allow`ed to ship to anywhere in the United States, but `deny`ed from shipping knives to New York State. The knife is still allowed to ship to any of the other 49 states.
```
[
  {
    "_id" : "allow001",
    "shopId" : "J8Bhq3uTtdgwZx3rz",
    "methodIds" : [
        "stviZaLdqRvTKW6J5"
    ],
    "type" : "allow",
    "destination" : {
        "country" : [
            "US"
        ]
    }
  },
  {
    "_id" : "deny001",
    "shopId" : "J8Bhq3uTtdgwZx3rz",
    "methodIds" : [
        "stviZaLdqRvTKW6J5"
    ],
    "type" : "deny",
    "attributes" : [
      {
        property: "productType",
        value: "knife",
        propertyType: "string",
        operator: "eq"
      }
    ],
    destination: {
      region: [
        "NY"
      ]
    }
  }
]
```
