---
id: version-2.9.1-payment
title: Payment
original_id: payment
---

## Payment options

Reaction ships with a `Stripe` payment plugin and an "Example Payment" plugin, which allows you to check out by only entering your full name. The example payment method is not intended for production use. There are also many community plugins available for other payment services.

## Terminology

A single "payment plugin" may provide more than one "payment method", which is the thing actually used to collect payment details and create a payment in the system.

## Enable a payment method

To enable a payment method for your shop, log in as a shop admin and navigate to your Dashboard.

1. Click **Payment** <i class="rui font-icon fa fa-credit-card"></i> from the Dashboard.
2. You should see one section for each payment plugin, with a form for entering any data that the plugin needs. Enter the proper settings and click **Save Changes**.
3. Now click the toggle next to each payment method that you want to enable from each plugin.

> Technical note: You can enable more than one payment method. This affects which methods are returned by the `availablePaymentMethods` GraphQL query, but keep in mind that your storefront UI will need to actually query this and respect it, and decide what to show if there are multiple enabled. You might also choose to just hard code a single payment method into your storefront UI.
