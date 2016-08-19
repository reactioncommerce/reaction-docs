# Security

Community tested Meteor packages that enforce security rules are installed as required dependencies in Reaction Core.

## Authorization

[Roles, permissions, groups](/developer/architecture/permissions.md) are implemented using the [alanning:meteor-roles](https://github.com/alanning/meteor-roles) package.

> This package lets you attach permissions to a user which you can then check against later when deciding whether to grant access to Meteor methods or publish data. The core concept is very simple, essentially you are attaching strings to a user object and then checking for the existance of those strings later. In some sense, it is very similar to tags on blog posts. This package provides helper methods to make the process of adding, removing, and verifying those permissions easier.

## Rules

 Allow, deny rules implemented using the [ongoworks/security](https://github.com/ongoworks/meteor-security) package.

> Most Meteor developers should be familiar with the standard allow and deny functions that can be used to secure database operations that originate on the client. But most developers handle security by simply defining a few allow functions. This may work in most cases, but many people don't realize that only one allow function needs to return true and then the rest of them aren't even called. If you use a lot of community packages in your app, there is the possibility that one of them will add an allow function that returns true for a perfectly good reason, but if you are not aware of it, you may not even realize that your allow function is never being called, and your security logic is not being applied.

> **This package takes allow functions out of the equation and handles all security through deny functions, which are guaranteed to be called.**

## Argument Validation

Uses [`check`](https://docs.meteor.com/#/full/check) for all `Meteor.method` arguments.

The [audit-argument-checks](http://docs.meteor.com/#/full/auditargumentchecks) package enforces a requirement for all `Meteor.method` to validate arguments using `check`.

> This package causes Meteor to require that all arguments passed to methods and publish functions are checked. Any method that does not pass each one of its arguments to check will throw an error, which will be logged on the server and which will appear to the client as a 500 Internal server error. This is a simple way to help ensure that your app has complete check coverage.

You can remove with `meteor remove audit-argument-checks` if necessary, but packages will be required to pass `check` to be accepted as Reaction packages.

## Browser Policies

The [browser-policy](https://atmospherejs.com/meteor/browser-policy) package sets security-related browser policies.

> The browser-policy family of packages, part of Webapp, lets you set security-related policies that will be enforced by newer browsers. These policies help you prevent and mitigate common attacks like cross-site scripting and clickjacking.

The `browser-policy` package is installed by reaction-core and is not optional.

## force-ssl

You can force SSL redirection by adding the `force-ssl` package.

```sh
 meteor add force-ssl
```

You can use `meteor remove force-ssl` to remove redirection to the `https` protocol. When developing locally, you should not have to remove https as Meteor internally redirects all `localhost` requests to the `http` protocol, but, if you are running on a with some proxy, such as with Vagrant, you may need to remove this package.
