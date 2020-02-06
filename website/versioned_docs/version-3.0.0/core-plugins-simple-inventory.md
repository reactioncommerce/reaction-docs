---
id: version-3.0.0-core-plugins-simple-inventory
title: Simple Inventory Plugin
original_id: core-plugins-simple-inventory
---

The Simple Inventory plugin (`reaction-simple-inventory`) is included and should meet your needs for inventory tracking if you do not use an external inventory system. It does the following:
- Creates a `SimpleInventory` MongoDB collection for storing inventory data.
- Registers an `inventoryForProductConfigurations` type function that returns current inventory in stock and other related data from the `SimpleInventory` collection. This is the main point of integration between this plugin and the core "inventory" plugin.
- Adds a `simpleInventory` query, on context and for GraphQL, which returns the data currently stored in the `SimpleInventory` collection for a product configuration.
- Adds an `updateSimpleInventory` mutation, on context and for GraphQL, which updates the data currently stored in the `SimpleInventory` collection for a product configuration.
- Adds an "Inventory" card to the product variant editor UI on the operator site. This card shows and updates inventory info using the aforementioned GraphQL mutation and query.
- Listens for order status changes to track the current "reserved" inventory quantity.
- Provides a `recalculateReservedSimpleInventory` mutation and a UI button for it. This recalculates the "reserved" inventory quantity if it becomes incorrect.
- Allows you to set a `lowInventoryWarningThreshold` number. When the available inventory ("in stock" minus "reserved") is at or below this threshold, `isLowQuantity` will be `true` when inventory info is queried.

## When to update inventory

The Simple Inventory plugin considers variant inventory to be "reserved" starting when an order is placed for that variant, and ending when all payments for that order have been approved. You should notice that approving the final payment will automatically decrease the "reserved" number, decrease the "in stock" number, and keep the "available" number the same.

Similarly, if you cancel an order or some items from an order, you should see the "reserved" number decrease. And if you cancel after already approving all payments, you are asked if you want to increase the "in stock" number for all canceled items.

Despite these features that help you automatically manage your available inventory, it's a good idea to frequently compare the "in stock" number in the system with what's actually in stock to avoid unhappy customers.

## How to sync inventory quantities from an external system

**Option 1** If your external inventory system can be queried in real time, the simplest integration is to remove the `simple-inventory` plugin and add your own custom inventory plugin that registers an `inventoryForProductConfigurations` type function that returns current inventory in stock and other related data for a list of product configurations by calling through to your inventory management system.

**Option 2** If your external inventory system produces periodic exports but cannot be queried in real time, then you may want to keep the included `simple-inventory` plugin and create a script that reads the exported files and updates the `SimpleInventory` collection as necessary. If you do this in a custom plugin, then it's best to call `context.mutations.updateSimpleInventory` using the result of `context.getInternalContext()` as the `context` you pass in, and let that take care of properly updating the collection. If you can't do it in a custom plugin, then your external script should be written to look similar to the `updateSimpleInventory` mutation function in the `simple-inventory` plugin.

Example of option 2:

```
const STANDARD_LOW_INVENTORY_THRESHOLD = 10;

async function externalSystemInventoryUpdateWorker(context, productId, productVariantId, shopId, inventoryInStock) {
  await context.mutations.updateSimpleInventory(
    context.getInternalContext(),
    {
      productConfiguration: {
        productId,
        productVariantId
      },
      shopId,
      canBackorder: false,
      lowInventoryWarningThreshold: STANDARD_LOW_INVENTORY_THRESHOLD,
      isEnabled: true,
      inventoryInStock
    },
    { returnUpdatedDoc: false } // improves performance
  );
}
```

## How to configure products with no tracked inventory

There are a few reasons why some products may not have tracked inventory. Some may be digital or conceptual products that you can make unlimited copies of. You may build some products to specification after they are ordered. Or you may drop ship some products and have no insight into what quantity are available.

These are all situations in which you likely want to have no known inventory quantity but yet allow ordering any quantity. In other cases, though, you may be synchronizing inventory data from an external system, and a variant with no tracked inventory might mean it hasn't synced yet and therefore should be considered sold out (and ideally also invisible).

To accommodate either situation, the core "inventory" plugin has a shop setting, found on the Shop Settings page of the operator UI. The setting, `canSellVariantWithoutInventory`, determines whether a variant with no inventory information can be sold. This setting is `true` by default.
- If you leave it `true`, then you will need to enable inventory tracking, disable backordering, and set "in stock" inventory to `0` for each variant that you want to appear sold out.
- If you change it to `false`, then for products that should allow unlimited sales, you have two options:
    - Enable inventory tracking, set "in stock" inventory to `0` and enable backordering, or
    - Enable inventory tracking and set "in stock" inventory to a very large amount
