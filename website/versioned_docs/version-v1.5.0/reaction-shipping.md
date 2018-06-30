---
id: version-v1.5.0-reaction-shipping
title: Shipping
original_id: reaction-shipping
---
    
Partial implementation, please review current Github Issues.

The included plugin `imports/plugins/included/shipping` provides a shipping module structure.

Currently `reaction-shipping` only provides flat-rate per order rules. All other rules will be added, and contributions are welcome.

The Schema and collections are setup to support the following rules, which need to be written.

## Methods

-   **flat rate - per order**
-   flat rate - line item
-   flat rate - order value over/under
-   carrier - line item calculated / weight
-   carrier - bundled box, dimensions + weight
-   percentage - line item
-   percentage - order value

## Usages Scenarios

-   bundled box dimensions + weight
-   different originations
-   different destinations
-   destination fees (example: charge more for international)
-   flat rate
-   mixed carrier rates
-   mixed carrier per line item (one flat rate+ one calculated)
-   per vendor
-   per vendor + method

## Shop results

-   Rates, per order, per line:
-   available (carrier / method title / rate)
-   Estimated Delivery Dates
-   Estimate Shipping Dates

## Order Results

-   Tracking Code
-   Label PDF
-   Customs Documents

## Schema

```json
{
  "shipping": [{
    "name": "Flat Rate Service",
    "serviceAuth": "",
    "serviceSecret": "",
    "serviceUrl": "",
    "format": "json",
    "methods": [{
      "name": "free",
      "group": "Ground",
      "label": "Free Shipping",
      "rate": "1.99",
      "handling": "0",
      "validRanges": [{
        "begin": "0",
        "end": "0"
      }],
      "validDestinations": [{
        "US": true,
        "CA": true,
        "UK": false
      }],
      "validOrigination": [{
        "US": true
      }]
    }],
    "containers": [{
      "envelope": true
    }]
  }]
}
```
