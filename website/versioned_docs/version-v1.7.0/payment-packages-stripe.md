---
id: version-v1.7.0-payment-packages-stripe
title: Payments - Stripe
original_id: payment-packages-stripe
---
    
Stripe Payment Platform integration for Reaction Commerce

Documentation is available at <https://stripe.com/docs/api>

## Configuration

Configuration can be performed by Administrators in the Reaction Dashboard.

It can also be done in `private/settings/reaction.json` by adding (or updating) the following configuration details (remember to fill in the blanks):

```json
{
  "name": "reaction-stripe",
  "enabled": true,
  "settings": {
    "api_key": ""
  }
}
```

Note: this package automatically converts the total charge amount into smallest currency units as is required by Stripe before the API call is made.

## Accepted Payment Methods

- All major credit cards: Visa®, MasterCard®, American Express®, Discover®, Diner's Club, JCB
- Signature Debit Cards displaying the Visa® or MasterCard® logo

**Note:** Actual payment method support will vary by country.

Based on the accepted payment methods, Stripe's default schema for credit card numbers will allow between 13 - 16 numbers. This can be changed in `/imports/plugins/included/stripe/lib/collections/schemas/package.js` depending on your needs.

## Transactions

- authorize

> Authorizations are held for 7 days. If the payment is not captured in this time period, the funds will be released.

- capture

> Captures of an authorized charge can be made in any amount equal to or less than the original authorization, unless your industry (i.e. tipping in restaurants) or individual account is authorized otherwise. Captures are immediate. Stripe will always capture the full amount of the authorization, and then immediately apply a refund if your capture is for an amount less than that. Customers may see the full amount and a refund on their statements, or a single charge of the lesser amount, depending on the bank the payment is processed through.
>
> _If a customer is given a 100% discount prior to capturing, the charge will still follow the process listed above, a full charge of the authorized amount, followed by an immediate discount of 100%. Because of this process, you will see your discount listed in both the "discount" and "refunds list" section of your admin panel. Your `Adjusted Total` will only account for the discount, so you are not seeing a discount applied twice._

- refund

> Refunds are allowed up to 100% of the captured amount, in one of more separate refund transactions.

- refunds (list)

> A list of all refunds or discounts, processed through Reaction or the Stripe UI.

## Testing

- Credit card number : `4242424242424242`
- Expiration date: Any date in the future
- CVV2: Any 3 numbers
