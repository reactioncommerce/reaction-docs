---
id: version-2.9.1-storefront-order-view-page
title: Build an order view page
original_id: storefront-order-view-page
---

This article is part of the [Storefront UI Development Guide](./storefront-intro.md).
- Previous Task: [Build a checkout page](./storefront-checkout-page.md)
- Next Task: [Add ability to log in](./storefront-login.md)

After you successfully place an order at the end of a checkout flow, you'll typically want to display that final order to the shopper as a sort of confirmation page. We recommend building this as a generic "order view" page, which can serve as a confirmation/thank you page as well as a page to link to from order emails, where the shopper can view the current order, shipment tracking information, order status, and more.

If you're following along creating your storefront UI in the recommended order, then you haven't added the ability to log in yet. Just as with carts, when you create an anonymous order (any order that is placed without authentication in the request header) you get back a token that you'll need to access that order again in the future. It isn't always necessary to store that token anywhere, but you can keep it in temporary or persistent application state if you need to.

For our purposes, we'll assume that upon successfully creating an order, you will redirect to your order view page with both the order `referenceId` and the `token` in the URL. When loading the page, you'll use the `orderByReferenceId` GraphQL query to get the order data.

```graphql
query orderByReferenceId($id: ID!, $shopId: ID!, $token: String) {
  order: orderByReferenceId(id: $id, shopId: $shopId, token: $token) {
    _id
    account {
      _id
    }
    email
    fulfillmentGroups {
      _id
      data {
        ... on ShippingOrderFulfillmentGroupData {
          shippingAddress {
            address1
            address2
            city
            company
            country
            fullName
            isCommercial
            phone
            postal
            region
          }
        }
      }
      items {
        nodes {
          _id
          imageURLs {
            thumbnail
          }
          isTaxable
          optionTitle
          parcel {
            containers
            distanceUnit
            height
            length
            massUnit
            weight
            width
          }
          price {
            displayAmount
          }
          productConfiguration {
            productId
            productVariantId
          }
          productSlug
          productType
          productVendor
          productTags {
            nodes {
              name
            }
          }
          quantity
          subtotal {
            displayAmount
          }
          title
          variantTitle
        }
      }
      selectedFulfillmentOption {
        fulfillmentMethod {
          displayName
        }
        handlingPrice {
          displayAmount
        }
        price {
          displayAmount
        }
      }
      summary {
        fulfillmentTotal {
          displayAmount
        }
        itemTotal {
          displayAmount
        }
        surchargeTotal {
          displayAmount
        }
        taxTotal {
          displayAmount
        }
        total {
          displayAmount
        }
      }
      type
    }
    payments {
      _id
      amount {
        displayAmount
      }
      billingAddress {
        address1
        address2
        city
        company
        country
        fullName
        isCommercial
        phone
        postal
        region
      }
      displayName
      method {
        name
      }
    }
    referenceId
    totalItemQuantity
  }
}
```

Next Task: [Add ability to log in](./storefront-login.md)
