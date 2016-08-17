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

## Accepted Payment methods
Payment Methods.

Actual support will vary by country.

Based on the accepted payment methods, the RCP default schema for for Credit Card numbers will allow between 12 - 19 numbers. This can be changed in the file `/imports/plugins/included/rcp/lib/collections/schemas/package.js`

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
