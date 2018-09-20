---
id: version-1.16.0-reaction-payments
title: Payments
original_id: reaction-payments
---
    
Payment methods are one of the most common packages that developers need to create, especially when migrating from another platform.

The [Creating a Payment Provider](creating-a-payment-provider.md) tutorial was created to try and make this process as easy as possible for developers new to Reaction. It should be used as a guide in making all payment methods as consistent as possible so that they are usable by the largest number of users.

Reaction currently comes packaged with [Stripe](payment-packages-stripe.md).

## Transactions

Most Reaction payment packages can support these transaction types. They all do things a little differently, so please be sure to read each individual payment packages docs.

- authorize

> Most credit-card processors have a two-step process to allow for different payment models. You should read your merchant agreement and the documentation to get the specifics but typically the authorize stage will do a check of the customer's payment method (credit or debit card) and allocate that amount to you. To the consumer it looks like the charge has already gone through, and their balance is reduced by the allocated amount, however no funds will actually be transferred. Typically an authorization will expire after a set number of days, and you will need to re-authorize in order to perform a capture. In a typical hard-goods shipment scenario, an authorize will be performed at time of order.

- capture

> A capture is a transaction performed against a previously authorized transaction, and it tells the payment processor to transfer the actual funds. Most payment providers allow for a capture amount to be equal to or less than the authorization amount (i.e. giving a discount post-authorization, but pre-capture). Some payment processors allow you to authorize and capture in one step, which is why the authorize method takes a transactionType parameter. In a typical hard-goods shipment scenario, a capture will be performed at time of shipment.

- refund

> This method is self-explanatory. Most payment processors will only allow refunds to be performed on captured payments, not on authorized payments.

- refunds (list)

> This method should query for a list of refunds and these refunds will show up in the dashboard when managing orders.

## Hooks

Payments trigger order completion by using a `method hook` in `server/methods/core/hooks/cart.js`.

```js
import { Meteor } from "meteor/meteor";
import { Cart } from "/lib/collections";
import { Logger, MethodHooks } from "/server/api";

// Meteor.after to call after
MethodHooks.after("cart/submitPayment", function (options) {
  // if cart/submit had an error we won't copy cart to Order
  // and we'll throw an error.
  Logger.info("MethodHooks after cart/submitPayment", options);
  // Default return value is the return value of previous call in method chain
  // or an empty object if there's no result yet.
  let result = options.result || {};
  if (typeof options.error === "undefined") {
    let cart = Cart.findOne({
      userId: Reaction.getUserId()
    });
    // update workflow
    Meteor.call("workflow/pushCartWorkflow", "coreCartWorkflow",
      "paymentSubmitted");

    if (cart) {
      if (cart.items && cart.billing[0].paymentMethod) {
        const orderId = Meteor.call("cart/copyCartToOrder", cart._id);
        // Return orderId as result from this after hook call.
        // This is done by extending the existing result.
        result.orderId = orderId;
      } else {
        throw new Meteor.Error(
          "An error occurred verifing payment method. Failed to save order."
        );
      }
    }
  }
  return result;
});
```

## Methods

### cart/submitPayment (server, client)

Saves a submitted payment to cart, triggers workflow and adds "paymentSubmitted" to cart workflow

_Note: this method also has a client stub, that forwards to cartCompleted._

```js
import { Meteor } from "meteor/meteor";

Meteor.call("cart/submitPayment", paymentMethod);
```

### payments/paymentMethod (server)

Adds payment to an order.

```js
import { Meteor } from "meteor/meteor";

Meteor.call("payments/paymentMethod", cartId, paymentMethod);
```
