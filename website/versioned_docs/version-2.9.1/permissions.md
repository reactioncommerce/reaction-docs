---
id: version-2.9.1-permissions
title: Permissions
original_id: permissions
---

The [alanning:roles](https://github.com/alanning/meteor-roles) Meteor package provides Reaction permissions support.

## Owner

The initial setup user was added to the shops 'owner' permission group with the 'owner' permission.

Users with "owner" role are full-permission, app-wide users.

**To check if user has owner access in browser code:**

```js
import Logger from "@reactioncommerce/logger";
import { Reaction } from "/client/api";

if (Reaction.hasOwnerAccess()) {
  Logger.info("The Reaction account has owner access");
}
```

## Admin

Users with "admin" role are full-permission, site-wide users.

**To check if user has admin access in browser code:**

```js
// client / server
import Logger from "@reactioncommerce/logger";
import { Reaction } from "/client/api";

if (Reaction.hasAdminAccess()) {
  Logger.info("The Reaction account has admin access");
}
```

## Dashboard

Users with "dashboard" role are limited-permission, site-wide users.

**To check if user has Dashboard access in browser code:**

```js
import Logger from "@reactioncommerce/logger";
import { Reaction } from "/client/api";

if (Reaction.hasDashboardAccess()) {
  Logger.info("The Reaction account has dashboard access");
}
```

## Permission Groups

Permission Groups are are way to grant multiple users a group of permissions. The Accounts Dashboard provides a way to create a group and add users to them.
Reaction currently ships with the four groups: Guest, Customer, Shop Manager and Owner. The Shop Manager and Owner groups are admin groups.
Guest group is by default for anonymous (un-registered) users while Customer group is by default for registered users (users who created accounts).
