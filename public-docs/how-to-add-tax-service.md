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

Tax services are registered by passing an array of them to the `taxServices` property of the `registerPlugin` options.

```js
import calculateOrderTaxes from "./util/calculateOrderTaxes";
import getTaxCodes from "./util/getTaxCodes";

export default async function register(app) {
  await app.registerPlugin({
    label: "Custom Rates",
    name: "reaction-taxes-rates",
    taxServices: [
      {
        displayName: "Custom Rates",
        name: "custom-rates",
        functions: {
          calculateOrderTaxes,
          getTaxCodes
        }
      }
    ]
    // other props
  });
}
```

See below for how to create the two functions.

### Create a tax calculation function

Every tax service is expected to register a function that calculates taxes for a single CommonOrder. The core `taxes` plugin calls it like this:

```js
const taxServiceResult = await primaryTaxService.functions.calculateOrderTaxes({ context, order });
```

One or more plugins can provide one or more tax services. Each shop can choose one service as a primary tax service and another as a fallback service. This is done by an operator in the [General Tax Settings panel]((tax.md#enable-a-tax-service)).

> A fallback service is used to calculate the tax when the primary service returns a `null` result. This could be due to errors from the plugin configuration or a network failure. The tax plugin is expected to handle such errors and returns a `null` result when appropriate to allow the fallback service to kick in.

The return from a `calculateOrderTaxes` function is expected to be similar to this:

```js
{
  // Taxes grouped by item
  itemTaxes: [
    {
      customFields: {}, // Optionally, anything else you need to store per item
      itemId: "abc", // Must match `_id` from one of the `order.items`
      tax: 1, // Total amount due for this item, for all types of tax combined, in `order.currencyCode`
      taxableAmount: 1, // Amount of `item.subtotal` that was deemed subject to taxation, in `order.currencyCode`
      taxes: [] // Breakdown of all taxes that apply to this item
    }
  ],
  // Combined taxes
  taxSummary: {
    calculatedAt: new Date(), // The time at which this calculation happened
    calculatedByTaxServiceName: "my-tax-service", // optionally, provide a name that will be stored on the final order, allowing you to identify which orders this service calculated taxes for and mark the order complete in your external tax service if required
    customFields: {}, // Optionally, anything else you need to store per order fulfillment group
    referenceId: "123", // Optional ID to tie this calculation back to an external system
    tax: 1, // Total amount due for all items, for all types of tax combined, in `order.currencyCode`
    taxableAmount: 1, // Amount of the order total that was deemed subject to taxation, in `order.currencyCode`
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
  tax: 1, // Total amount due for this type of tax only, in `order.currencyCode`
  taxableAmount: 1, // Total deemed taxable for this type of tax only, in `order.currencyCode`
  taxName: "CA Sales Tax", // A human-readable string for showing to operators and customers in the UI
  taxRate: 3.5, // The tax rate for this type of tax, used for this calculation
  customFields: {} // Optionally, anything else you need to store per tax line item
}
```

If you are integrating with a third-party tax service, you will typically get back a result similar to this. You simply need to map the result to the return shape expected.

The `calculateOrderTaxes` function is called frequently, every time a cart changes and whenever an order is placed. Your function should return `null` if it's called with a CommonOrder that does not yet have enough information on it to calculate taxes. However, if `order.sourceType` is `"order"` and you still do not have enough information to calculate, then something is wrong. It may be wise to throw an error in this case, and in a production system you'll want to track such events and get alerts if this happens.

> External tax APIs often require various addresses with various names. Do your best to provide what they require, but the shipping address is usually the most important. Reaction does not guarantee that all orders will have shipping or billing addresses. If you have one or the other, it is usually fine to substitute billing for shipping or vice versa in order to at least get a calculation and allow the order to be placed. If an order has neither address, you'll need to decide what action is proper based on the third-party API. There should always be an `originAddress` provided, and that may be enough to do a calculation in some cases.

#### customFields

Anything you store on `customFields` is not exposed through GraphQL by default. If you need any of the fields available on `Cart` or `Order` through GraphQL, you can create a custom plugin to `extend type CalculatedTax` with your properly typed custom fields and add resolvers as necessary.

Primarily, though, this is intended to be used to store extra data that the third-party tax integrations need for later API calls.

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

We recommend that you use the `useReactoForm` hook from the [ReactoForm](https://github.com/DairyStateDesigns/reacto-form) package along with [Catalyst](https://catalyst.reactioncommerce.com/#/Introduction) or [Material UI](https://material-ui.com/) fields and inputs. Use React hooks to do GraphQL requests with Apollo Client. Example: `/imports/plugins/core/taxes/client/containers/GeneralTaxSettings.js`
