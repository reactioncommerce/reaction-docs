---
title: Payments
---

A **payment** is information attached to an order, which represents a way of paying for that part of the order after it has been fulfilled.

## Payment Plugins and Payment Methods

A **payment method** is the type of payment, or which API will be used to process it. Reaction Commerce does not have any payment methods in the core system. All payment methods are added by plugins.

We include and support two payment plugins: **Stripe** and **IOU**. If you need something different, you can remove one or both of these.

The IOU plugin provides a single payment method: “iou_example”. This method works without any configuration but is most likely not an acceptable solution in production since it requires only a name and billing address as “payment”. It is intended as a simple example for demos.

The Stripe plugin currently provides a single payment method, “stripe_card”, but will eventually provide others. You must create a Stripe account to use it. Refer to [Stripe Payment Plugin](./core-plugins-stripe.md) for details.

## Payment Input

**Payment input** is needed to create an order. It represents all information necessary to create a charge. What exactly this means depends on the payment method. For example, for the “stripe_card” payment method, a billing address and a Stripe card token is needed.

During checkout, the shopper chooses a payment method (if there are more than one available) and enters any information required by that method. That payment input is then saved temporarily on the client and used to create the order at the end of the checkout flow.

If the checkout UI component for a payment method supports entering a specific amount lower than the full amount due, then a shopper has an opportunity to add additional payments until the full amount due is covered.

## Payments

When a client creates an order, it passes collected payment input along with the order. The payments plugin will then create one or more **payments** (also referred to as "charges") to pay for the order. While placing the order, each payment must be "authorized" by the payment method handler, but each payment method can decide what "authorized" means.

If all payments for an order are authorized, then the order is created. After that, a shop operator can individually "capture", "refund", or "partially refund" each payment. Again, each payment method can decide what "capture" means. For a credit card payment, it means actually charging the card. For an invoice payment method, it might mean sending the invoice. It might not mean anything, in which case the payment method will mark the payment captured without doing anything.

Additionally, payment methods may or may not support refunding. Each payment has a current status based on what has happened. Examples of statuses are "authorized", "captured", "refunded", and "partially refunded".

When you cancel an entire order, the system automatically refunds the full amount of every payment that supports refunds.
