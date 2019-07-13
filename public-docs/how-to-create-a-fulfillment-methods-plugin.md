---
title: How To: Create a Fulfillment Methods Plugin
---

## Prerequisite Reading
- [Concepts: Fulfillment](./concepts-fulfillment.md)
- [Understanding Plugins](./core-plugins-intro.md)

## Overview
In general, to add a fulfillment method you must do the following:
- Create a new plugin
- Create a `getFulfillmentMethodsWithQuotes` function in your plugin
- Create a React component for operators to enter and edit fulfillment method details, unless they'll be managed in an external system
- Register the function and the React components using your plugin's `registerPlugin` call

Reaction ships with one such plugin, `shipping-rates`, which you can look at for inspiration. You will want to remove that plugin if adding your own, unless you're combining multiple fulfillment method sources

## Create the Function

Your plugin must define a `getFulfillmentMethodsWithQuotes` function. This function must somehow query for a list of fulfillment methods that should be available based on the information passed in, and get quotes for those methods. It can be an `async` function.

The signature of this function is `(context, commonOrder, previousQueryResults = [])`. See [Understanding CommonOrder](./devs-understanding-commonorder.md).

You can extract `rates` and `retrialTargets` out of `previousQueryResults` like this:

```js
const [rates = [], retrialTargets = []] = previousQueryResults;
```

You can use `retrialTargets` to track failures and rerun. See the `shipping-rates` plugin for an example.

The function must return either `previousQueryResults` or an array like `[rates, retrialTargets]`, where `rates` and `retrialTargets` are both arrays.

`rates` can be either a list of fulfillment methods with quotes or an array with a single item that is an error object. An error object looks like this:

```js
{
  requestStatus: "error",
  shippingProvider: "abc",
  message: "Something went wrong"
}
```

Otherwise each item in `rates` must match the `ShipmentQuote` schema. They will look something like this:

```js
carrier: "USPS",
method: {
  _id: "abc123",
  name: "internal_name",
  label: "Display name for shoppers in checkout",
  handling: 0,
  rate: 5.99,
  enabled: true
},
rate: 5.99
```

## Registration

Everything needs to be registered to be seen by Reaction core.

### Register the function

Pass your function in the `functionsByType` list:

```js
import getFulfillmentMethodsWithQuotes from "./getFulfillmentMethodsWithQuotes";

export default async function register(app) {
  await app.registerPlugin({
    label: "My Fulfillment Plugin",
    name: "my-fulfillment-plugin",
    functionsByType: {
      getFulfillmentMethodsWithQuotes: [getFulfillmentMethodsWithQuotes]
    },
    // other props
  });
}
```

### Settings UI

If your plugin needs any settings that it will not get from environment variables, register the React component in the `registry` array:

```js
export default async function register(app) {
  await app.registerPlugin({
    registry: [
      {
        label: "My Fulfillment Plugin",
        provides: ["shippingSettings"],
        container: "dashboard",
        template: "MyFulfillmentPluginSettings"
      }
    ]
    // other props
  });
}
```

The `label` is shown in the operator UI to group the settings for each fulfillment plugin. The `provides` property must be an array containing `"shippingSettings"`. Set `template` to the name of your React component, which you must register with `registerComponent` in client code.
