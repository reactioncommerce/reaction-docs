---
id: version-v1.5.0-payment-packages-paypal
title: Payments - PayPal
original_id: payment-packages-paypal
---
    
PayPal Payment Platform integration for Reaction Commerce

Payflow Pro is supported via the PayPal-Node-SDK (<http://paypal.github.io/PayPal-node-SDK/>) while Express uses the NVP (Name/Value Pair) API via raw HTTP (<https://developer.paypal.com/docs/classic/api/#ec>)

## Configuration

Configuration can be performed by Administrators in the Reaction Dashboard.

It can also be done in `private/settings/reaction.json` by adding (or updating) the following configuration details (remember to fill in the blanks):

```json
{
  "name": "reaction-paypal",
  "enabled": true,
  "settings": {
    "express": {
      enabled: true // public
    },
    "express_mode": false, //private
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

If you plan on refunding in a currency different than your default, you first need to do a little setup. Before you do this the first time you need to log into your merchant panel and "Accept" the payment. There it will ask you if you want to convert the payment or leave it as a balance in the new currency. You must have a balance in the currency you wish to refund so leave this payment as a balance. You will need to do this once for every currency you wish to accept. This applies to both Express and PayFlow Pro methods. If you do not do this the refund will be refused and will not process.

Make sure you check the PayPal documentation for which countries are supported. Express Checkout supports more countries than PayFlow.

## Accepted Payment Methods

-   All major credit cards: Visa®, MasterCard®, American Express®, Discover®, Diner's Club, JCB

-   Signature Debit Cards

_Actual payment method support will vary by country._

Based on the accepted payment methods, PayPal's default schema for credit card numbers will allow between 12 - 19 numbers. This can be changed in `/imports/plugins/included/paypal/lib/collections/schemas/package.js` depending on your needs.

## Transactions

-   authorize

> Authorizations are held for 29 days. If the payment is not captured in this time period, the funds will be released.

-   capture

> Captures of an authorized charge can be made in any amount equal to, less than, or up to 115% of the original authorization (not to exceed $75 more than the authorization), unless your industry (i.e. tipping in restaurants) or individual account is authorized otherwise. Only the captured amount will be seen on the customers statement. Captures are immediate.
>
> _If a customer is given a 100% discount prior to capturing, the charge will appear as `voided`._

-   refund

> Refunds are allowed up to 100% of the captured amount, in one of more separate refund transactions.

-   refunds (list)

> A list of all refunds, processed through Reaction or the PayPal UI.

## Testing

### PayFlow

-   Credit card number : Any valid Luhn mod10 number
-   Expiration date: Any date in the future
-   CVV2: Any 3 numbers

### Express

-   You must set up a testing account in your sandbox. The same credit card details as PayFlow apply when setting up your sandbox account.
