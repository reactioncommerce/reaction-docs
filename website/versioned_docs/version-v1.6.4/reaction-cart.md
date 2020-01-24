---
id: version-v1.6.4-reaction-cart
title: Cart
original_id: reaction-cart
---

## Cart Workflow

`sessionId` should be unique for each new client (moz vs firefox, mobile vs desktop etc), but not unique in the same browser instance (tabs).

When an **anonymous** user visits, they get a `sessionId`, this a generated server side, and stored in the browser localStorage, so that combined with their **anonymous** user account identifies them within the tab/browser/window session. The presence of a unique sessionId tells us not to create another user account for an **anonymous** user.  The same sessionId should never be used by the server for any two sessions, as it comes from the client.. it's only set on the server side in the initial _subscription to `Sessions`_.

It this same user visits on another device, browser or anonymous session they will get a new **anonymous** `userId` and `sessionId`.

When a visitor registers with a password or authentication service (FB,GH,etc),  they are **anonymous** before they register.  We then create a _new_ user and account.  If the user is `authenticated`, and has a `sessionId` that matches previous carts with the same sessionId, we then merge matching `sessionId` carts into the newly created cart.  (and we _should_ remove the existing **anonymous** cart, user, account).

We identify an `authenticated` user  in `Roles` as a `guest` without the `anonymous` role.

When this `authenticated` user logs out of the site, the `publication` is updated and they no longer have permissions to view their `authenticated` cart.  The publication sees this, and creates a new cart for them, with a new `anonymous` cartId, but still the same `sessionId`.

If the existing registered `guest` user adds items to an `anonymous` cart session, and then logs in,  the `anonymous` cart will be merged to their existing cart and new items added, existing items will additional quantity will get incremented. This is true from any browser/session.

## [Cart Methods](https://github.com/reactioncommerce/reaction/blob/v1.6.4/packages/reaction-core/server/methods/cart.js)

### cart/mergeCart

Merge matching sessionId cart into specified userId cart

```js
Meteor.call("cart/mergeCart", cartId);
```

### cart/createCart

Create and return new cart for current user (optional: createForUserId)

```js
Meteor.call("cart/createCart", createForUserId);
```

### cart/addToCart

Add items to a user cart

```js
/**
 *  cart/addToCart
 *  @summary add items to a user cart
 *  when we add an item to the cart, we want to break all relationships
 *  with the existing item. We want to fix price, qty, etc into history
 *  however, we could check reactively for price /qty etc, adjustments on
 *  the original and notify them
 *  @param {String} cartId - cartId
 *  @param {String} productId - productId to add to Cart
 *  @param {String} variantData - variant object
 *  @param {String} itemQty - optional qty to add to cart, defaults to 1, deducts from inventory
 *  @return {Number} Mongo insert response
 */

 Meteor.call("cart/addToCart", cartId, productId, variantData, itemQty);
```

### cart/removeFromCart

Removes or adjust quantity of a variant from the cart

```js
Meteor.call("cart/removeFromCart", itemId, quantity);
```

### cart/copyCartToOrder

Transforms cart document to order.

```js
/**
 * cart/copyCartToOrder
 * @summary transform cart to order
 * when a payment is processed we want to copy the cart
 * over to an order object, and give the user a new empty
 * cart. reusing the cart schema makes sense, but integrity of
 * the order, we don't want to just make another cart item
 * @todo:  Partial order processing, shopId processing
 * @todo:  Review Security on this method
 * @param {String} cartId - cartId to transform to order
 * @return {String} returns orderId
 */
Meteor.call("cart/copyCartToOrder", cartId);
```

### cart/setShipmentMethod

Saves shipment method as order default

```js
Meteor.call("cart/setShipmentMethod", cartId, method);
```

### cart/setShipmentAddress

Adds addressBook object to cart shipping

```js
Meteor.call("cart/setShipmentAddress", cartId, address);
```

### cart/setPaymentAddress

Adds addressBook object to cart payments

```js
Meteor.call("cart/setPaymentAddress", cartId, address);
```

### cart/unsetAddresses

Removes address from cart.

```js
/**
  * cart/unsetAddresses
  * @description removes address from cart.
  * @param {String} addressId - address._id
  * @param {String} userId - cart owner _id
  * @param {String} [type] - billing default or shipping default
  * @since 0.10.1
  * @todo check if no more address in cart as shipping, we should reset
  * `cartWorkflow` to second step
  * @return {Number|Object|Boolean} The number of removed documents or error
  * object or `false` if we don't need to update cart
  */
 Meteor.call("cart/unsetAddresses", addressId, userId, type);
```
