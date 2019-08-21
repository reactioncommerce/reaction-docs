---
id: orders-admin
title: Orders
---

To view and process orders, login to the Reaction Admin and click on the <i class="font-icon fa fa-inbox"></i> **Orders** link in the navigation. You'll be taken to the Orders table, which is a sortable table showing a list of all orders your shop has received.

![](/assets/operator-guide-orders-table.png "Reaction Admin orders table")

## Processing an order

Clicking on an order will take you to the single order processing screen. This will show you all your order details, including the order summary, order fulfillment group(s), order payment(s), and payment refund(s), and allow you to fulfill your order with actions on all of this data.

![](/assets/operator-guide-single-order.png "Reaction Admin single order page")

## Fulfillment Groups

Each fulfillment groups actions work independently of one another. `Cancel Group`, `Update group status`, and `Tracking` will only update the data on the group you're working on.

### Canceling a group

You will be required to confirm your desire to cancel the fulfillment group in a dialog pop up.

![](/assets/operator-guide-cancel-group.png "Cancel group")

### Updating a group status

You are able to update a fulfillment groups status to any other available status, in any order.

![](/assets/operator-guide-update-group-status.png "Update fulfillment group status")

### Adding a tracking number

You can add an optional tracking number to a fulfillment group at any time. Once a tracking number has been added, click on the number to edit.

## Canceling an entire order

There is one exception to the independency of each fulfillment group: the `Cancel order` button at the top right of the screen. Clicking this will cancel _*all*_ fulfillment groups on this order, which in turn cancels the order itself. You will be required to confirm your desire to cancel the order in a dialog pop up.

![](/assets/operator-guide-single-order-cancel-order.png "Cancel an entire order")

## Payments

### Capturing all payments

All payments can be captured in a single click by using the `Capture all payments` button inside the Payments card.

![](/assets/operator-guide-capture-all-payments.png "Capture all payments")

### Capturing a single payment

Each payment can be captured independently by using the `Capture payment` button next to each payment line.

![](/assets/operator-guide-capture-single-payment.png "Capture single payment")

### Capturing payments with an elevated risk

Your payment provider may flag certain payments with an elevated risk for capturing. If a payment has an elevated risk, you will be notified by a message in the payments information area. You can still capture this payment independently, or along side other payments with the `Capture all payments` button. Either way, you will be required to confirm your desire to capture the payment in a dialog pop up.

![](/assets/operator-guide-single-order-elevated-risk-payment.png "Capturing a payment with elevated risk")

## Refunds

If your payment provider allows refunds to be processed, you will be able to refund any amount, up to the full amount charged per method, on one or more payment methods. Payments must already be captured to be refunded.

![](/assets/operator-guide-single-order-refunds.png "Refunds UI")

### Refunding one or more payments

To refund one or more payments, type the amount you'd like to refund in the appropriate input box. If more than one payment is to be refunded, you'll see the total refund amount updated in the submit button. You can refund up to the amount that was originally processed, per method. You many enter an optional refund reason.

![](/assets/operator-guide-refunds.png "Refunds")

Once a payment has been partially refunded, you will see the refunded amount, as well as the amount that is still available to refund, under each payment.

![](/assets/operator-guide-partial-refunds.png "Partial refunded")

Once your payments have been fully refunded, you will see a message that states this. All previous refunds are listed in a card at the bottom of the page.

![](/assets/operator-guide-fully-refunded.png "Fully refunded")
