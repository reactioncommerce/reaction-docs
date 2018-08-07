---
id: order-creation
title: Script: Order Creation
---
    
## Description
Test to verify the following functionality:
 - The user can access the product detail page from the product grid.
 - The user can select a product variant and add it to the cart.
 - The user can complete the checkout process.
 - The user can make a payment.
 - The user receives order confirmation screen and order confirmation email.

**Touch Points**
 - Test must be completed two consecutive times to be considered passing.
 - Test must be completed using all three **user type** variants to be considered passing.
 - PayPal Express needs a personal sandbox account to test. See the [PayPal documentation](https://developer.paypal.com/docs/classic/lifecycle/sb_about-accounts/#create-a-personal-sandbox-account) for more information.

## Intended Outcome
 - The user will receive a confirmation screen, displaying the order ID, the user’s email address, items ordered, shipping address, payment method and order total summary.
 - The user will receive a confirmation email, displaying the order ID (as a link to the order confirmation page), order creation date, order status, shipping & billing address, payment type, items ordered, and order total summary.

## Test Variant
 - **User Type**: Anonymous, New, Registered
 - **Payment Provider**: Example Provider, Authorize.net, Braintree, PayPal Express, PayPal Flow, Stripe
 - **Shipping**: Flat Rate, Shippo
 - **Taxation**: None, Custom Rates
 
## Test Setup Steps
 - Payment processing and shipping must be enabled as a prerequisite to this test.
 - All of the following setup steps must be done while logged in as an admin.
 - Follow the [Payment, shipping, taxation setup instructions here](test-setup.md)

## Testing Steps
 1. Starting at the shop’s product grid page click any product to view the product detail page.

 2. Click on a product’s variant to select the product then click the “Add to cart” button.

 3. From ether the cart pop-up or cart drop down click the “Checkout now” button to start the checkout process.

 4. Fill out the appropriate account and address information for the user type:
     1. **Anonymous User**: Click “Continue as guest” button and enter an email address. Fill out the address details.
     2. **New User**: Enter new user credentials into the register form. Fill out the address details to create the account’s default address.
     3. **Registered User**: Click the “Sign in” button below the register form and enter user credentials. Select a shipping address if needed.

 5. Select a shipping option.

 6. Fill out appropriate payment information for the payment provider and click the “Complete your order” button.
     1. **PayPal Express**: will open in a modal window, follow the sets using a PayPal sandbox account. More info how to create a sandbox account [here](https://developer.paypal.com/docs/classic/lifecycle/sb_about-accounts/#create-a-personal-sandbox-account).
