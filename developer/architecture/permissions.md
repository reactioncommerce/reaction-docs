# Permissions
[alanning:roles](https://github.com/alanning/meteor-roles) package provides Reaction permissions support.

**Permissions are grouped by `shopId`.**

Package specific roles can be defined in `register.js`, by adding custom permissions to registry entries with:

```
      permissions: [
        {
          label: "Custom Permission"
          permission: "custom/permission"
        }
      ]
```

Permission of the current route and user are compared against the package route by default, adding specific permissions to the registry entry is optional.

## Owner
The initial setup user was added to the shops 'owner' permission group with the 'owner' permission.

Users with "owner" role are full-permission, app-wide users.

**To check if user has owner access:**

```
    # client / server
    ReactionCore.hasOwnerAccess()

    # template
    {{#if hasOwnerAccess}}
```

## Admin
Users with "admin" role are full-permission, site-wide users.<br>**To check if user has admin access:**

```
  # client / server
  ReactionCore.hasAdminAccess()

  # template
  {{#if hasAdminAccess}}
```

## Dashboard
Users with "dashboard" role are limited-permission, site-wide users.

**To check if user has Dashboard access:**

```
  # client / server
  ReactionCore.hasDashboardAccess()

  # template
  {{#if hasDashboardAccess}}
```

To check if user has some specific permissions:

on Client: for current user, where "permissions" is string or ['string']

```
ReactionCore.hasPermission(permissions)
```

on Server: for some shop (current if not defined) and some userId (current if not defined), where "permissions" is string or ['string']

```
ReactionCore.hasPermission(permissions, shop, userId)
```

in templates:

```
{{#if hasPermission permissions}}{{/if}}
```

For using shop permissions in some packages you must add it into register directive.<br>If we add this package then permissions will be available in Shop Accounts Settings.

Another example:

```
ReactionCore.registerPackage
 name: 'reaction-commerce-orders'
 provides: ['orderManager']
 permissions: [
   {
     label: "Orders"
     permission: "dashboard/orders"
   }
 ]
```
