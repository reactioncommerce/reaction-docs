---
id: version-3.0.0-how-to-manage-app-settings
title: How To: Manage App Settings
original_id: how-to-manage-app-settings
---

Reaction plugins often need to provide a way for system or shop operators to configure different settings. There are a few options:
- Environment variables
- Global app settings
- Shop-specific app settings
- Create a custom MongoDB collection and GraphQL queries and mutations

If your plugin is dealing with a lot of domain-specific data and needs control over how this data is read and validated, use the last option. The other options are best when the idea of writing custom code for what you need seems like overkill.

Assuming you're not going to go with a full custom GraphQL solution, you'll next want to decide whether to use environment variables. In general, we recommend that you store settings in the database rather than using environment variables because you can then reconfigure your app without redeploying or restarting it. The one exception is for sensitive data such as passwords and API keys; for those, we recommend an environment variable and a secure solution for tracking those values across environments and setting the variables.

> If you have a multi-shop installation and shop-specific API keys, this is a tricky case. Currently it's usually best to use the shop-specific settings API, which stores the keys in plain text in the database. If you do this, be sure to track usage and rotate keys often.

The rest of this article explains how to use the other two options: global and shop-specific settings.

## Global Settings API

Let's suppose you are creating a plugin that needs a license key to function. The license key is for the entire installation rather than for each shop, so you can use the global settings API.

First, tell Reaction about your setting when you call `registerPlugin`:

```js
await app.registerPlugin({
  label: "My Plugin",
  name: "my-plugin",
  // ... other options
  globalSettingsConfig: {
    myPluginLicenseKey: {
      permissionsThatCanEdit: ["reaction:plugin-name:entity-name/update:settings"],
      simpleSchema: {
        type: String,
        min: 10
      }
    }
  }
});
```

Note the following:
- `globalSettingsConfig` is an object where each key is the name of a setting you want to use. The setting names are not namespaced to your plugin, so be sure that it will be unique among all plugins. For example, this example uses `myPluginLicenseKey` instead of `licenseKey`.
- `permissionsThatCanEdit` must be an array of permissions. A user must belong to a group that has any ONE of these permissions to update this setting value.
- `simpleSchema` is a [simpl-schema](https://github.com/aldeed/simple-schema-js) field definition used to validate the data before it is saved.
- You can also add a `defaultValue` option if your setting needs a specific value before it is ever set.

Second, add the setting to the relevant GraphQL types:

```graphql
extend type GlobalSettings {
  "License key for My Plugin"
  myPluginLicenseKey: String
}

extend input GlobalSettingsUpdates {
  "License key for My Plugin"
  myPluginLicenseKey: String
}
```

After you define the setting and start the Reaction API, you can now use GraphQL to set a value for this setting:

```graphql
mutation updateMyPluginLicenseKey($input: UpdateGlobalSettingsInput!) {
  updateGlobalSettings(input: $input) {
    globalSettings {
      myPluginLicenseKey
    }
  }
}
```

Where `input` is:

```json
{
  "settingsUpdates": {
    "myPluginLicenseKey": "ABC123"
  }
}
```

And you can also use GraphQL to get the current value of the setting:

```graphql
{
  globalSettings {
    myPluginLicenseKey
  }
}
```

Or you can get it in server code:

```js
const { myPluginLicenseKey } = await context.queries.appSettings(context);
```

*Anyone can view all settings by default.* If your setting value should be visible to only certain permissions, add a resolver for the field, check the current user's permissions in the resolver, and throw a `ReactionError` if they don't have proper permissions:

```js
import ReactionError from "@reactioncommerce/reaction-error";

await app.registerPlugin({
  label: "My Plugin",
  name: "my-plugin",
  // ... other options
  graphQL: {
    resolvers: {
      GlobalSettings: {
        async myPluginLicenseKey(settings, _, context) {
          await context.validatePermissions("reaction:plugin-name:entity-name", "read:settings", { shopId: PRIMARY_SHOP_ID });
          return settings.myPluginLicenseKey;
        }
      }
    }
  }
});
```

## Shop-Specific Settings API

The shop-specific settings API is identical to the global settings API except that setting values are stored per shop and a `shopId` is required for all operations.

Let's suppose you are creating a plugin that needs to store a "turbo mode" switch per shop.

First, tell Reaction about your setting when you call `registerPlugin`:

```js
await app.registerPlugin({
  label: "My Plugin",
  name: "my-plugin",
  // ... other options
  shopSettingsConfig: {
    isMyPluginTurboMode: {
      defaultValue: false,
      permissionsThatCanEdit: ["reaction:plugin-name:entity-name/update:settings"],
      simpleSchema: {
        type: String,
        min: 10
      }
    }
  }
});
```

Note the following:
- `shopSettingsConfig` is an object where each key is the name of a setting you want to use. The setting names are not namespaced to your plugin, so be sure that it will be unique among all plugins. For example, this example uses `isMyPluginTurboMode` instead of `isTurboMode`.
- `permissionsThatCanEdit` must be an array of permissions. A user must belong to a group that has any ONE of these permissions to update this setting value.
- `simpleSchema` is a [simpl-schema](https://github.com/aldeed/simple-schema-js) field definition used to validate the data before it is saved.
- Set a `defaultValue` if your setting needs a specific value before it is ever set.

Second, add the setting to the relevant GraphQL types:

```graphql
extend type ShopSettings {
  "True if Turbo Mode is activated for My Plugin"
  isMyPluginTurboMode: Boolean
}

extend input ShopSettingsUpdates {
  "Set to true to activate Turbo Mode for My Plugin"
  isMyPluginTurboMode: Boolean
}
```

After you define the setting and start the Reaction API, you can now use GraphQL to set a value for this setting:

```graphql
mutation updateMyPluginTurboMode($input: UpdateShopSettingsInput!) {
  updateShopSettings(input: $input) {
    shopSettings {
      isMyPluginTurboMode
    }
  }
}
```

Where `input` is:

```json
{
  "settingsUpdates": {
    "isMyPluginTurboMode": true
  },
  "shopId": "some_real_shop_id"
}
```

And you can also use GraphQL to get the current value of the setting:

```graphql
query shopSettingsQuery($shopId: ID!) {
  shopSettings(shopId: $shopId) {
    isMyPluginTurboMode
  }
}
```

Or you can get it in server code:

```js
const { isMyPluginTurboMode } = await context.queries.appSettings(context, internalShopId);
```

*Anyone can view all settings by default.* If your setting value should be visible to only certain permissions, add a resolver for the field, check the current user's permissions in the resolver, and throw a `ReactionError` if they don't have proper permissions:

```js
import ReactionError from "@reactioncommerce/reaction-error";

await app.registerPlugin({
  label: "My Plugin",
  name: "my-plugin",
  // ... other options
  graphQL: {
    resolvers: {
      ShopSettings: {
        async isMyPluginTurboMode(settings, _, context) {
          await context.validatePermissions("reaction:plugin-name:entity-name", "read:settings", { shopId: PRIMARY_SHOP_ID });
          return settings.isMyPluginTurboMode;
        }
      }
    }
  }
});
```
