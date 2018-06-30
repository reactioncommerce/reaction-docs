---
id: version-v1.5.0-payment-packages-braintree
title: Payments - Braintree
original_id: payment-packages-braintree
---
    
Braintree Payment Platform integration for Reaction Commerce

Documentation is available at <https://developers.braintreepayments.com/>

## Configuration

Configuration can be performed by Administrators in the Reaction Dashboard.

It can also be done in `private/settings/reaction.json` by adding (or updating) the following configuration details (remember to fill in the blanks):

```json
{
  "name": "reaction-braintree",
  "enabled": true,
  "settings": {
    "merchant_id": "",
    "public_key": "",
    "private_key": ""
  }
}
```

## Accepted Payment Methods

-   All major credit cards: Visa®, MasterCard®, American Express®, Discover®, Diner's Club, JCB
-   Signature Debit Cards

_Actual payment method support will vary by country._

Based on the accepted payment methods, Braintree's default schema for credit card numbers will allow between 12 - 19 numbers. This can be changed in `/imports/plugins/included/braintree/lib/collections/schemas/package.js` depending on your needs.

## Transactions

-   authorize

> Authorization holding times differ depending on the method of payment: American Express® (7 days), Visa® & MasterCard® (10 days), and all other methods (30 days). If the payment is not captured in this time period, the funds will be released.

-   capture

> Captures of an authorized charge can be made in any amount equal to or less than the original authorization, unless your industry (i.e. tipping in restaurants) or individual account is authorized otherwise. Only the captured amount will be seen on the customers statement. Captures take up to 24 hours to process, and no other actions on this transaction can occur during this time period.
>
> _If a customer is given a 100% discount prior to capturing, the charge will appear as `voided`._

-   refund

> Refunds are allowed up to 100% of the captured amount, in one of more separate refund transactions.

-   refunds (list)

> A list of all refunds, processed through Reaction or the Braintree UI.

## Testing

-   Credit card number : `4242424242424242`
-   Expiration date: Any date in the future
-   CVV2: Any 3 numbers

Braintree takes up to 24 hours to perform the capture process of a payment. Refunds are not allowed to be initiated until after the payment is fully processed. For testing purposes, Braintree allows you to bypass the 24 hour waiting period by adding the following code at the end of the `gateway.transaction.submitForSettlement` function in `imports/plugins/included/braintree/server/methods/braintreeApi.js`:

```js
gateway.testing.settle(transactionId, function (err, settleResult) {
  settleResult.success;
  settleResult.transaction.status;
});
```
