# Routing

Reaction implements the routing functionality provided by [kadira:flow-router-ssr](https://github.com/kadirahq/flow-router/tree/ssr).

More Flow Router documentation is on the [kadirahq/flow-router GitHub repository](https://github.com/kadirahq/flow-router).

The Reaction Router instance is exported as `Reaction.Router`.

```js
import { Router } from "/client/api";

const urlParam = Router.getQueryParam("urlParam");
```

## Route Definition

While you can use the Flow Router API, and `Reaction.route()` to directly add routes to the routing table.  The routing methods exported from `/client/modules/router ` integrate routing with permissions, and help to future proof against changes to the routing layer. 

Our recommended approach is to define routing entries in the **Package Registry**.

### Registry Routing

Routes are very simple and based on the syntax of [path-to-regexp](https://github.com/pillarjs/path-to-regexp) which is used in both [Express](http://expressjs.com/) and `iron:router`.

The **Reaction package registry** entries define routes that can be used with the Router API. You can also pass local functions to the registry.

```javascript
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

```javascript
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

```javascript
defaultVisitorRole =  ["anonymous", "guest", "product", "tag", "index", "cart/checkout", "cart/completed"];
```

### Route Table

The package registry route entries are collectively added to the Flow Router routing table upon startup.

You can view these routes for debugging.  Add to a file in `custom` a global export of the Router.

```js
import { Router } from "/client/modules/router";
ReactionRouter = Router;
```

To view the client routing table in the browser console, you can now use the exported Router global.

```javascript
console.table(ReactionRouter._routesMap);
```

or all defined routes

```javascript
console.table(ReactionRouter._routes);
```

## API

The [Flow Router API](https://github.com/kadirahq/flow-router#api) that Router implements is a rich API to help you to navigate the router and reactively get information from the router.

### Router.getParam(paramName);

Reactive function which you can use to get a parameter from the URL.

```javascript
import { Router } from "/client/api";
// route def: /apps/:appId
// url: /apps/this-is-my-app

const appId = Router.getParam("appId");
console.log(appId); // prints "this-is-my-app"
```

### Router.getQueryParam(queryStringKey);

Reactive function which you can use to get a value from the queryString.

```javascript
import { Router } from "/client/api";
// route def: /apps/:appId
// url: /apps/this-is-my-app?show=yes&color=red

const color = Router.getQueryParam("color");
console.log(color); // prints "red"
```

### Router.path(pathDef, params, queryParams)

Generate a path from a path definition. Both `params` and `queryParams` are optional.

Special characters in `params` and `queryParams` will be URL encoded.

```javascript
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

```javascript
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

### Router(pathDef, params, queryParams)

Just like `Router.path`, but gives the absolute url. (Uses `Meteor.absoluteUrl` behind the scenes.)

### Router.setParams(newParams)

This will change the current params with the newParams and re-route to the new path.

```javascript
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

```javascript
import { Router } from "/client/api";

Router.setQueryParams({paramToRemove: null});
```

### Router.getRouteName()

To get the name of the route reactively.

```javascript
import { Router } from "/client/api";

Tracker.autorun(function() {
  const routeName = Router.getRouteName();
  console.log("Current route name is: ", routeName);
});
```

### Router.current()

Get the current state of the router. **This API is not reactive**. If you need to watch the changes in the path simply use `Router.watchPathChange()`.

This gives an object like this:

```javascript
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

```javascript
<template name="">
    {{pathFor 'product' handle=product.handle variantId=variants._id}}
</template>
```

### active

A Blaze template helper to return "active" when on current route path.

```javascript
  {{active "name"}}
```

### urlFor

A Blaze template helper that will return an absolute path for a named route.

```javascript
  {{urlFor "name"}}
```
