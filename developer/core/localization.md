# Localization
## Currency Localization
Currency formatting is determined by users locale currency. The currency formatting is stored in the `Shops.currencies` object, and the configuration data is available in the client as `ReactionCore.Locale`

We've created `formatPrice` and `currencySymbol` helpers for using in templates:

```
{{formatPrice price}}
```

We use the [accounting.js](https://openexchangerates.github.io/accounting.js/) library for formatting.

Typical usage is `price = accounting.formatMoney price, ReactionCore.Locale.currency`

_Note: changing base shop currency is not reactive. Refresh/restart to see changes._

To add a currency you can add an entry in `reaction-sample-data/private/data/Shops.json`. For example:

```
...
"currencies" [
     "PHP": {
       "format": "%s %v",
       "symbol": "PHP"
     }
]
...
```

_Please note that the currency must be supported by Open Exchange Rates service to get automatic conversion for a user's locale._

## locateAddress
The locateAddress method determines a user's street address based on latitude and longitude coordinates or by ip address.

Usage:

```
Meteor.call "locateAddress", latitude, longitude, (address) ->
  # do something on callback
```

locateAddress takes latitude and longitude in [decimal degree format](https://en.wikipedia.org/wiki/Decimal_degrees) and uses a reverse geolocation lookup to determine street address. If coordinates are not provided, the method attempts to use the user's ip address to determine general location. An address is returned in this format:

```
[{
  latitude: Number
  longitude: Number
  country: String
  city: String
  state: String
  stateCode: String
  zipcode: String
  streetName: String
  streetNumber: String
  countryCode: String
}]
```

If no address can be found, then the following address object is returned:

```
[{
  latitude: null
  longitude: null
  country: "United States"
  city: null
  state: null
  stateCode: null
  zipcode: null
  streetName: null
  streetNumber: null
  countryCode: "US"
}]
```

For more information on how geocoding works in Reaction, check out the [meteor-geocoder package](https://github.com/aldeed/meteor-geocoder)
