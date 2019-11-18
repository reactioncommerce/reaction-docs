---
id: how-to-create-inventory-plugin
title: How To: Create an Inventory Data Provider Plugin
---

Before you create a custom inventory data provider plugin, make sure that you need one.
- If your inventory system outputs periodic files but doesn't allow you to read inventory programmatically in real time, you may want to use the "Simple Inventory" plugin and only update the values. Refer to option 2 [here](./core-plugins-simple-inventory#how-to-sync-inventory-quantities-from-an-external-system).
- If you use a well known third-party inventory system, there may be a community plugin already available for it. If not, consider making yours available as open source so that the community can help you maintain it.

Once you're sure you need to create a custom inventory plugin, use the standard steps to create the plugin boilerplate. Beyond that, an inventory plugin needs to do the following:
- Register an `inventoryForProductConfigurations` type function that returns current inventory in stock and other related data for a list of product configurations.
- Optionally provide a way of editing the inventory in stock in the operator UI, by registering client components
- Optionally track order status changes to keep track of "reserved" inventory, which is inventory that is still technically in stock but should not be considered available to sell.

## Register an `inventoryForProductConfigurations` function

An `inventoryForProductConfigurations` function must look up inventory information for the received `productConfiguration` from your external inventory system. Each item in the return array must have the same `productConfiguration` object and an `inventoryInfo` object field with all of the fields shown in the example code below.

If your plugin is unsure what the inventory is for this product configuration, it must return `null` for the `inventoryInfo` field. It's possible to have multiple plugins providing inventory info, and some other plugin might know what the inventory is. Returning `null` tells the core "inventory" plugin to ask the next inventory data provider or use default values if all inventory data plugins return `null`.

```js
/**
 * @summary Returns an object with inventory information for one or more
 *   product configurations.
 * @param {Object} context App context
 * @param {Object} input Additional input arguments
 * @param {Object[]} input.productConfigurations An array of ProductConfiguration objects
 * @return {Promise<Object[]>} Array of responses
 */
export default async function inventoryForProductConfigurations(context, input) {
  const { collections } = context;
  const { SimpleInventory } = collections;
  const { productConfigurations } = input;

  return productConfigurations.map((productConfiguration) => {
    // Look up inventory information for `productConfiguration` from external system.

    return {
      inventoryInfo: {
        canBackorder,
        inventoryAvailableToSell,
        inventoryInStock,
        inventoryReserved,
        isLowQuantity
      },
      productConfiguration
    };
  });
}
```

Pass your function in the `functionsByType` list:

```js
import inventoryForProductConfigurations from "./inventoryForProductConfigurations";

/**
 * @summary Import and call this function to add this plugin to your API.
 * @param {ReactionAPI} app The ReactionAPI instance
 * @return {undefined}
 */
export default async function register(app) {
  await app.registerPlugin({
    label: "My Inventory Data Plugin",
    name: "my-inventory-data-plugin",
    functionsByType: {
      inventoryForProductConfigurations: [inventoryForProductConfigurations]
    }
  });
}
```

> You may be aware that the core inventory plugin provides two queries: `inventoryForProductConfigurations` (multiple) and `inventoryForProductConfiguration` (single). The single version of the function is a convenience wrapper that calls the multiple version. Thus, an inventory data plugin needs to provide only this one function, which expects multiple product configurations.

## Optionally add UI components

How and whether you should do this step depends a lot on how your plugin is tracking inventory. If you want any information to be viewable or editable in the operator UI, you can extend the GraphQL API and register UI blocks to appear where you need them.

## Track reserved/available inventory

In addition to providing "in stock" inventory values, most inventory data providers also somehow track "reserved" inventory and/or automatically increase or decrease the "in stock" and "available" values as orders are placed, approved, and fulfilled. Refer to the `startup` function in the Simple Inventory plugin for one example of how you can do this. The rest of the Reaction system does not care how you do this, and for a low volume shop you may be able to skip it entirely.

> If you do track reserved inventory, it can be an inexact science. We recommend that you provide operators with a way of manually fixing or updating the reserved quantity, as the Simple Inventory plugin does with the `recalculateReservedSimpleInventory` GraphQL mutation and corresponding UI button.
