---
id: version-2.9.1-dev-how-do-i
title: For Developers: How Do I...?
original_id: dev-how-do-i
---

## Get the current authenticated user

### In New Server Code

Use `context.userId` or `context.user`

### In Meteor Server Code

```js
import Reaction from "/imports/plugins/core/core/server/Reaction";

// In a Meteor method or publication:
Reaction.getUserId()
```

### In Meteor Client Code

```js
import { Reaction } from "/client/api";

// Anywhere:
Reaction.getUserId()
```

## Get the current authenticated account

### In New Server Code

Use `context.accountId` or `context.account`

### In Meteor Server Code

```js
import Reaction from "/imports/plugins/core/core/server/Reaction";
import { Accounts } from "/lib/collections";

// In a Meteor method or publication:
const userId = Reaction.getUserId();
const account = Accounts.findOne({ userId });
```

### In Meteor Client Code

```js
import { Reaction } from "/client/api";
import { Accounts } from "/lib/collections";

// Anywhere:
const userId = Reaction.getUserId();
const account = Accounts.findOne({ userId });
```

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

### In New Server Code

```js
import ReactionError from "@reactioncommerce/reaction-error";

// In a query or mutation function:
if (!context.userHasPermission(["shipping"], shopId)) {
  throw new ReactionError("access-denied", "Access Denied");
}
```

If the user has _any_ of the provided roles, the result will be `true`. Be sure to pass in the correct shop ID, the ID of the shop that owns whatever entity is being fetched or changed.

### In Meteor Server Code

```js
import Reaction from "/imports/plugins/core/core/server/Reaction";
import ReactionError from "@reactioncommerce/reaction-error";

// In a Meteor method or publication:
const userId = Reaction.getUserId();
if (!Reaction.hasPermission(["shipping"], userId, shopId)) {
  throw new ReactionError("access-denied", "Access Denied");
}
```

If the user has _any_ of the provided roles, the result will be `true`. Be sure to pass in the correct shop ID, the ID of the shop that owns whatever entity is being fetched or changed.

### In Meteor Client Code

```js
import { Reaction } from "/client/api";

// Anywhere:
const userId = Reaction.getUserId();
if (Reaction.hasPermission(["shipping"], userId, shopId)) {
  // show or hide UI, etc.
}
```

If the user has _any_ of the provided roles, the result will be `true`. Be sure to pass in the correct shop ID, the ID of the shop that owns whatever entity is being fetched or changed, or the ID of the shop that is currently visible.

## Get the app (GraphQL resolver) context in a Meteor method or publication

```js
import Reaction from "/imports/plugins/core/core/server/Reaction";
import getGraphQLContextInMeteorMethod from "/imports/plugins/core/graphql/server/getGraphQLContextInMeteorMethod";

// In a Meteor method or publication:
const context = Promise.await(getGraphQLContextInMeteorMethod(Reaction.getUserId()));
```

## Run plugin code on app startup

Copy the following into a `server/no-meteor/startup.js` file in the plugin folder:

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

Then import and register the startup function in the plugin's `register.js` file:

```js
export default async function register(app) {
  await app.registerPlugin({
    label: "Shipping",
    name: "reaction-shipping",
    icon: "fa fa-truck",
    functionsByType: {
      startup: [startup]
    }
    // other props
  });
}
```

## Emit an app event

Emit app events in API code using `appEvents.emit`. There is currently no limit to what event name you can emit, but generally try to follow established patterns for naming. Learn more about [App Event Hooks](appevent-hooks.md).

### In New Server Code

```js
context.appEvents.emit("eventName", payload, options);
```

### In Meteor Server Code

```js
import Reaction from "/imports/plugins/core/core/server/Reaction";
import getGraphQLContextInMeteorMethod from "/imports/plugins/core/graphql/server/getGraphQLContextInMeteorMethod";

// In a Meteor method or publication:
const context = Promise.await(getGraphQLContextInMeteorMethod(Reaction.getUserId()));
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

### In New Server Code

```js
import createNotification from "/imports/plugins/included/notifications/server/no-meteor/createNotification";

await createNotification(context.collections, { accountId, type: "orderCanceled", url });
```

### In Meteor Server Code

```js
import createNotification from "/imports/plugins/included/notifications/server/no-meteor/createNotification";
import rawCollections from "/imports/collections/rawCollections";

await createNotification(rawCollections, { accountId, type: "orderCanceled", url });
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

The `collections` object key is where you will access this collection on `context.collection`, and `name` is the collection name in MongoDB. We recommend you make these the same if you can.

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
