# Routing

Reaction implements the routing functionality provided by [kadira:flow-router-ssr](https://github.com/kadirahq/flow-router/tree/ssr) for routing in the `reaction-router` package.

> More Flow Router documentation is on the [kadirahq/flow-router GitHub repository](https://github.com/kadirahq/flow-router).

The Reaction Flow Router instance is exported as `ReactionRouter`

## Defining Routes

While you can use the Flow Router API, `ReactionRouter.route()` to directly add routes, `reaction-router` integrates routing with permissions, and helps to future proof against changes to the routing layer. Our recommended approach is to define an entry in the **Package Registry**.

### Registry Routing

Routes are very simple and based on the syntax of [path-to-regexp](https://github.com/pillarjs/path-to-regexp) which is used in both [Express](http://expressjs.com/) and `iron:router`.

The **Reaction package registry** entries define routes that can be used with the Flow Router API.

```javascript
  registry: [{
    route: "/product/:handle/:variantId?",
    name: "product",
    template: "productDetail",
    workflow: "coreProductWorkflow"
  }]
```

You can also pass local functions to the registry.

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

To view the client routing table

```javascript
console.table(ReactionRouter._routesMap);
```

or all defined routes

```javascript
console.table(ReactionRouter._routes);
```

## API

The [Flow Router API](https://github.com/kadirahq/flow-router#api) that ReactionRouter implements is a rich API to help you to navigate the router and reactively get information from the router.

### ReactionRouter.getParam(paramName);

Reactive function which you can use to get a parameter from the URL.

```javascript
// route def: /apps/:appId
// url: /apps/this-is-my-app

const appId = ReactionRouter.getParam("appId");
console.log(appId); // prints "this-is-my-app"
```

### ReactionRouter.getQueryParam(queryStringKey);

Reactive function which you can use to get a value from the queryString.

```javascript
// route def: /apps/:appId
// url: /apps/this-is-my-app?show=yes&color=red

const color = ReactionRouter.getQueryParam("color");
console.log(color); // prints "red"
```

### ReactionRouter.path(pathDef, params, queryParams)

Generate a path from a path definition. Both `params` and `queryParams` are optional.

Special characters in `params` and `queryParams` will be URL encoded.

```javascript
const pathDef = "/blog/:cat/:id";
const params = {cat: "met eor", id: "abc"};
const queryParams = {show: "y+e=s", color: "black"};

const path = ReactionRouter.path(pathDef, params, queryParams);
console.log(path); // prints "/blog/met%20eor/abc?show=y%2Be%3Ds&color=black"
```

If there are no params or queryParams, this will simply return the pathDef as it is.

#### Using Route name instead of the pathDef

You can also use the route's name instead of the pathDef. Then, ReactionRouter will pick the pathDef from the given route. See the following example:

```javascript
ReactionRouter.route("/blog/:cat/:id", {
    name: "blogPostRoute",
    action: function(params) {
        //...
    }
})

const params = {cat: "meteor", id: "abc"};
const queryParams = {show: "yes", color: "black"};

const path = ReactionRouter.path("blogPostRoute", params, queryParams);
console.log(path); // prints "/blog/meteor/abc?show=yes&color=black"
```

### ReactionRouter.go(pathDef, params, queryParams);

This will get the path via `ReactionRouter.path` based on the arguments and re-route to that path.

You can call `ReactionRouter.go` like this as well:

```javascript
ReactionRouter.go("/blog");
```

### ReactionRouter.url(pathDef, params, queryParams)

Just like `ReactionRouter.path`, but gives the absolute url. (Uses `Meteor.absoluteUrl` behind the scenes.)

### ReactionRouter.setParams(newParams)

This will change the current params with the newParams and re-route to the new path.

```javascript
// route def: /apps/:appId
// url: /apps/this-is-my-app?show=yes&color=red

ReactionRouter.setParams({appId: "new-id"});
// Then the user will be redirected to the following path
//      /apps/new-id?show=yes&color=red
```

### ReactionRouter.setQueryParams(newQueryParams)

Just like `ReactionRouter.setParams`, but for queryString params.

To remove a query param set it to `null` like below:

```javascript
ReactionRouter.setQueryParams({paramToRemove: null});
```

### ReactionRouter.getRouteName()

To get the name of the route reactively.

```javascript
Tracker.autorun(function() {
  const routeName = ReactionRouter.getRouteName();
  console.log("Current route name is: ", routeName);
});
```

### ReactionRouter.current()

Get the current state of the router. **This API is not reactive**. If you need to watch the changes in the path simply use `ReactionRouter.watchPathChange()`.

This gives an object like this:

```javascript
// route def: /apps/:appId
// url: /apps/this-is-my-app?show=yes&color=red

const current = ReactionRouter.current();
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
