---
id: version-v1.5.0-payments-discounts
title: Discounts
original_id: payments-discounts
---
    
Reaction has support for discount codes and discount rates.  A "code" is a code that can be applied during checkout that applies a discount to the cart subtotal.  A "rate" is a discount that is applied without needing a discount code to be applied.

## Codes

Discount codes can be enabled in the **Payments** <i class="rui font-icon fa fa-credit-card"></i> settings in the Reaction dashboard.

-   **Discount Code**, case-sensitive string for a code

-   **Discount**, a discount formula value (string or number)

-   **Account Limit**, per user limit for this code

-   **Total Limit**, per code usage limit

-   **Calculation Method**
    -   credit - a credit is applied to the order subtotal up to the formula value
    -   discount - the formula value applied as a percentage discount off order subtotal
    -   sale - overrides item pricing with a fixed sale price
    -   shipping - the formula value should be a string that matches the name of a shipping method. The calculated shipping rate will be applied as a discount.

![](/assets/admin-dashboard-payments-discounts.png "Payment Discounts")

Discounts are validated when a user enters a code during checkout, and are applied as payment methods on the cart. The discount code usage is tracked once the order has been placed.
