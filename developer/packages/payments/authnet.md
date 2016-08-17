# Authorize.net
Authorize.net Payment Platform integration for Reaction Commerce

Documentation is available at [https://developer.authorize.net/api/reference/index.html](https://developer.authorize.net/api/reference/index.html)


## Configuration
Configuration can be performed by Administrators in the Reaction Dashboard.

It can also be done in `private/settings/reaction.json` by adding (or updating) the following configuration details (remember to fill in the blanks):

```
{
  "name": "reaction-auth-net",
  "enabled": true,
  "settings": {
    "api_id": "",
    "transaction_key": ""
  }
}
```

## Accepted Payment Methods
All major credit cards: Visa®, MasterCard®, American Express®, Discover®, Diner's Club, JCB

Signature Debit Cards
-All major credit cards: Visa®, MasterCard®, American Express®, Discover®, Diner's Club, JCB
-Signature Debit Cards

_Actual payment method support will vary by country._

Based on the accepted payment methods, the Authorize.net default schema for credit card numbers will allow between 12 - 19 numbers. This can be changed in `/imports/plugins/included/authnet/lib/collections/schemas/package.js` depending on your needs.

## Transactions
- authorize
> This is where info on authorization goes

- capture
> This is where info on capturing goes

- refund
> *Refunds are not supported*
> Authorize.net requires the expiration date and last four digits of the credit card to process refunds. This does not comply with Reaction's policy to not store data that is not compatible with PCI compliance. Refunds can still be processed directly through the [Authorize.net dashboard](https://account.authorize.net/).

- refunds (list)
> *Refunds are not supported*


## Testing Tips and Tricks
Luhn generator
24 hour window
etc
















# PayPal Payflow & PayPal Express
PayPal Payments for Reaction Commerce.

## Installation

```bash
meteor add reactioncommerce:reaction-paypal
```

Pull requests are celebrated, feedback encouraged.

Supports checkout payments with either, or both `Express Checkout` and `PayFlow Pro` payment methods.

Payflow Payment Gateway handles all major credit and debit cards inline. [https://www.paypal.com/webapps/mpp/payflow-payment-gateway](https://www.paypal.com/webapps/mpp/payflow-payment-gateway) while "Express Checkout" is a modal paypal form.  Neither solution has users leaving your checkout process.

## Payflow Pro
[https://www.paypal.com/us/webapps/mpp/product-selection](https://www.paypal.com/us/webapps/mpp/product-selection)

Payflow Pro is supported via the PayPal-Node-SDK ([http://paypal.github.io/PayPal-node-SDK/](http://paypal.github.io/PayPal-node-SDK/)) while Express uses the NVP (Name/Value Pair) API via raw HTTP ([https://developer.paypal.com/docs/classic/api/#ec](https://developer.paypal.com/docs/classic/api/#ec))

## Express
Express is a hybrid checkout method that allows users to pay with their PayPal account without entering payment details on your site. Thus it is implemented slightly different than other more traditional server-side only methods.

**Note about refunding amounts in more than one currency**

If you need to refund an order that was placed in another currency than your default currency, before you do this the first time you need to log into your merchant panel and "Accept" the payment. There it will ask you if you want to convert the payment or leave it as a balance in the new currency. You must have a balance in the currency you wish to refund so leave this payment as a balance. You will need to do this once for every currency you wish to accept. This applies to both Express and PayFlow Pro methods. If you do not do this the refund will be refused and will not process.

> **International Payments** Make sure you check the PayPal documentation for which countries are supported. Express Checkout supports more countries than PayFlow.

## Configuration
Configuration by Administrators in the Reaction Dashboard.

Can also be configured in `private/settings/reaction.json` by adding the following configuration details:

```
{
  "name": "reaction-paypal",
  "enabled": true,
  "settings": {
    "express_enabled": true,
    "express_mode": false,
    "merchantId": "",
    "username": "",
    "password": "",
    "signature": "",
    "payflow_enabled": true,
    "payflow_mode": false,
    "client_id": "",
    "client_secret": ""
  }
}
```
