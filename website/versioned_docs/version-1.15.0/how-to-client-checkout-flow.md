---
title: How To: Implement a client checkout flow
id: version-1.15.0-how-to-client-checkout-flow
original_id: how-to-client-checkout-flow
---

This section will guide you through everything you need to do as a developer implementing cart checkout or order placement in a client app. The exact type of client isn’t important. It could be a web app, React Native, native, or command line UI. A flow similar to this is used in the starter apps that we provide.

> A cart is not necessary to create an order. This flow assumes you have items stored in a cart and want to store checkout information on that cart as it is entered. There are good reasons to do this: to avoid having to enter it again if the shopper gets interrupted, to gather as much data in your system as possible even if the order is never placed. But if these reasons don’t matter to you, your client can simply collect all of the necessary information and use it to create the order without ever creating a cart.

## Step 1: Collect an email address
If the shopper is logged in, you may choose to skip this step and use one of the emails from their account. You can also move this step to somewhere else in the flow as long as you have an email address for creating the order. An order cannot be created without an email address.

### Example Storefront Component Library components
The [GuestForm](https://designsystem.reactioncommerce.com/#/Storefront%20Components/Forms/GuestForm) React component can be used to collect an email address for anonymous (guest) checkout

### GraphQL
Use the `setEmailOnAnonymousCart` mutation if you have a cart and want to store the provided email address on it. This is recommended for data completeness and to avoid re-entry if the checkout flow is interrupted. However, you could also just cache this data on the client until you call the place order mutation.

## Step 2: Display fulfillment groups and optionally allow moving items among them
To create an order, each item must be in exactly one [fulfillment group](concepts-fulfillment#fulfillment-groups). There can be any number of fulfillment groups, but at a minimum there must be one per unique combination of fulfillment type and shop ID.

Every item has a list of fulfillment types it is eligible for. A client should allow shoppers to choose one of these types for each item, and then sort the items into fulfillment groups based on their type and shop ID. If desired, a client could also allow the shopper to create additional fulfillment groups, for example by allowing them to split a “shipping” type group and enter a different shipping address for each group.

For simple system where all items support a single fulfillment type and there is only one shop, you can assume there is only one fulfillment group and keep your client UI simple.

### Example Storefront Component Library components
The [CartItems](https://designsystem.reactioncommerce.com/#/Storefront%20Components/Cart/CartItems) React component can be used to show a list of items in a cart. You can use it without a cart, too, as long as you provide items in the same data structure as on a cart. Set `isReadOnly` prop to `true` if you do not want the shopper to be able to change the quantity or remove items at this point.

## Step 3: Collect a shipping address
This is necessary only if you have fulfillment groups of the “shipping” type. If your client UI displays multiple fulfillment groups, then you may need to have a shipping address form for each, or you can have a single form and set the same address on every “shipping” group.

### Example Storefront Component Library components
- The [AddressForm](https://designsystem.reactioncommerce.com/#/Storefront%20Components/Account/AddressBook) allows a user to enter a new address or edit an existing one. It outputs an address object matching the Reaction Commerce address schema.
- You can use the [ShippingAddressCheckoutAction](https://designsystem.reactioncommerce.com/#/Storefront%20Components/Checkout/ShippingAddressCheckoutAction) component with an action supplied to the [CheckoutActions](https://designsystem.reactioncommerce.com/#/Storefront%20Components/Checkout/CheckoutActions) component to collect a shipping address as part of a step-by-step checkout flow. This wraps [AddressForm](https://designsystem.reactioncommerce.com/#/Storefront%20Components/Forms/AddressForm) and takes care of some of the complexity for you, versus using `AddressForm` directly.

### GraphQL
Use the `setShippingAddressOnCart` mutation if you have a cart and want to store the provided shipping address on all of the “shipping” type fulfillment groups on that cart. This is recommended for data completeness and to avoid re-entry if the checkout flow is interrupted. However, you could also just cache this data on the client until you call the place order mutation.

## Step 4: Allow the user to choose a fulfillment option
Some [fulfillment types](concepts-fulfillment#fulfillment-types) have multiple options available (for example, different shipping carriers or speeds), usually with varying costs. For each fulfillment group, get a list of available options with prices and display those options to the shopper. Store the selected option for each group.

Note that the options available and their prices can vary based on the items list, item quantities, and “to” and “from” addresses, so you should have all of this information before requesting the available options, and if any of these factors change, you should clear the selected option and show the shopper a new list of available options.

If your client does not expect to be handling multiple fulfillment groups, or if you want the same selection to be used on every fulfillment group, you may choose to show only one selection list. But you’ll still need to set that selection on each group individually for order creation to succeed.

### Example Storefront Component Library components
- The [SelectableList](https://designsystem.reactioncommerce.com/#/Base%20Components/Forms/SelectableList) React component shows a radio-like list of options, allowing you to select just one. This is a good way to show the list of available fulfillment types.
- You can use the [FulfillmentOptionsCheckoutAction](https://designsystem.reactioncommerce.com/#/Storefront%20Components/Checkout/FulfillmentOptionsCheckoutAction) component with an action supplied to the [CheckoutActions](https://designsystem.reactioncommerce.com/#/Storefront%20Components/Checkout/CheckoutActions) component to collect a fulfillment option selection as part of a step-by-step checkout flow. This wraps `SelectableList` and takes care of some of the complexity for you, versus using `SelectableList` directly.

### GraphQL
Use the `selectFulfillmentOptionForGroup` mutation if you have a cart and want to store the selected fulfillment option on each of the fulfillment groups on that cart. This is recommended for data completeness and to avoid re-entry if the checkout flow is interrupted. However, you could also just cache this data on the client until you call the place order mutation.

> NOTE: Call this mutation once for each fulfillment group.

## Step 5: Obtain payment information
Check to see which payment method is the default for the shop, and show the checkout component provided by that payment method. If you know that the shop for the client you are building will only ever have a single payment method, you can skip the check and always show that component. If there could be multiple payment methods enabled (for example, credit card, PayPal, and Apple Pay), then you should display a list and allow the shopper to choose one.

Ultimately, the payment method component should give you some kind of data, usually a reference ID or token, which you can pass to the server with the order details to create the order. If the payment details are invalid, the order will not be created.

### Example Storefront Component Library components
- The [AddressForm](https://designsystem.reactioncommerce.com/#/Storefront%20Components/Forms/AddressForm) component allows a user to enter a new address or edit an existing one. It outputs an address object matching the Reaction Commerce address schema. You can use this to get a billing address from a shopper.
- The [StripeForm](https://designsystem.reactioncommerce.com/#/Storefront%20Components/Forms/StripeForm) component collects credit card information from a shopper and gives you a Stripe token for it. This is a very secure, PCI-compliant way of providing credit card payment, but it will only work if you sign up for a Stripe account.
- You can use the [StripePaymentCheckoutAction](https://designsystem.reactioncommerce.com/#/Storefront%20Components/Checkout/StripePaymentCheckoutAction) component with an action supplied to the [CheckoutActions](https://designsystem.reactioncommerce.com/#/Storefront%20Components/Checkout/CheckoutActions) component to collect a billing address and credit card information as part of a step-by-step checkout flow. This wraps `AddressForm` and `StripeForm` and takes care of some of the complexity for you, versus using those components directly.

### GraphQL
- The `availablePaymentMethods` query will give you a list of payment methods that have been registered by payment plugins and are enabled. It may also filter the methods based on region, authentication, or other factors. Although a client may choose to “hard code” its payment method flow, we recommend that you use this query to determine which UI elements to show. This allows administrators to make adjustments without always needing to redeploy the client.
- There is no way to assign payment information to a cart prior to creating the order. This is intentional, for security reasons. We also recommend that you do not store payment information, even if it is just a third-party card token, in a persistent way on the client. Cache the token temporarily and then send it at the end of the checkout flow, when creating the order.

## Step 6: Allow the shopper to review
It’s usually a good idea to allow the shopper to review all of the order details before creating the order.

### Example Storefront Component Library components
- The [CartItems](https://designsystem.reactioncommerce.com/#/Storefront%20Components/Cart/CartItems) React component can be used to show a list of items in a cart. You can use it without a cart, too, as long as you provide items in the same data structure as on a cart. Set `isReadOnly` prop to `true` if you do not want the shopper to be able to change the quantity or remove items at this point.
- The [CartSummary](https://designsystem.reactioncommerce.com/#/Storefront%20Components/Cart/CartSummary) React component shows summary totals for a cart. You can use it without a cart, too, as long as you provide props in the same data structure as on a cart.
- You can use the [FinalReviewCheckoutAction](https://designsystem.reactioncommerce.com/#/Storefront%20Components/Checkout/FinalReviewCheckoutAction) component with an action supplied to the [CheckoutActions](https://designsystem.reactioncommerce.com/#/Storefront%20Components/Checkout/CheckoutActions) component to show all items for review as part of a step-by-step checkout flow. This wraps `CartItems` and `CartSummary` and takes care of some of the complexity for you, versus using those components directly.

## Step 7: Create the order
Order creation GraphQL mutations are provided by each payment plugin. Refer to plugin documentation for exact instructions, but in general they will all expect an `OrderInput` object and some tokenized payment details. They will attempt to create one charge per fulfillment group, and if all charges are successfully created, they will create the order.

If order creation is successful, the mutation will return an order object. If this is an anonymous order, there will also be a `token` in the response payload. All future GraphQL queries for this order will need to provide this token, so you should save it in state and potentially in local persistent storage, depending on the needs of your client.

### GraphQL
- The Stripe payment plugin provides a `placeOrderWithStripeCardPayment` mutation. You must pass it a valid `OrderInput` object and a payment object with a billing address and Stripe card token ID on it.
- The IOU payment plugin provides a `placeOrderWithIOUPayment` mutation. You must pass it a valid `OrderInput` object and a payment object with a billing address on it. (The IOU payment method is intended to be used for demos and other non-production purposes.)

## Step 8: Show order confirmation
If order creation is successful, the mutation will return an order object. Your client can use this to display all of the order details to the shopper on an order confirmation screen.
