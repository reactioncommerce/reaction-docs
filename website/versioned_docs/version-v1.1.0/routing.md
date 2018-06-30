---
original_id: routing
id: version-v1.1.0-routing
title: Routing
---
    
Reaction Router extends the routing functionality provided by [kadira:flow-router-ssr](https://github.com/kadirahq/flow-router/tree/ssr).  The basics of FlowRouter are covered in the [FlowRouter documentation](https://github.com/kadirahq/flow-router), but you can most likely find everything you need to use Reaction Router on this page.

## Usage

Reaction Router is exported as `Router` from `"/client/api"`.

```js
import { Router } from "/client/api";

// Example: use a FlowRouter method to get a URL query param
const urlParam = Router.getQueryParam("urlParam");
```

## Route Definition

While you _can_ use the [Flow Router API](https://github.com/kadirahq/flow-router/tree/ssr) to directly add routes to the app, we recommend that you use the Reaction Router API. Reaction Router extends FlowRouter to integrate route permissions, make routing configurable by plugins (via the package registry), and to help future proof against changes to the routing layer (like possibly switching away from FlowRouter in the future).  

Our recommended approach to define routes is to use the **Package Registry**.

### Registry Routing

Routes are very simple and based on the syntax of [path-to-regexp](https://github.com/pillarjs/path-to-regexp) which is used in both [Express](http://expressjs.com/) and `iron:router`.

The **Reaction package registry** entries define routes that can be used with the Router API. You can also pass local functions to the registry.

```js
  registry: [{
    route: "/product/:handle/:variantId?",
    name: "product",
    template: "productDetail",
    workflow: "coreProductWorkflow"
  }]
```

When there are multiple shops in Reaction, we'll automatically prefix a url safe (transliterated) version of the shop name before the route. Where there is only one shop, the prefix will not be used.

**Multi-shop prefixed urls structure**

> //host/store: Reaction Test/product/title: Example Product/

**//localhost:3000/reaction-test/product/example-product**

To define a route in the registry that does not add a prefix you can define the route in the registry _without a leading "/"_.

```js
  registry: [{
    route: "about",
    name: "about",
    template: "about"
  }]
```

This route will resolve to `//localhost:3000/about`.

### Permissions

This registry entry automatically adds matching permissions to the `Roles` collection, and checks the user's permissions when displaying the route. By default, all routes require a user to have permissions to view them. A user's route permissions can be managed in the Accounts UI.

To permit all users to view a route, add the **route name** to the `Shops.defaultVisitorRole` array.

_Default permissions are not added automatically, as there will be a UI component to manage the Shop defaults in the future._

`Accounts.onCreateUser` adds default roles need for products, profiles, and checkout routes automatically if none are defined for the Shop.

```js
defaultVisitorRole =  ["anonymous", "guest", "product", "tag", "index", "cart/checkout", "cart/completed"];
```

### Route Table

The package registry route entries are collectively added to the Flow Router routing table upon startup.

You can view these routes for debugging. Add to a file in `custom` and create a global export of the Router that you can use in your browser console.

```js
import { Router } from "/client/api";

// create a global
ReactionRouter = Router;
```

To view the client routing table in the browser console, you can now use the exported Router global.

```js
console.table(ReactionRouter._routesMap);
```

or all defined routes

```js
console.table(ReactionRouter._routes);
```

## API

The Reaction Router API provides many useful methods to help you to navigate the router and reactively get information about routes.

### Router.getParam(paramName);

Reactive function which you can use to get a parameter from the URL.

```js
import { Router } from "/client/api";
// route def: /apps/:appId
// url: /apps/this-is-my-app

const appId = Router.getParam("appId");
console.log(appId); // prints "this-is-my-app"
```

### Router.getQueryParam(queryStringKey);

Reactive function which you can use to get a value from the queryString.

```js
import { Router } from "/client/api";
// route def: /apps/:appId
// url: /apps/this-is-my-app?show=yes&color=red

const color = Router.getQueryParam("color");
console.log(color); // prints "red"
```

### Router.path(pathDef, params, queryParams)

Generate a path from a path definition. Both `params` and `queryParams` are optional.

Special characters in `params` and `queryParams` will be URL encoded.

```js
import { Router } from "/client/api";

const pathDef = "/blog/:cat/:id";
const params = {cat: "met eor", id: "abc"};
const queryParams = {show: "y+e=s", color: "black"};

const path = Router.path(pathDef, params, queryParams);
console.log(path); // prints "/blog/met%20eor/abc?show=y%2Be%3Ds&color=black"
```

If there are no params or queryParams, this will simply return the pathDef as it is.

#### Using Route name instead of the pathDef

You can also use the route's name instead of the pathDef. Then, Router will pick the pathDef from the given route. See the following example:

```js
import { Router } from "/client/api";

Router.route("/blog/:cat/:id", {
    name: "blogPostRoute",
    action: function(params) {
        //...
    }
})

const params = {cat: "meteor", id: "abc"};
const queryParams = {show: "yes", color: "black"};

const path = Router.path("blogPostRoute", params, queryParams);
console.log(path); // prints "/blog/meteor/abc?show=yes&color=black"
```

### Router.go(pathDef, params, queryParams);

This will get the path via `Router.path` based on the arguments and re-route to that path.

You can call `Router.go` like this as well:

```js
import { Router } from "/client/api";

Router.go("/blog");
```

### Router.url(pathDef, params, queryParams)

Just like `Router.path`, but gives the absolute url. (Uses `Meteor.absoluteUrl` behind the scenes.)

### Router.setParams(newParams)

This will change the current params with the newParams and re-route to the new path.

```js
import { Router } from "/client/api";
// route def: /apps/:appId
// url: /apps/this-is-my-app?show=yes&color=red

Router.setParams({appId: "new-id"});
// Then the user will be redirected to the following path
//      /apps/new-id?show=yes&color=red
```

### Router.setQueryParams(newQueryParams)

Just like `Router.setParams`, but for queryString params.

To remove a query param set it to `null` like below:

```js
import { Router } from "/client/api";

Router.setQueryParams({paramToRemove: null});
```

### Router.getRouteName()

To get the name of the route reactively.

```js
import { Router } from "/client/api";

Tracker.autorun(function() {
  const routeName = Router.getRouteName();
  console.log("Current route name is: ", routeName);
});
```

### Router.current()

Get the current state of the router. **This API is not reactive**. If you need to watch the changes in the path simply use `Router.watchPathChange()`.

This gives an object like this:

```js
import { Router } from "/client/api";
// route def: /apps/:appId
// url: /apps/this-is-my-app?show=yes&color=red

const current = Router.current();
console.log(current);

// prints following object
// {
//     path: "/apps/this-is-my-app?show=yes&color=red",
//     params: {appId: "this-is-my-app"},
//     queryParams: {show: "yes", color: "red"}
//     route: {pathDef: "/apps/:appId", name: "name-of-the-route"}
// }
```

## Template helpers

### pathFor

A Blaze template helper that returns the named route's path and accepts params.

```js
<template name="">
    {{pathFor 'product' handle=product.handle variantId=variants._id}}
</template>
```

### active

A Blaze template helper to return "active" when on current route path.

```js
  {{active "name"}}
```

### urlFor

A Blaze template helper that will return an absolute path for a named route.

```js
  {{urlFor "name"}}
```

## Route Hooks

The `Router.Hooks` namespace provides a router-agnostic API for registering functions to be called either on specific routes or on _every_ route.  Like FlowRouter, there are hooks for `onEnter` and `onExit` and the callback functions are passed the same `context` object to optionally do something with.

### API

```js
import { Router } from '/client/api';

// Register a hook on a specific route
// (can be called as many times as needed to add more than one callback)
Router.Hooks.onEnter(routeName, callback);
Router.Hooks.onExit(routeName, callback);

// Register a hook on every route
// (can be called as many times as needed to add more than one callback)
Router.Hooks.onEnter(callback);
Router.Hooks.onExit(callback);

// Get all registered hooks for a specific route (returns array)
Router.Hooks.get("onEnter", routeName);
Router.Hooks.get("onExit", routeName);

// Get all registered hooks that run on every route (returns array)
Router.Hooks.get("onEnter", "GLOBAL");
Router.Hooks.get("onExit", "GLOBAL");

// Run all registered hooks for a specific route
// (context object is optional)
Router.Hooks.run("onEnter", routeName, context);
Router.Hooks.run("onExit", routeName, context);

// Run all registered global hooks
// (context object is optional)
Router.Hooks.run("onEnter", "GLOBAL", context);
Router.Hooks.run("onExit", "GLOBAL", context);
```

That's the whole Route Hooks API, but most users will only need to register new hooks (onEnter, onExit) because running all of the hooks is already taken care of in Reaction Router.

### Example Hooks

#### Import

```js
import { Router } from '/client/api';
```

#### Route-specific Hooks

```js
// create a function to do something on the product detail page
function logSomeStuff() {
  console.log("We're arriving at the product page!");
}
// add that to the product detail page onEnter hook
Router.Hooks.onEnter("product", logSomeStuff);
```

#### Global Route Hooks (every route)

```js
// create a pageview tracking function
function trackPages() {
  analytics.page();
}
// track page views on every route
Router.Hooks.onEnter(trackPages);

// or combined into one line...
Router.Hooks.onEnter(() => analytics.page());
```

#### Using route context in your hook

The same context object from FlowRouter is available to every callback

```js
function logSomeContext(context) {
  console.log("The current route details...");
  console.log("Params: ", context.params);
  console.log("Query Params: ", context.queryParams);
  console.log("Path: ", context.path);
  console.log("The route object: ", context.route);
}
// log out route details on every route
Router.Hooks.onEnter(logSomeContext);
```
