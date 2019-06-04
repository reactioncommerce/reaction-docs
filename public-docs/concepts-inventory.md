---
id: concepts-inventory
title: Inventory
---

The default Reaction system does not have inventory tracking enabled for any products. All products that you publish to the catalog are available for purchase in any quantity and will never show up as low quantity, sold out, or backordered.

If you do track inventory, Reaction provides a [Simple Inventory plugin](./core-plugins-simple-inventory.md) that allows you to update inventory in stock and other inventory settings in the operator UI. It also keeps track of inventory that was ordered but which you have not yet removed from the in-stock number, to ensure that you do not sell what you don't have available.

If you use a third-party inventory system or want to design your own inventory system, you can [create a custom plugin](./how-to-create-inventory-plugin.md).

Regardless of which plugin tracks your inventory, there are some general ways in which inventory impacts your catalog products, catalog variants, and cart items.

## Catalog Product Variant Inventory Data

The following data is available for every variant in the catalog. If a variant has options, then these values are summed or aggregated from the child options.

### Inventory In Stock

The "in stock" number represents how many units you actually have in stock.

### Reserved Inventory

Most inventory plugins will want to track new orders and consider the ordered quantity of each item to be "reserved" until you pull the order and decrease the "in stock" quantity. If an inventory plugin doesn't track this, then "reserved" inventory will always be zero.

### Inventory Available To Sell

The "available to sell" number represents how many units the system will allow a shopper to order. It is calculated by subtracting "reserved" from "in stock". If an inventory plugin doesn't track "reserved", then the available inventory will always be the same as the in stock inventory.

### Can Backorder

Each variant may or may not have backordering enabled. With backordering enabled, the orders service will allow an order to be placed for a quantity higher than the "available to sell" quantity.

### Sold Out

A variant that has no inventory available to sell is marked sold out. A variant with options is marked sold out only if ALL options have no inventory available to sell.

### Low Quantity

A variant that has low inventory available to sell is marked low quantity. A variant with options is marked low quantity only if ANY option has low inventory available to sell. Exactly what "low" means is left up to the individual plugin you use. The Simple Inventory plugin has you enter a "low inventory warning threshold" number and considers a variant to be low quantity when the available inventory is less than or equal to this threshold.

### Backordered

As a convenience, variants that are sold out but also have "can backorder" enabled are marked "backordered".

## Catalog Product Inventory Data

At the product level of the catalog, the same inventory statuses are available based on aggregating the product variant data.

- **Sold Out**: A product is marked sold out only if ALL variants and options have no inventory available to sell.
- **Low Quantity**: A product is marked low quantity if ANY variant or option has low inventory available to sell.
- **Backordered**: A product is marked backordered if ALL variants and options are backordered.

The catalog GraphQL query also allows filtering and sorting by these inventory statuses.

## Cart Item Inventory Data

Cart items have the three variant statuses and the "available to sell" number for the related catalog variant.
