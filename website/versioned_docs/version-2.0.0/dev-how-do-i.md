---
id: version-2.0.0-dev-how-do-i
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
import Reaction from "/imports/plugins/core/core/server/Reaction";
import startup from "./server/no-meteor/startup";

Reaction.registerPackage({
  label: "Shipping",
  name: "reaction-shipping",
  icon: "fa fa-truck",
  autoEnable: true,
  functionsByType: {
    startup: [startup]
  }
  // other props
});
```

## Emit an app event

Emit app events in API code using `appEvents.emit`. There is currently no limit to what event name you can emit, but generally try to follow established patterns for naming.

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

To create any non-core MongoDB collection that a plugin needs, add a reference to the collection instance on `context.collections` in a startup function.

```js
export default function startup(context) {
  context.collections.MyCustomCollection = context.app.db.collection("MyCustomCollection");
}
```

Now `context.collections.MyCustomCollection` will be available in all query and mutation functions. Note that usually MongoDB will not actually create the collection until the first time you insert into it.

If you need to ensure indexes on any fields, the startup function is a good place to do that, too.
