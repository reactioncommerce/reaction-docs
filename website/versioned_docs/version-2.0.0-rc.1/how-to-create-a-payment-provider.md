---
title: How To: Add a Payment Method
id: version-2.0.0-rc.1-how-to-create-a-payment-provider
original_id: how-to-create-a-payment-provider
---

## Prerequisite Reading
- [Concepts: Payments](./concepts-payments.md)
- [Understanding Plugins](./core-plugins-intro.md)

## Overview
In general, to add a payment method you must do the following:
- Create a plugin or modify an existing one
- Extend the GraphQL API with mutations, queries, and types specific to your payment method
- Create Meteor methods for supported operator actions
- Add routes for callback URLs if necessary
- Create a React component for collecting any necessary payment data
- Create a React component for operators to enter and edit necessary settings for your payment method
- Pass everything to your plugin's `registerPackage` call

There are two included plugins (in `/imports/plugins/included`) that provide payment methods, which you can look at for inspiration:
- payments-example
- payments-stripe

### Extend the GraphQL API

At a minimum, you will need to implement a `placeOrder` mutation for each payment method you add. For example, for an "invoice" payment method, you would create a mutation named `placeOrderWithInvoicePayment`. These mutations wrap the `createOrder` mutation provided by the Orders plugin, verifying and authorizing payment first. Refer to the included payment method mutations as examples, and review [How To: Create a new GraphQL mutation](./graphql-create-mutation.md).

### Payment React Component

This is shown during checkout. It can be whatever you want, so long as it ends up providing the information you need to request an authorization from the payment provider. It could also just be a collection of information necessary to later create and send an invoice.

Refer to the [StripeForm](https://stoic-hodgkin-c0179e.netlify.com/#!/StripeForm) and [StripePaymentCheckoutAction](https://stoic-hodgkin-c0179e.netlify.com/#!/StripePaymentCheckoutAction) components, which are part of the Reaction Design System, as examples.

### Routing

If your payment plugin needs to register additional client-side routes (for example where you go to a provider and get a token that gets saved) you can look at the PayPal express
implementation which adds additional routes to `register.js` for storing the token.

### Methods

In the lib directory you need to modify/implement the methods provided
here. In this file mostly what you are doing is just providing a way for
the client to call the server side methods. If you method does not
require any parameters you may not need the `accountOptions` method, but
most payment methods should implement `authorize`, `capture`, `refund`,
and `refunds`.

- **authorize**

Most credit-card processors have a two-step process to allow for different payment models. You should read your merchant agreement and the documentation to get the specifics but typically the **authorize** stage will do a check of the customer's payment method (credit or debit card) and allocate that amount to you **but no funds have been transferred**.

To the consumer it looks like the charge has already gone through and their balance is reduced by the allocated amount. Typically an authorization will expire after a set number of days. Usually you cannot capture more than you authorize but you can capture less and leave the balance still captured or release the balance. In a typical hard-goods shipment scenario, a charge will be authorized upon placing the order and then later charged upon fulfilling the order (after it has been shipped or the customer has picked it up).

- **capture**

As noted before, this will operate against a previously performed authorization and tell the payment processor to transfer the actual funds.

- **refund**

This method is probably self-explanatory, and is just a wrapper for whatever method your payment provider has for processing refunds.

- **refunds**

This method should query for a list of refunds and these refunds will show up in the dashboard when managing orders.
