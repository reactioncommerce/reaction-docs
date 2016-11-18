# Event Hooks

Event hooks is a simple API that allows you to attach arbitrary callbacks to any particular event that you define. You simply
decide what your events is and then add callbacks to it from anywhere in the code, and then run all callbacks when that event
is fired. The canonical example is `onCoreInit`/`afterCoreInit` event hooks that runs code either during Reaction's
startup sequence, or after it has completed. (the on/after is just a naming convention, but we suggest that code extending
this code utilize this same convention)

The API has the folliwing methods

`Hooks.Event.add(name, callback)`

Here you simply pass in the name of the event and then the callback you wish to be executed.

`Hooks.Event.remove(name, callback)`

Remove a callback function that has already been added to an event.

`Hooks.Events.run(name, item, constant)`

For already defined events you will never need to use this, but if you are defining your own events this is what you
would execute when the event is fired. Name is the name of the event, the object/modifier on which to run the callbacks,
and a constant to be passed to every callback (e.g. for a user-related event, it might be the user)

`Hooks.Events.runAsync(name, item, constant)`

An async version of the above method (only works on the server-side)


## Events currently defined in Reaction Commerce

* onCoreInit - When initalization of Reaction starts
* afterCoreInit - When initialization of Reaction has completed
* beforeCreateDefaultAdminUser - Before the default admin user is created (all callbacks must take and return an options object)
* afterCreateDefaultAdminUser - After default admin user is created (user is passed to all callbacks)
* onJobServerStart - When the job server has started
* onLogin - On user login. All Hooks must accept and return an options object
* onImport{CollectionName} - Fired for each collection that gets imported. Gets passed the option to be imported and
and expects that object to be returned, so imported objects can be modified by hooks.
