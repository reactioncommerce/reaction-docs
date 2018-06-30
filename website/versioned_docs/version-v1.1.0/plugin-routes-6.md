---
original_id: plugin-routes-6
id: version-v1.1.0-plugin-routes-6
title: Routes
---
    
In any web framework, "routes" are one of the core elements of what happens on a website. Certainly rendering content
when a user hits a particular URL is a majority of what happens in web development.

Reaction Commerce uses the [FlowRouter package](https://github.com/kadirahq/flow-router) for it's routing and discussing all the specifics of how this works is beyond the scope of this document. However, to add simple routes it's not necessary to understand that much about FlowRouter. One important element to understand is that Reaction Commerce stores all it's Routes in the "Registry" in the database, which allows packages to dynamically add routes along with their functionality, and even override or remove existing routers. For more in-depth coverage of Routing you will want to consult the main Reaction Commerce docs, but one thing to understand is that a customized version of FlowRouter is available globally as `Reaction.Router`.

But we are going to keep it at its most simple and just add a single new route which will be available to anybody. Bee's
Knees wants to add the ubiquitous "About" page to their site and wants to show essentially a static page there.
(Management of static pages is coming in upcoming version of RC but this still makes an excellent simple example).

So the first thing we want to do is add the route in the Registry which we do by adding an entry in the `registry` key in
our `register.js` file.

This entry will look like this (placed after the `autoEnable: true` entry):

```js
  registry: [
    {
      route: "/about",
      name: "about",
      template: "aboutUs",
      workflow: "coreWorkflow"
    }
  ],
```

The `route` entry is the URL that will match the users URL. (for how to include parameters in the route, please see the RC documentation or the FlowRouter documentation)
The `name` is the string by which you will refer to this route in other parts of the application. The `template` is the
template that will be rendered when the route is visited, and the `workflow` defines which workflow this will be attached to.
In our case, there is no real workflow around an about page so we use the default "coreWorkflow".

To allow users to our new Route we need to give them permissions. Since we are good with everyone viewing our About page  we will add this permission to our "defaultRoles" and "defaultVisitorRoles" (the roles available when a new user is created).
To do this we are going to create a new file called `init.js` in the `server` directory there and add that file to our imports. Then we
will add a function that looks like this:

```js
function addRolesToVisitors() {
  // Add the about permission to all default roles since it's available to all
  Logger.info("::: Adding about route permissions to default roles")
  const shop = Shops.findOne(Reaction.getShopId());
  Shops.update(shop._id, {
      $addToSet: { "defaultVisitorRole": "about"}
    }
  );
  Shops.update(shop._id, {
    $addToSet: { "defaultRoles": "about"}
  });
}
```

Then let's add another Hook Event to call that code.

```js
/**
 * Hook to make additional configuration changes
 */
Hooks.Events.add("afterCoreInit", () => {
  addRolesToVisitors();
});
```

Now, as usual you will need to reset for this change to take affect. In addition, changes to defaultRoles/defaultVisitorRoles
do **not** change existing users, so you will need to clear your cache or use Private/Incognito mode so that a new user is created.

## Using Route "Hooks"

It's common to want to write code to do something when a url visits a certain route for such things as site tracking/metric.
You can do this with a Route "hook".

We can do this using the `Hooks` API provided by Reaction. For any route you can add an arbitrary callback. (Note that
routing is done on the client-side, so it needs to be added there). So are going to add a new `init.js` file in our `client`
directory and add the import to it in the `index.js`. Then we can add this code:

```js
import { Router, Logger } from "/client/api";

// create a function to do something on the product detail page
function logSomeStuff() {
  Logger.warn("We're arriving at the product page!");
}
// add that to the product detail page onEnter hook
Router.Hooks.onEnter("product", logSomeStuff);
```

Now every time the user enters the "product" route, the function `logSomeStuff` will run. If you want to see a list
of routes currently loaded on the client you type `ReactionRouter._routes` in the browser console.

Next [Workflow](plugin-workflow-7)

Read More

[Routing](routing)

[Hooks](event-hooks.md)
