# Test Setup

## Description

### Getting Started
 - Reset Reaction Commerce by running `reaction reset` in the terminal
 - Create a fresh product inventory using [reaction-devtools](https://github.com/reactioncommerce/reaction-devtools)
 - Keep browser console open to monitor any client-side errors or warnings
 - Keep terminal in view to monitor any server-side errors or warnings
 
## Devtools
Reaction Devtools 

### Install

### Loading Sample Data

## Payment Provider

### Example Provider
 1. Click the payment option in the admin menu to open the payment provider settings panel.
 1. TODO: need steps for this
 
### Authorize.net
 1. Click the payment option in the admin menu to open the payment provider settings panel.
 2. Click the checkbox to right of the Authorize.net label to open the Authorize.net settings.
 3. Click the "Authorize" & "Capture" checkboxes for the supported methods.
 4. Select "Test - Sanbox Mode" from the Mode selectbox.
 5. Enter the API Login ID & the Transaction Key.
 6. Click the "save changes" button.
 
### Braintree
 1. Click the payment option in the admin menu to open the payment provider settings panel.
 2. Click the checkbox to right of the Braintree label to open the Braintree settings.
 3. Enter a Merchant ID, Public Key and Private Key.
 4. Clcik the "Authorize", "Capture" & "Refund" checkboxes for the supported methods.
 5. Select "Testing - Sandbox Mode" from the Mode selectbox.
 6. Click the "save changes" button.

### PayPal Express
 1. Click the payment option in the admin menu to open the payment provider settings panel.
 2. Click the checkbox to right of the PayPal Express label to open the PayPal Express settings.
 3. Enter a Merchant ID, Username, Password and Signature.
 4. Clcik the "Authorize", "Capture" & "Refund" checkboxes for the supported methods.
 5. Select "Authorize, Capture on complete" from the Capture at time of auth selectbox.
 6. Select "Testing - Sandbox Mode" from Express Mode selectbox.
 7. Click the "save changes" button.
 
### PayPal Flow
 1. Click the payment option in the admin menu to open the payment provider settings panel.
 2. Click the checkbox to right of the PayPal Flow label to open the PayPal Flow settings.
 3. Enter an API Client ID and a API Secret.
 4. Clcik the "Authorize", "Capture" & "Refund" checkboxes for the supported methods.
 5. Select "Testing - Sandbox Mode" from the Payflow Mode selectbox.
 6. Click the "save changes" button.
 
### Stripe
 1. Click the payment option in the admin menu to open the payment provider settings panel.
 2. Click the checkbox to right of the Stripe label to open the Stripe settings.
 3. Enter an API Secret Key.
 4. Clcik the "Authorize", "Capture" & "Refund" checkboxes for the supported methods.
 5. Click the "save changes" button.

## Shipping
### Flat Rate
 1. Click the shipping option in the admin menu to open the shipping settings panel.
 2. Click the checkbox to right of the Flat Rate label to open the Flat Rate settings.
 3. Select one of the shipping rate method rows from the table to open the method options.
 4. Click the "enabled" checkbox to enable the shipping method.
 5. Click the "save changes" button.
 
### Shippo
 1. Click the shipping option in the admin menu to open the shipping settings panel.
 2. Click the checkbox to right of the Shippo label to open the Shippo settings.
 3. Click the "Edit API Key" link to open the Shippo settings.
 4. Enter an API Key and click the "save changes" button.
 5. Click the "Refresh methods" link to refresh the shipping options.

## Taxation
### Custom Rates
 1. Click the taxation option in the admin menu to open the taxation settings panel.
 2. Click the checkbox to right of the Custom Rates label to open the Custom Rates settings.
 3. Click the "+" button to add a new custom tax rate.
 4. Select a country and a state/province/region from their respective selectboxes.
 5. Enter a ZIP Code/Postal Code.
 6. Enter the tax rate percentage.
 7. Click the "save changes" button.

### Avalara
 1. Click the taxation option in the admin menu to open the taxation settings panel.
 2. Click the checkbox to right of the Avalara label to open the Avalara settings.
 3. Enter an Avalara API Login ID, Username, Password, Company Code and Shipping Tax Code.
 4. Enable Address Validation.
 5. Enter the countries needed for Address Validation.
 6. Enter a Request Timeout number.
 7. Select "Testing - Sandbox Mode" from the selectbox.
 8. Enable Preform Tax Calculation
 9. Enter a Retain Logs Duration number.
 10. Enable Commit Documents.
 11. Click the "save changes" button.
 
### TaxCloud
 1. Click the taxation option in the admin menu to open the taxation settings panel.
 2. Click the checkbox to right of the TaxCloud label to open the TaxCloud settings.
 3. Enter a TaxCloud API Login ID and a TaxCloud API Key.
 4. Click the "save changes" button.
