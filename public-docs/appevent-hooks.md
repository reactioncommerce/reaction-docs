---
id: appevent-hooks
title: "Developer Concepts: App Events"
sidebar_label: App Events
---

The `Hooks.Events` API and `MethodHooks` from previous versions of Reaction have been removed in favor of `appEvents`. `appEvents`, like hooks, allow you to attach callbacks to particular events throughout the app lifecycle.

## Emit an app event

Emit app events in API code using `appEvents.emit`. The `emit` function takes at least two parameters: the name of the event as a string and the `payload` of functions as an object.

### Function parameters and options

- *Event name*: The first argument is the event name, as a string. There is currently no limit to what event name you can emit, but generally try to follow established patterns for naming. See events table below.
- *Payload*: The second argument, the `payload`, should always be an object, and not an entity object. Rather than passing `order` in directly, pass it in an object: `{ order }`, so that more fields can be added or removed from the payload more easily.
- *Option arguments*: The last argument is an array of arguments to pass to each function from `payload`.
- *Using `await`*: Using the method with `await` will not resolve until all of the registered handler methods have resolved.

## Emit an app event

```js
context.appEvents.emit("eventName", payload, options);
```

## Listen for an app event

See ["Run plugin code on app startup"](dev-how-do-i.md) and attach event listeners in startup code.

```js
// In startup function:
context.appEvents.on("eventName", (payload, options) => {
  // Handle the event
});
```

## Avoid infinite loops

It's possible to get stuck in an infinite loop of emitting and listening for the same event. To avoid this, pass `emittedBy` key with a string value in the third options parameter on the `emit`, and check for it on the `on` function:

```js
const EMITTED_BY_NAME = "myPluginHandler";

appEvents.on("afterCartUpdate", async ({ cart }, { emittedBy } = {}) => {
  if (emittedBy === EMITTED_BY_NAME) return; // short circuit infinite loops

  appEvents.emit("afterCartUpdate", { cart: updatedCart, updatedBy: userId }, { emittedBy: EMITTED_BY_NAME });
});
```

## Events

Events that are currently defined in Core and their previous Hooks-equivalents are:

| App Events                                                                                                                                          | Hooks (removed)                                                                 |
|-----------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| Event Name: `afterAccountCreate` Arguments: `{ account, createdBy, isFirstOwnerAccount }`                                                                | Event Name: `afterAccountsInsert` Arguments: `userId, accountId`                     |
| Event Name: `afterAccountUpdate` Arguments: `{ account, updatedBy, updatedFields }`                                                                      | Event Name: `afterAccountsUpdate` Arguments: `userId, { accountId, updatedFields }`  |
| Event Name: `afterAccountDelete` Arguments: `{ account, deletedBy }`                                                                                     | Event Name: `afterAccountsRemove` Arguments: `userId, accountId`                     |
| Event Name: `afterAddUnverifiedEmailToUser` Arguments: `{ email, userId }`                                                                               | N/A                                                                             |
| Event Name: `afterVariantSoftDelete` Arguments: `{ variant, deletedBy }`                                                                                 | `afterRemoveCatalogProduct` was sometimes emitted for variants                    |
| Event Name: `afterProductSoftDelete` Arguments: `{ product, deletedBy }`                                                                                 | Event Name: `afterRemoveProduct` Arguments: `product`                                |
| Event Name: `afterVariantUpdate` Arguments: `{ _id, field, value }`                                                                                      | N/A                                                                             |
| Event Name: `afterPublishProductToCatalog` Arguments: `{ catalogProduct, product }`                                                                      | Event Name: `afterPublishProductToCatalog` Arguments: `product, catalogProduct`      |
| Event Name: `afterOrderUpdate` Arguments: `{ order, updatedBy }`                                                                                         | N/A                                                                             |
| Event Name: `jobServerStartArguments`: NONE                                                                                                           | Event Name: `onJobServerStart` Arguments: NONE                                     |
| Event Name: `afterCoreInit` Arguments: NONE Deprecated. Do not use in new code. Put your code directly in a plugin startup function instead. | Event Name: `afterCoreInit` Arguments: NONE                                        |
| Event Name: `sendEmail` Arguments: `{ job, sendEmailCompleted, sendEmailFailed }`                                                                        | N/A                                                                             |
| Event Name: `afterShopCreate` Arguments: `{ createdBy, shop }`                                                                                           | N/A                                                                             |
| Event Name: `afterMediaInsert` Arguments: `{ createdBy, mediaRecord }`                                                                                   | N/A                                                                             |
| Event Name: `afterMediaUpdate` Arguments: `{ createdBy, mediaRecord }`                                                                                   | N/A                                                                             |
| Event Name: `afterMediaRemove` Arguments: `{ createdBy, mediaRecord }`                                                                                   | N/A                                                                             |
| Event Name: `afterOrderApprovePayment` Arguments: `{ approvedBy, order }`                                                                                | N/A                                                                             |
| Event Name: `afterOrderCancel` Arguments: `{ cancelledBy, order, returnToStock }`                                                                        | N/A                                                                             |
| Event Name: `afterOrderPaymentCapture` Arguments: `{ capturedBy, order, payment }`                                                                       | N/A                                                                             |
| Event Name: `afterOrderCreate` Arguments: `{ createdBy, order }`                                                                                         | N/A                                                                             |
| Event Name: `afterNotificationCreate` Arguments: `{ createdBy, notification }`                                                                           | N/A                                                                             |
| No longer emitted. Instead `afterAccountCreate` is emitted and will have `isFirstOwnerAccount` set to true                                              | Event Name: `afterCreateDefaultAdminUser` Arguments: `user `                         |
| No longer emitted.                                                                                                                                  | Event Name: `beforeUpdateOrderWorkflow` Arguments: `order, options`                  |
| No longer emitted. Use afterOrderUpdate.                                                                                                            | Event Name: `afterUpdateOrderUpdateSearchRecord` Arguments: `order`                  |
| No longer emitted. Was not used, but can be added back in the future if necessary.                                                                  | Event Name: `afterInsertProduct` Arguments: `product`                               |
| No longer emitted. Was not used, but can be added back in the future if necessary.                                                                  | Event Name: `beforeUpdateCatalogProduct` Arguments: `product, { userId, modifier }` |
| No longer emitted. Was not used, but can be added back in the future if necessary.                                                                  | Event Name: `afterUpdateCatalogProduct` Arguments: `productId, { modifier }`        |
| No longer emitted. Was not used, but can be added back in the future if necessary.                                                                  | Event Name: `beforeRemoveCatalogProduct` Arguments: `product, { userId }           |
| No longer emitted. Was not used, but can be added back in the future if necessary.                                                                  | Event Name: `afterRemoveCatalogProduct` Arguments: `userId, productId`              |
| No longer emitted. Was not used, but can be added back in the future if necessary.                                                                  | Event Name: `beforeCoreInit` Arguments: NONE                                      |
| No longer emitted. Was not used, but can be added back in the future if necessary.                                                                  | Event Name: `onCoreInit` Arguments: NONE                                          |
| No longer emitted. Was not used, but can be added back in the future if necessary.                                                                  | Event Name: `onImport${collectionName}` Arguments: `object`                         |
| No longer emitted. Was not used, but can be added back in the future if necessary.                                                                  | Event Name: `onCreateUser` Arguments: `user, options`                              |
| No longer emitted. Was not used, but can be added back in the future if necessary.                                                                  | Event Name: `onLogin` Arguments: `options`                                          |
| No longer emitted. Was not used, but can be added back in the future if necessary.                                                                  | Event Name: `afterSecurityInit` Arguments: `options`                                |
| No longer emitted. Was not used, but can be added back in the future if necessary. Try using afterOrderUpdate.                                      | Event Name: `onOrderRefundCreated` Arguments: `orderId`                             |
| No longer emitted. Was not used, but can be added back in the future if necessary. Try using afterOrderUpdate.                                      | Event Name: `onOrderShipmentDelivered` Arguments: `orderId`                         |
| No longer emitted. Was not used, but can be added back in the future if necessary. Try using afterOrderUpdate.                                      | Event Name: `onOrderShipmentShipped` Arguments: `orderId`                           |
| Instead of using events, you can now register a function of type getPageSitemapItems to extend the sitemap.                                         | Event Name: `onGenerateSitemap` Arguments: `urls`                                   |
