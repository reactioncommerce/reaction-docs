# Payments
Payment methods are one of the most common packages that developers need to create, especially when migrating from another platform.

The [reaction-paymentmethod](https://github.com/reactioncommerce/reaction-paymentmethod) package and documentation was created to try and make this process as easy as possible for developers new to Reaction. It should be used as a guide in making all payment methods as consistent as possible so that they are usable by the largest number of users.

## Transactions
Most Reaction payment packages can support these transaction types.
- authorize

> Most credit-card processors have a two-step process to allow for different payment models. You should read your merchant agreement and the documentation to get the specifics but typically the authorize stage will do a check of the customer's payment method (credit or debit card) and allocate that amount to you but no funds have been transferred. To the consumer it looks like the charge has already gone through and their balance is reduced by the allocated amount. Typically an autorization will expire after a set number of days. Usually you cannot capture more than you authorize but you can capture less and leave the balance still captured or release the balance. In a typical hard-goods shipment scenario, an authorize will be performed at time of order, then when the actual good are shipped a capture is performed.
  - capture

> As noted before, this will operate against a previously performed authorization and tell the payment processor to transfer the actual funds. Some payment processors allow you to authorize and capture in one step which is why the authorize method takes a transactionType parameter.
  - refund

> This method is probably self-explanatory, and is just a wrapper for whatever method your payment provider has for processing refunds.
  - refunds

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
      userId: Meteor.userId()
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
