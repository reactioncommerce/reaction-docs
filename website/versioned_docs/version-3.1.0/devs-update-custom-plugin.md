---
id: version-3.1.0-devs-update-custom-plugin
title: Updating a 2.x API plugin to work with Reaction API 3.x
sidebar_label: Updating an API plugin for 3.x
original_id: devs-update-custom-plugin
---

The Reaction API plugin system has changed a lot in the API 3.0.0 release. Primarily this is because the API now runs as a NodeJS program instead of a Meteor app, and because the Babel build step has been removed in favor of using Node's built in support for ECMAScript modules. But many other breaking changes were made in 3.0.0 as well. For a summary of changes in 3.0.0, refer to [Upgrading](./upgrading) and the [API Changelog](https://github.com/reactioncommerce/reaction/blob/trunk/CHANGELOG.md).

If you have custom plugins as part of your Reaction 2.x system, you'll need to go through them one by one and update them according to the following recommendations.

## Plugins Should Be NPM Packages

Every plugin should be an NPM package that is an ES module targeting Node 12.

  - Must have `"type": "module"` in the `package.json`
  - Should have `"engines": { "node": ">=12.14.1" }` in the `package.json`
  - Use `import/export` in your files rather than `require`, and publish without running the files through Babel.
  - For a good example, see [https://github.com/reactioncommerce/api-utils/blob/trunk/package.json](https://github.com/reactioncommerce/api-utils/blob/trunk/package.json)
  - The package entry point must `export default` a function that accepts one argument, `api`, which is a `ReactionAPI` instance. In most cases, the only thing this function will do is call `api.registerPlugin`, passing in your plugin options.
  - If you depend on other Reaction API plugins also being installed, list them as NPM dependencies in your `package.json` if they are published as NPM packages.

> By "NPM package" we mean [anything that NPM can install](https://docs.npmjs.com/cli/install.html#description). For example, you may want to install your custom plugin packages from private GitHub repos rather than publishing them to the NPM public registry or paying for private NPM. You can even specify a folder within your project as long as it has a `package.json` file.

### How to link in a local NPM package for a plugin while working on it

In your API project `docker-compose.dev.yml` file, in the `volumes` list, add one line for each local package you need to link into the container:

`- /absolute/file/path/to/package/root:/usr/local/src/app/node_modules/your-plugin-package-name`

In `registerPlugins.js`, import `your-plugin-package-name` and register it.

Run `npm install` in the package directory if it has non-dev dependencies.

Then in the API project, ensure that you have symlinked `docker-compose.dev.yml` to `docker-compose.override.yml` and run `docker-compose up -d` to start the API.

## Plugins Must Import Code According to Node ECMAScript Module Rules

Most named imports do not work at this time and will need to be rewritten. Some examples:

  - Use `import accounting from "accounting-js"` and then access functions on the `accounting` object. Named imports don't work.
  - Use `import _ from "lodash"`. Named imports don't work.

These are not the only examples, and there may be various ways to fix this issue.
    - Some packages have ES modules exports, but they're at a different package path. For example, you may be able to add `/esm` after the package name. Consult the package docs to see if this is the case.
    - If all else fails, you can fall back to using `require`, but you need to call `createRequire` to get the `require` function in an ES module file.

For full details, refer to [Understanding Node ECMAScript Modules](./devs-node-es-modules).

## API and UI Plugins are Separate

The Reaction Admin user interface is in a separate project now; it is no longer part of the API codebase. This means that UI components must be loaded and registered differently, in the Reaction Admin project. While you could still technically distribute the components in the same NPM package as the API plugin code, in most cases it's simpler and less confusing to create two different packages.

There are two main functions to register your React component to appear in the Reaction Admin UI: `registerOperatorRoute` and `registerBlock`

### registerOperatorRoute

Clone your plugin into `/imports/plugins/custom`. Your plugin must contain a single folder named `client` in which there is an `index.js` file. In this file, import your UI components and [register them to appear as routes](./register-operator-route).

### registerBlock

Clone your plugin into `/imports/plugins/custom`. Your plugin must contain a single folder named `client` in which there is an `index.js` file. In this file, import your UI components and [register them to appear in a specific block](./blocks-api).

### Specific UI Component Changes

- If you were previously using `registry` with `provides: ["emailProviderConfig"]`, you now need to register a component for the "EmailSettings" block region.
- If you were previously using `registry` with `provides: ["shopSettings"]`, you now need to register a component for the "ShopSettings" block region.
- If you were previously using `registry` with `provides: ["paymentSettings"]`, you now need to register a component for the "PaymentSettings" block region.
- If you were previously using `registry` with `provides: ["paymentSettings"]` for UI related to discounts, you now need to register a component for the "Discounts" block region.
- If you were previously using `registry` with `provides: ["shippingSettings"]`, you now need to register a component for the "ShippingSettings" block region.
- If you were previously using `registry` with `provides: ["taxSettings"]`, you now need to register a component for the "TaxSettings" block region.

## How to Register API Plugins

In 2.x plugins were detected automatically in the `plugins` directory. In 3.x, you must do two manual steps in your project to add an API plugin:

1. `npm install` the plugin package or add it manually to the dependencies list in `package.json`.
2. Modify the `registerPlugins.js` file to import and register it, following the pattern in that file.

Manually registering plugins gives you greater control over which plugins load and in which order. The `registerPlugins.js` file will sometimes have conflicts to resolve when you pull from upstream, but they won’t be difficult conflicts.

> You may create a `/src/custom` folder, add one subfolder per custom plugin, create a `package.json` file for each plugin, and add these as relative path dependencies in the main `package.json`. This is a quick way to try out a custom plugin, but we highly recommend that you maintain plugins in individual repos and use `npm install` to install them from a remote URL.

## There is No Shop on Context

API functions pass around a `context` object that is used to access the database, call other functions, check authentication, and perform authorization. Starting in 3.0.0, `context.shop` and `context.shopId` are no longer available.

Search your custom plugin code for `context.shop`. In these places, you will need to get a shop ID another way. The best ways are to either take it off the related entity you are dealing with, or ask the caller to pass it in (for example, add it to your GraphQL query or mutation params). In a pinch, you can do `await context.collections.Shops.findOne({ shopType: "primary" })`, but this will not work as well as Reaction's support for multi-shop configuration grows stronger.
