---
original_id: payment-packages-authnet
id: version-v1.1.0-payment-packages-authnet
title: Payments - Authorize.net
---
    
Authorize.net Payment Platform integration for Reaction Commerce

Documentation is available at [https://developer.authorize.net/api/reference/index.html](https://developer.authorize.net/api/reference/index.html)

## Configuration

Configuration can be performed by Administrators in the Reaction Dashboard.

It can also be done in `private/settings/reaction.json` by adding (or updating) the following configuration details (remember to fill in the blanks):

```json
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

- All major credit cards: Visa®, MasterCard®, American Express®, Discover®, Diner's Club, JCB
- Signature Debit Cards

_Actual payment method support will vary by country._

Based on the accepted payment methods, Authorize.net's default schema for credit card numbers will allow between 12 - 19 numbers. This can be changed in `/imports/plugins/included/authnet/lib/collections/schemas/package.js` depending on your needs.

## Transactions

- authorize

> Authorizations are held for 30 days. If the payment is not captured in this time period, the funds will be released.

- capture

> Captures of an authorized charge can be made in any amount equal to or less than the original authorization, unless your industry (i.e. tipping in restaurants) or individual account is authorized otherwise. Only the captured amount will be seen on the customers statement. Captures are immediate.
>
> _If a customer is given a 100% discount prior to capturing, the charge will appear as `voided`._

- refund

> **Refunds are not supported**  
> Authorize.net requires the expiration date and last four digits of the credit card to process refunds. This does not comply with Reaction's policy to not store data that is not compatible with PCI compliance. Refunds can still be processed directly through the [Authorize.net dashboard](https://account.authorize.net/).

- refunds (list)

> **Refunds are not supported**

## Testing

- Credit card number : `4242424242424242`
- Expiration date: Any date in the future
- CVV2: Any 3 numbers
