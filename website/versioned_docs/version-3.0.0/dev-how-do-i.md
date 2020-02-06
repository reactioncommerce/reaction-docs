---
id: version-3.0.0-dev-how-do-i
title: For Developers: How Do I...?
original_id: dev-how-do-i
---

## Get the current authenticated user

Use `context.userId` or `context.user`

## Get the current authenticated account

Use `context.accountId` or `context.account`

### Using GraphQL

```gql
{
  viewer {
    _id
    userId
  }
}
```

## Check permissions for the current authenticated user

```js
// In a query or mutation function:
await context.checkPermissions(["shipping"], shopId)
```

If the user has _any_ of the provided permissions, they will be allowed. Otherwise a `ReactionError` will be thrown. Be sure to pass in the correct shop ID, the ID of the shop that owns whatever entity is being fetched or changed.

## Run plugin code on app startup

Copy the following into a `startup.js` file in the plugin folder:

```js
/**
 * @summary Called on startup
 * @param {Object} context Startup context. This is the normal app context but without
 *   any information about the current request because there is no current request.
 * @returns {undefined}
 */
export default function startup(context) {
  // Plugin startup code here
}
```

Then import and register the startup function in the plugin's `index.js` file:

```js
export default async function register(app) {
  await app.registerPlugin({
    label: "Shipping",
    name: "reaction-shipping",
    functionsByType: {
      startup: [startup]
    }
    // other props
  });
}
```

## Emit an app event

Emit app events in API code using `appEvents.emit`. There is currently no limit to what event name you can emit, but generally try to follow established patterns for naming. Learn more about [App Events](appevent-hooks.md).

```js
context.appEvents.emit("eventName", payload, options);
```

## Listen for an app event

See "Run plugin code on app startup" and attach event listeners in startup code.

```js
// In startup function:
context.appEvents.on("eventName", (payload, options) => {
  // Handle the event
});
```

### Prevent infinite looping of app events

If you consume an event and also emit it within the consumer, set `options.emittedBy` to a unique string and then check for that string at the top of your function to avoid consuming your own event and entering an infinite loop.

```js
const AFTER_CART_UPDATE_EMITTED_BY_NAME = "TAXES_CORE_PLUGIN_AFTER_CART_UPDATE";

export default function startup(context) {
  context.appEvents.on("afterCartUpdate", (payload, { emittedBy } = {}) => {
    if (emittedBy === AFTER_CART_UPDATE_EMITTED_BY_NAME) return;

    // Handle event

    context.appEvents.emit("afterCartUpdate", newPayload, {
      emittedBy: AFTER_CART_UPDATE_EMITTED_BY_NAME
    });
  });
}
```

## Create a notification

```js
await context.mutations.createNotification(context, {
  accountId,
  type: "orderCanceled",
  url
});
```

## Add MongoDB collections from a plugin

To create any non-core MongoDB collection that a plugin needs, use the `collections` option in your plugin's `registerPlugin` call:

```js
export default async function register(app) {
  await app.registerPlugin({
    label: "My Custom Plugin",
    name: "my-custom-plugin",
    collections: {
      MyCustomCollection: {
        name: "MyCustomCollection"
      }
    }
    // other props
  });
}
```

The `collections` object key is where you will access this collection on `context.collections`, and `name` is the collection name in MongoDB. We recommend you make these the same if you can.

The example above will make `context.collections.MyCustomCollection` available in all query and mutation functions, and all functions that receive `context`, such as startup functions. Note that usually MongoDB will not actually create the collection until the first time you insert into it.

If you need to ensure indexes on any fields in your collection, see the next section.

## Ensure MongoDB collection indexes from a plugin

You can add indexes for your MongoDB collection in the same place you define your collection, the `collections` object of your `registerPlugin` call:

```js
export default async function register(app) {
  await app.registerPlugin({
    label: "My Custom Plugin",
    name: "my-custom-plugin",
    collections: {
      MyCustomCollection: {
        name: "MyCustomCollection",
        indexes: [
          [{ referenceId: 1 }, { unique: true }]
        ]
      }
    }
    // other props
  });
}
```

Each item in the `indexes` array is an array of arguments that will be passed to the Mongo `createIndex` function. The `background` option is always set to `true` so you need not include that.

## Loop over async function results

Often you have a list of functions that return a Promise, and you need to loop through the list and call each function. The recommended way to do this depends on whether the functions are expecting to be called in series or can be safely called in parallel.

For performance reasons, you should call them in parallel if you can. To do so, use `map` and await `Promise.all`.

```js
const promisedResults = listOfFunctions.map((func) => func());
const results = await Promise.all(promisedResults);
```

However, in some cases the functions have side effects that require them to be executed one after another, or you need to pass the result of function 1 into the function 2 call and so on. In these cases, you can use `await` within a `for` loop. The default `eslint` rule config disallows this, so it's a good idea to leave a detailed comment explaining why it's necessary.

```js
// We need to run each of these functions in a series, rather than in parallel, because
// we are mutating the same object on each pass. It is recommended to disable `no-await-in-loop`
// eslint rules when the output of one iteration might be used as input in another iteration, such as this case here.
// See https://eslint.org/docs/rules/no-await-in-loop#when-not-to-use-it
for (const func of listOfFunctions) {
  await func(product); // eslint-disable-line no-await-in-loop
}
```

## Work with countries

To get a list of all countries with details about each:

```js
import CountryDefinitions from "@reactioncommerce/api-utils/CountryDefinitions.js";
```

To get array of country label and value, suitable for rendering a select in a user interface:

```js
import CountryOptions from "@reactioncommerce/api-utils/CountryOptions.js";
```

## Work with languages

To get array of language label and value, suitable for rendering a select in a user interface:

```js
import LanguageOptions from "@reactioncommerce/api-utils/LanguageOptions.js";
```

## Work with currencies

To get a list of all world currencies with details about each:

```js
import CurrencyDefinitions from "@reactioncommerce/api-utils/CurrencyDefinitions.js";
```

To get details about one currency when you know the currency code:

```js
import getCurrencyDefinitionByCode from "@reactioncommerce/api-utils/getCurrencyDefinitionByCode.js";

const currencyDefinition = getCurrencyDefinitionByCode("USD");
```

To get array of currency label and value, suitable for rendering a select in a user interface:

```js
import CurrencyOptions from "@reactioncommerce/api-utils/CurrencyOptions.js";
```

## Format money

```js
import formatMoney from "@reactioncommerce/api-utils/formatMoney.js";

const formattedString = formatMoney(10.10, "EUR");
```

This wraps the [accounting-js](https://www.npmjs.com/package/accounting-js) `formatMoney` function.

## Generate and check an access token

```js
import getAnonymousAccessToken from "@reactioncommerce/api-utils/getAnonymousAccessToken.js";

const tokenInfo = getAnonymousAccessToken();
```

`tokenInfo` has `createdAt`, `hashedToken`, and `token` properties. `token` should be provided to the client or user who needs access. `createdAt` and `hashedToken` should be saved to the database. `token` must NOT be saved to the database.

When `token` is later provided with an API request, you can compare it to the saved `hashedToken` like this:

```js
import hashToken from "@reactioncommerce/api-utils/hashToken.js";

const { createdAt, hashedToken } = lookUpFromDatabase();
// compare "now" to `createdAt` to determine if token is expired
// compare `hashedToken` with `hashToken(token)` to see if they are exactly equal
```
