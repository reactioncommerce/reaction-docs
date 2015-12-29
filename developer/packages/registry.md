
# Registry
The `Reaction Registry` is used to add settings, routes,  and permissions for Reaction specific packages.

A `registry` object can be any combination of properties, with `provides` being the only required element.

_Note: The registry is currently refreshed only on update/deleting the package record in the database, or on delete/addition of the package._

You may filter, or define using any of the optional registry properties:

**package**

```
ReactionCore.registerPackage({
  name: 'core',
  autoEnable: true,
  settings: {
    "public": {
      allowGuestCheckout: true
    },
    mail: {
      user: "",
      password: "",
      host: "localhost",
      port: "25"
    }
  },
```

**registry**

```
  registry: [
    {
      route: "dashboard/settings/shop",
      provides: 'dashboard',
      label: 'Core',
      description: 'Reaction Commerce Core',
      icon: 'fa fa-th',
      cycle: 1,
      container: "dashboard",
      permissions: [
        {
          label: "Dashboard",
          permission: "dashboard"
        }
      ]
    }, {
      route: "dashboard",
      provides: 'shortcut',
      label: 'Dashboard',
      icon: 'fa fa-th',
      cycle: 1
    }, {
      route: "dashboard",
      label: 'Dashboard',
      provides: 'console',
      permissions: [
        {
          label: "Console",
          permission: "console"
        }
      ]
    }, {
      route: "dashboard/settings/shop",
      template: "shopSettings",
      label: "Shop Settings",
      provides: 'settings',
      icon: "fa fa-cog fa-2x fa-fw",
      container: 'dashboard'
    }
  ]
```

**layout**

```
layout: [
  {
    template: "checkoutLogin",
    label: "Login",
    workflow: 'coreCartWorkflow',
    container: 'checkout-steps-main',
    audience: ["guest", "anonymous"],
    priority: 1,
    position: "1"
  }
]
```

For more details about layouts, and workflows see: [workflow.md](workflow.md)

**_Special Usage_**
- `cycle`  1- Core, 2- Community, 3- Public 4 - Local
- `container` group alike for presentation _example: used to connect settings on dashboard app card registry object_

See: [package-cycles.md](package-cycles.md)

**Dynamic Templates**

The `provides` property is a "placement" value, loading it as `dynamic template` where the other conditions match a request from the `reactionApps` helper.

The following `provides` values are defined in reaction-core:
- widget
- paymentMethod
- shippingMethod
- settings
- shortcut
- dashboard
- console
- userAccountDropdown

To add a new `settings` link to the app card:

```
    # settings
    {
      route: "dashboard/package/settings"
      provides: 'settings'
      icon: "fa fa-user-plus"
    }
```

To add a new link to the `console navbar`:

```
    {
      route: "<custom-route>"
      label: '<My Link>'
      provides: 'console'
    }
```

From templates, you can create additional dynamic template `provides` using the `reactionApps` helper to load registry objects.

```html
  {{#each reactionApps provides="settings" name=name group=group}}
    <a href="{{pathFor route}}" class="pkg-settings" title="{{i18n 'app.settings'}}">
      <i class="{{orElse icon 'fa fa-cog fa-2x fa-fw'}}"></i>
    </a>
  {{/each}}
```

You can also extend or replace any core template using [template extensions](https://github.com/aldeed/meteor-template-extension/).
