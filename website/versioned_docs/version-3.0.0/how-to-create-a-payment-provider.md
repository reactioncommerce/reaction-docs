---
title: How To: Add a Payment Method
id: version-3.0.0-how-to-create-a-payment-provider
original_id: how-to-create-a-payment-provider
---

## Prerequisite Reading
- [Concepts: Payments](./concepts-payments.md)
- [Understanding Plugins](./core-plugins-intro.md)

## Overview
In general, to add a payment method you must do the following:
- Create a plugin or modify an existing one
- Extend the GraphQL API with mutations, queries, and types specific to your payment method
- Create and provide functions for supported payment actions
- Add routes for callback URLs if necessary
- Create a React component for collecting any necessary payment data
- Create a React component for operators to enter and edit necessary settings for your payment method
- Register the method definition, its functions, the routes, and the React components using your plugin's `registerPlugin` call

There are two included plugins (in `/imports/plugins/included`) that provide payment methods, which you can look at for inspiration:
- payments-example
- payments-stripe

### Extend the GraphQL API

There are generally two things you need to define in a GraphQL schema:
- The payment method name
- The payment data type

#### Define the payment method name

Add this in your plugin's `schema.graphql` file:

```graphql
extend enum PaymentMethodName {
  myMethod
}
```

#### Define the payment data input

Define what the data collected and stored by your method looks like. Add this in your plugin's `schema.graphql` file:

```graphql
"Data for my custom payment. This can be anything you want."
type MyPaymentMethodPaymentData {
  "Some info I need to process the payment"
  cardNumber: String!
}

# This is the important part. Add your type to the PaymentData union
extend union PaymentData = MyPaymentMethodPaymentData
```

### Payment React Component

This is shown during checkout. It can be whatever you want, so long as it ends up providing the information you need to request an authorization from the payment provider. It could also just be a collection of information necessary to later create and send an invoice.

This component is then used as the `InputComponent` property of your payment method in the `paymentMethods` array that you pass to the [PaymentsCheckoutAction](https://designsystem.reactioncommerce.com/#!/PaymentsCheckoutAction) component. You may want to start with a provided `InputComponent`, such as [ExampleIOUPaymentForm](https://designsystem.reactioncommerce.com/#!/ExampleIOUPaymentForm) and modify it to meet your needs.

### Action Functions

Your plugin must define functions for the following actions:

- authorize
- capture

Your plugin must define functions for the following actions only if it supports refunding:

- refund
- list refunds


#### authorize function

This function must authorize the proposed payment for the proposed amount and then return a payment. It can be an `async` function.

The signature of this function is `(context, input)`, where `input` has the following structure:

```js
{
  amount,
  billingAddress,
  shopId,
  paymentData // This is whatever data your checkout UI component collects
}
```

You are expected to return a valid payment object similar to this:

```js
{
  _id: Random.id(),
  address: billingAddress,
  amount,
  createdAt: new Date(),
  data: {
    fullName,
    gqlType: "ExampleIOUPaymentData" // GraphQL union resolver uses this
  },
  displayName: `IOU from ${fullName}`,
  method: METHOD,
  mode: "authorize",
  name: PAYMENT_METHOD_NAME,
  paymentPluginName: PACKAGE_NAME,
  processor: PROCESSOR,
  riskLevel: "normal",
  shopId,
  status: "created",
  transactionId: Random.id(),
  transactions: []
}
```

Be sure that:
- the `mode` is "authorize"
- the `status` is "created"
- the `name` matches the method name you specified in `registerPlugin` and in the GraphQL `PaymentMethodName` enum
- `amount` matches what was passed in
- All required properties are present

If you are unable to authorize the payment, the function should throw an error with a helpful message that is shown to the shopper in the checkout UI.

#### capture function

This function must capture an authorized payment if it hasn't been captured yet. It receives a `PaymentMethod` object as its only argument. For some payment methods, this might do nothing.

The signature of this function is `(context, payment)`, where `payment` is what your authorize function returned.

The function is expected to return an object with `result` property, and optional `response` property. It can be an `async` function.

- If you successfully capture the payment, return `{ saved: true, response }`, where `response` is optional but can contain a full third-party API response or anything else you want to be saved in the payment `transactions` array.
- If there is an error capturing the payment, return `{ saved: false, errorCode, errorMessage }`, where `errorCode` is a unique string your UI or reporting might understand and `errorMessage` is a helpful message to be shown in the operator UI.
- If the payment has already been captured, return `{ saved: false, isAlreadyCaptured: true }`
- Try to avoid your function throwing any uncaught errors

#### refund function

This function must create a refund in your external payment system. It can be an `async` function. If your payment method can't be refunded, you do not need to provide this function.

The function signature is `(context, payment, amount)`, where `amount` is the requested refund amount and `payment` is what your authorize function returned.

- If you successfully refund the requested amount from the payment, return `{ saved: true, response }`, where `response` is optional but can contain a full third-party API response or anything else you want to be saved in the payment `transactions` array.
- If there is an error refunding the payment, return `{ saved: false, error }`, where `error` is a helpful message to be shown in the operator UI.
- Try to avoid your function throwing any uncaught errors

#### list refunds function

This function must query your external payment system and return an array of refund objects for a single payment. It can be an `async` function. If your payment method can't be refunded, you do not need to provide this function.

The function signature is `(context, payment)`, where `payment` is what your authorize function returned.

- If you successfully query for the refund list, return it in an array. Each object in the array must have `type`, `amount`, `created`, `currency`, and `raw` properties.
- If there is an error listing refunds, log it and return an empty array.
- Try to avoid your function throwing any uncaught errors

### Routing

If your payment plugin needs to register additional client-side routes (for example where you go to a provider and get a token that gets saved) you can look at the PayPal express
implementation which adds additional routes to `register.js` for storing the token.

### Registration

Everything needs to be registered to be seen by Reaction core.

#### GraphQL

If you followed [How To: Create a new GraphQL mutation](./graphql-create-mutation.md), your GraphQL should already be registered.

#### Payment methods

Here's an example of how to register the payment methods your plugin provides:

```js
import stripeCapturePayment from "./util/stripeCapturePayment";
import stripeCreateAuthorizedPayment from "./util/stripeCreateAuthorizedPayment";
import stripeCreateRefund from "./util/stripeCreateRefund";
import stripeListRefunds from "./util/stripeListRefunds";

export default async function register(app) {
  await app.registerPlugin({
    label: "Stripe",
    name: "reaction-stripe",
    paymentMethods: [{
      name: "stripe_card",
      displayName: "Stripe Card",
      canRefund: true,
      functions: {
        capturePayment: stripeCapturePayment,
        createAuthorizedPayment: stripeCreateAuthorizedPayment,
        createRefund: stripeCreateRefund,
        listRefunds: stripeListRefunds
      }
    }],
    // other props
  });
}
```

Each object in `paymentMethods` must have a `name` and `displayName`.

The `displayName` is used in the operator UI, in the Payment panel, where each registered method is shown and can be toggled on or off. It is also sent to storefront clients with the `availablePaymentMethods` GraphQL query response, so it should be what you want shown in the checkout UI (although storefront client UI code could choose to display some other name).

The `name` is the key used to identify a payment as being of this method. The `name` property of the payment object returned from your authorize function must exactly match this.

The `canRefund` option is `true` by default, but if your method does not support refunds, you must set `canRefund: false` in its config.

#### Settings UI

If your plugin needs any settings that it will not get from environment variables, register the React component in the `registry` array:

```js
export default async function register(app) {
  await app.registerPlugin({
    registry: [
      {
        label: "Acme Payments",
        provides: ["paymentSettings"],
        container: "dashboard",
        template: "AcmePaymentsPluginSettings"
      }
    ]
    // other props
  });
}
```

The `label` is shown in the operator UI to group the settings for each payment plugin. The `provides` property must be an array containing `"paymentSettings"`. Set `template` to the name of your React component, which you must register with `registerComponent` in client code.

#### Checkout UI

We recommend customizing a storefront starter kit to build your storefront. In `src/custom/paymentMethods.js`, you will see a `paymentMethods` array. Modify this to add your payment method and remove any others you do not need.
