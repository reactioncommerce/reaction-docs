# Routing
Reaction implements the routing functionality provided by [kadira:flow-router](https://github.com/kadirahq/flow-router) for routing in the `reaction-router` package.

The Reaction router object is exported as `ReactionRouter`

## Helpers

```
ReactionRouter.go('index')
ReactionRouter.go('/')                   // redirect to the defined route (here: '/') ReactionRouter.go('PostShow', {_id: 7})  //redirect to '/posts/7'
ReactionRouter.path('reaction-accounts/dashboard')          // return the path of the defined route as a string. (here: '/')
ReactionRouter.current().path            // return the current path
```

# Package implementation

To future proof against changes to the router, the recommended approach is to define an entry in the `Packages.registry`, but you can also use `ReactionRouter.route()` to define routes.

```
  registry: [{
    route: "/product/:handle/:variantId?",
    name: "product",
    template: "productDetail",
    workflow: "coreProductWorkflow"
  }]
```

You can also pass local functions to the registry.  

