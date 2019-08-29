---
id: how-to-share-code-between-plugins
title: How To: Share Code Between API Plugins
---

Sometimes you need one API plugin to provide a function to be called by another plugin. There are several different ways to choose from.

| Method                | Pros                                                                                                                                               | Cons                                                                                                                                                                         |
|-----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| functionsByType       | - Easy<br>- Supports multiple functions                                                                                                               | - No way to know which plugin registered a function<br>- No way to label a function or provide additional metadata about it<br>- No way to run the functions in a particular order |
| queries/mutations     | - Easy                                                                                                                                             | - Does not support multiple functions<br>- No way to label a function or provide additional metadata about it<br>- No way to run the functions in a particular order               |
| registerPluginHandler | - Full control<br>- Can provide dependency/sorting information<br>- Can provide additional metadata<br>- Can track which plugin registered a function | - A bit more work is required to write the handler                                                                                                                           |

In new code, using `registerPluginHandler` is best.

## functionsByType

One simple way to provide a function to another plugin for a specific purpose is to pass it to `registerPlugin` in the `functionsByType` list.

```js
import funkyFn from "./funkyFn";

await app.registerPlugin({
  label: "Cart",
  name: "reaction-cart",
  functionsByType: {
    funky: [funkyFn]
  }
});
```

In another plugin, I can then loop through and call all "funky" functions that were registered by other plugins:

```js
for (const funkyFn of context.getFunctionsOfType("funky")) {
  // eslint-disable-next-line no-await-in-loop
  await funkyFn(...args);
}
```

Note that the plugin that calls the functions must document what arguments it will provide and what return value and/or side effects it expects.

## queries / mutations

If you only ever want a single function registered, you might choose to use `context.queries` or `context.mutations` instead of `functionsByType`. The idea here is that your plugin can simply document that it expects to find a function named "expireCarts" (for example) on `context.mutations`, and then call `context.mutations.expireCarts`. Just as with `functionsByType`, the plugin that calls the function must document what arguments it will provide and what return value and/or side effects it expects.

> If more than one plugin registers a query or mutation function, the last one registered will win. There is no error or warning thrown. Being able to override these functions in a custom plugin is a feature of Reaction.

> If your query or mutation function is intended to be called only by other plugins, you do not need to add it to your GraphQL schema or create a GraphQL resolver for it.

## registerPluginHandler

The most flexible way to share code, or really any information, between plugins is by creating a `registerPluginHandler` function. This type of function is registered using `functionsByType`:

```js
import { registerPluginHandler } from "./registration";

await app.registerPlugin({
  label: "Cart",
  name: "reaction-cart",
  functionsByType: {
    registerPluginHandler: [registerPluginHandler]
  }
});
```

A `registerPluginHandler` function is called multiple times immediately after all plugins are loaded as the app is starting. It is passed the `registerPlugin` options provided by each plugin. The handler is expected to examine the options and save off anything it needs. This means that any plugin can extend the `registerPlugin` options by documenting something it expects to find there.

The typical and recommended pattern is to have a file named `registration.js` in your plugin, in which you not only define and export your `registerPluginHandler`, but also define and export the related data that other files in your plugin need. For example, here is the `reaction-catalog` plugin's `registration.js` file:

```js
export const customPublishedProductFields = [];
export const customPublishedProductVariantFields = [];

/**
 * @summary Will be called for every plugin
 * @param {Object} options The options object that the plugin passed to registerPlugin
 * @returns {undefined}
 */
export function registerPluginHandler({ catalog }) {
  if (catalog) {
    const { publishedProductFields, publishedProductVariantFields } = catalog;
    if (Array.isArray(publishedProductFields)) {
      customPublishedProductFields.push(...publishedProductFields);
    }
    if (Array.isArray(publishedProductVariantFields)) {
      customPublishedProductVariantFields.push(...publishedProductVariantFields);
    }
  }
}
```

The function looks for `catalog` key and pushes data from that into exported arrays. In this way, any files in the `reaction-catalog` plugin that import `customPublishedProductFields` or `customPublishedProductVariantFields` will have the full list built from all registered plugins.

To keep track of which plugins are registering what, look at the `name` key in the object. You can save off and export as much information as you need, in whatever format is best.

> A `registerPluginHandler` function may NOT return a Promise. If you need to do something `async` with the data, just save it off for now. Then create and register a `startup` type function, which imports the data you saved off, does the async tasks, and returns a Promise. Startup functions are called immediately after `registerPluginHandler` functions as the app is starting.
