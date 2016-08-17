# Stripe
Stripe Payment Platform integration for Reaction Commerce

Documentation is available at [https://stripe.com/docs/api](https://stripe.com/docs/api)


## Configuration
Configuration can be performed by Administrators in the Reaction Dashboard.

It can also be done in `private/settings/reaction.json` by adding (or updating) the following configuration details (remember to fill in the blanks):

```
{
  "name": "reaction-stripe",
  "enabled": true,
  "settings": {
    "api_key": ""
  }
}
```

## Accepted Payment Methods
- All major credit cards: Visa®, MasterCard®, American Express®, Discover®, Diner's Club, JCB
- Signature Debit Cards displaying the Visa® or MasterCard® logo

_Actual payment method support will vary by country._

Based on the accepted payment methods, Stripe's default schema for credit card numbers will allow between 13 - 16 numbers. This can be changed in `/imports/plugins/included/stripe/lib/collections/schemas/package.js` depending on your needs.

## Transactions
- authorize
> This is where info on authorization goes

- capture
> This is where info on capturing goes

- refund
> This is where info on refunds goes

- refunds (list)
> This is where info on authorization goes


## Testing
- Credit card number : `4242424242424242`
- Expiration date: Any date in the future
- CVV2: Any 3 numbers























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


Stripe DOES NOT accept Maestro

Refunds







authorize
Most credit-card processors have a two-step process to allow for different payment models. You should read your merchant agreement and the documentation to get the specifics but typically the authorize stage will do a check of the customer’s payment method (credit or debit card) and allocate that amount to you but no funds have been transferred. To the consumer it looks like the charge has already gone through and their balance is reduced by the allocated amount. Typically an autorization will expire after a set number of days. Usually you cannot capture more than you authorize but you can capture less and leave the balance still captured or release the balance. In a typical hard-goods shipment scenario, an authorize will be performed at time of order, then when the actual good are shipped a capture is performed.
capture
As noted before, this will operate against a previously performed authorization and tell the payment processor to transfer the actual funds. Some payment processors allow you to authorize and capture in one step which is why the authorize method takes a transactionType parameter.
refund
This method is probably self-explanatory, and is just a wrapper for whatever method your payment provider has for processing refunds.
refunds
This method should query for a list of refunds and these refunds will show up in the dashboard when managing orders.


Accepted Cards:


- authorize

> Authorizatoins with Stripe work in the tradisional way laid out in the main Payment document

- capture

> Capturing a payment with Stripe works a little differently than other providers, in that any amount less than the initial authorization - say you give a 25% discount - is treated as a refund, rather than a lesser capture of the authorization. Each bank may treat this differently, but in the Stripe backend, you will see a capture of the full amount of the authorizaion, followed by a refund of the difference.

- refund
> Refunds processing is available immeidiately. Refunds with Stripe work in the traditional way laid out in the payment document, with teh only exception being that and difference in the authorization and captureing is displayed as a refund.
