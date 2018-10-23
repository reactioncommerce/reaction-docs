---
title: How To: Add a Payment Method
id: version-2.0.0-how-to-create-a-payment-provider
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
- Register the method details, the routes, and the React components using your plugin's `registerPackage` call

There are two included plugins (in `/imports/plugins/included`) that provide payment methods, which you can look at for inspiration:
- payments-example
- payments-stripe

### Extend the GraphQL API

At a minimum, you will need to implement a `placeOrder` mutation for each payment method you add. For example, for an "invoice" payment method, you would create a mutation named `placeOrderWithInvoicePayment`. These mutations wrap the `createOrder` mutation provided by the Orders plugin, verifying and authorizing payment first. Refer to the included payment method mutations as examples, and review [How To: Create a new GraphQL mutation](./graphql-create-mutation.md).

### Payment React Component

This is shown during checkout. It can be whatever you want, so long as it ends up providing the information you need to request an authorization from the payment provider. It could also just be a collection of information necessary to later create and send an invoice.

Refer to the [StripeForm](https://stoic-hodgkin-c0179e.netlify.com/#!/StripeForm) and [StripePaymentCheckoutAction](https://stoic-hodgkin-c0179e.netlify.com/#!/StripePaymentCheckoutAction) components, which are part of the Reaction Design System, as examples.

### Methods

After an order is placed with your payment method, the Meteor operator UI calls various Meteor methods to take actions on the payment. Your plugin must use Meteor's API to define server methods with the following names:

- `<namespace>/payment/capture`
- `<namespace>/refund/create`
- `<namespace>/refund/list`

> The `namespace` must be the same as whatever you set `processor` to on the payment object, but all lowercase. For example, the `reaction-stripe` plugin creates payments with `processor: "Stripe"` and its capture method is named "stripe/payment/capture".

#### payment/capture method

This method must capture an authorized payment if it hasn't been captured yet. It receives a `PaymentMethod` object as its only argument. For some payment methods, this might do nothing.

#### refund/create method

This method must create a refund in your external payment system. It receives a `PaymentMethod` object, a numeric amount, and a `reason` string as its three arguments.

#### refund/list method

This method must list any refunds that exist for a particular payment in your external payment system. It receives a `PaymentMethod` object as its only argument.

### Routing

If your payment plugin needs to register additional client-side routes (for example where you go to a provider and get a token that gets saved) you can look at the PayPal express
implementation which adds additional routes to `register.js` for storing the token.

### Registration

With the exception of the Meteor methods, which are created by your plugin server code being imported, everything else needs to be registered to be seen by Reaction core.

#### GraphQL

If you followed [How To: Create a new GraphQL mutation](./graphql-create-mutation.md), your GraphQL should already be registered.

#### Payment methods

Here's an example of how to register the payment methods your plugin provides:

```js
Reaction.registerPackage({
  label: "Stripe",
  name: "reaction-stripe",
  icon: "fa fa-cc-stripe",
  autoEnable: true,
  paymentMethods: [{
    name: "stripe_card",
    displayName: "Stripe Card"
  }],
  // ...
});
```

Each object in `paymentMethods` must have a `name` and `displayName`.

The `displayName` is used in the operator UI, in the Payment panel, where each registered method is shown and can be toggled on or off. It is also sent to storefront clients with the `availablePaymentMethods` GraphQL query response, so it should be what you want shown in the checkout UI (although storefront client UI code could choose to display some other name).

The `name` is the key used to identify a payment as being of this method. The `name` property of each payment your GraphQL mutation passes to `createOrder` must exactly match this.

#### Settings UI

If your plugin needs any settings that it will not get from environment variables, register the React component in the `registry` array:

```js
Reaction.registerPackage({
  // ...
  registry: [
    {
      label: "Acme Payments",
      provides: ["paymentSettings"],
      container: "dashboard",
      template: "AcmePaymentsPluginSettings"
    }
  ]
});
```

The `label` is shown in the operator UI to group the settings for each payment plugin. The `provides` property must be an array containing `"paymentSettings"`. Set `template` to the name of your React component, which you must register with `registerComponent` in client code.

#### Checkout UI

With the 2.0 release, we now recommend customizing a storefront starter kit to build your storefront. You must modify the storefront checkout page code to show your payment React component, and use the data it collects to call your custom `placeOrder*` GraphQL mutation.
