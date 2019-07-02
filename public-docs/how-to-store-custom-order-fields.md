---
title: How To: Store Custom Order Fields
---

## Prerequisite Reading
- [Concepts: Payments](./concepts-orders.md)
- [Understanding Plugins](./core-plugins-intro.md)

## Overview
For reporting, integrations, or other reasons, you may want to store additional fields when placing an order. This might be data from the client placing the order, data you can or must generate on the server, or some combination of the two.

The core orders plugin supports attaching additional arbitrary fields to orders, but you must do a bit of work to enable it. The first step is to decide whether the data you need can safely come from clients or if it must be built on the server. An in-between approach is to send data from the client but validate and extend it on the server.

Big picture, here's what you'll do:
1. Implement one or both of the following:
    - Enable and configure clients to send custom order fields
    - Generate or transform custom order fields on the server
2. Extend the SimpleSchema for `Order` so that your custom fields will pass validation and be saved.
3. Optionally expose some of your custom fields through GraphQL.

## Enabling Clients to Send Additional Order Data
The only step necessary to allow clients to send additional order fields is to define the expected schema for it in GraphQL, which you do by extending the `OrderInput` GraphQL input type in a custom plugin to add a `customFields` field:

```graphql
"Additional order fields"
input CustomOrderFieldsInput {
  "The user agent string for the browser from which this order was placed"
  browserUserAgent: String!
}

extend input OrderInput {
  "Additional order fields"
  customFields: CustomOrderFieldsInput!
}
```

Now in your storefront code, you can add the now-required extra fields:

```js
// `order` input object for `placeOrder` GraphQL mutation
const order = {
  customFields: {
    browserUserAgent: window.navigator.userAgent
  },
  // all other required OrderInput props
};
```

## Transforming or Adding Custom Order Fields on the Server
Whether or not you've allowed clients to send additional order data, you can also provide a function that returns custom order fields on the server. Do this using the `functionsByType` option in `registerPlugin`:

```js
functionsByType: {
  transformCustomOrderFields: [({ context, customFields, order }) => ({
    ...customFields,
    // This is a simple example. IRL you should pick only headers you need.
    headers: context.requestHeaders
  })]
},
```

As you can see in the example, the function receives an object argument with `context`, `customFields`, and `order` properties. `order` is the full order that is about to be created. `customFields` is the current custom fields object that would be saved as `order.customFields`. This may be from the client placing the order, if you've allowed clients to send it, or it may be from `transformCustomOrderFields` functions registered by other plugins. It will be an empty object if no other `transformCustomOrderFields` functions have run and the client did not pass any custom fields.

The object you return will replace `order.customFields`, so if you want to keep the properties already in `customFields`, be sure to add them to the object you return, or simply `return customFields` if you have no changes to make. You may also further validate the object and either remove properties from it or throw an error.

`transformCustomOrderFields` functions may be `async` if necessary.

## Extending the Order Schema
If you are adding custom fields either from clients or from server functions, you must also extend the SimpleSchema for `Order` so that it validates for storage. This is similar to the "Enabling Clients to Send Additional Order Data" task, but you must extend the SimpleSchema rather than the GraphQL schema, and it's required even if all data is being generated on the server. In your custom plugin:

```js
import { Order } from "/imports/collections/schemas";

const customFieldsSchema = new SimpleSchema({
  browserUserAgent: String
});

Order.extend({
  customFields: customFieldsSchema
});
```

## Exposing Custom Fields Through GraphQL
If you are collecting extra order fields only for reporting or integration purposes, it may not be necessary to have them available through GraphQL queries. But if you do need some fields added to orders retrieved by GraphQL, it is easy to do this by extending the schema and adding resolvers in your custom plugin:

```graphql
extend type Order {
  "The user agent string for the browser from which this order was placed"
  browserUserAgent: String!
}
```

```js
const resolvers = {
  Order: {
    browserUserAgent: (node) => node.customFields.browserUserAgent
  }
};
```

And then query for it:

```
{
  orderById(id: "123", shopId: "456", token: "abc") {
    browserUserAgent
  }
}
```
