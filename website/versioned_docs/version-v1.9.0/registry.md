---
id: version-v1.9.0-registry
title: Registry
original_id: registry
---

The `Reaction Registry` is used to add settings, routes, and permissions for Reaction packages, both from Core and any custom package you write.

The Registry is the defining file of any Reaction plugin. You can think of the `register.js` file as similar, but not identical to, the `package.json` file you'd use to define an npm package.

A `registry` object can be any combination of properties, with `provides` and `name` being the only required elements.

The registry is refreshed only on update/deleting the Package record in the database, on delete/addition of the package and restarting the app.

Once registered, plugins are published to the client in the [Packages publication](https://github.com/reactioncommerce/reaction/blob/v1.8.0/server/publications/collections/packages.js). Inspecting this publication will give you some insight as to how and what parts of plugins are published to different parts of the app and how plugin settings can be public or private.

## A basic Register.js file

Here's an example of the most basic `register.js` file.

```js
Reaction.registerPackage({
  label: "PackageName",
  name: "reaction-example-package",
  icon: "fa fa-package",
  autoEnable: true,
  settings: {
    name: "Marketplace",
    enabled: true,
    public: {
      somePublicSetting: true
    }
  },
  registry: [] // Array of registry objects - optional
  layout: [] // Array of layout objects - optional
});
```

There are four main sections:
1\. Top-level properties
2\. Settings object
3\. Registry object
4\. Layout object

### Top-level properties

| Property     | Type    | Description                                                                                                                                       |
| ------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`       | String  | Used to refer to the plugin internally. Must be unique. Namespace your plugin to avoid conflicts, e.g. `yourorg-plugin-name`.                     |
| `label`      | String  | The label is displayed wherever the client refers to the plugin with a text label.                                                                |
| `icon`       | String  | The icon is a set of classes that are used to define an icon. The example above refers to a Font Awesome icon.                                    |
| `autoEnable` | Boolean | The autoEnable flag tells the app whether or not the plugin should be enabled on load, or if it must be turned on after the app has been started. |

### Settings object

The settings property is required, but it can also just be an empty object, `{}`.

Here's a snippet from the Marketplace plugin registry file: [plugins/included/marketplace/register.js](https://github.com/reactioncommerce/reaction/blob/v1.8.0/imports/plugins/included/marketplace/register.js)

```js
settings: {
  name: "Marketplace",
  enabled: true,
  public: {
    allowMerchantSignup: false, // Merchants can sign up without an invite
    marketplaceNakedRoutes: true, // Routes to the primary marketplace shop should not use shop prefix
    merchantCart: false, // Unique cart for each merchant
  }
}
```

Use the settings object to:

- **Declare public settings**: Put all public, client settings for all users in the `public` object. The public object is useful for setting permission booleans.
- **All others are private**: Everything outside of the `public` property will be private. Use for API keys, passwords, etc.
- **The `settings` object is a black box**: The schema will permit anything inside the object.
- **Fetching package settings**: Use [getPackageSettings()](http://api.docs.reactioncommerce.com/Core.html#.getPackageSettings) method to retrieve settings.

## Registry property

The `registry` property is optional. It takes an array of [Registry objects](http://api.docs.reactioncommerce.com/schemas.html#.Registry), where you can define routes and templates.

| Property           | Type                | Description                                                                                            |
| ------------------ | ------------------- | ------------------------------------------------------------------------------------------------------ |
| `provides`         | Array.<String>      | Legacy provides apps use a String rather than an array. These are transformed in loadPackages.         |
| `route`            | String              | optional, The `route` property registers the supplied route with Reaction.                             |
| `name`             | String              | optional, Route name permits calling the route with `Router.go("name")`                                |
| `template`         | String              | optional, Assign to a Blaze template                                                                   |
| `workflow`         | String              | optional, A layout for a template in the package                                                       |
| `layout`           | String              | optional, Force the app to render a specific layout                                                    |
| `triggersEnter`    | Array.<String>      | optional, Trigger on Enter                                                                             |
| `triggersExit`     | Array.<String>      | optional, Trigger on Exit                                                                              |
| `options`          | Object              | optional, Routing Options                                                                              |
| `description`      | String              | optional, deprecated                                                                                   |
| `icon`             | String              | optional, A set of CSS classes, often Font Awesome classes, used to define the package in the sidebar. |
| `label`            | String              | optional, Human-readable name for a Registry entry                                                     |
| `container`        | String              | optional, Used to group plugins                                                                        |
| `priority`         | Number              | optional, Plugin load order. Lower values loaded first.                                                |
| `enabled`          | Boolean             | optional, Enable or not                                                                                |
| `permissions`      | Array.<Permissions> | optional, Define a new user permission                                                                 |
| `audience`         | Array.<String>      | optional, Define what permissions are required to view a step in a workflow                            |
| `meta`             | Object              | optional, Set dashboardSize for the actionView                                                         |
| `showForShopTypes` | Array.<String>      | optional, Shop Types this plugin should show for                                                       |
| `hideForShopTypes` | Array.<String>      | optional, Shop Types this plugin should not show for                                                   |

### Route

```js
route: "/dashboard/accounts"
```

The `route` property registers the supplied route with Reaction. Once registered, you'll be able to visit this route by navigating directly to `example.com/shop-prefix/your-route`.

If you have more than one shop, you'll need to use the shop prefix when visiting a route directly. See also: [Routing Docs](https://docs.reactioncommerce.com/reaction-docs/trunk/routing),  [getShopPrefix](https://github.com/reactioncommerce/reaction/blob/v1.8.0/server/api/core/core.js#L447), and [Router.initPackageRoutes](https://github.com/reactioncommerce/reaction/blob/v1.8.0/imports/plugins/core/router/lib/router.js#L546).

### Name

```js
name: "accounts"
```

The `name` property permits calling this route with `Router.go` - e.g.
`Router.go("accounts");`.

The name property also becomes a permission or `role` that users can have. Having a role that corresponds to the `name` within a registered route permits the user to visit that route (but only for the shopId they have that role for). For more details, check out our [Routing Docs](https://docs.reactioncommerce.com/reaction-docs/trunk/routing).

### Template

```js
template: "accountsDashboard"
```

The `template` property can be assigned to a Blaze template, although where it is used depends on the value of `provides`. If you'd like to use a React component in place of a Blaze template, you just need to wrap your component in a Blaze template. There's an example of this in the [Email plugin template file](https://github.com/reactioncommerce/reaction/blob/v1.9.0/imports/plugins/core/email/client/templates/email.html#L1).

### Workflow

```js
workflow: "coreProductWorkflow"
```

Workflows are currently used to reference a layout for a template. We'll dig into this a bit in the Layouts section, but a workflow is essentially a unique structure within a given layout. Some registry entries require a workflow to be specified, and this will determine the structure around the template. This applies for the `layoutHeader`, `layoutFooter`, `notFound` template, etc.

Mostly, these are used when registering a route (with no `provides` property). An example of this can be found in the [product-variant register.js](https://github.com/reactioncommerce/reaction/blob/v1.8.0/imports/plugins/included/product-variant/register.js#L12).

### Layout

```js
layout: "printLayout"
```

The `layout` property can be used to force the app to render a specific layout. The primary use for this is to define routes with a custom workflow where perhaps a header, footer, etc. is not necessary. We leverage this in the [orders register.js](https://github.com/reactioncommerce/reaction/blob/v1.8.0/imports/plugins/core/orders/register.js#L35) to define a PDF print layout for orders.

### Icon

```js
icon: "fa fa-globe"
```

Again, the `icon` is a set of classes that are used to define an icon. The example above refers to a [Font Awesome](http://fontawesome.io/icons/) icon, but with some extra work, it could include other types of icons as well.

### Label

```js
label: "Orders"
```

The `label` is the human readable name for a registry entry. This should be originally written in English. You may then use i18n files within each plugin to translate them into other languages.

### Container

```js
container: "core"
```

This is used to group plugins. Saved for later use.

The `container` is used to define which part of the app a plugin belongs to. This permits us to put different registry entries in their appropriate sections, eg. permissions and shortcuts.

### Priority

```js
priority: 3
```

The `priority` property takes a positive integer as its value. It determines the order that this registry entry is loaded. Lower values will load first.

### Permissions

```js
permissions: [{
  label: "Create Product",
  permission: "createProduct"
}]
```

The `permissions` property allows you to define a new permission. The permissions label will be used for reference, and it will show up in the permissions list. If the registry entry is permission-controlled, it will also become the requirement for access. This property is used by [the createProduct shortcut](https://github.com/reactioncommerce/reaction/blob/v1.8.0/imports/plugins/included/product-variant/register.js#L22-L25).

### Audience

The `audience` property is used to define what permissions are required to view a step in a workflow. Primarily this is used in our [checkout workflow](https://github.com/reactioncommerce/reaction/blob/v1.8.0/imports/plugins/core/checkout/register.js#L39-L73). This property will almost certainly _not_ work the way you expect it to if it's used in a plugin. It's much more complex than simply defining which roles can access a route.

### Meta

```js
meta: {
  actionView: {
    dashboardSize: "md"
  }
}
```

Currently, the only setting used within the `meta` property is to set the `dashboardSize` for the `actionView`. The [Email register.js](https://github.com/reactioncommerce/reaction/blob/v1.8.0/imports/plugins/core/email/register.js#L19-L23) is an example of this.

## Provides

This property tells us how a part of the app should be used. Different `provides` values will have different requirements in terms of the other properties that should be listed alongside them.

Currently, the following are valid `provides` values:

| Value                 | Description                                                                                                                   |                                                                         |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `addressValidation`   | Register an address validation service to perform address validation.                                                         | Requires `label`, `name`, `provides`                                    |
| `catalogSettings`     | Register template to appear in **Catalog** panel                                                                              | Requires `label`, `name`, `provides`, `template`                        |
| `dashboard`           | Register a template, icon and label to appear in Action Panel, for users with appropriate permissions. Similar to `settings`  | See example                                                             |
| `paymentMethod`       | Register a payment method form template                                                                                       | Requires `icon`, `provides`, `template`                                 |
| `paymentSettings`     | Register a template to appear in **Payment** panel                                                                            | Requires `label`, `provides`, `template`                                |
| `settings`            | Register a template, icon and label to appear in Action Panel, for users with appropriate permissions. Similar to `dashboard` | See example                                                             |
| `shippingSettings`    | Register a template to appear in **Shipping** panel                                                                           | Requires `description`, `icon`, `label`, `name`, `provides`, `template` |
| `shortcut`            | Add a link to the Admin dropdown menu, for users with appropriate permissions                                                 | See example                                                             |
| `social`              | Register a template in the product social template                                                                            | Requires `template`, `provides`                                         |
| `taxCodes`            | Register `getTaxCodesMethod` in **Variant** panel                                                                             | Requires `label`, `name`, `provides`                                    |
| `taxSettings`         | Register a template to appear in **Tax** panel                                                                                | Requires `label`, `name`, `icon`, `template`, `provides`                |
| `ui-search`           | Register a template to appear in search                                                                                       | Requires `name`, `template`, `provides`                                 |
| `userAccountDropdown` | Add a link to User dropdown menu                                                                                              | Requires `route`, `name`, `label`, `icon`, `template`, `provides`       |

### Dashboard settings: Dashboard, Social, Catalog, Shipping

To add and customize Dashboard panels, use these `provides` values.

<img src="https://blog.reactioncommerce.com//content/images/2017/07/provides-dashboard.png" width="50%">

- `provides: "dashboard"` will cause a link with an icon and a label to appear in the Action Panel. The link will only be visible for users with appropriate permissions. This value is very similar to `provides: "settings"`.

- `provides: "dashboard"` requires:
  - `container` (unused)
  - `description` (unused)
  - `icon`
  - `label`
  - `priority` (unused)
  - `provides`
  - `name`
  - `route` (unused)
  - `template`
  - `workflow` (unused)

- `provides: "social"` - This will register a template to appear in the [product social template](https://github.com/reactioncommerce/reaction/blob/v1.8.0/imports/plugins/included/product-variant/client/templates/products/productDetail/social.html). The only core plugin that currently uses this setting is the Social plugin ([example here](https://github.com/reactioncommerce/reaction/blob/v1.8.0/imports/plugins/included/social/register.js#L55)).
    <img src="https://blog.reactioncommerce.com//content/images/2017/07/provides-social-1.png" width="50%">

- `provides: "social"` requires:
  - `template`
  - `provides`

- `provides: "catalogSettings"` will register a template to appear in the catalogSettings panel of the dashboard.

- `provides: "catalogSettings"` requires:
  - `label`
  - `name`
  - `template`
  - `provides`

- To see an example, check out the [Revisions plugin](https://github.com/reactioncommerce/reaction/blob/v1.8.0/imports/plugins/core/revisions/register.js).

- `provides: "shippingSettings"` - This will register a template to appear in the shippingSettings panel of the dashboard. For an example, check out our [Flat Rate Shipping plugin](https://github.com/reactioncommerce/reaction/blob/v1.8.0/imports/plugins/included/shipping-rates/register.js#L26-L33).

<img src="https://blog.reactioncommerce.com//content/images/2017/07/provides-shipping-settings-1.png" width="50%">

- `provides: "shippingSettings"` requires:
  - `label`
  - `template`
  - `icon`
  - `name`
  - `description`
  - `provides`

### Payment-related: Methods and Settings

<img src="https://blog.reactioncommerce.com//content/images/2017/07/provides-payment-method-1.png" width="50%">

- `provides: "paymentMethod"` - This will register a payment method form template. These payment forms will get rendered at checkout if the payment method is enabled.

- `provides: "paymentMethod"` requires:
  - `template`
  - `icon`
  - `provides`

- `provides: "paymentSettings"` - This will register a template to appear in the paymentSettings panel of the dashboard.

<img src="https://blog.reactioncommerce.com//content/images/2017/07/provides-payment-settings-1.png" width="50%">

<img src="https://blog.reactioncommerce.com//content/images/2017/07/default-payment-dropdown-1.png" width="50%">

- `provides: "paymentSettings"` requires:
  - `label`
  - `template`
  - `provides`

- `provides: "settings"` - This will register a link with an icon and a label to appear in the dashboard settings section. Link will only be visible for users with appropriate permissions. This value is very similar to `provides: "dashboard"`.

<img src="https://blog.reactioncommerce.com//content/images/2017/07/provides-dashboard-vs-provides-settings-2.png" width="50%">

- `provides: "settings"` requires:
  - `label`
  - `name`
  - `description` (unused)
  - `icon`
  - `template`
  - `provides`

### Menu link settings: Shortcut and User Account Dropdown

- `provides: "shortcut"` - This adds a link to an admin dropdown menu. When a user image or name is clicked on, a list of shortcuts (which the user has been given permission to access) will appear. `shortcut`s and `userAccountDropdown`s are fairly similar, except `shortcut`s will check for permissions before displaying a link, while `userAccountDropdown`s will display the link to all logged-in users.
    <img src="https://blog.reactioncommerce.com//content/images/2017/07/provides-shortcut-vs-provides-user-account-dropdown-2.png" width="50%">

- `provides: "shortcut"` requires:
  - `route` (unused)
  - `name`
  - `workflow` (unused)
  - `label`
  - `icon`
  - `priority` (unused)
  - `container` (unused)
  - `template`
  - `provides`

- `provides: "userAccountDropdown"` - This will add a link to a logged-in user's dropdown menu. When you click on a user's image or name when logged in, you'll seeing a list of shortcuts they have permission to access. `shortcut`s and `userAccountDropdown`s are similar. The primary difference is that `shortcut`s will check for permissions before displaying a link, while `userAccountDropdown`s display the link to all logged-in users.

- `provides: "userAccountDropdown"` requires:
  - `route`
  - `name`
  - `label`
  - `icon`
  - `template`
  - `provides`

- Shortcuts and User Account Dropdown links get passed into [mainDropdown.js](https://github.com/reactioncommerce/reaction/blob/v1.8.0/imports/plugins/core/accounts/client/components/mainDropdown.js).

- See the [Accounts register.js](https://github.com/reactioncommerce/reaction/blob/v1.8.0/imports/plugins/core/accounts/register.js#L45) for an example of a shortcut in the registry.

<img src="https://blog.reactioncommerce.com//content/images/2017/07/provides-shortcut-vs-provides-user-account-dropdown-3.png" width="50%">

### Taxes

- `provides: "taxCodes"` - This will register `getTaxCodesMethod`. We find the taxCodes provider in [variantFormContainer.js](https://github.com/reactioncommerce/reaction/blob/v1.8.0/imports/plugins/included/product-variant/containers/variantFormContainer.js#L54).
- See an example via our [Avalara plugin](https://github.com/reactioncommerce/reaction/blob/v1.8.0/imports/plugins/included/taxes-avalara/register.js#L30).

<img src="https://blog.reactioncommerce.com//content/images/2017/07/provides-tax-codes-1.png" width="50%">

- `provides: "taxCodes"` requires:
  - `label`
  - `name`
  - `provides`

- `provides: "taxSettings"` - This will register a template to appear in the Tax section of the dashboard. See our core [Taxes plugin register.js](https://github.com/reactioncommerce/reaction/blob/v1.8.0/imports/plugins/core/taxes/register.js) for an example.

<img src="https://blog.reactioncommerce.com//content/images/2017/07/provides-tax-settings-1.png" width="50%">

-`provides: "taxSettings"` requires:
  - `label`
  - `name`
  - `icon`
  - `template`
  - `provides`

### Search

- `provides: "ui-search"` - Registers a template to appear in the search UI. Currently, the search UI only uses a single template, so unless you remove the core search UI plugin, adding additional search templates won't really have an effect. For examples, check out the [search UI register.js](https://github.com/reactioncommerce/reaction/blob/v1.8.0/imports/plugins/included/ui-search/register.js), which gets pulled into the navbar in [navbarContainer.js](https://github.com/reactioncommerce/reaction/blob/v1.8.0/imports/plugins/core/ui-navbar/client/containers/navbar.js#L14).

<img src="https://blog.reactioncommerce.com//content/images/2017/07/provides-ui-search-1.png" width="50%">

-`provides: "ui-search"` requires:

- `name`
- `template`
- `provides`

## Layout property

The registry property takes an array of objects that are defined by the [Layout Schema](https://github.com/reactioncommerce/reaction/blob/v1.8.0/lib/collections/schemas/layouts.js#L66).

<http://api.docs.reactioncommerce.com/schemas.html#.Layout>

| Name       | Type            | Description                                                                     |
| ---------- | --------------- | ------------------------------------------------------------------------------- |
| layout     | String          | optional                                                                        |
| workflow   | String          | optional                                                                        |
| template   | String          | optional                                                                        |
| collection | String          | optional                                                                        |
| theme      | String          | optional                                                                        |
| enabled    | Boolean         | default value: true                                                             |
| status     | String          | optional                                                                        |
| label      | String          | optional                                                                        |
| container  | String          | optional                                                                        |
| audience   | Array.<String>  | optional                                                                        |
| structure  | LayoutStructure | optional                                                                        |
| priority   | Number          | optional default value: 999 - Layouts are prioritized with lower numbers first. |
| position   | Number          | optional default value: 1                                                       |

### Workflow

```js
workflow: "coreAccountsWorkflow"
```

The combination of `workflow` + `layout` determines what gets rendered to the client. By looking up a `workflow` + `layout` combination we can get the structure that's embedded here and render the correct templates to each section of the layout.

For examples of how the workflow and layout work together like this, dig into [router.js](https://github.com/reactioncommerce/reaction/blob/v1.8.0/imports/plugins/core/router/lib/router.js#L413).

We also use workflows as a sort of state machine in the case of our checkout and order fulfillment processes. Checkout [workflow.js](https://github.com/reactioncommerce/reaction/blob/v1.8.0/imports/plugins/core/checkout/server/methods/workflow.js) to see how this works.

### Layout

```js
layout: "coreLayout"
```

For any given workflow/layout combination, the `layout` property defines which macro-level layout should be used. Each layout can have a different structure. Our core layout component is defined in [coreLayout.js](https://github.com/reactioncommerce/reaction/blob/v1.8.0/imports/plugins/core/layout/client/components/coreLayout.js#L7) and registered in [index.js](https://github.com/reactioncommerce/reaction/blob/v1/imports/plugins/core/layout/client/index.js#L30-L33), along with our only other included layout, `printLayout`.

### Collection

```js
collection: "Accounts"
```

The `collection` property declares which Mongo collection is associated with this workflow/layout combination. It shouldn't be necessary to define this for most plugins.

### Theme

```js
theme: "default"
```

The `theme` property defines which CSS theme to use. Currently, "default" is the only included option.

### Enabled

```js
enabled: true
```

The `enabled` property turns this workflow/layout combo on or off.

### Structure

Layout Structures are used to in two ways: 1) Define the template layout on the site and 2) Define workflow components used in each layout block.

The `structure` property is where specific templates can be assigned to a layouts areas. Each layout may have it's own unique structure and so some render locations may render in one layout and not in another.

```js
structure: {
  template: "accountsDashboard",
  layoutHeader: "layoutHeader",
  layoutFooter: "",
  notFound: "notFound",
  dashboardHeader: "dashboardHeader",
  dashboardControls: "",
  dashboardHeaderControls: "",
  adminControlsFooter: "adminControlsFooter"
}
```
