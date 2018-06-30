---
id: version-v1.6.4-event-hooks
title: Event Hooks
original_id: event-hooks
---
    
Event hooks is a simple API that allows you to attach arbitrary callbacks to any particular event that you define. You simply
decide what your events are and then add callbacks to it from anywhere in the code, and then run all callbacks when that event
is fired. The canonical example is `onCoreInit`/`afterCoreInit` event hooks that runs code either during Reaction's
startup sequence, or after it has completed. (the on/after is just a naming convention, but we suggest that code extending
this code utilize this same convention)

The API has the following methods

`Hooks.Event.add(name, callback)`

Here you pass in the name of the event and then the callback you wish to be executed.

`Hooks.Event.remove(name, callback)`

Remove a callback function that has already been added to an event.

`Hooks.Events.run(name, item, constant)`

For already defined events you will never need to use this, but if you are defining your own events this is what you
would execute when the event is fired. Name is the name of the event, the object/modifier on which to run the callbacks,
and a constant to be passed to every callback (e.g. for a user-related event, it might be the user)

`Hooks.Events.runAsync(name, item, constant)`

An async version of the above method (only works on the server-side)

## Example

Let's say we wanted to create our own event for "onCreateUser". We would call the `run` method when the event occurred.

```js
import { Hooks } from "/server/api"

Accounts.onCreateUser(function(options, user) {
  // add a hook to alter the user object or do something with its data
  user = Hooks.Events.run("onCreateUser", user, options);
});
```

Now you can pass any amount of functions into that hook from anywhere else in the app

```js
import { Hooks } from "/server/api"

// create a callback to run
function logUserEmail(user) {
  console.log("User being created with email: " + user.emails[0].address);
  // do whatever with the user doc and then return it
  // to the next callback
  return user;
}

// add your callback to the hooks array created above
Hooks.Events.add("onCreateUser", logUserEmail);
```

## Events

Events that are currently defined in Core are:

-   `onCoreInit` - When initialization of Reaction starts
-   `afterCoreInit` - When initialization of Reaction has completed
-   `beforeCreateDefaultAdminUser` - Before the default admin user is created (all callbacks must take and return an options object)
-   `afterCreateDefaultAdminUser` - After default admin user is created (user is passed to all callbacks)
-   `onCreateUser` - When a new user is created
-   `onLogin` - On user login. All Hooks must accept and return an options object
-   `onJobServerStart` - When the job server has started
-   `onImport{CollectionName}` - Fired for each collection that gets imported. Gets passed the option to be imported and expects that object to be returned, so imported objects can be modified by hooks
-   `onOrderShipmentShipped` - When order is shipped
-   `onOrderShipmentDelivered` - When order status is shipped
-   `onOrderPaymentCaptured` - When the order payment is processed
-   `onOrderRefundCreated` - When the order has a refund created.
-   `onGetShippingRates` - When Cart shipping rates have been requested.
