---
original_id: security
id: version-v1.1.0-security
title: Security
---
    
## Roles and Groups

[Roles, permissions, groups](permissions.md) are implemented using the [alanning:meteor-roles](https://github.com/alanning/meteor-roles) and implement an access schema with a user's permissions grouped by `shopId` provided for methods, routing and layout regions.

## Allow and Deny Rules

Allow, deny rules that restrict [CRUD](https://docs.mongodb.com/manual/crud/) operations on [Collections](https://guide.meteor.com/collections.html) use the [ongoworks/security](https://github.com/ongoworks/meteor-security) package in combination with [Role](https://github.com/alanning/meteor-roles) enforcement.

## Argument Validation

Uses [`check`](https://docs.meteor.com/#/full/check) for all `Meteor.method` arguments.

The [audit-argument-checks](http://docs.meteor.com/#/full/auditargumentchecks) package enforces a requirement for all `Meteor.method` to validate arguments using `check`.

> This package causes Meteor to require that all arguments passed to methods and publish functions are checked. Any method that does not pass each one of its arguments to check will throw an error, which will be logged on the server and which will appear to the client as a 500 Internal server error. This is a simple way to help ensure that your app has complete check coverage.

You can remove with `meteor remove audit-argument-checks` if necessary, but pull requests into Reaction must validate using `check` before changes can be merged.

## Content Policies

The [browser-policy](https://atmospherejs.com/meteor/browser-policy) package provides a default set of policies and methods for managing security-related browser policies. These policies help prevent and mitigate common attacks like cross-site scripting and clickjacking.

> Browser Policy gives us a simple API for specifying a ruleset on top of the Content Security Policy (CSP) standard and the X-Frame-Options HTTP header standard. [-The Meteor Chef](https://themeteorchef.com/snippets/using-the-browser-policy-package/#tmc-takeaways)

The [browser-policy](https://atmospherejs.com/meteor/browser-policy) package implements some default [Content Security Policy](https://www.w3.org/TR/CSP3/) rules.

- Content can only be loaded from the same origin as your app.
- Inline scripts and styles are allowed, but string-to-code features like eval are not.
- WebSocket and XmlHttpRequest connections can talk to any origin.

Reaction defines additional policies in `server/security/policy.js`.

- prevent the site from being framed
- prevent inline scripts
- prevent eval
- allow inline styles (for fonts)
- allow fonts to be loaded via data URLs
- allow origin from trusted sites
- external scripts must be loaded over HTTPS

Additionally, imported modules add additional policies- for an example take a look at `imports/plugins/included/analytics/server/policy.js`.

## force-ssl

You can force SSL redirection by adding the `force-ssl` package.

```sh
 meteor add force-ssl
```

You can use `meteor remove force-ssl` to remove redirection to the `https` protocol. When developing locally, you should not have to remove https as Meteor internally redirects all `localhost` requests to the `http` protocol, but, if you are running on a with some proxy, such as with Vagrant, you may need to remove this package if it's been added.
