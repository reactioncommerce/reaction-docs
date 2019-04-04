---
id: version-1.16.0-reaction-orders
title: Orders
original_id: reaction-orders
---
    
## Order Methods

The core plugin module `imports/plugins/core/orders` contains all order related Meteor methods.

### orders/inventoryAdjust

Called when the customer places an order. It's triggered by entering a credit card that that is not declined and clicking the check out button. The function loops through each Product in an order and adjusts the quantity for that product variant.

```js
import { Products } from "/lib/collections";

Products.update({
  "_id": product.productId,
  "variants._id": product.variants._id
}, {
  $inc: {
    "variants.$.inventoryQuantity": -product.quantity
  }
});
```

### orders/addOrderEmail

Meteor method removed as of [release-2.0.0-rc.7](https://github.com/reactioncommerce/reaction/pull/4815/commits/1de05d5421fa1bafb8a1f543a9d57922cd5734b3)

### orders/updateHistory

Called when any Order event occurs. The first occurrence is when a user clicks on the newly created order, but also called  when the **begin** button is clicked or tracking number added etc. It extends the history object with additional fields to `Reaction.Collections.Orders.history`

```js
history: {
  event: event,
  value: value,
  userId: Reaction.getUserId(),
  updatedAt: new Date()
}
```

### orders/shipmentTracking

Called when a tracking number has been entered and the **Add** button was clicked. This also triggers `addTracking` and `updateHistory`. This method verifies the order and tracking, then calls addTracking and updateHistory and updates the workflow/pushOrderWorkflow status.

### orders/addTracking

Called when a tracking number has been entered and the **Add** button has been clicked.  This updates `Reaction.Collections.Orders.shipping.shipmentMethod.tracking`

### orders/documentPrepare

Called when the **Download PDF** button is clicked or when the Adjustment _Approved_ button is clicked. This also calls updateHistory and updated that shipment is being prepared.

### orders/processPayment

This method calls the `processPayments` and also updates the workflow status.

### orders/processPayments

Determines the payment method and hits the payment API to capture the payment. If successful it updates `Reaction.Collections.Orders.payment.paymentMethod.transactionId` else it throws an error :

```js
import { Orders } from "/lib/collections";
import { Logger } from "/server/api";

if (result.capture) {
  transactionId = paymentMethod.transactionId;
  Orders.update({
    "_id": orderId,
    "payment.paymentMethod.transactionId": transactionId
  }, {
    $set: {
      "payment.paymentMethod.$.transactionId": result.capture.id,
      "payment.paymentMethod.$.mode": "capture",
      "payment.paymentMethod.$.status": "completed"
    }
  });
} else {
  Logger.warn("Failed to capture transaction.", order, paymentMethod.transactionId);
  throw new Meteor.Error("Failed to capture transaction");
}
```

### orders/shipmentShipped

Called when payment is completed and updates the work flow to the coreShipmentShipped status.

### orders/orderCompleted

Called when the order has been completed. This updates the workflow status and also updated the order with the OrderCompleted Status.

### orders/shipmentPacking

Updates the workflow status that the shipment is being packed.

### orders/updateDocument

Updates the order with a reference to the specific doc created for shipping and label.

```js
import { Orders } from "/lib/collections";

Orders.update(orderId, {
  $addToSet: {
    documents: {
      docId: docId,
      docType: docType
    }
  }
});
```

### orders/addItemToShipment

This adds an item to the Orders.shipping.items array.

```js
import { Orders } from "/lib/collections";

Orders.update({
  "_id": orderId,
  "shipping._id": shipmentId
}, {
  $push: {
    "shipping.$.items": item
  }
});
```

### orders/updateShipmentItem

This updates the items that are being associatated with a specific shipping id.

### orders/removeShipment

This method removed the shipment information from an order. It sets shipment object to null.

```js
import { Orders } from "/lib/collections";

Orders.update(orderId, {
  $pull: {
    shipments: null
  }
});
```

### orders/capturePayments

Cycles through each Orders paymentMethod and attempts to capture the payment. If successful it updates the Paymentmethod status to completed. Else it throws a server warning that payment was not captured.

### orders/updateShipmentTracking

updated the shipment tracking information.
