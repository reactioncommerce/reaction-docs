---
original_id: reaction-shops
id: version-v1.1.0-reaction-shops
title: Shops
---
    
Reaction Core provides a single tenant shop.

For other implementations, see: [#357](https://github.com/reactioncommerce/reaction/issues/357)

The default shop installation data is loaded from `/private/data/Shops.json`.

## Methods

### shop/createShop

Create a new shop, and give `shopAdminUserId` administrative permissions.

_Customization required. Although this works, much of the UI doesn't yet handle multiple shops._

```js
Meteor.call("shop/createShop",shopAdminUserId, shopData);
```

### shop/getLocale

Determine user's countryCode and return locale object

```js
Meteor.call("shop/getLocale");
```

### shop/getCurrencyRates

Returns the current exchange rate against the shop currency

```js
Meteor.call("shop/getCurrencyRates", "USD");
```

### shop/flushCurrencyRate

Removes exchange rates that are too old

```js
Meteor.call("shop/flushCurrencyRate");
```

### shop/updateShopExternalServices

On submit OpenExchangeRatesForm handler, updates Package registry.

```js
/**
 * shop/updateShopExternalServices
 * @description On submit OpenExchangeRatesForm handler
 * @summary we need to rerun fetch exchange rates job on every form submit,
 * that's why we update autoform type to "method-update"
 * @param {Object} modifier - the modifier object generated from the form values
 * @param {String} _id - the _id of the document being updated
 * @fires Reaction.Collections.Packages#update
 * @todo This method fires Packages collection, so maybe someday it could be
 * @returns {undefined}
 * moved to another file
 */
Meteor.call("shop/updateShopExternalServices",modifier, _id);
```

### shop/locateAddress

Determine full location address details based on lat/long.

```js
Meteor.call("shop/locateAddress", latitude, longitude);
```
