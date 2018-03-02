# Order Creation

## Description
Test to verify the following functionality: 
 * The user can access the product detail page from the product grid.
 * The user can select a product variant and add it to the cart.
 * The user can complete the checkout process.
 * The user can make a payment.
 * The user receives order confirmation screen and order confirmation email.

**Touch Points**
 * Test must be completed two consecutive times to be considered passing.
 * Test must be completed using all three **user type** variants to be considered passing.
 * TODO: Paypal express note

## Intended Outcome
 * The user will receive a confirmation screen, displaying the order ID, the user’s email address, items ordered, shipping address, payment method and order total summary.
 * The user will receive a confirmation email, displaying the order ID (as a link to the order confirmation page), order creation date, order status, shipping & billing address, payment type, items ordered, and order total summary.

## Test Variant
 * **User Type**: Anonymous, New, Registered
 * **Payment Provider**: Example Provider, Authorize.net, Braintree, PayPal Express, PayPal Flow, Stripe
 * **Shipping**: Flat Rate, Shippo
 * **Taxation**: None, Custom Rates, Avalara, TaxCloud

## Test Setup Steps
 * Payment processing and shipping must be enabled as a prerequisite to this test. 
 * All of the following setup steps must be done while logged in as an admin.

### Payment Provider
**Example Provider**
 1. Click the payment option in the admin menu to open the payment provider settings panel.
 1. TODO: need steps for this
 
**Authorize.net**
 1. Click the payment option in the admin menu to open the payment provider settings panel.
 2. Click the checkbox to right of the Authorize.net label to open the Authorize.net settings.
 3. Click the "Authorize" & "Capture" checkboxes for the supported methods.
 4. Select "Test - Sanbox Mode" from the Mode selectbox.
 5. Enter the API Login ID & the Transaction Key.
 6. Click the "save changes" button.
 
**Braintree**
 1. Click the payment option in the admin menu to open the payment provider settings panel.
 2. Click the checkbox to right of the Braintree label to open the Braintree settings.
 3. Enter a Merchant ID, Public Key and Private Key.
 4. Clcik the "Authorize", "Capture" & "Refund" checkboxes for the supported methods.
 5. Select "Testing - Sandbox Mode" from the Mode selectbox.
 6. Click the "save changes" button.

**PayPal Express**
 1. Click the payment option in the admin menu to open the payment provider settings panel.
 2. Enter a Merchant ID, Username, Password and Signature.
 3. Clcik the "Authorize", "Capture" & "Refund" checkboxes for the supported methods.
 4. Select "Authorize, Capture on complete" from the Capture at time of auth selectbox.
 6. Select "Testing - Sandbox Mode" from Express Mode selectbox.
 7. Click the "save changes" button.
 
**PayPal Flow**
 1. Click the payment option in the admin menu to open the payment provider settings panel.
 2. Eneter an API Client ID and a API Secret.
 3. Clcik the "Authorize", "Capture" & "Refund" checkboxes for the supported methods.
 4. Select "Testing - Sandbox Mode" from the Payflow Mode selectbox.
 5. Click the "save changes" button.
 
**Stripe**
 1. Click the payment option in the admin menu to open the payment provider settings panel.
 2. Eneter an API Secret Key.
 3. Clcik the "Authorize", "Capture" & "Refund" checkboxes for the supported methods.
 4. Click the "save changes" button.

### Shipping
**Flat Rate**
 1. Click the shipping option in the admin menu to open the shipping settings panel.
 2. 
 
**Shippo**
 1. Click the shipping option in the admin menu to open the shipping settings panel.

### Taxation

## Testing Steps
 1. Starting at the shop’s product grid page click any product to view the product detail page.
 2. Click on a product’s variant to select the product then click the “Add to cart” button.
 3. From ether the cart pop-up or cart drop down click the “Checkout now” button to start the checkout process.
 4. Fill out the appropriate account and address information for the user type:
   a. **Anonymous User**: Click “Continue as guest” button and enter an email address. Fill out the address details.
   b. **New User**: Enter new user credentials into the register form. Fill out the address details to create the account’s default address.
   c. **Registered User**: Click the “Sign in” button below the register form and enter user credentials. Select a shipping address if needed.
 5. Select a shipping option.
 6. Fill out appropriate payment information for the payment provider and click the “Complete your order” button.
   a. **PayPal Express**: 
