---
title: How To: Add a Tax Service
---

## Prerequisite Reading
- [Understanding Plugins](./core-plugins-intro.md)

## Overview
In general, to add a tax service you must do the following:
- Create a plugin or modify an existing one
- Create and register a tax calculation function
- Optionally create and register a function that returns a list of valid item tax codes
- If necessary, extend the GraphQL API with mutations, queries, and types needed for operator UI
- If necessary, create a React component for operators to enter and edit settings for your tax service

> There is one included plugin that provides a "Custom Rates" tax service (`taxes-rates` in `/imports/plugins/included`). Examine the files in this plugin if you are confused by any of the steps in this article.

### Register a tax service

Tax services are registered by passing an array of them to the `taxServices` property of the `Reaction.registerPackage` options.

```js
import Reaction from "/imports/plugins/core/core/server/Reaction";
import calculateOrderGroupTaxes from "./server/no-meteor/util/calculateOrderGroupTaxes";
import getTaxCodes from "./server/no-meteor/util/getTaxCodes";

Reaction.registerPackage({
  label: "Custom Rates",
  name: "reaction-taxes-rates",
  autoEnable: true,
  taxServices: [
    {
      displayName: "Custom Rates",
      name: "custom-rates",
      functions: {
        calculateOrderGroupTaxes,
        getTaxCodes
      }
    }
  ]
  // ...
});
```

See below for how to create the two functions.

### Create a tax calculation function

Every tax service is expected to register a function that calculates taxes for an order group. The core `taxes` plugin calls it like this:

```js
const taxServiceResult = await activeTaxService.functions.calculateOrderGroupTaxes({ context, group });
```

One or more plugins can provide one or more tax services, so each shop must choose exactly one service (or none) to enable. This is done by an operator in the General Tax Settings panel.

The return from a `calculateOrderGroupTaxes` function is expected to be similar to this:

```js
{
  // Taxes grouped by item
  itemTaxes: [
    {
      itemId: "abc", // Must match `_id` from one of the `group.items`
      tax: 1, // Total amount due for this item, for all types of tax combined, in `group.currencyCode`
      taxableAmount: 1, // Amount of `item.subtotal` that was deemed subject to taxation, in `group.currencyCode`
      taxes: [] // Breakdown of all taxes that apply to this item
    }
  ],
  // Combined taxes
  taxSummary: {
    calculatedAt: new Date(), // The time at which this calculation happened
    referenceId: "123", // Optional ID to tie this calculation back to an external system
    tax: 1, // Total amount due for all items, for all types of tax combined, in `group.currencyCode`
    taxableAmount: 1, // Amount of the group total that was deemed subject to taxation, in `group.currencyCode`
    taxes: [] // Breakdown of all taxes that apply to any item, with combined values for all items they applied to
  }
}
```

Where each item in the `taxes` arrays has this shape:

```js
{
  _id: "123", // Generate a random unique ID if you don't have one
  jurisdictionId: "123", // Optionally provide an ID for the jurisdiction this tax is for. Not currently used by core.
  sourcing: "destination", // Either "destination" or "origin" depending on which address triggered this tax
  tax: 1, // Total amount due for this type of tax only, in `group.currencyCode`
  taxableAmount: 1, // Total deemed taxable for this type of tax only, in `group.currencyCode`
  taxName: "CA Sales Tax", // A human-readable string for showing to operators and customers in the UI
  taxRate: 3.5 // The tax rate for this type of tax, used for this calculation
}
```

If you are integrating with a third-party tax service, you will typically get back a result similar to this. You simply need to map the result to the return shape expected.

### Create a tax codes function

Tax services need not provide a tax codes function, but if you don't, shop operators will need to enter free text tax codes without a selection list. A tax codes function simply returns the current list of tax codes, with a `code` and `label` for each.

```js
export default async function getTaxCodes() {
  return [{
    code: "RC_TAX",
    label: "Taxable (RC_TAX)"
  }];
}
```

This is a simple example, but you will likely need to query the third-party tax service and return that list mapped to this expected shape.

### Extend the GraphQL API

This is necessary only for any operator actions you need to support, such as getting and modifying settings. Review [How To: Create a new GraphQL query](./graphql-create-query.md) and [How To: Create a new GraphQL mutation](./graphql-create-mutation.md). Example queries and mutations:
- `updateMyTaxServiceSettings` (mutation)
- `createTaxRule` (mutation)
- `updateTaxRule` (mutation)
- `deleteTaxRule` (mutation)
- `myTaxServiceSettings` (query)
- `taxRules` (query)

### Settings React Component

We recommend that you use the `Form` component from the [ReactoForm](http://composableforms.com/reacto-form/) package along with [Reaction Design System](https://designsystem.reactioncommerce.com) fields and inputs. Use a container pattern for injecting data using higher order components that do GraphQL requests with Apollo Client. Example: `/imports/plugins/core/taxes/client/containers/GeneralTaxSettings.js`
