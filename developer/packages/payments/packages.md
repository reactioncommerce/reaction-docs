# Name of Payment Platform
RCP Payment Platform integration for Reaction Commerce

Documentation is available at [http://thewebsite.com](http://thewebsite.com)


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

## Accepted Payment Methods
All major credit cards: Visa®, MasterCard®, American Express®, Discover®, Diner's Club, JCB

Signature Debit Cards

_Actual payment method support will vary by country._

Based on the accepted payment methods, the Authorize.net default schema for credit card numbers will allow between 12 - 19 numbers. This can be changed in the file `/imports/plugins/included/rcp/lib/collections/schemas/package.js` depending on your needs.

## Transactions
- authorize
> This is where info on authorization goes

- capture
> This is where info on capturing goes

- refund
> This is where info on refunds goes

- refunds (list)
> This is where info on authorization goes


## Testing Tips and Tricks
Luhn generator
24 hour window
etc
