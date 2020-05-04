---
id: payment
title: Payment
---

## Payment options

Reaction ships with a `Stripe` payment plugin and an "Example Payment" plugin, which allows you to check out by only entering your full name. The example payment method is not intended for production use. There are also many community plugins available for other payment services.

## Terminology

A single "payment plugin" may provide more than one "payment method", which is the thing actually used to collect payment details and create a payment in the system.

## Enable a payment method

To enable a payment method for your shop, head to `reaction-admin` (on [localhost:4080](http://localhost:4080) if you're running it locally) and sign in with an owner account.

1. In the sidebar, go to Settings > Payment .
2. Click the toggle next to each payment method that you want to enable from each plugin.

> Technical note: You can enable more than one payment method. This affects which methods are returned by the `availablePaymentMethods` GraphQL query, but keep in mind that your storefront UI will need to actually query this and respect it, and decide what to show if there are multiple enabled. You might also choose to just hard code a single payment method into your storefront UI.
