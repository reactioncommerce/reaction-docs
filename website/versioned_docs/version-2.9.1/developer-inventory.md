---
id: version-2.9.1-developer-inventory
title: Inventory Basics for Developers
original_id: developer-inventory
---

As a Reaction developer, the main thing to know about inventory information is how to get it in plugin code.
- When you have a single product configuration (i.e. variant) and need inventory information for it, call `context.queries.inventoryForProductConfiguration(context, { productConfiguration, shopId })`.
- When you have multiple product configurations (i.e. variants) and need inventory information for all of them, call `context.queries.inventoryForProductConfigurations(context, { productConfigurations, shopId })` to query for all at once more efficiently. If you have more than 500, consider breaking them up into multiple calls.

The inventory info object (or objects, in the case of the multiple variant function), has the following fields:
- `canBackorder`
- `inventoryAvailableToSell`
- `inventoryInStock`
- `inventoryReserved`
- `isBackorder`
- `isLowQuantity`
- `isSoldOut`

For details about what these fields mean and how they are derived, see [Concepts: Inventory](./concepts-inventory.md).

## Core Inventory Plugin

These query functions are available thanks to the core "inventory" plugin, but the actual data comes from some other inventory plugin that you have installed. In addition to providing these functions internally, the core "inventory" plugin does the following:
- Sets `product.isBackorder`, `product.isLowQuantity`, and `product.isSoldOut` boolean fields on `Catalog` collection documents when you publish to the catalog, and automatically keeps these fields accurate whenever inventory information changes.
- Extends the `catalogItems` GraphQL query boolean filter list to include `isBackorder`, `isLowQuantity`, and `isSoldOut`.
- Registers a shop setting, `canSellVariantWithoutInventory`, which determines whether a variant with no inventory information can be sold. This setting is `true` by default, which allows you to operate a shop without tracking any inventory. If you _are_ tracking inventory, depending on how your inventory plugin works, you may want to flip this to `false`.
- Adds and calculates the following GraphQL fields:
    - `CatalogProduct.isBackorder`
    - `CatalogProduct.isLowQuantity`
    - `CatalogProduct.isSoldOut`
    - `CatalogProductVariant.canBackorder`
    - `CatalogProductVariant.inventoryAvailableToSell`
    - `CatalogProductVariant.inventoryInStock`
    - `CatalogProductVariant.isBackorder`
    - `CatalogProductVariant.isLowQuantity`
    - `CatalogProductVariant.isSoldOut`
    - `CartItem.inventoryAvailableToSell`
    - `CartItem.isBackorder`
    - `CartItem.isLowQuantity`
    - `CartItem.isSoldOut`

The core "inventory" plugin should hopefully meet your needs, so in general you should not remove it. However, if you do need to remove it you can. If you remove it, you MUST have a custom plugin that adds the following functions to context:

- `context.queries.inventoryForProductConfiguration`
- `context.queries.inventoryForProductConfigurations`

These functions are the only contract expected by other Reaction plugins and therefore the system will not work without them. The GraphQL fields, the shop setting, and everything else provided by the core "inventory" plugin is optional and need not be replaced if you remove it.

## Inventory Data Provider Plugins

As mentioned above, the core "inventory" plugin sets up a lot of common inventory fields and functions but does not manage the actual inventory data. This is because many shops manage inventory with external systems and will need a community or custom plugin to integrate that data.

For simple shops that want to track inventory but do not already have a third-party system for doing it, Reaction provides the [Simple Inventory plugin](./core-plugins-simple-inventory.md).
